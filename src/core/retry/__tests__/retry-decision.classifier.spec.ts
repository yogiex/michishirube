import { describe, expect, it } from 'vitest';
import {
  calculateRetryDelayMs,
  decideRetry,
  type RetryDecisionInput,
} from '../domain/retry-decision.classifier.js';
import { createRetryPolicy } from '../domain/retry-policy.vo.js';

const policy = createRetryPolicy({
  maxRetries: 3,
  baseDelayMs: 100,
  maxDelayMs: 250,
  jitterMs: 0,
  retryableStatusCodes: [429, 500, 502, 503, 504],
});

const baseInput: RetryDecisionInput = {
  method: 'GET',
  completedAttempts: 0,
  policy,
  outcome: { kind: 'status', statusCode: 503 },
  budgetAvailable: true,
};

describe('retry decision classifier', () => {
  it('mengizinkan retry untuk status transient dan method idempotent', () => {
    expect(decideRetry(baseInput)).toEqual({ kind: 'retry', attempt: 1, delayMs: 100 });
  });

  it.each([
    { method: 'POST' },
    { completedAttempts: 3 },
    { budgetAvailable: false },
    { outcome: { kind: 'status' as const, statusCode: 400 } },
    { outcome: { kind: 'network_error' as const, retryable: false } },
    { outcome: { kind: 'other' as const } },
  ])('menolak retry untuk %s', (override) => {
    expect(decideRetry({ ...baseInput, ...override }).kind).toBe('reject');
  });

  it('menghitung exponential backoff dan membatasi maximum', () => {
    expect(calculateRetryDelayMs(policy, 2)).toBe(200);
    expect(calculateRetryDelayMs(policy, 3)).toBe(250);
  });

  it('membatasi jitter dan menghasilkan delay dalam batas policy', () => {
    const jitteredPolicy = createRetryPolicy({
      maxRetries: 3,
      baseDelayMs: 100,
      maxDelayMs: 150,
      jitterMs: 100,
      retryableStatusCodes: [503],
    });

    expect(calculateRetryDelayMs(jitteredPolicy, 1)).toBeGreaterThanOrEqual(100);
    expect(calculateRetryDelayMs(jitteredPolicy, 1)).toBeLessThanOrEqual(150);
  });

  it('menolak nomor retry di luar batas', () => {
    expect(() => calculateRetryDelayMs(policy, 0)).toThrow(RangeError);
    expect(() => calculateRetryDelayMs(policy, 4)).toThrow(RangeError);
  });
});
