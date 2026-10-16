import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Test } from '@nestjs/testing';
import { RedisOverviewStatsAdapter } from '../redis-overview-stats.adapter.js';
import { bucketFor, bucketRange, percentile } from '../overview-bucket.js';
import {
  MAX_LATENCY_SAMPLES,
  STATS_LATENCY_SAMPLES_KEY,
  STATS_REQUESTS_KEY,
} from '../overview.constants.js';
import { REDIS_CLIENT } from '@/infrastructure/redis/redis.constants.js';

interface MockPipeline {
  incr: ReturnType<typeof vi.fn>;
  expire: ReturnType<typeof vi.fn>;
  lpush: ReturnType<typeof vi.fn>;
  ltrim: ReturnType<typeof vi.fn>;
  exec: ReturnType<typeof vi.fn>;
}

function makePipeline(): MockPipeline {
  return {
    incr: vi.fn().mockReturnThis(),
    expire: vi.fn().mockReturnThis(),
    lpush: vi.fn().mockReturnThis(),
    ltrim: vi.fn().mockReturnThis(),
    exec: vi.fn().mockResolvedValue([]),
  };
}

interface RedisMock {
  pipeline: ReturnType<typeof vi.fn>;
  mget: ReturnType<typeof vi.fn>;
  lrange: ReturnType<typeof vi.fn>;
}

function makeRedis(): RedisMock {
  return {
    pipeline: vi.fn(() => makePipeline()),
    mget: vi.fn().mockResolvedValue([]),
    lrange: vi.fn().mockResolvedValue([]),
  };
}

async function createAdapter(redis: RedisMock): Promise<RedisOverviewStatsAdapter> {
  const moduleRef = await Test.createTestingModule({
    providers: [RedisOverviewStatsAdapter, { provide: REDIS_CLIENT, useValue: redis }],
  }).compile();
  return moduleRef.get(RedisOverviewStatsAdapter);
}

describe('RedisOverviewStatsAdapter', () => {
  let redis: RedisMock;
  let adapter: RedisOverviewStatsAdapter;

  beforeEach(async () => {
    redis = makeRedis();
    adapter = await createAdapter(redis);
  });

  describe('recordRequest', () => {
    it('mencatat request dan sample latency', async () => {
      const pipeline = makePipeline();
      redis.pipeline.mockReturnValue(pipeline);

      await adapter.recordRequest(45.4, false);

      expect(pipeline.incr).toHaveBeenCalledTimes(1);
      expect(pipeline.incr).toHaveBeenCalledWith(expect.stringContaining(STATS_REQUESTS_KEY));
      expect(pipeline.lpush).toHaveBeenCalledWith(STATS_LATENCY_SAMPLES_KEY, '45');
      expect(pipeline.ltrim).toHaveBeenCalledWith(
        STATS_LATENCY_SAMPLES_KEY,
        0,
        MAX_LATENCY_SAMPLES - 1,
      );
      expect(pipeline.exec).toHaveBeenCalledOnce();
    });

    it('mencatat error saat isError true', async () => {
      const pipeline = makePipeline();
      redis.pipeline.mockReturnValue(pipeline);

      await adapter.recordRequest(500, true);

      expect(pipeline.incr).toHaveBeenCalledTimes(2);
    });

    it('tidak melempar saat pipeline gagal', async () => {
      redis.pipeline.mockImplementation(() => {
        throw new Error('redis down');
      });
      await expect(adapter.recordRequest(45, false)).resolves.toBeUndefined();
    });
  });

  describe('getCounters24h', () => {
    it('mengembalikan nol saat tidak ada data', async () => {
      const result = await adapter.getCounters24h();
      expect(result).toEqual({
        requests24h: 0,
        requestsPrev24h: 0,
        errors24h: 0,
        errorsPrev24h: 0,
        latencyP95: 0,
        latencyP99: 0,
        latencyP95Prev: 0,
      });
    });

    it('menjumlahkan counter dari mget', async () => {
      redis.mget.mockResolvedValue(Array(200).fill('10'));
      const result = await adapter.getCounters24h();
      expect(result.requests24h).toBeGreaterThan(0);
    });

    it('mengabaikan nilai counter tidak valid', async () => {
      redis.mget.mockResolvedValue(['abc', null, '5']);
      const result = await adapter.getCounters24h();
      expect(result.requests24h).toBeGreaterThan(0);
    });

    it('menghitung persentil latency dari sample', async () => {
      redis.lrange.mockResolvedValue(Array.from({ length: 100 }, (_, index) => String(index + 1)));
      const result = await adapter.getCounters24h();
      expect(result.latencyP95).toBe(96);
      expect(result.latencyP99).toBe(100);
    });

    it('fallback nol saat redis gagal', async () => {
      redis.mget.mockRejectedValue(new Error('redis down'));
      redis.lrange.mockRejectedValue(new Error('redis down'));
      const result = await adapter.getCounters24h();
      expect(result.requests24h).toBe(0);
      expect(result.latencyP95).toBe(0);
    });
  });
});

describe('overview-bucket', () => {
  it('format bucket UTC', () => {
    expect(bucketFor(Date.UTC(2026, 8, 24, 5, 7))).toBe('2026-09-24-05-07');
  });

  it('bucket range per menit inklusif', () => {
    const buckets = bucketRange(Date.UTC(2026, 8, 24, 5, 0), Date.UTC(2026, 8, 24, 5, 2));
    expect(buckets).toEqual(['2026-09-24-05-00', '2026-09-24-05-01', '2026-09-24-05-02']);
  });

  it('persentil pada array kosong bernilai nol', () => {
    expect(percentile([], 0.95)).toBe(0);
  });
});
