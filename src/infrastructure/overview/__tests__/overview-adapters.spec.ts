import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Test } from '@nestjs/testing';
import { RedisCircuitInventoryAdapter } from '../redis-circuit-inventory.adapter.js';
import { RedisActivityFeedAdapter } from '../redis-activity-feed.adapter.js';
import { TenantOverviewAdapter } from '../tenant-overview.adapter.js';
import { REDIS_CLIENT } from '@/infrastructure/redis/redis.constants.js';
import { TENANT_REPOSITORY } from '@/core/tenant/domain/tenant.repository.port.js';
import { createTenantId } from '@/core/tenant/domain/tenant-id.vo.js';
import { AUDIT_RECENT_KEY } from '../overview.constants.js';
import { ACTIVITY_FEED_MAX_ITEMS } from '@/core/overview/domain/overview-stats.port.js';

interface RedisMock {
  scan: ReturnType<typeof vi.fn>;
  hgetall: ReturnType<typeof vi.fn>;
  lrange: ReturnType<typeof vi.fn>;
}

function makeRedis(): RedisMock {
  return {
    scan: vi.fn().mockResolvedValue(['0', []]),
    hgetall: vi.fn().mockResolvedValue({}),
    lrange: vi.fn().mockResolvedValue([]),
  };
}

async function createCircuits(redis: RedisMock): Promise<RedisCircuitInventoryAdapter> {
  const moduleRef = await Test.createTestingModule({
    providers: [RedisCircuitInventoryAdapter, { provide: REDIS_CLIENT, useValue: redis }],
  }).compile();
  return moduleRef.get(RedisCircuitInventoryAdapter);
}

async function createActivity(redis: RedisMock): Promise<RedisActivityFeedAdapter> {
  const moduleRef = await Test.createTestingModule({
    providers: [RedisActivityFeedAdapter, { provide: REDIS_CLIENT, useValue: redis }],
  }).compile();
  return moduleRef.get(RedisActivityFeedAdapter);
}

describe('RedisCircuitInventoryAdapter', () => {
  let redis: RedisMock;
  let adapter: RedisCircuitInventoryAdapter;

  beforeEach(async () => {
    redis = makeRedis();
    adapter = await createCircuits(redis);
  });

  it('mengembalikan daftar kosong saat tidak ada key', async () => {
    await expect(adapter.listCircuits()).resolves.toEqual([]);
  });

  it('memetakan hash circuit ke CircuitEntry', async () => {
    redis.scan.mockResolvedValue(['0', ['gateway:circuit-breaker:b', 'gateway:circuit-breaker:a']]);
    redis.hgetall.mockImplementation((key: string) =>
      Promise.resolve(
        key.endsWith('a')
          ? { state: 'closed', failures: '0', openedAt: '0' }
          : { state: 'open', failures: '4', openedAt: '123' },
      ),
    );

    const result = await adapter.listCircuits();

    expect(result).toEqual([
      { key: 'a', status: 'closed', failureCount: 0, openedAtMs: 0 },
      { key: 'b', status: 'open', failureCount: 4, openedAtMs: 123 },
    ]);
  });

  it('iterasi scan sampai cursor nol', async () => {
    redis.scan
      .mockResolvedValueOnce(['17', ['gateway:circuit-breaker:a']])
      .mockResolvedValueOnce(['0', ['gateway:circuit-breaker:b']]);
    redis.hgetall.mockResolvedValue({ state: 'closed', failures: '0', openedAt: '0' });

    const result = await adapter.listCircuits();

    expect(redis.scan).toHaveBeenCalledTimes(2);
    expect(result).toHaveLength(2);
  });

  it('fallback kosong saat redis gagal', async () => {
    redis.scan.mockRejectedValue(new Error('redis down'));
    await expect(adapter.listCircuits()).resolves.toEqual([]);
  });
});

describe('RedisActivityFeedAdapter', () => {
  let redis: RedisMock;
  let adapter: RedisActivityFeedAdapter;

  beforeEach(async () => {
    redis = makeRedis();
    adapter = await createActivity(redis);
  });

  it('mengembalikan daftar kosong saat tidak ada data', async () => {
    await expect(adapter.listRecentActivity(ACTIVITY_FEED_MAX_ITEMS)).resolves.toEqual([]);
  });

  it('memetakan JSON activity', async () => {
    redis.lrange.mockResolvedValue([
      JSON.stringify({
        id: 'a_1',
        timestamp: '2026-09-24T10:00:00Z',
        actor: 'admin',
        action: 'route.create',
        target: 'r_025',
        status: 'success',
      }),
    ]);

    const result = await adapter.listRecentActivity(ACTIVITY_FEED_MAX_ITEMS);

    expect(redis.lrange).toHaveBeenCalledWith(AUDIT_RECENT_KEY, 0, ACTIVITY_FEED_MAX_ITEMS - 1);
    expect(result[0]?.action).toBe('route.create');
  });

  it('melewati entri JSON rusak atau tidak valid', async () => {
    redis.lrange.mockResolvedValue(['{oops', JSON.stringify({ id: 'a_2' })]);
    await expect(adapter.listRecentActivity(5)).resolves.toEqual([]);
  });

  it('fallback kosong saat redis gagal', async () => {
    redis.lrange.mockRejectedValue(new Error('redis down'));
    await expect(adapter.listRecentActivity(5)).resolves.toEqual([]);
  });
});

describe('TenantOverviewAdapter', () => {
  async function createAdapter(tenants: Record<string, unknown>): Promise<TenantOverviewAdapter> {
    const moduleRef = await Test.createTestingModule({
      providers: [TenantOverviewAdapter, { provide: TENANT_REPOSITORY, useValue: tenants }],
    }).compile();
    return moduleRef.get(TenantOverviewAdapter);
  }

  function tenant(status: string): Record<string, unknown> {
    return {
      id: createTenantId('acme'),
      slug: 'acme',
      name: 'Acme',
      status,
      tier: 'pro',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  it('menghitung tenant aktif', async () => {
    const adapter = await createAdapter({
      listAll: vi
        .fn()
        .mockResolvedValue([tenant('active'), tenant('suspended'), tenant('inactive')]),
    });
    await expect(adapter.getTenantStats()).resolves.toEqual({ active: 1, total: 3 });
  });

  it('mengembalikan nol saat tidak ada tenant', async () => {
    const adapter = await createAdapter({ listAll: vi.fn().mockResolvedValue([]) });
    await expect(adapter.getTenantStats()).resolves.toEqual({ active: 0, total: 0 });
  });
});
