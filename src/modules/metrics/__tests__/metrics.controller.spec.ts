import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  METRICS_REGISTRY,
  type MetricsRegistryPort,
} from '@/core/metrics/domain/metrics-registry.port.js';
import { MetricsAuthGuard } from '../metrics-auth.guard.js';
import { MetricsController } from '../metrics.controller.js';

class RegistryStub implements MetricsRegistryPort {
  render = vi.fn<() => Promise<string>>().mockResolvedValue('metric 1');
  contentType = vi.fn<() => string>().mockReturnValue('text/plain; version=0.0.4; charset=utf-8');
  recordHttp(): void {}
  recordCircuit(): void {}
  recordCircuitTransition(): void {}
  recordBulkhead(): void {}
  recordBulkheadRelease(): void {}
  recordCache(): void {}
  recordIdempotency(): void {}
  recordRetry(): void {}
  recordRateLimit(): void {}
}

function requireApp(app: NestFastifyApplication | undefined): NestFastifyApplication {
  if (app === undefined) throw new Error('Application is not initialized');
  return app;
}

describe('MetricsController', () => {
  let app: NestFastifyApplication | undefined;
  let registry: RegistryStub;

  beforeEach(async () => {
    registry = new RegistryStub();
    const moduleRef = await Test.createTestingModule({
      controllers: [MetricsController],
      providers: [
        { provide: METRICS_REGISTRY, useValue: registry },
        { provide: ConfigService, useValue: { get: () => '' } },
        { provide: MetricsAuthGuard, useValue: { canActivate: () => true } },
      ],
    }).compile();
    app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterEach(async () => {
    if (app !== undefined) await app.close();
  });

  it('mengembalikan metrics dan mengatur header', async () => {
    const response = await requireApp(app).inject({ method: 'GET', url: '/metrics' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('metric 1');
    expect(response.headers['content-type']).toBe('text/plain; version=0.0.4; charset=utf-8');
    expect(response.headers['cache-control']).toBe('no-store, no-cache, must-revalidate');
  });

  it('meneruskan penolakan render', async () => {
    registry.render.mockRejectedValue(new Error('render failed'));
    const response = await requireApp(app).inject({ method: 'GET', url: '/metrics' });
    expect(response.statusCode).toBe(500);
  });
});
