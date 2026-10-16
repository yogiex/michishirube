import { describe, expect, it } from 'vitest';
import { ErrorCode } from '@/shared/errors/index.js';
import {
  DEFAULT_CACHE_CONFIG,
  isCacheableMethod,
  isCacheableStatus,
  resolveCacheConfig,
  validateCacheConfig,
  type CacheConfig,
} from '../domain/cache-config.vo.js';

function withOverrides(overrides: Partial<CacheConfig>): CacheConfig {
  return { ...DEFAULT_CACHE_CONFIG, ...overrides };
}

describe('cache config', () => {
  it('accepts defaults and returns the same config', () => {
    expect(validateCacheConfig(DEFAULT_CACHE_CONFIG)).toBe(DEFAULT_CACHE_CONFIG);
    expect(resolveCacheConfig()).toEqual(DEFAULT_CACHE_CONFIG);
  });

  it('rejects invalid ttl, stale windows, body size, and vary count', () => {
    const invalid: Partial<CacheConfig>[] = [
      { ttlSec: 0 },
      { ttlSec: 3601 },
      { staleWhileRevalidateSec: -1 },
      { staleIfErrorSec: 3601 },
      { maxBodySize: 1023 },
      { maxBodySize: 10485761 },
      { varyHeaders: Array.from({ length: 11 }, (_, index) => `header-${index}`) },
    ];
    for (const overrides of invalid) {
      expect(() => validateCacheConfig(withOverrides(overrides))).toThrowError(
        expect.objectContaining({ code: ErrorCode.INTERNAL_CONFIG_ERROR }),
      );
    }
  });

  it('merges partial config with defaults', () => {
    expect(resolveCacheConfig({ ttlSec: 120, scope: 'tenant' })).toEqual(
      withOverrides({ ttlSec: 120, scope: 'tenant' }),
    );
  });
});

describe('cache predicates', () => {
  it.each([
    ['GET', true],
    ['get', true],
    ['HEAD', true],
    ['head', true],
    ['POST', false],
    ['', false],
  ])('classifies method %s as %s', (method, expected) => {
    expect(isCacheableMethod(method)).toBe(expected);
  });

  it.each([200, 203, 204, 206, 300, 301, 404, 405, 410, 414, 501])('allows status %s', (status) => {
    expect(isCacheableStatus(status)).toBe(true);
  });

  it.each([100, 201, 400, 500, 502])('rejects status %s', (status) => {
    expect(isCacheableStatus(status)).toBe(false);
  });
});
