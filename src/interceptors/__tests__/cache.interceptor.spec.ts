import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import type { CallHandler, ExecutionContext } from '@nestjs/common';
import { firstValueFrom, of } from 'rxjs';
import type { Observable } from 'rxjs';
import { CacheInterceptor } from '../cache.interceptor.js';
import { GetFromCacheUseCase } from '@/core/cache/application/get-from-cache.usecase.js';
import { SaveToCacheUseCase } from '@/core/cache/application/save-to-cache.usecase.js';
import { buildCacheKey } from '@/core/cache/domain/cache-key.vo.js';
import { resolveCacheConfig } from '@/core/cache/domain/cache-config.vo.js';
import { RequestContextHolder, type RequestContext } from '@/shared/context/request-context.js';
import { Cacheable } from '@/shared/decorators/cacheable.decorator.js';

interface RequestStub {
  method: string;
  url: string;
  headers: Record<string, string | string[] | undefined>;
}

interface ResponseStub {
  statusCode: number;
  headers: Map<string, string>;
  header(name: string, value: string): ResponseStub;
  getHeaders(): Record<string, string | string[] | number | undefined>;
}

interface ContextStub {
  getType(): string;
  getHandler(): () => void;
  getClass(): new () => void;
  getArgs(): unknown[];
  getArgByIndex(index: number): unknown;
  switchToRpc(): unknown;
  switchToWs(): unknown;
  switchToHttp(): {
    getRequest(): RequestStub;
    getResponse(): ResponseStub;
    getNext(): CallHandler;
  };
}

class CachedController {
  static readonly handler = CachedController.prototype.get;

  @Cacheable({ ttlSec: 120, scope: 'tenant', varyHeaders: ['accept-language'] })
  get(): void {}
}

class UncachedController {
  static readonly handler = UncachedController.prototype.get;

  get(): void {}
}

function createResponse(
  statusCode = 200,
  headers: Record<string, string | string[] | number> = {},
): ResponseStub {
  const response: ResponseStub = {
    statusCode,
    headers: new Map<string, string>(),
    header(name, value) {
      this.headers.set(name.toLowerCase(), value);
      return this;
    },
    getHeaders: () => ({ ...headers }),
  };
  return response;
}

function createContext(
  controller: { new (): void; handler: () => void },
  request: RequestStub,
  response: ResponseStub,
  type = 'http',
): ContextStub {
  return {
    getType: () => type,
    getHandler: () => controller.handler,
    getClass: () => controller,
    getArgs: () => [],
    getArgByIndex: () => undefined,
    switchToRpc: () => undefined,
    switchToWs: () => undefined,
    switchToHttp: () => ({
      getRequest: () => request,
      getResponse: () => response,
      getNext: () => handlerOf('unused'),
    }),
  };
}

function handlerOf(body: unknown): CallHandler {
  return { handle: () => of(body) };
}

async function responseOf(
  source: Promise<Observable<unknown>> | Promise<Promise<Observable<unknown>>>,
): Promise<unknown> {
  const resolved = await source;
  return firstValueFrom(await resolved);
}

function requestOf(method = 'GET'): RequestStub {
  return { method, url: '/orders?page=1', headers: { 'accept-language': 'id' } };
}

async function inContext<T>(fn: () => Promise<T>, userId?: string): Promise<T> {
  const context: RequestContext = {
    requestId: 'req-1',
    tenantId: 'tenant-1',
    userId,
    startedAt: Date.now(),
  };
  return RequestContextHolder.run(context, fn);
}

describe('CacheInterceptor', () => {
  let getExecute: ReturnType<typeof vi.fn>;
  let saveExecute: ReturnType<typeof vi.fn>;
  let interceptor: CacheInterceptor;

  beforeEach(async () => {
    getExecute = vi.fn().mockResolvedValue({ kind: 'miss' });
    saveExecute = vi.fn().mockResolvedValue(undefined);
    const moduleRef = await Test.createTestingModule({
      providers: [
        CacheInterceptor,
        Reflector,
        { provide: GetFromCacheUseCase, useValue: { execute: getExecute } },
        { provide: SaveToCacheUseCase, useValue: { execute: saveExecute } },
      ],
    }).compile();
    interceptor = moduleRef.get(CacheInterceptor);
  });

  it('melewati route tanpa metadata Cacheable', async () => {
    const response = createResponse();
    const context = createContext(UncachedController, requestOf(), response) as ExecutionContext;
    const handle = vi.fn(() => of('ok'));
    await expect(responseOf(interceptor.intercept(context, { handle }))).resolves.toBe('ok');
    expect(handle).toHaveBeenCalledTimes(1);
  });

  it('melewati request non-GET', async () => {
    const context = createContext(
      CachedController,
      requestOf('POST'),
      createResponse(),
    ) as ExecutionContext;
    await responseOf(interceptor.intercept(context, handlerOf('ok')));
    expect(getExecute).not.toHaveBeenCalled();
  });

  it('melewati request tanpa tenant', async () => {
    const context = createContext(
      CachedController,
      requestOf(),
      createResponse(),
    ) as ExecutionContext;
    await responseOf(interceptor.intercept(context, handlerOf('ok')));
    expect(getExecute).not.toHaveBeenCalled();
  });

  it('memutar ulang hit tanpa memanggil handler dan menyetel header cache', async () => {
    const response = createResponse();
    getExecute.mockResolvedValue({
      kind: 'hit',
      stale: false,
      response: {
        status: 206,
        headers: { 'content-type': 'application/json', authorization: 'rahasia' },
        body: Buffer.from(JSON.stringify({ id: 1 })).toString('base64'),
        createdAt: Date.now(),
        expiresAt: Date.now() + 60_000,
        age: 12,
      },
    });
    const next = vi.fn(() => of('baru'));
    const context = createContext(CachedController, requestOf(), response) as ExecutionContext;
    const result = await responseOf(
      inContext(() => interceptor.intercept(context, { handle: next })),
    );
    expect(result).toEqual({ id: 1 });
    expect(next).not.toHaveBeenCalled();
    expect(response.headers.get('x-cache')).toBe('HIT');
    expect(response.headers.get('age')).toBe('12');
    expect(response.headers.has('authorization')).toBe(false);
  });

  it('menyWarnings pada hit stale', async () => {
    const response = createResponse();
    getExecute.mockResolvedValue({
      kind: 'hit',
      stale: true,
      response: {
        status: 200,
        headers: {},
        body: '',
        createdAt: Date.now(),
        expiresAt: Date.now() - 1,
        age: 99,
      },
    });
    const context = createContext(CachedController, requestOf(), response) as ExecutionContext;
    await responseOf(inContext(() => interceptor.intercept(context, handlerOf('baru'))));
    expect(response.headers.get('warning')).toBe('110 - "Response is Stale"');
  });

  it('memanggil handler dan menyimpan respons saat miss', async () => {
    const response = createResponse();
    const context = createContext(CachedController, requestOf(), response) as ExecutionContext;
    const config = resolveCacheConfig({
      ttlSec: 120,
      scope: 'tenant',
      varyHeaders: ['accept-language'],
    });
    const key = buildCacheKey({
      tenantId: 'tenant-1',
      method: 'GET',
      path: '/orders',
      query: '?page=1',
      varyHeaders: { 'accept-language': 'id' },
      isAuthenticated: false,
    });
    const result = await responseOf(
      inContext(() => interceptor.intercept(context, handlerOf({ id: 2 }))),
    );
    expect(result).toEqual({ id: 2 });
    await vi.waitFor(() => expect(saveExecute).toHaveBeenCalled());
    expect(saveExecute).toHaveBeenCalledWith(expect.objectContaining({ key, config, status: 200 }));
  });

  it('tidak menyimpan status yang tidak cacheable', async () => {
    const response = createResponse(500);
    const context = createContext(CachedController, requestOf(), response) as ExecutionContext;
    await responseOf(inContext(() => interceptor.intercept(context, handlerOf('gagal'))));
    await Promise.resolve();
    expect(saveExecute).not.toHaveBeenCalled();
  });

  it('tidak menyimpan body yang melebihi batas ukuran', async () => {
    const response = createResponse();
    const context = createContext(CachedController, requestOf(), response) as ExecutionContext;
    await responseOf(
      inContext(() => interceptor.intercept(context, handlerOf('x'.repeat(1_048_577)))),
    );
    await Promise.resolve();
    expect(saveExecute).not.toHaveBeenCalled();
  });
});
