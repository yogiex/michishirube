import { describe, expect, it } from 'vitest';
import { InternalConfigError } from '@/shared/errors/index.js';
import { createCircuitBreakerConfig } from '../domain/circuit-breaker-config.vo.js';

describe('CircuitBreakerConfig VO', () => {
  it('menerima konfigurasi valid', () => {
    expect(createCircuitBreakerConfig(5, 2, 30_000)).toEqual({
      failureThreshold: 5,
      successThreshold: 2,
      resetTimeoutMs: 30_000,
    });
  });

  it.each([
    [0, 1, 1],
    [1.5, 1, 1],
    [1_000_001, 1, 1],
  ])('menolak failureThreshold %s', (failureThreshold) => {
    expect(() => createCircuitBreakerConfig(failureThreshold, 1, 1)).toThrow(InternalConfigError);
  });

  it('menolak successThreshold di luar batas', () => {
    expect(() => createCircuitBreakerConfig(1, 1_000_001, 1)).toThrow(InternalConfigError);
  });

  it.each([0, -1, 1.5, 86_400_001])('menolak resetTimeoutMs %s', (resetTimeoutMs) => {
    expect(() => createCircuitBreakerConfig(1, 1, resetTimeoutMs)).toThrow(InternalConfigError);
  });
});
