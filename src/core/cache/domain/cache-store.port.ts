import type { CacheConfig } from './cache-config.vo.js';
import type { CacheLookupResult, CachedResponse } from './cache-entry.entity.js';

export const CACHE_STORE = Symbol('CACHE_STORE');

export interface GetCacheInput {
  readonly key: string;
  readonly config: CacheConfig;
}

export interface SaveCacheInput {
  readonly key: string;
  readonly config: CacheConfig;
  readonly response: CachedResponse;
}

export interface CacheStorePort {
  get(input: GetCacheInput): Promise<CacheLookupResult>;
  save(input: SaveCacheInput): Promise<void>;
  invalidate(key: string): Promise<void>;
  invalidateByTenant(tenantId: string): Promise<number>;
  invalidateByPattern(pattern: string): Promise<number>;
}
