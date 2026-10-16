import { Inject, Injectable, Logger } from '@nestjs/common';
import type { Redis } from 'ioredis';
import { z } from 'zod';
import type { CacheLookupResult, CachedResponse } from '@/core/cache/domain/cache-entry.entity.js';
import type {
  CacheStorePort,
  GetCacheInput,
  SaveCacheInput,
} from '@/core/cache/domain/cache-store.port.js';
import { REDIS_CLIENT } from '@/infrastructure/redis/redis.constants.js';
import {
  CACHE_STORE_KEY_PREFIX,
  MAX_ENTRY_SIZE,
  SCAN_DELETE_COUNT,
  SCAN_MAX_ITERATIONS,
} from './cache.constants.js';

const CachedResponseSchema = z.object({
  status: z.number(),
  headers: z.record(z.string(), z.string()),
  body: z.string(),
  createdAt: z.number(),
  expiresAt: z.number(),
  age: z.number().default(0),
  etag: z.string().optional(),
});

@Injectable()
export class RedisCacheAdapter implements CacheStorePort {
  private readonly logger = new Logger(RedisCacheAdapter.name);

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async get(input: GetCacheInput): Promise<CacheLookupResult> {
    try {
      const raw = await this.redis.get(input.key);
      if (!raw) return { kind: 'miss' };
      if (raw.length > MAX_ENTRY_SIZE) {
        this.logger.warn({ key: input.key, size: raw.length }, 'Cache entry terlalu besar');
        return { kind: 'miss' };
      }
      const entry = this.deserialize(raw);
      if (entry === null) return { kind: 'miss' };
      const now = Date.now();
      const stale = now > entry.expiresAt;
      if (stale && this.isBeyondStaleGrace(entry, input, now)) return { kind: 'miss' };
      return { kind: 'hit', entry, stale };
    } catch (cause) {
      this.logger.warn({ err: cause, key: input.key }, 'Cache get error');
      return { kind: 'error', reason: 'redis_error' };
    }
  }

  async save(input: SaveCacheInput): Promise<void> {
    const serialized = this.serialize(input.response);
    if (serialized.length > MAX_ENTRY_SIZE) {
      this.logger.debug(
        { key: input.key, size: serialized.length },
        'Cache entry dilewati karena besar',
      );
      return;
    }
    const staleSec = Math.max(input.config.staleWhileRevalidateSec, input.config.staleIfErrorSec);
    const ttlSec = input.config.ttlSec + staleSec;
    try {
      await this.redis.set(input.key, serialized, 'EX', ttlSec);
    } catch (cause) {
      this.logger.warn({ err: cause, key: input.key }, 'Cache save error');
      throw cause;
    }
  }

  async invalidate(key: string): Promise<void> {
    try {
      await this.redis.del(key);
    } catch (cause) {
      this.logger.warn({ err: cause, key }, 'Cache invalidate error');
    }
  }

  async invalidateByTenant(tenantId: string): Promise<number> {
    const safeTenantId = tenantId.replace(/[^A-Za-z0-9._-]/g, '_').slice(0, 100);
    return this.invalidateByPattern(`${CACHE_STORE_KEY_PREFIX}${safeTenantId}:*`);
  }

  async invalidateByPattern(pattern: string): Promise<number> {
    try {
      return await this.scanDelete(pattern);
    } catch (cause) {
      this.logger.warn({ err: cause, pattern }, 'Cache invalidate pattern error');
      return 0;
    }
  }

  private isBeyondStaleGrace(entry: CachedResponse, input: GetCacheInput, now: number): boolean {
    const staleMax =
      Math.max(input.config.staleWhileRevalidateSec, input.config.staleIfErrorSec) * 1000;
    return now > entry.expiresAt + staleMax;
  }

  private async scanDelete(pattern: string): Promise<number> {
    let cursor = '0';
    let deleted = 0;
    let iterations = 0;
    do {
      const [nextCursor, keys] = await this.redis.scan(
        cursor,
        'MATCH',
        pattern,
        'COUNT',
        SCAN_DELETE_COUNT,
      );
      cursor = nextCursor;
      if (keys.length > 0) deleted += await this.redis.del(...keys);
      iterations += 1;
    } while (cursor !== '0' && iterations < SCAN_MAX_ITERATIONS);
    return deleted;
  }

  private serialize(entry: CachedResponse): string {
    return JSON.stringify(entry);
  }

  private deserialize(raw: string): CachedResponse | null {
    try {
      const decoded: unknown = JSON.parse(raw);
      const parsed = CachedResponseSchema.safeParse(decoded);
      return parsed.success ? parsed.data : null;
    } catch {
      return null;
    }
  }
}
