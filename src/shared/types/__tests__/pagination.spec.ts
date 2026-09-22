import { describe, it, expect } from 'vitest';
import { paginate } from '../pagination.type.js';

describe('paginate', () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it('halaman 1', () => {
    const r = paginate(items, { page: 1, limit: 3 });
    expect(r.items).toEqual([1, 2, 3]);
    expect(r.total).toBe(10);
    expect(r.totalPages).toBe(4);
    expect(r.hasNext).toBe(true);
    expect(r.hasPrev).toBe(false);
  });

  it('halaman 2', () => {
    const r = paginate(items, { page: 2, limit: 3 });
    expect(r.items).toEqual([4, 5, 6]);
    expect(r.hasNext).toBe(true);
    expect(r.hasPrev).toBe(true);
  });

  it('halaman terakhir', () => {
    const r = paginate(items, { page: 4, limit: 3 });
    expect(r.items).toEqual([10]);
    expect(r.hasNext).toBe(false);
    expect(r.hasPrev).toBe(true);
  });

  it('halaman di luar range', () => {
    const r = paginate(items, { page: 5, limit: 3 });
    expect(r.items).toEqual([]);
    expect(r.hasNext).toBe(false);
  });

  it('list kosong', () => {
    const r = paginate([], { page: 1, limit: 10 });
    expect(r.items).toEqual([]);
    expect(r.totalPages).toBe(0);
    expect(r.hasNext).toBe(false);
  });

  it('page/limit tidak valid dinormalisasi (boundary)', () => {
    const r = paginate(items, { page: 0, limit: -5 });
    expect(r.page).toBe(1);
    expect(r.limit).toBe(1);
    expect(r.items).toEqual([1]);
  });
});
