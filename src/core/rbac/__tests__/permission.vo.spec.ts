import { describe, it, expect } from 'vitest';
import {
  createPermission,
  hasAllPermissions,
  hasAnyPermission,
  isValidPermission,
  parsePermission,
  permissionMatches,
  permissionToString,
} from '../domain/permission.vo.js';

const p = createPermission;

describe('Permission VO', () => {
  it('menerima format valid', () => {
    for (const v of [
      'order:read',
      'order:write',
      'order:*',
      '*:read',
      '*:*',
      'user-profile:manage',
    ]) {
      expect(() => p(v)).not.toThrow();
    }
  });

  it('menolak format invalid', () => {
    for (const v of [
      '',
      'order',
      'order:',
      ':read',
      'order:execute',
      'Order:read',
      'order:read:x',
      `${'a'.repeat(64)}:read`,
    ]) {
      expect(isValidPermission(v)).toBe(false);
      expect(() => p(v)).toThrow(/Invalid permission/);
    }
  });

  it('menolak input berbahaya', () => {
    for (const v of [
      "' OR 1=1--:read",
      '../etc:read',
      '<script>:read',
      'order:read\n',
      'order\u0000:read',
    ]) {
      expect(isValidPermission(v)).toBe(false);
    }
  });

  it('permissionToString & parsePermission', () => {
    expect(permissionToString(p('order:read'))).toBe('order:read');
    expect(parsePermission(p('order:read'))).toEqual({ resource: 'order', action: 'read' });
  });
});

describe('permissionMatches', () => {
  it.each([
    ['order:read', 'order:read', true],
    ['*:read', 'order:read', true],
    ['order:*', 'order:read', true],
    ['*:*', 'order:write', true],
    ['user:read', 'order:read', false],
    ['order:read', 'order:write', false],
    ['order:read', 'order:*', false],
    ['order:read', '*:read', false],
  ])('%s cakup %s → %s', (granted, required, expected) => {
    expect(permissionMatches(p(granted), p(required))).toBe(expected);
  });
});

describe('hasAllPermissions', () => {
  it('true jika semua terpenuhi', () => {
    expect(
      hasAllPermissions([p('order:read'), p('order:write')], [p('order:read'), p('order:write')]),
    ).toBe(true);
  });

  it('true dengan wildcard', () => {
    expect(hasAllPermissions([p('order:*')], [p('order:read'), p('order:write')])).toBe(true);
  });

  it('false jika kurang', () => {
    expect(hasAllPermissions([p('order:read')], [p('order:read'), p('order:write')])).toBe(false);
  });

  it('true jika required kosong', () => {
    expect(hasAllPermissions([], [])).toBe(true);
  });
});

describe('hasAnyPermission', () => {
  it('true jika salah satu ada', () => {
    expect(hasAnyPermission([p('order:read')], [p('order:read'), p('order:write')])).toBe(true);
  });

  it('false jika tidak ada', () => {
    expect(hasAnyPermission([p('user:read')], [p('order:read'), p('order:write')])).toBe(false);
  });

  it('true jika required kosong', () => {
    expect(hasAnyPermission([], [])).toBe(true);
  });
});
