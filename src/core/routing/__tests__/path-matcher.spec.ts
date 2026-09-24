import { describe, it, expect } from 'vitest';
import { matchPath, isWildcardPattern } from '../domain/path-matcher.js';

describe('matchPath', () => {
  it('exact match', () => {
    const r = matchPath('/api/v1/orders', '/api/v1/orders');
    expect(r.matched).toBe(true);
    expect(r.params).toEqual({});
  });

  it('exact match with trailing slash', () => {
    expect(matchPath('/api/v1/orders/', '/api/v1/orders').matched).toBe(true);
    expect(matchPath('/api/v1/orders', '/api/v1/orders/').matched).toBe(true);
  });

  it('param match', () => {
    const r = matchPath('/api/v1/orders/:id', '/api/v1/orders/42');
    expect(r.matched).toBe(true);
    expect(r.params).toEqual({ id: '42' });
  });

  it('multi param', () => {
    const r = matchPath('/api/v1/:resource/:id', '/api/v1/orders/42');
    expect(r.matched).toBe(true);
    expect(r.params).toEqual({ resource: 'orders', id: '42' });
  });

  it('wildcard match', () => {
    const r = matchPath('/api/v1/legacy/*', '/api/v1/legacy/foo/bar/baz');
    expect(r.matched).toBe(true);
    expect(r.wildcard).toBe('/foo/bar/baz');
  });

  it('wildcard at root', () => {
    const r = matchPath('/api/v1/legacy/*', '/api/v1/legacy');
    expect(r.matched).toBe(true);
    expect(r.wildcard).toBe('/');
  });

  it('no match: length beda', () => {
    expect(matchPath('/api/v1/orders', '/api/v1/orders/42').matched).toBe(false);
  });

  it('no match: segment beda', () => {
    expect(matchPath('/api/v1/orders', '/api/v1/users').matched).toBe(false);
  });

  it('no match: param kosong', () => {
    expect(matchPath('/api/v1/orders/:id', '/api/v1/orders').matched).toBe(false);
  });

  describe('security', () => {
    it('reject path traversal ..', () => {
      expect(matchPath('/api/:id', '/api/..').matched).toBe(false);
    });

    it('reject path traversal .', () => {
      expect(matchPath('/api/:id', '/api/.').matched).toBe(false);
    });

    it('reject encoded slash', () => {
      expect(matchPath('/api/:id', '/api/foo%2fbar').matched).toBe(false);
    });

    it('reject encoded backslash', () => {
      expect(matchPath('/api/:id', '/api/foo%5cbar').matched).toBe(false);
    });

    it('reject null byte', () => {
      expect(matchPath('/api/:id', '/api/foo\0bar').matched).toBe(false);
    });

    it('reject segment terlalu panjang', () => {
      const long = 'a'.repeat(200);
      expect(matchPath('/api/:id', `/api/${long}`).matched).toBe(false);
    });

    it('limit jumlah segment', () => {
      const deep = '/api/' + Array(50).fill('x').join('/');
      const pattern = '/api/' + Array(50).fill(':p').join('/');
      expect(matchPath(pattern, deep).matched).toBe(true);
    });
  });
});

describe('isWildcardPattern', () => {
  it('true untuk wildcard di akhir', () => {
    expect(isWildcardPattern('/api/*')).toBe(true);
    expect(isWildcardPattern('/api/v1/*')).toBe(true);
  });

  it('false untuk non-wildcard', () => {
    expect(isWildcardPattern('/api/v1/orders')).toBe(false);
    expect(isWildcardPattern('/api/:id')).toBe(false);
  });
});
