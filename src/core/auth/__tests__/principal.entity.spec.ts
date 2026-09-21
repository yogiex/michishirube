import { describe, it, expect } from 'vitest';
import { createPrincipal, hasAnyRole, hasRole, isExpired } from '../domain/principal.entity.js';
import { createRole, isValidRole, roleToString } from '../domain/role.vo.js';

const future = new Date(Date.now() + 3600_000);

describe('Role VO', () => {
  it('menerima role valid', () => {
    for (const v of ['admin', 'user', 'super_admin', 'read-only', 'a']) {
      expect(isValidRole(v)).toBe(true);
      expect(roleToString(createRole(v))).toBe(v);
    }
  });

  it('menolak role invalid', () => {
    for (const v of ['', 'Admin', '1abc', 'a b', 'admin;drop', 'a'.repeat(64)]) {
      expect(() => createRole(v)).toThrow(/Invalid role/);
    }
  });
});

describe('Principal entity', () => {
  it('membuat principal dengan default', () => {
    const p = createPrincipal({ userId: 'u_1', tenantId: 'acme', expiresAt: future });
    expect(p.kind).toBe('user');
    expect(p.roles).toEqual([]);
    expect(p.scopes).toEqual([]);
    expect(p.claims).toEqual({});
    expect(p.issuedAt).toBeUndefined();
  });

  it('deduplikasi roles & scopes', () => {
    const p = createPrincipal({
      userId: 'u_1',
      tenantId: 'acme',
      roles: ['admin', 'admin'],
      scopes: ['order:read', 'order:read'],
      expiresAt: future,
    });
    expect(p.roles).toHaveLength(1);
    expect(p.scopes).toHaveLength(1);
  });

  it('menolak role/scope invalid', () => {
    expect(() =>
      createPrincipal({ userId: 'u', tenantId: 't', roles: ['BAD'], expiresAt: future }),
    ).toThrow(/Invalid role/);
    expect(() =>
      createPrincipal({ userId: 'u', tenantId: 't', scopes: ['bad'], expiresAt: future }),
    ).toThrow(/Invalid permission/);
  });

  it('hasRole & hasAnyRole', () => {
    const p = createPrincipal({ userId: 'u', tenantId: 't', roles: ['user'], expiresAt: future });
    expect(hasRole(p, 'user')).toBe(true);
    expect(hasRole(p, 'admin')).toBe(false);
    expect(hasAnyRole(p, ['admin', 'user'])).toBe(true);
    expect(hasAnyRole(p, ['admin'])).toBe(false);
    expect(hasAnyRole(p, [])).toBe(true);
  });

  it('isExpired', () => {
    const p = createPrincipal({ userId: 'u', tenantId: 't', expiresAt: new Date(1000) });
    expect(isExpired(p, new Date(2000))).toBe(true);
    expect(isExpired(p, new Date(500))).toBe(false);
  });
});
