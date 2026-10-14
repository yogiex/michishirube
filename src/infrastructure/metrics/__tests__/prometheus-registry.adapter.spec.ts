import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { describe, expect, it } from 'vitest';
import { PrometheusRegistryAdapter } from '../prometheus-registry.adapter.js';

const createAdapter = async (): Promise<PrometheusRegistryAdapter> => {
  const module = await Test.createTestingModule({
    providers: [
      PrometheusRegistryAdapter,
      {
        provide: ConfigService,
        useValue: {
          get: () => 'api-gateway',
        },
      },
    ],
  }).compile();
  return module.get(PrometheusRegistryAdapter);
};

describe('PrometheusRegistryAdapter', () => {
  it('records normalized HTTP labels and renders the request counter', async () => {
    const adapter = await createAdapter();
    adapter.recordHttp({
      method: 'GET',
      route: '/users/12345',
      status: 200,
      durationMs: 12.5,
      tenantHash: 'tenant-hash',
    });

    const output = await adapter.render();
    expect(output).toContain('gateway_http_requests_total');
    expect(output).toContain('route="/users/:id"');
    expect(output).toContain('status="200"');
    expect(output).toContain('tenant="tenant-hash"');
  });

  it('renders metrics with a Prometheus text content type', async () => {
    const adapter = await createAdapter();
    expect(await adapter.render()).not.toBe('');
    expect(adapter.contentType()).toContain('text/plain');
  });

  it('renders the HTTP duration histogram', async () => {
    const adapter = await createAdapter();
    adapter.recordHttp({
      method: 'POST',
      route: '/orders',
      status: 201,
      durationMs: 4,
      tenantHash: 'tenant-hash',
    });

    expect(await adapter.render()).toContain('gateway_http_request_duration_seconds_bucket');
  });

  it('limits route cardinality', async () => {
    const adapter = await createAdapter();
    for (let index = 0; index < 1200; index += 1) {
      adapter.recordHttp({
        method: 'GET',
        route: `/orders/item-${index}`,
        status: 200,
        durationMs: 1,
        tenantHash: 'tenant-hash',
      });
    }

    expect(await adapter.render()).toContain('__other__');
  });

  it('records all circuit, bulkhead, cache, idempotency, retry, and rate limit metrics', async () => {
    const adapter = await createAdapter();
    for (const state of ['closed', 'half_open', 'open'] as const) {
      adapter.recordCircuit({ upstream: 'order-service', state });
    }
    adapter.recordCircuitTransition({
      upstream: 'order-service',
      from: 'closed',
      to: 'open',
    });
    for (const result of ['acquired', 'queued', 'rejected', 'timeout'] as const) {
      adapter.recordBulkhead({ upstream: 'order-service', result });
    }
    adapter.recordBulkheadRelease('order-service');
    adapter.recordCache({ result: 'hit', route: '/orders/123' });
    adapter.recordIdempotency({ result: 'replay', route: '/orders/123' });
    adapter.recordRetry({ upstream: 'order-service', attempt: 1, result: 'success' });
    adapter.recordRateLimit({ dimension: 'tenant', result: 'allowed' });

    const output = await adapter.render();
    expect(output).toContain('gateway_circuit_state');
    expect(output).toContain('gateway_circuit_transitions_total');
    expect(output).toContain('gateway_bulkhead_acquired_total');
    expect(output).toContain('gateway_bulkhead_queued_total');
    expect(output).toContain('gateway_bulkhead_rejected_total');
    expect(output).toContain('gateway_bulkhead_active');
    expect(output).toContain('gateway_cache_requests_total');
    expect(output).toContain('gateway_idempotency_requests_total');
    expect(output).toContain('gateway_retry_attempts_total');
    expect(output).toContain('gateway_rate_limit_requests_total');
  });

  it('sanitizes unsafe route labels', async () => {
    const adapter = await createAdapter();
    adapter.recordHttp({
      method: 'GET',
      route: '/orders/<script>\nmalicious',
      status: 400,
      durationMs: 1,
      tenantHash: 'tenant-hash',
    });

    const output = await adapter.render();
    expect(output).not.toContain('<script>');
    expect(output).not.toContain('malicious\n');
  });

  it('resets metric values and cardinality without throwing', async () => {
    const adapter = await createAdapter();
    adapter.recordHttp({
      method: 'GET',
      route: '/orders/1',
      status: 200,
      durationMs: 1,
      tenantHash: 'tenant-hash',
    });
    adapter.recordCircuit({ upstream: 'order-service', state: 'open' });

    adapter.reset();
    expect(() => adapter.reset()).not.toThrow();
  });
});
