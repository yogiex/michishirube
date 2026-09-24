import { describe, expect, it } from 'vitest';
import { InternalConfigError } from '@/shared/errors/index.js';
import {
  createRetryPolicy,
  RETRYABLE_STATUS_CODES,
  type RetryPolicyInput,
} from '../domain/retry-policy.vo.js';

const validInput: RetryPolicyInput = {
  maxRetries: 3,
  baseDelayMs: 100,
  maxDelayMs: 1_000,
  jitterMs: 50,
  retryableStatusCodes: RETRYABLE_STATUS_CODES,
};

describe('RetryPolicy', () => {
  it('membuat policy immutable dan memvalidasi konfigurasi', () => {
    const policy = createRetryPolicy(validInput);

    expect(policy.maxRetries).toBe(3);
    expect(policy.allowsMethod('get')).toBe(true);
    expect(policy.allowsStatus(503)).toBe(true);
    expect(Object.isFrozen(policy)).toBe(true);
    expect(Object.isFrozen(policy.retryableStatusCodes)).toBe(true);
  });

  it.each([-1, 1.5, 11, Number.MAX_SAFE_INTEGER])('menolak maxRetries %s', (maxRetries) => {
    expect(() => createRetryPolicy({ ...validInput, maxRetries })).toThrow(InternalConfigError);
  });

  it.each([
    { baseDelayMs: 0 },
    { baseDelayMs: -1 },
    { baseDelayMs: 1.5 },
    { maxDelayMs: 99 },
    { maxDelayMs: 3_600_001 },
    { jitterMs: -1 },
    { jitterMs: 1.5 },
  ])('menolak konfigurasi delay %s', (override) => {
    expect(() => createRetryPolicy({ ...validInput, ...override })).toThrow(InternalConfigError);
  });

  it('menolak daftar status kosong, duplikat, dan tidak valid', () => {
    expect(() => createRetryPolicy({ ...validInput, retryableStatusCodes: [] })).toThrow(
      InternalConfigError,
    );
    expect(() => createRetryPolicy({ ...validInput, retryableStatusCodes: [503, 503] })).toThrow(
      InternalConfigError,
    );
    expect(() => createRetryPolicy({ ...validInput, retryableStatusCodes: [99] })).toThrow(
      InternalConfigError,
    );
  });

  it('hanya mengizinkan method idempotent', () => {
    const policy = createRetryPolicy(validInput);

    expect(policy.allowsMethod('HEAD')).toBe(true);
    expect(policy.allowsMethod('OPTIONS')).toBe(true);
    expect(policy.allowsMethod('POST')).toBe(false);
  });
});
