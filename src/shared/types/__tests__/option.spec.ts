import { describe, it, expect } from 'vitest';
import {
  some,
  none,
  isSome,
  isNone,
  getOrElse,
  mapOption,
  flatMapOption,
  fromNullable,
  toResult,
} from '../option.type.js';
import { isOk, isErr } from '../result.type.js';

describe('Option', () => {
  it('some membungkus value', () => {
    const o = some(42);
    expect(o.some).toBe(true);
    expect(isSome(o) && o.value).toBe(42);
  });

  it('none kosong', () => {
    expect(none().some).toBe(false);
  });

  it('isSome / isNone bekerja', () => {
    expect(isSome(some(1))).toBe(true);
    expect(isSome(none())).toBe(false);
    expect(isNone(none())).toBe(true);
    expect(isNone(some(1))).toBe(false);
  });

  it('getOrElse ambil value atau fallback', () => {
    expect(getOrElse(some(42), 0)).toBe(42);
    expect(getOrElse(none(), 0)).toBe(0);
  });

  it('mapOption transform value', () => {
    const o = mapOption(some(5), (v) => v * 2);
    expect(isSome(o) && o.value).toBe(10);
  });

  it('mapOption tidak transform none', () => {
    expect(isNone(mapOption(none<number>(), (v) => v * 2))).toBe(true);
  });

  it('flatMapOption chain', () => {
    const o = flatMapOption(some(5), (v) => some(v * 2));
    expect(isSome(o) && o.value).toBe(10);
    expect(isNone(flatMapOption(none<number>(), (v) => some(v)))).toBe(true);
  });

  it('fromNullable', () => {
    expect(isSome(fromNullable('x'))).toBe(true);
    expect(isNone(fromNullable(null))).toBe(true);
    expect(isNone(fromNullable(undefined))).toBe(true);
    expect(isSome(fromNullable(0))).toBe(true);
  });

  it('toResult konversi some → ok', () => {
    const r = toResult(some(42), () => 'NOT_FOUND');
    expect(isOk(r) && r.value).toBe(42);
  });

  it('toResult konversi none → err', () => {
    const r = toResult(none(), () => 'NOT_FOUND');
    expect(isErr(r) && r.error).toBe('NOT_FOUND');
  });
});
