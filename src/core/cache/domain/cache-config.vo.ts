import { InternalConfigError } from '@/shared/errors/index.js';

export type CacheScope = 'public' | 'user' | 'tenant';

export interface CacheConfig {
  readonly ttlSec: number;
  readonly scope: CacheScope;
  readonly varyHeaders: readonly string[];
  readonly staleWhileRevalidateSec: number;
  readonly staleIfErrorSec: number;
  readonly maxBodySize: number;
  readonly skipIfLarger: boolean;
}

export const DEFAULT_CACHE_CONFIG: CacheConfig = {
  ttlSec: 60,
  scope: 'public',
  varyHeaders: [],
  staleWhileRevalidateSec: 0,
  staleIfErrorSec: 0,
  maxBodySize: 1048576,
  skipIfLarger: true,
};

function assertIntegerInRange(value: number, min: number, max: number, field: string): void {
  if (!Number.isSafeInteger(value) || value < min || value > max) {
    throw new InternalConfigError(`Konfigurasi cache ${field} tidak valid`);
  }
}

export function validateCacheConfig(config: CacheConfig): CacheConfig {
  assertIntegerInRange(config.ttlSec, 1, 3600, 'ttlSec');
  assertIntegerInRange(config.staleWhileRevalidateSec, 0, 3600, 'staleWhileRevalidateSec');
  assertIntegerInRange(config.staleIfErrorSec, 0, 3600, 'staleIfErrorSec');
  assertIntegerInRange(config.maxBodySize, 1024, 10485760, 'maxBodySize');
  if (config.varyHeaders.length > 10) {
    throw new InternalConfigError('Konfigurasi cache varyHeaders terlalu banyak');
  }
  return config;
}

export function resolveCacheConfig(partial: Partial<CacheConfig> = {}): CacheConfig {
  return validateCacheConfig({ ...DEFAULT_CACHE_CONFIG, ...partial });
}

export function isCacheableMethod(method: string): boolean {
  const normalized = method.toUpperCase();
  return normalized === 'GET' || normalized === 'HEAD';
}

export function isCacheableStatus(status: number): boolean {
  return new Set([200, 203, 204, 206, 300, 301, 404, 405, 410, 414, 501]).has(status);
}
