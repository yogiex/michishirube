import { Logger } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  RecordHttpMetricUseCase,
  type RecordHttpMetricInput,
} from '../application/record-http-metric.usecase.js';
import { METRICS_REGISTRY, type MetricsRegistryPort } from '../domain/metrics-registry.port.js';

function makeRegistry(): MetricsRegistryPort {
  return {
    recordHttp: vi.fn<MetricsRegistryPort['recordHttp']>(),
    recordCircuit: vi.fn<MetricsRegistryPort['recordCircuit']>(),
    recordCircuitTransition: vi.fn<MetricsRegistryPort['recordCircuitTransition']>(),
    recordBulkhead: vi.fn<MetricsRegistryPort['recordBulkhead']>(),
    recordBulkheadRelease: vi.fn<MetricsRegistryPort['recordBulkheadRelease']>(),
    recordCache: vi.fn<MetricsRegistryPort['recordCache']>(),
    recordIdempotency: vi.fn<MetricsRegistryPort['recordIdempotency']>(),
    recordRetry: vi.fn<MetricsRegistryPort['recordRetry']>(),
    recordRateLimit: vi.fn<MetricsRegistryPort['recordRateLimit']>(),
    render: vi.fn<MetricsRegistryPort['render']>().mockResolvedValue(''),
    contentType: vi.fn<MetricsRegistryPort['contentType']>().mockReturnValue('text/plain'),
  };
}

function makeInput(overrides: Partial<RecordHttpMetricInput> = {}): RecordHttpMetricInput {
  return {
    method: 'get',
    path: '/api/v1/orders/123',
    status: 200,
    durationMs: 45,
    tenantHash: 'abcd1234',
    ...overrides,
  };
}

describe('RecordHttpMetricUseCase', () => {
  let registry: MetricsRegistryPort;
  let useCase: RecordHttpMetricUseCase;
  let testingModule: TestingModule;

  beforeEach(async () => {
    registry = makeRegistry();
    testingModule = await Test.createTestingModule({
      providers: [RecordHttpMetricUseCase, { provide: METRICS_REGISTRY, useValue: registry }],
    }).compile();
    useCase = testingModule.get(RecordHttpMetricUseCase);
  });

  it('mendelegasikan metric HTTP yang sudah dinormalisasi', () => {
    useCase.execute(makeInput());
    expect(registry.recordHttp).toHaveBeenCalledWith({
      method: 'GET',
      route: '/api/v1/orders/:id',
      status: 200,
      durationMs: 45,
      tenantHash: 'abcd1234',
      upstream: undefined,
    });
  });

  it('menerima method huruf besar', () => {
    useCase.execute(makeInput({ method: 'POST' }));
    expect(registry.recordHttp).toHaveBeenCalledWith(expect.objectContaining({ method: 'POST' }));
  });

  it('tidak menyimpan route XSS secara verbatim', () => {
    useCase.execute(makeInput({ path: '/api/<script>alert(1)</script>' }));
    const recorded = vi.mocked(registry.recordHttp).mock.calls[0]?.[0];
    expect(recorded?.route).not.toContain('<script>');
  });

  it('mengganti tenant hash berkontrol dengan unknown', () => {
    useCase.execute(makeInput({ tenantHash: 'abc\n123' }));
    expect(registry.recordHttp).toHaveBeenCalledWith(
      expect.objectContaining({ tenantHash: 'unknown' }),
    );
  });

  it('tidak melempar error dan mencatat warning saat registry gagal', () => {
    vi.mocked(registry.recordHttp).mockImplementation(() => {
      throw new Error('registry unavailable');
    });
    const warn = vi.spyOn(Logger.prototype, 'warn').mockImplementation(() => undefined);
    expect(() => useCase.execute(makeInput())).not.toThrow();
    expect(warn).toHaveBeenCalledWith('Gagal mencatat HTTP metric', 'registry unavailable');
  });

  it.each([Number.NaN, -1])('membatasi durationMs tidak valid %s menjadi 0', (durationMs) => {
    useCase.execute(makeInput({ durationMs }));
    expect(registry.recordHttp).toHaveBeenCalledWith(expect.objectContaining({ durationMs: 0 }));
  });

  it('membersihkan upstream yang diberikan', () => {
    useCase.execute(makeInput({ upstream: 'order-svc\nmalicious' }));
    expect(registry.recordHttp).toHaveBeenCalledWith(
      expect.objectContaining({ upstream: 'unknown' }),
    );
  });
});
