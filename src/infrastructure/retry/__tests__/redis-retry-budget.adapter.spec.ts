import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { RedisRetryBudgetClient } from '../redis-retry-budget.adapter.js';
import { RedisRetryBudgetAdapter } from '../redis-retry-budget.adapter.js';

const SHA = 'a'.repeat(40);

class MockRedis implements RedisRetryBudgetClient {
  readonly script = vi.fn<RedisRetryBudgetClient['script']>();
  readonly evalsha = vi.fn<RedisRetryBudgetClient['evalsha']>();

  constructor() {
    this.script.mockResolvedValue(SHA);
    this.evalsha.mockResolvedValue([1, '10', '1', '61000']);
  }
}

describe('RedisRetryBudgetAdapter', () => {
  let redis: MockRedis;
  let adapter: RedisRetryBudgetAdapter;

  beforeEach(async () => {
    redis = new MockRedis();
    adapter = new RedisRetryBudgetAdapter(redis);
    await adapter.onModuleInit();
  });

  it('loads Lua and acquires a token atomically', async () => {
    await expect(adapter.tryAcquire('orders:tenant-1', 1_000, 60_000)).resolves.toEqual({
      kind: 'acquired',
      snapshot: {
        key: 'orders:tenant-1',
        capacity: 10,
        consumed: 1,
        resetsAtMs: 61_000,
      },
    });
    expect(redis.evalsha).toHaveBeenCalledWith(
      SHA,
      1,
      'gateway:retry-budget:orders:tenant-1',
      'acquire',
      '1000',
      '60000',
      '10',
    );
  });

  it('returns exhausted when no token was consumed', async () => {
    redis.evalsha.mockResolvedValue([0, '10', '0', '61000']);
    await expect(adapter.tryAcquire('orders', 1_000, 60_000)).resolves.toMatchObject({
      kind: 'exhausted',
      snapshot: { consumed: 0 },
    });
  });

  it('refunds and resets with a bounded default window', async () => {
    await adapter.refund('orders', 2_000);
    await adapter.reset('orders', 3_000);

    expect(redis.evalsha).toHaveBeenNthCalledWith(
      1,
      SHA,
      1,
      'gateway:retry-budget:orders',
      'refund',
      '2000',
      '60000',
      '10',
    );
    expect(redis.evalsha).toHaveBeenNthCalledWith(
      2,
      SHA,
      1,
      'gateway:retry-budget:orders',
      'reset',
      '3000',
      '60000',
      '10',
    );
  });

  it.each(['', 'unsafe key', 'a'.repeat(161), 'line\nkey'])(
    'rejects an unsafe or unbounded key',
    async (key) => {
      await expect(adapter.tryAcquire(key, 1_000, 60_000)).rejects.toBeInstanceOf(TypeError);
      expect(redis.evalsha).not.toHaveBeenCalled();
    },
  );

  it.each([
    [-1, 60_000],
    [1.5, 60_000],
    [1_000, 0],
    [1_000, 86_400_001],
  ])('rejects invalid timing', async (nowMs, ttlMs) => {
    await expect(adapter.tryAcquire('orders', nowMs, ttlMs)).rejects.toBeInstanceOf(TypeError);
  });

  it.each([null, [1, '10', 'one', '61000'], [3, '10', '1', '61000']])(
    'fails open for an invalid script response',
    async (raw) => {
      redis.evalsha.mockResolvedValue(raw);
      await expect(adapter.tryAcquire('orders', 1_000, 60_000)).resolves.toEqual({
        kind: 'unavailable',
      });
    },
  );

  it('fails open when Redis throws', async () => {
    redis.evalsha.mockRejectedValue(new Error('redis unavailable'));
    await expect(adapter.tryAcquire('orders', 1_000, 60_000)).resolves.toEqual({
      kind: 'unavailable',
    });
  });

  it('fails open when script loading fails', async () => {
    redis.script.mockRejectedValue(new Error('redis unavailable'));
    const unavailableAdapter = new RedisRetryBudgetAdapter(redis);
    await unavailableAdapter.onModuleInit();
    await expect(unavailableAdapter.tryAcquire('orders', 1_000, 60_000)).resolves.toEqual({
      kind: 'unavailable',
    });
  });
});
