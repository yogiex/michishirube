import { describe, it, expect } from 'vitest';
import {
  createTenantId,
  isValidTenantId,
  slugFromSubdomain,
  tenantIdToString,
} from '../domain/tenant-id.vo.js';

describe('TenantId VO', () => {
  it('menerima slug valid', () => {
    for (const v of ['t_001', 'acme', 'my-tenant-01', 'abc']) {
      expect(() => createTenantId(v)).not.toThrow();
    }
  });

  it('menolak slug invalid', () => {
    for (const v of ['', 'A', 'ab', '-abc', 'abc-', 'abc def', 'abc!@#', 'ACME', 'a'.repeat(65)]) {
      expect(isValidTenantId(v)).toBe(false);
      expect(() => createTenantId(v)).toThrow(/Invalid tenant id/);
    }
  });

  it('menolak input berbahaya', () => {
    for (const v of ["' OR 1=1--", '../etc/passwd', '<script>', 'a\u0000b', 'acme\n']) {
      expect(isValidTenantId(v)).toBe(false);
    }
  });

  it('tenantIdToString mengembalikan string', () => {
    expect(tenantIdToString(createTenantId('acme'))).toBe('acme');
  });

  it('slugFromSubdomain lowercase & trim', () => {
    expect(slugFromSubdomain('  ACME  ')).toBe('acme');
  });
});
