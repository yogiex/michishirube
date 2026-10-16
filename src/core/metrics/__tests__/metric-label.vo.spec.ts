import { describe, expect, it } from 'vitest';
import { CardinalityLimiter, normalizePath, sanitizeLabel } from '../domain/metric-label.vo.js';

describe('sanitizeLabel', () => {
  it.each(['order-svc', 'user_123', 'GET'])('accepts %s', (value) => {
    expect(sanitizeLabel(value)).toBe(value);
  });

  it.each(['abc\ndef', 'abc\rdef', 'abc\0def'])('rejects control characters', (value) => {
    expect(sanitizeLabel(value)).toBe('unknown');
  });

  it('limits label length', () => {
    expect(sanitizeLabel('a'.repeat(100))).toHaveLength(64);
  });

  it.each([null, undefined])('uses the fallback for %s', (value) => {
    expect(sanitizeLabel(value)).toBe('unknown');
  });

  it('uses a custom fallback', () => {
    expect(sanitizeLabel(null, 'route')).toBe('route');
  });

  it('trims whitespace', () => {
    expect(sanitizeLabel('  test  ')).toBe('test');
  });

  it('converts a number to a string', () => {
    expect(sanitizeLabel(123)).toBe('123');
  });

  it.each([true, {}])('uses the fallback for unsupported input %s', (value) => {
    expect(sanitizeLabel(value)).toBe('unknown');
  });
});

describe('normalizePath', () => {
  it('normalizes numeric segments', () => {
    expect(normalizePath('/api/v1/orders/123')).toBe('/api/v1/orders/:id');
  });

  it('normalizes UUID segments', () => {
    expect(normalizePath('/api/v1/orders/550e8400-e29b-41d4-a716-446655440000')).toBe(
      '/api/v1/orders/:uuid',
    );
  });

  it('normalizes ULID segments', () => {
    expect(normalizePath('/api/v1/orders/01ARZ3NDEKTSV4RRFFQ69G5FAV')).toBe('/api/v1/orders/:ulid');
  });

  it('normalizes hexadecimal segments', () => {
    expect(normalizePath('/api/v1/orders/abcdef1234567890')).toBe('/api/v1/orders/:hex');
  });

  it('preserves static paths', () => {
    expect(normalizePath('/api/v1/orders')).toBe('/api/v1/orders');
  });

  it('caps segment count', () => {
    expect(normalizePath('/api/v1/orders/123/users/456', 5)).toBe('/api/v1/orders/:id/users');
  });

  it('uses unknown for an empty path', () => {
    expect(normalizePath('')).toBe('unknown');
  });

  it.each([undefined, 123])('uses unknown for non-string input %s', (value) => {
    expect(normalizePath(value)).toBe('unknown');
  });
});

describe('CardinalityLimiter', () => {
  it('allows exactly the configured number of unique values', () => {
    const limiter = new CardinalityLimiter(2);

    expect(limiter.check('first')).toBe('first');
    expect(limiter.check('second')).toBe('second');
    expect(limiter.check('third')).toBe('__other__');
  });

  it('returns known values without increasing size', () => {
    const limiter = new CardinalityLimiter(2);

    limiter.check('first');
    limiter.check('second');
    limiter.check('first');

    expect(limiter.size).toBe(2);
  });

  it('clears known values on reset', () => {
    const limiter = new CardinalityLimiter(1);

    limiter.check('first');
    limiter.reset();

    expect(limiter.size).toBe(0);
    expect(limiter.check('second')).toBe('second');
  });
});
