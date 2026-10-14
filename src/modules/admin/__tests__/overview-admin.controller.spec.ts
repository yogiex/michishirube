import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Test } from '@nestjs/testing';
import { OverviewAdminController } from '../overview-admin.controller.js';
import { GetOverviewUseCase } from '@/core/overview/application/get-overview.usecase.js';
import type { Overview } from '@/core/overview/domain/overview.entity.js';

function makeOverview(): Overview {
  return {
    requests: { perMinute: 4821, deltaVsYesterday: 12.3, total24h: 6_936_000 },
    errors: { rate: 0.08, deltaVsYesterday: -0.02, total24h: 5548 },
    latency: { p95Ms: 45, p99Ms: 128, deltaVsYesterday: 3 },
    tenants: { active: 12, total: 13 },
    circuits: { open: 1, halfOpen: 0, closed: 4 },
    services: [{ name: 'order-svc', status: 'healthy', latencyMs: null }],
    recentActivity: [],
    generatedAt: '2026-09-24T10:00:00Z',
  };
}

describe('OverviewAdminController', () => {
  let execute: ReturnType<typeof vi.fn>;
  let controller: OverviewAdminController;

  beforeEach(async () => {
    execute = vi.fn().mockResolvedValue(makeOverview());
    const moduleRef = await Test.createTestingModule({
      controllers: [OverviewAdminController],
      providers: [{ provide: GetOverviewUseCase, useValue: { execute } }],
    }).compile();
    controller = moduleRef.get(OverviewAdminController);
  });

  it('mengembalikan overview', async () => {
    const result = await controller.overview();
    expect(result.requests.perMinute).toBe(4821);
    expect(result.circuits.open).toBe(1);
    expect(execute).toHaveBeenCalledOnce();
  });

  it('meneruskan error dari use case', async () => {
    execute.mockRejectedValue(new Error('boom'));
    await expect(controller.overview()).rejects.toThrow('boom');
  });
});
