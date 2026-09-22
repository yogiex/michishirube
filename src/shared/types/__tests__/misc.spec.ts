import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { jsonCodec } from '../codec.port.js';
import { toSnapshot } from '../entity.type.js';

describe('jsonCodec', () => {
  const codec = jsonCodec((v) => z.object({ id: z.string() }).parse(v));

  it('encode/decode roundtrip', () => {
    expect(codec.decode(codec.encode({ id: 'a' }))).toEqual({ id: 'a' });
  });

  it('decode menolak payload invalid', () => {
    expect(() => codec.decode('{"id":1}')).toThrow();
    expect(() => codec.decode('not json')).toThrow();
  });
});

describe('toSnapshot', () => {
  it('konversi Date ke ISO', () => {
    const d = new Date('2026-01-01T00:00:00.000Z');
    expect(toSnapshot({ id: 'x', createdAt: d, updatedAt: d })).toEqual({
      id: 'x',
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    });
  });
});
