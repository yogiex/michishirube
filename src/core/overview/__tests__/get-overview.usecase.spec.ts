import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetOverviewUseCase } from '../application/get-overview.usecase.js';
import { emptyRawCounters, type RawCounters } from '../domain/overview.entity.js';
import type {
  ActivityFeedPort,
  CircuitOverviewPort,
  OverviewStatsPort,
  TenantOverviewPort,
} from '../domain/overview-stats.port.js';

function counters(over: Partial<RawCounters> = {}): RawCounters {
  return {
    ...emptyRawCounters(),
    requests24h: 6_936_000,
    requestsPrev24h: 6_178_000,
    errors24h: 5_548,
    errorsPrev24h: 6_789,
    latencyP95: 45,
    latencyP99: 128,
    latencyP95Prev: 42,
    ...over,
  };
}

function makeStats() {
  return {
    getCounters24h: vi.fn<OverviewStatsPort['getCounters24h']>().mockResolvedValue(counters()),
    recordRequest: vi.fn<OverviewStatsPort['recordRequest']>().mockResolvedValue(undefined),
  };
}

function makeTenants() {
  return {
    getTenantStats: vi
      .fn<TenantOverviewPort['getTenantStats']>()
      .mockResolvedValue({ active: 2, total: 3 }),
  };
}

function makeActivity() {
  return {
    listRecentActivity: vi.fn<ActivityFeedPort['listRecentActivity']>().mockResolvedValue([
      {
        id: 'a_1',
        timestamp: '2026-09-24T10:00:00Z',
        actor: 'admin',
        action: 'route.create',
        target: 'r_025',
        status: 'success',
      },
    ]),
  };
}

function makeCircuits() {
  return {
    listCircuits: vi.fn<CircuitOverviewPort['listCircuits']>().mockResolvedValue([
      { key: 'order-svc', status: 'closed', failureCount: 0, openedAtMs: 0 },
      { key: 'billing-svc', status: 'open', failureCount: 15, openedAtMs: 1 },
      { key: 'auth-svc', status: 'half_open', failureCount: 2, openedAtMs: 0 },
    ]),
  };
}

describe('GetOverviewUseCase', () => {
  let stats: ReturnType<typeof makeStats>;
  let tenants: ReturnType<typeof makeTenants>;
  let activity: ReturnType<typeof makeActivity>;
  let circuits: ReturnType<typeof makeCircuits>;
  let useCase: GetOverviewUseCase;

  beforeEach(() => {
    stats = makeStats();
    tenants = makeTenants();
    activity = makeActivity();
    circuits = makeCircuits();
    useCase = new GetOverviewUseCase(stats, tenants, activity, circuits);
  });

  it('mengembalikan overview lengkap', async () => {
    const result = await useCase.execute();
    expect(result.requests.total24h).toBe(6_936_000);
    expect(result.requests.deltaVsYesterday).toBeCloseTo(12.3, 1);
    expect(result.errors.total24h).toBe(5_548);
    expect(result.latency).toEqual({ p95Ms: 45, p99Ms: 128, deltaVsYesterday: 3 });
    expect(result.tenants).toEqual({ active: 2, total: 3 });
    expect(result.circuits).toEqual({ open: 1, halfOpen: 1, closed: 1 });
    expect(result.generatedAt).toBeTypeOf('string');
  });

  it('memetakan kesehatan service dari circuit', async () => {
    const result = await useCase.execute();
    expect(result.services).toEqual([
      { name: 'order-svc', status: 'healthy', latencyMs: null },
      { name: 'billing-svc', status: 'down', latencyMs: null },
      { name: 'auth-svc', status: 'degraded', latencyMs: null },
    ]);
  });

  it('mengambil activity feed dengan batas 10', async () => {
    const result = await useCase.execute();
    expect(activity.listRecentActivity).toHaveBeenCalledWith(10);
    expect(result.recentActivity).toHaveLength(1);
  });

  it('cache 5 detik sehingga stats tidak dipanggil ulang', async () => {
    await useCase.execute();
    await useCase.execute();
    expect(stats.getCounters24h).toHaveBeenCalledTimes(1);
  });

  it('fallback nol saat counters gagal', async () => {
    stats.getCounters24h.mockRejectedValue(new Error('redis down'));
    const result = await useCase.execute();
    expect(result.requests.total24h).toBe(0);
    expect(result.errors.rate).toBe(0);
    expect(result.latency.p95Ms).toBe(0);
  });

  it('fallback nol saat tenant dan activity gagal', async () => {
    tenants.getTenantStats.mockRejectedValue(new Error('down'));
    activity.listRecentActivity.mockRejectedValue(new Error('down'));
    const result = await useCase.execute();
    expect(result.tenants).toEqual({ active: 0, total: 0 });
    expect(result.recentActivity).toEqual([]);
  });
});
