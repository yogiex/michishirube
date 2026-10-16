import { describe, it, expect, beforeAll } from 'vitest';
import { firstValueFrom, of } from 'rxjs';
import type { CallHandler, ExecutionContext } from '@nestjs/common';
import { setupTracing } from '../../infrastructure/observability/tracing/otel.setup.js';
import {
  TracingInterceptor,
  isValidTraceparent,
  buildTraceparent,
} from '../tracing.interceptor.js';

describe('TracingInterceptor', () => {
  beforeAll(() => {
    setupTracing({ enabled: true, serviceName: 'test-gateway' });
  });

  it('passes through non-http context', async () => {
    const interceptor = new TracingInterceptor();
    const context = {
      getType: () => 'rpc',
      switchToHttp: () => ({ getRequest: () => ({}), getResponse: () => ({}) }),
    } as unknown as ExecutionContext;
    const handler: CallHandler = { handle: () => of('ok') };

    const result = await firstValueFrom(interceptor.intercept(context, handler));
    expect(result).toBe('ok');
  });

  it('sets a valid traceparent on request headers for http', async () => {
    const interceptor = new TracingInterceptor();
    const request = {
      method: 'GET',
      url: '/api/v1/orders/123',
      routeOptions: { url: '/api/v1/orders/:id' },
      headers: {} as Record<string, string>,
    };
    const response = { header: () => undefined };
    const context = {
      getType: () => 'http',
      switchToHttp: () => ({ getRequest: () => request, getResponse: () => response }),
    } as unknown as ExecutionContext;
    const handler: CallHandler = { handle: () => of('ok') };

    await firstValueFrom(interceptor.intercept(context, handler));

    expect(request.headers.traceparent).toBeDefined();
    expect(isValidTraceparent(request.headers.traceparent)).toBe(true);
  });

  it('span name uses route template', () => {
    const traceId = 'a'.repeat(32);
    const spanId = 'b'.repeat(16);
    expect(buildTraceparent(traceId, spanId, true)).toMatch(/^00-a{32}-b{16}-01$/);
  });
});
