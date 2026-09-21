import { describe, it, expect } from 'vitest';
import { brand, brandValidated, unbrand, type Brand } from '../branded.type.js';

type UserId = Brand<string, 'UserId'>;

describe('Branded types', () => {
  it('brand membuat branded value', () => {
    const id: UserId = brand<'UserId'>('u_123');
    expect(id).toBe('u_123');
  });

  it('unbrand mengembalikan string', () => {
    expect(unbrand(brand<'UserId'>('u_123'))).toBe('u_123');
  });

  it('brandValidated menerima value valid', () => {
    const id = brandValidated<'UserId'>('u_123', (v) => v.startsWith('u_'));
    expect(id).toBe('u_123');
  });

  it('brandValidated menolak value invalid', () => {
    expect(() => brandValidated<'UserId'>('t_123', (v) => v.startsWith('u_'), 'Bad id')).toThrow(
      /Bad id/,
    );
  });

  it('branded tetap primitive di runtime', () => {
    expect(typeof brand<'UserId'>('u_1')).toBe('string');
    expect(typeof brand<'Port', number>(8080)).toBe('number');
  });
});
