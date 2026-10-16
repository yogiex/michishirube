import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Test } from '@nestjs/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import type { Observable } from 'rxjs';
import type { CallHandler, ExecutionContext } from '@nestjs/common';
import { StatsInterceptor } from '../stats.interceptor.js';
import { OVERVIEW_STATS } from '@/core/overview/domain/overview-stats.port.js';

interface ContextStub {
  getType(): string;
  switchToHttp(): { getRequest(): { url: string } };
}

function contextOf(type: string, url: string): ContextStub {
  return {
    getType: () => type,
    switchToHttp: () => ({ getRequest: () => ({ url }) }),
  };
}

function handlerOf(source: Observable<unknown>): CallHandler {
  return { handle: () => source };
}

describe('StatsInterceptor', () => {
  let recordRequest: ReturnType<typeof vi.fn>;
  let interceptor: StatsInterceptor;

  beforeEach(async () => {
    recordRequest = vi.fn().mockResolvedValue(undefined);
    const moduleRef = await Test.createTestingModule({
      providers: [StatsInterceptor, { provide: OVERVIEW_STATS, useValue: { recordRequest } }],
    }).compile();
    interceptor = moduleRef.get(StatsInterceptor);
  });

  it('mencatat request sukses untuk route non-admin', async () => {
    const context = contextOf('http', '/api/v1/orders') as ExecutionContext;
    await firstValueFrom(interceptor.intercept(context, handlerOf(of('ok'))));
    expect(recordRequest).toHaveBeenCalledWith(expect.any(Number), false);
  });

  it('mencatat error saat handler melempar', async () => {
    const context = contextOf('http', '/api/v1/orders') as ExecutionContext;
    const source = interceptor.intercept(context, handlerOf(throwError(() => new Error('boom'))));
    await expect(firstValueFrom(source)).rejects.toThrow('boom');
    expect(recordRequest).toHaveBeenCalledWith(expect.any(Number), true);
  });

  it('melewati route admin dan health', async () => {
    for (const url of ['/admin/overview', '/health']) {
      const context = contextOf('http', url) as ExecutionContext;
      await firstValueFrom(interceptor.intercept(context, handlerOf(of('ok'))));
    }
    expect(recordRequest).not.toHaveBeenCalled();
  });

  it('melewati context non-http', async () => {
    const context = contextOf('rpc', '/api/v1/orders') as ExecutionContext;
    await firstValueFrom(interceptor.intercept(context, handlerOf(of('ok'))));
    expect(recordRequest).not.toHaveBeenCalled();
  });
});
