import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { ProxyService } from '../proxy.service.js';
import type { ResolveRouteUseCase } from '@/core/routing/application/resolve-route.usecase.js';
import type { UpstreamClientPort } from '@/core/routing/domain/upstream-client.port.js';
import type { Route } from '@/core/routing/domain/route.entity.js';

type Execute = ResolveRouteUseCase['execute'];
type RequestFn = UpstreamClientPort['request'];

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

describe('ProxyService', () => {
  let execute: Mock<Execute>;
  let request: Mock<RequestFn>;
  let service: ProxyService;

  beforeEach(() => {
    execute = vi.fn<Execute>().mockResolvedValue({ route: makeRoute(), params: {} });
    request = vi.fn<RequestFn>();
    const resolveRoute: { execute: Execute } = { execute };
    service = new ProxyService(resolveRoute as ResolveRouteUseCase, { request });
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

  it('reject upstream URL tidak aman (SSRF)', async () => {
    execute.mockResolvedValue({
      route: makeRoute({ upstream: 'http://169.254.169.254/latest/meta-data' }),
      params: {},
    });

    await expect(service.handle(baseInput())).rejects.toThrow();
    expect(request).not.toHaveBeenCalled();
  });
});
