import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RedisSlidingWindowAdapter } from '../redis-sliding-window.adapter.js';
import type { Redis } from 'ioredis';

interface MockRedis {
  script: ReturnType<typeof vi.fn>;
  evalsha: ReturnType<typeof vi.fn>;
}

function makeRedis(): MockRedis {
  return {
    script: vi.fn().mockResolvedValue('sha-test'),
    evalsha: vi.fn(),
  };
}

describe('RedisSlidingWindowAdapter', () => {
  let redis: MockRedis;
  let adapter: RedisSlidingWindowAdapter;

  beforeEach(() => {
    redis = makeRedis();
    adapter = new RedisSlidingWindowAdapter(redis as unknown as Redis);
    (adapter as unknown as { scriptSha: string }).scriptSha = 'sha-test';
  });

  it('allowed saat masih di bawah limit', async () => {
    redis.evalsha.mockResolvedValue([1, 5, Date.now() + 60_000]);

    const result = await adapter.check({
      dimension: 'ip:1.2.3.4',
      quota: { limit: 10, windowSec: 60 },
    });

    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(5);
    expect(result.retryAfter).toBe(0);
  });

  it('denied saat limit tercapai', async () => {
    const future = Date.now() + 30_000;
    redis.evalsha.mockResolvedValue([0, 0, future]);

    const result = await adapter.check({
      dimension: 'ip:1.2.3.4',
      quota: { limit: 10, windowSec: 60 },
    });

    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
    expect(result.retryAfter).toBeGreaterThan(0);
  });

  it('fail-open jika Redis error', async () => {
    redis.evalsha.mockRejectedValue(new Error('redis down'));

    const result = await adapter.check({
      dimension: 'ip:1.2.3.4',
      quota: { limit: 10, windowSec: 60 },
    });

    expect(result.allowed).toBe(true);
  });

  it('checkMany short-circuit pada first deny', async () => {
    redis.evalsha
      .mockResolvedValueOnce([1, 5, Date.now() + 60_000])
      .mockResolvedValueOnce([0, 0, Date.now() + 60_000]);

    const result = await adapter.checkMany([
      { dimension: 'ip:1.2.3.4', quota: { limit: 10, windowSec: 60 } },
      { dimension: 'user:u_001', quota: { limit: 100, windowSec: 60 } },
      { dimension: 'tenant:acme', quota: { limit: 1000, windowSec: 60 } },
    ]);

    expect(result.allowed).toBe(false);
    expect(redis.evalsha).toHaveBeenCalledTimes(2);
  });

  it('checkMany allowed jika semua lolos', async () => {
    redis.evalsha.mockResolvedValue([1, 5, Date.now() + 60_000]);

    const result = await adapter.checkMany([
      { dimension: 'ip:1.2.3.4', quota: { limit: 10, windowSec: 60 } },
      { dimension: 'user:u_001', quota: { limit: 100, windowSec: 60 } },
    ]);

    expect(result.allowed).toBe(true);
  });
});
