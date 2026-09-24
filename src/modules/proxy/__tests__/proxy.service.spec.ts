import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest';
import { ConfigService } from '@nestjs/config';
import { ProxyService } from '../proxy.service.js';
import { ExecuteWithCircuitBreakerUseCase } from '@/core/circuit-breaker/application/execute-with-circuit-breaker.usecase.js';
import {
  ExecuteWithBulkheadUseCase,
  type BulkheadPort,
} from '@/core/bulkhead/application/execute-with-bulkhead.usecase.js';
import { RecordCircuitOutcomeUseCase } from '@/core/circuit-breaker/application/record-circuit-outcome.usecase.js';
import { createCircuitBreakerConfig } from '@/core/circuit-breaker/domain/circuit-breaker-config.vo.js';
import type { CircuitBreakerPort } from '@/core/circuit-breaker/domain/circuit-breaker.port.js';
import { createClosedCircuitState } from '@/core/circuit-breaker/domain/circuit-state.entity.js';
import type { AppConfig } from '@/config/configuration.js';
import { CircuitOpenError, UpstreamError } from '@/shared/errors/index.js';
import type { ResolveRouteUseCase } from '@/core/routing/application/resolve-route.usecase.js';
import type { UpstreamClientPort } from '@/core/routing/domain/upstream-client.port.js';
import type { Route } from '@/core/routing/domain/route.entity.js';
import { parseRetryAfterMs } from '@/shared/utils/retry-after.util.js';

type Execute = ResolveRouteUseCase['execute'];
type RequestFn = UpstreamClientPort['request'];

const circuitConfig = createCircuitBreakerConfig(5, 2, 30_000);

function createBreaker(
  overrides: Partial<CircuitBreakerPort> = {},
): ExecuteWithCircuitBreakerUseCase {
  const state = createClosedCircuitState();
  const port: CircuitBreakerPort = {
    acquire: vi.fn().mockResolvedValue({ kind: 'allowed', state }),
    recordSuccess: vi.fn().mockResolvedValue(state),
    recordFailure: vi.fn().mockResolvedValue(state),
    getState: vi.fn().mockResolvedValue(state),
    ...overrides,
  };
  return new ExecuteWithCircuitBreakerUseCase(port, new RecordCircuitOutcomeUseCase(port));
}

function createBulkhead(): ExecuteWithBulkheadUseCase {
  const port: BulkheadPort = {
    acquire: vi.fn().mockResolvedValue({
      queued: false,
      release: vi.fn<() => Promise<void>>().mockResolvedValue(undefined),
    }),
  };
  return new ExecuteWithBulkheadUseCase(port);
}

function makeRoute(over: Partial<Route> = {}): Route {
  return {
    id: 'r_1',
    path: '/api/v1/orders',
    method: 'GET' as const,
    upstream: 'https://api.example.com/orders',
    enabled: true,
    requireAuth: false,
    requireIdempotency: false,
    roles: [] as string[],
    timeoutMs: 5000,
    createdAt: '2026-01-01T00:00:00Z',
    ...over,
  };
}

function baseInput(over: Partial<Parameters<ProxyService['handle']>[0]> = {}) {
  return {
    method: 'GET',
    path: '/api/v1/orders',
    query: '',
    headers: { accept: 'application/json' },
    ip: '1.2.3.4',
    ...over,
  };
}

describe('parseRetryAfterMs', () => {
  it('parse Retry-After dalam detik', () => {
    expect(parseRetryAfterMs('15')).toBe(15_000);
  });

  it('parse Retry-After sebagai tanggal', () => {
    const nowMs = Date.parse('2026-01-01T00:00:00Z');
    expect(parseRetryAfterMs('Thu, 01 Jan 2026 00:00:10 GMT', nowMs)).toBe(10_000);
  });

  it('tolak Retry-After invalid', () => {
    expect(parseRetryAfterMs('invalid')).toBeUndefined();
  });
});

describe('ProxyService', () => {
  let execute: Mock<Execute>;
  let request: Mock<RequestFn>;
  let service: ProxyService;
  let breaker: ExecuteWithCircuitBreakerUseCase;

  beforeEach(() => {
    execute = vi.fn<Execute>().mockResolvedValue({ route: makeRoute(), params: {} });
    request = vi.fn<RequestFn>();
    breaker = createBreaker();
    const resolveRoute: { execute: Execute } = { execute };
    const config = new ConfigService<AppConfig, true>();
    vi.spyOn(config, 'getOrThrow').mockImplementation((key: string) =>
      key === 'bulkhead' ? { maxConcurrent: 1, maxQueue: 2, queueTimeoutMs: 100 } : circuitConfig,
    );
    service = new ProxyService(
      resolveRoute as ResolveRouteUseCase,
      { request },
      breaker,
      createBulkhead(),
      config,
    );
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('forward ke upstream', async () => {
    request.mockResolvedValue({
      status: 200,
      headers: { 'content-type': 'application/json' },
      body: Buffer.from('{"ok":true}'),
    });

    const out = await service.handle(baseInput());

    expect(out.status).toBe(200);
    expect(out.body.toString('utf8')).toBe('{"ok":true}');
    expect(request).toHaveBeenCalledTimes(1);
  });

  it('retry respons 503 lalu mengembalikan sukses', async () => {
    vi.useFakeTimers();
    request
      .mockResolvedValueOnce({
        status: 503,
        headers: { 'retry-after': '0' },
        body: Buffer.from(''),
      })
      .mockResolvedValueOnce({ status: 200, headers: {}, body: Buffer.from('ok') });

    const promise = service.handle(baseInput());
    await vi.runAllTimersAsync();

    const out = await promise;
    expect(out.status).toBe(200);
    expect(request).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });

  it('tidak retry POST tanpa idempotency key', async () => {
    request.mockResolvedValue({ status: 503, headers: {}, body: Buffer.from('') });

    const out = await service.handle(baseInput({ method: 'POST', body: Buffer.from('{}') }));

    expect(out.status).toBe(503);
    expect(request).toHaveBeenCalledTimes(1);
  });

  it('retry POST dengan idempotency key', async () => {
    vi.useFakeTimers();
    request
      .mockResolvedValueOnce({ status: 503, headers: {}, body: Buffer.from('') })
      .mockResolvedValueOnce({ status: 201, headers: {}, body: Buffer.from('ok') });

    const promise = service.handle(
      baseInput({
        method: 'POST',
        headers: { 'idempotency-key': 'key-1' },
        body: Buffer.from('{}'),
      }),
    );
    await vi.runAllTimersAsync();

    expect((await promise).status).toBe(201);
    expect(request).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });

  it('meneruskan AbortSignal ke upstream', async () => {
    const controller = new AbortController();
    request.mockResolvedValue({ status: 200, headers: {}, body: Buffer.from('') });

    await service.handle(baseInput({ signal: controller.signal }));

    expect(request.mock.calls[0]?.[0].signal).toBe(controller.signal);
  });

  it('gabung wildcard ke upstream URL', async () => {
    execute.mockResolvedValue({
      route: makeRoute({ upstream: 'https://api.example.com/v1' }),
      params: {},
      wildcard: '/foo/bar',
    });
    request.mockResolvedValue({ status: 200, headers: {}, body: Buffer.from('') });

    await service.handle(baseInput({ path: '/api/v1/orders/foo/bar' }));

    const firstCall = request.mock.calls[0];
    expect(firstCall).toBeDefined();
    if (firstCall === undefined) throw new Error('no call');
    expect(firstCall[0].url).toBe('https://api.example.com/v1/foo/bar');
  });

  it('gabung query string', async () => {
    request.mockResolvedValue({ status: 200, headers: {}, body: Buffer.from('') });

    await service.handle(baseInput({ query: '?page=1&limit=20' }));

    const firstCall = request.mock.calls[0];
    expect(firstCall).toBeDefined();
    if (firstCall === undefined) throw new Error('no call');
    expect(firstCall[0].url).toContain('?page=1&limit=20');
  });

  it('param suffix: pattern literal prefix dipotong', async () => {
    execute.mockResolvedValue({
      route: makeRoute({
        path: '/api/v1/orders/:id',
        upstream: 'https://api.example.com/posts',
      }),
      params: { id: '42' },
    });
    request.mockResolvedValue({ status: 200, headers: {}, body: Buffer.from('') });

    await service.handle(baseInput({ path: '/api/v1/orders/42' }));

    const firstCall = request.mock.calls[0];
    expect(firstCall).toBeDefined();
    if (firstCall === undefined) throw new Error('no call');
    expect(firstCall[0].url).toBe('https://api.example.com/posts/42');
  });

  it('sanitasi header internal', async () => {
    request.mockResolvedValue({
      status: 200,
      headers: { 'content-type': 'application/json' },
      body: Buffer.from(''),
    });

    await service.handle(
      baseInput({
        headers: {
          authorization: 'Bearer secret',
          cookie: 'session=abc',
          'content-type': 'application/json',
        },
      }),
    );

    const firstCall = request.mock.calls[0];
    expect(firstCall).toBeDefined();
    if (firstCall === undefined) throw new Error('no call');
    const headers = firstCall[0].headers;
    expect(headers).not.toHaveProperty('authorization');
    expect(headers).not.toHaveProperty('cookie');
    expect(headers['content-type']).toBe('application/json');
  });

  it('inject x-request-id ke upstream', async () => {
    request.mockResolvedValue({ status: 200, headers: {}, body: Buffer.from('') });

    await service.handle(baseInput());

    const firstCall = request.mock.calls[0];
    expect(firstCall).toBeDefined();
    if (firstCall === undefined) throw new Error('no call');
    expect(firstCall[0].headers['x-request-id']).toBeDefined();
  });

  it('mempertahankan error kegagalan upstream', async () => {
    const error = new UpstreamError('upstream failed');
    request.mockRejectedValue(error);

    await expect(service.handle(baseInput())).rejects.toBe(error);
  });

  it('meneruskan CircuitOpenError tanpa memanggil upstream', async () => {
    breaker = createBreaker({
      acquire: vi.fn().mockResolvedValue({
        kind: 'rejected',
        reason: 'circuit_open',
        retryAtMs: Date.now() + 30_000,
      }),
    });
    const config = new ConfigService<AppConfig, true>();
    vi.spyOn(config, 'getOrThrow').mockImplementation((key: string) =>
      key === 'bulkhead' ? { maxConcurrent: 1, maxQueue: 2, queueTimeoutMs: 100 } : circuitConfig,
    );
    const resolveRoute: { execute: Execute } = { execute };
    service = new ProxyService(
      resolveRoute as ResolveRouteUseCase,
      { request },
      breaker,
      createBulkhead(),
      config,
    );

    await expect(service.handle(baseInput())).rejects.toBeInstanceOf(CircuitOpenError);
    expect(request).not.toHaveBeenCalled();
  });

  it('menggunakan key circuit yang aman per origin upstream', async () => {
    const acquire = vi.fn().mockResolvedValue({
      kind: 'allowed',
      state: createClosedCircuitState(),
    });
    breaker = createBreaker({ acquire });
    const config = new ConfigService<AppConfig, true>();
    vi.spyOn(config, 'getOrThrow').mockImplementation((key: string) =>
      key === 'bulkhead' ? { maxConcurrent: 1, maxQueue: 2, queueTimeoutMs: 100 } : circuitConfig,
    );
    const resolveRoute: { execute: Execute } = { execute };
    service = new ProxyService(
      resolveRoute as ResolveRouteUseCase,
      { request },
      breaker,
      createBulkhead(),
      config,
    );
    request.mockResolvedValue({ status: 200, headers: {}, body: Buffer.from('') });

    await service.handle(baseInput({ query: '?page=1' }));

    expect(acquire).toHaveBeenCalledWith(
      'origin-68747470733a2f2f6170692e6578616d706c652e636f6d',
      expect.any(Number),
      circuitConfig,
    );
  });

  it('reject upstream URL tidak aman (SSRF)', async () => {
    execute.mockResolvedValue({
      route: makeRoute({ upstream: 'http://169.254.169.254/latest/meta-data' }),
      params: {},
    });

    await expect(service.handle(baseInput())).rejects.toThrow();
    expect(request).not.toHaveBeenCalled();
  });
});
