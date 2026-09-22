import { describe, it, expect } from 'vitest';
import { createQuota } from '../domain/quota.vo.js';
import { InternalConfigError } from '@/shared/errors/index.js';

describe('Quota VO', () => {
  it('menerima quota valid', () => {
    const q = createQuota(100, 60);
    expect(q.limit).toBe(100);
    expect(q.windowSec).toBe(60);
  });

  it('menolak limit 0', () => {
    expect(() => createQuota(0, 60)).toThrow(InternalConfigError);
  });

  it('menolak limit negatif', () => {
    expect(() => createQuota(-1, 60)).toThrow(InternalConfigError);
  });

  it('menolak limit pecahan', () => {
    expect(() => createQuota(1.5, 60)).toThrow(InternalConfigError);
  });

  it('menolak window 0', () => {
    expect(() => createQuota(100, 0)).toThrow(InternalConfigError);
  });

  it('menolak window > 1 jam', () => {
    expect(() => createQuota(100, 3601)).toThrow(InternalConfigError);
  });

  it('menolak limit > 1 juta', () => {
    expect(() => createQuota(1_000_001, 60)).toThrow(InternalConfigError);
  });
});
