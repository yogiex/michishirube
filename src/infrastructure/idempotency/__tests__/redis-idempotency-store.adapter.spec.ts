import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ValidationFailedError } from '@/shared/errors/index.js';
import {
  buildIdempotencyRedisKey,
  createIdempotencyKey,
} from '@/core/idempotency/domain/idempotency-key.vo.js';
import { createTenantId } from '@/core/tenant/domain/tenant-id.vo.js';
import { IDEMPOTENCY_LUA } from '../idempotency.constants.js';
import type { RedisIdempotencyClient } from '../redis-idempotency-store.adapter.js';
import { RedisIdempotencyStoreAdapter } from '../redis-idempotency-store.adapter.js';

const SHA = 'a'.repeat(40);
const REDIS_KEY = buildIdempotencyRedisKey(
  createTenantId('tenant_1'),
  createIdempotencyKey('key-1'),
);

interface MockRedis extends RedisIdempotencyClient {
  script: ReturnType<typeof vi.fn<RedisIdempotencyClient['script']>>;
  get: ReturnType<typeof vi.fn<RedisIdempotencyClient['get']>>;
  evalsha: ReturnType<typeof vi.fn<RedisIdempotencyClient['evalsha']>>;
}

function createRedis(): MockRedis {
  return {
    script: vi.fn<RedisIdempotencyClient['script']>().mockResolvedValue(SHA),
    get: vi.fn<RedisIdempotencyClient['get']>(),
    evalsha: vi.fn<RedisIdempotencyClient['evalsha']>(),
  };
}

describe('RedisIdempotencyStoreAdapter', () => {
  let redis: MockRedis;
  let adapter: RedisIdempotencyStoreAdapter;

  beforeEach(async () => {
    redis = createRedis();
    adapter = new RedisIdempotencyStoreAdapter(redis);
    await adapter.onModuleInit();
  });

  it('loads and acquires atomically with bounded TTL', async () => {
    redis.evalsha.mockResolvedValue(['acquired']);
    const now = new Date('2026-01-01T00:00:00.000Z');

    await expect(
      adapter.acquire({
        redisKey: REDIS_KEY,
        tenantId: createTenantId('tenant_1'),
        key: createIdempotencyKey('key-1'),
        requestFingerprint: 'hash_1',
        now,
        ttlMs: 60_000,
      }),
    ).resolves.toEqual({ kind: 'acquired' });
    expect(redis.script).toHaveBeenCalledWith('LOAD', IDEMPOTENCY_LUA);
    expect(redis.evalsha).toHaveBeenCalledWith(
      SHA,
      1,
      'gateway:idempotency:tenant_1:key-1',
      'acquire',
      'hash_1',
      '60000',
      '2026-01-01T00:00:00.000Z',
      '2026-01-01T00:01:00.000Z',
      '{}',
    );
  });

  it('returns fail-closed results for concurrent and corrupt outcomes', async () => {
    redis.evalsha
      .mockResolvedValueOnce(['in_progress'])
      .mockResolvedValueOnce(['conflict'])
      .mockResolvedValueOnce(['invalid']);
    const command = {
      redisKey: REDIS_KEY,
      tenantId: createTenantId('tenant_1'),
      key: createIdempotencyKey('key-1'),
      requestFingerprint: 'hash_1',
      now: new Date(),
      ttlMs: 60_000,
    };

    await expect(adapter.acquire(command)).resolves.toEqual({ kind: 'in_progress' });
    await expect(adapter.acquire(command)).resolves.toEqual({ kind: 'conflict' });
    await expect(adapter.acquire(command)).resolves.toEqual({ kind: 'unavailable' });
  });

  it('gets and strictly validates a completed record', async () => {
    redis.get.mockResolvedValue(
      JSON.stringify({
        status: 'completed',
        fingerprint: 'hash_1',
        createdAt: '2026-01-01T00:00:00.000Z',
        expiresAt: '2026-01-02T00:00:00.000Z',
        response: { statusCode: 201, headers: { location: '/orders/1' }, body: '{"id":"1"}' },
      }),
    );

    await expect(adapter.get(REDIS_KEY)).resolves.toEqual(
      expect.objectContaining({
        kind: 'completed',
        record: expect.objectContaining({ requestFingerprint: 'hash_1' }),
      }),
    );
  });

  it('gets in-progress, missing, and invalid records fail closed', async () => {
    redis.get
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(
        JSON.stringify({
          status: 'in_progress',
          fingerprint: 'hash_1',
          createdAt: '2026-01-01T00:00:00.000Z',
          expiresAt: '2026-01-01T00:01:00.000Z',
        }),
      )
      .mockResolvedValueOnce('{');
    await expect(adapter.get(REDIS_KEY)).resolves.toEqual({ kind: 'not_found' });
    await expect(adapter.get(REDIS_KEY)).resolves.toEqual(
      expect.objectContaining({ kind: 'in_progress' }),
    );
    await expect(adapter.get(REDIS_KEY)).resolves.toEqual({ kind: 'unavailable' });
  });

  it('completes atomically and rejects invalid or oversized responses', async () => {
    redis.evalsha.mockResolvedValue(1);
    const response = { statusCode: 201, headers: { location: '/orders/1' }, body: '{"id":"1"}' };

    await expect(adapter.complete(REDIS_KEY, response)).resolves.toEqual({
      kind: 'ok',
      value: undefined,
    });
    await expect(
      adapter.complete(REDIS_KEY, { ...response, statusCode: 700 }),
    ).rejects.toBeInstanceOf(ValidationFailedError);
    await expect(
      adapter.complete(REDIS_KEY, { ...response, body: 'x'.repeat(1_048_577) }),
    ).rejects.toBeInstanceOf(ValidationFailedError);
  });

  it('releases atomically and fails closed on Redis errors', async () => {
    redis.evalsha.mockResolvedValueOnce(1).mockRejectedValueOnce(new Error('down'));
    await expect(adapter.release(REDIS_KEY)).resolves.toEqual({ kind: 'ok', value: undefined });
    await expect(adapter.release(REDIS_KEY)).resolves.toEqual({ kind: 'unavailable' });
  });

  it('rejects invalid commands before execution and fails closed when script loading fails', async () => {
    await expect(
      adapter.acquire({
        redisKey: REDIS_KEY,
        tenantId: createTenantId('tenant_1'),
        key: createIdempotencyKey('key-1'),
        requestFingerprint: 'bad hash',
        now: new Date(),
        ttlMs: 60_000,
      }),
    ).rejects.toBeInstanceOf(ValidationFailedError);
    await expect(
      adapter.acquire({
        redisKey: REDIS_KEY,
        tenantId: createTenantId('tenant_1'),
        key: createIdempotencyKey('key-1'),
        requestFingerprint: 'hash_1',
        now: new Date(),
        ttlMs: 86_400_001,
      }),
    ).rejects.toBeInstanceOf(ValidationFailedError);
    expect(redis.evalsha).not.toHaveBeenCalled();

    redis.script.mockRejectedValueOnce(new Error('down'));
    await expect(new RedisIdempotencyStoreAdapter(redis).onModuleInit()).rejects.toBeInstanceOf(
      ValidationFailedError,
    );
  });
});
