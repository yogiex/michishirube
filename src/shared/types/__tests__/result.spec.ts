import { describe, it, expect } from 'vitest';
import {
  ok,
  err,
  isOk,
  isErr,
  unwrap,
  unwrapOr,
  mapResult,
  mapErr,
  flatMap,
} from '../result.type.js';

describe('Result', () => {
  describe('ok / err', () => {
    it('ok membungkus value', () => {
      const r = ok(42);
      expect(r.ok).toBe(true);
      expect(isOk(r) && r.value).toBe(42);
    });

    it('err membungkus error', () => {
      const r = err('NOT_FOUND');
      expect(r.ok).toBe(false);
      expect(isErr(r) && r.error).toBe('NOT_FOUND');
    });
  });

  describe('isOk / isErr', () => {
    it('isOk true untuk ok', () => {
      expect(isOk(ok(1))).toBe(true);
      expect(isOk(err('x'))).toBe(false);
    });

    it('isErr true untuk err', () => {
      expect(isErr(err('x'))).toBe(true);
      expect(isErr(ok(1))).toBe(false);
    });
  });

  describe('unwrap', () => {
    it('mengembalikan value jika ok', () => {
      expect(unwrap(ok(42))).toBe(42);
    });

    it('throw jika err', () => {
      expect(() => unwrap(err('boom'))).toThrow(/boom/);
    });
  });

  describe('unwrapOr', () => {
    it('mengembalikan value jika ok', () => {
      expect(unwrapOr(ok(42), 0)).toBe(42);
    });

    it('mengembalikan fallback jika err', () => {
      expect(unwrapOr(err('x'), 0)).toBe(0);
    });
  });

  describe('mapResult', () => {
    it('transform value jika ok', () => {
      const r = mapResult(ok(5), (v) => v * 2);
      expect(isOk(r) && r.value).toBe(10);
    });

    it('tidak transform jika err', () => {
      const r = mapResult(err('x'), (v: number) => v * 2);
      expect(isErr(r) && r.error).toBe('x');
    });
  });

  describe('mapErr', () => {
    it('transform error jika err', () => {
      const r = mapErr(err('x'), (e) => e.toUpperCase());
      expect(isErr(r) && r.error).toBe('X');
    });

    it('tidak transform jika ok', () => {
      const r = mapErr(ok(1), (e: string) => e.toUpperCase());
      expect(isOk(r) && r.value).toBe(1);
    });
  });

  describe('flatMap', () => {
    it('chain jika ok', () => {
      const r = flatMap(ok(5), (v) => ok(v * 2));
      expect(isOk(r) && r.value).toBe(10);
    });

    it('short-circuit jika err', () => {
      const r = flatMap(err('x'), (v: number) => ok(v * 2));
      expect(isErr(r) && r.error).toBe('x');
    });

    it('propagate err dari fn', () => {
      const r = flatMap(ok(5), () => err('inner'));
      expect(isErr(r) && r.error).toBe('inner');
    });
  });
});
