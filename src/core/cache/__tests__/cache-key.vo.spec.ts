import { describe, expect, it } from 'vitest';
import { buildCacheKey, cacheKeyForLog, type CacheKeyInput } from '../domain/cache-key.vo.js';

const baseInput: CacheKeyInput = {
  tenantId: 'acme',
  method: 'GET',
  path: '/orders',
  query: '',
  isAuthenticated: false,
};

describe('buildCacheKey', () => {
  it('builds the documented key format', () => {
    expect(buildCacheKey(baseInput)).toMatch(/^cache:acme:anon:GET:[a-f0-9]{32}:0:0$/);
  });

  it('uses anonymous and user scopes', () => {
    const anonymous = buildCacheKey(baseInput);
    const user = buildCacheKey({ ...baseInput, isAuthenticated: true, userId: 'user-1' });
    expect(user).toContain(':u:user-1:');
    expect(user).not.toBe(anonymous);
  });

  it('isolates tenants, users, methods, and paths', () => {
    const values = [
      buildCacheKey(baseInput),
      buildCacheKey({ ...baseInput, tenantId: 'globex' }),
      buildCacheKey({ ...baseInput, method: 'HEAD' }),
      buildCacheKey({ ...baseInput, path: '/users' }),
    ];
    expect(new Set(values)).toHaveLength(4);
  });

  it('normalizes query order and drops sensitive parameters', () => {
    const first = buildCacheKey({ ...baseInput, query: '?a=1&token=secret&b=2' });
    const second = buildCacheKey({ ...baseInput, query: 'b=2&token=other&a=1' });
    expect(first).toBe(second);
    expect(first).not.toContain('token');
  });

  it('includes vary headers and hashes empty components to zero', () => {
    const key = buildCacheKey({ ...baseInput, varyHeaders: { Accept: 'json' } });
    const changed = buildCacheKey({ ...baseInput, varyHeaders: { accept: 'xml' } });
    expect(key).not.toBe(changed);
    expect(key).toMatch(/:[a-f0-9]{32}$/);
  });

  it('sanitizes unsafe tenant components', () => {
    const key = buildCacheKey({ ...baseInput, tenantId: 'acme;DROP' });
    expect(key).toContain('acme_DROP');
    expect(key).not.toContain(';');
  });
});

describe('cacheKeyForLog', () => {
  it('returns short keys unchanged and truncates long keys', () => {
    const short = 'a'.repeat(40);
    const long = 'b'.repeat(41);
    expect(cacheKeyForLog(short)).toBe(short);
    expect(cacheKeyForLog(long)).toBe(`${'b'.repeat(40)}...`);
  });
});
