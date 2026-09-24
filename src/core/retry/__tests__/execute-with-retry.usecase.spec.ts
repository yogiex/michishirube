import { describe, expect, it, vi } from 'vitest';
import { UpstreamRetryExhaustedError } from '@/shared/errors/index.js';
import { createRetryPolicy } from '../domain/retry-policy.vo.js';
import type { RetryBudgetPort } from '../domain/retry-budget.port.js';
import {
  ExecuteWithRetryUseCase,
  type RetryAttemptResult,
  type RetryInput,
} from '../application/execute-with-retry.usecase.js';

const policy = createRetryPolicy({
  maxRetries: 2,
  baseDelayMs: 1,
  maxDelayMs: 5,
  jitterMs: 0,
  retryableStatusCodes: [408, 429, 500, 502, 503, 504],
});

function input(
  operation: RetryInput<string>['operation'],
  overrides: Partial<RetryInput<string>> = {},
): RetryInput<string> {
  return {
    method: 'GET',
    policy,
    attemptTimeoutMs: 20,
    totalDeadlineMs: 200,
    backoff: 'fixed',
    failOpen: false,
    fallback: () => 'fallback',
    operation,
    ...overrides,
  };
}

describe('ExecuteWithRetryUseCase', () => {
  it('retries retryable failures up to the bounded attempt count', async () => {
    const operation = vi
      .fn<RetryInput<string>['operation']>()
      .mockResolvedValueOnce({ kind: 'failure', statusCode: 503 })
      .mockResolvedValueOnce({ kind: 'success', value: 'ok' });
    const result = await new ExecuteWithRetryUseCase().execute(input(operation));
    expect(result).toEqual({ kind: 'success', value: 'ok', attempts: 2 });
    expect(operation).toHaveBeenCalledTimes(2);
  });

  it('does not retry non-idempotent methods', async () => {
    const operation = vi
      .fn<RetryInput<string>['operation']>()
      .mockResolvedValue({ kind: 'failure', statusCode: 503 });
    await expect(
      new ExecuteWithRetryUseCase().execute(input(operation, { method: 'POST' })),
    ).rejects.toBeInstanceOf(UpstreamRetryExhaustedError);
    expect(operation).toHaveBeenCalledTimes(1);
  });

  it('does not retry non-retryable status codes', async () => {
    const operation = vi
      .fn<RetryInput<string>['operation']>()
      .mockResolvedValue({ kind: 'failure', statusCode: 400 });
    await expect(new ExecuteWithRetryUseCase().execute(input(operation))).rejects.toBeInstanceOf(
      UpstreamRetryExhaustedError,
    );
    expect(operation).toHaveBeenCalledTimes(1);
  });

  it('honors Retry-After instead of configured backoff', async () => {
    const operation = vi
      .fn<RetryInput<string>['operation']>()
      .mockResolvedValueOnce({ kind: 'failure', statusCode: 429, retryAfterMs: 2 })
      .mockResolvedValueOnce({ kind: 'success', value: 'ok' });
    const result = await new ExecuteWithRetryUseCase().execute(input(operation));
    expect(result.kind).toBe('success');
    expect(operation).toHaveBeenCalledTimes(2);
  });

  it('enforces the per-attempt abort timeout', async () => {
    const operation = vi.fn<RetryInput<string>['operation']>(
      () => new Promise<RetryAttemptResult<string>>(() => undefined),
    );
    await expect(
      new ExecuteWithRetryUseCase().execute(
        input(operation, { attemptTimeoutMs: 2, failOpen: true, fallback: () => 'fallback' }),
      ),
    ).resolves.toEqual({ kind: 'fail_open', value: 'fallback', attempts: 3 });
    expect(operation.mock.calls[0]?.[0].aborted).toBe(true);
  });

  it.each(['exponential', 'linear', 'fixed'] as const)('supports %s backoff', async (backoff) => {
    const operation = vi
      .fn<RetryInput<string>['operation']>()
      .mockResolvedValueOnce({ kind: 'failure', statusCode: 503 })
      .mockResolvedValue({ kind: 'success', value: 'ok' });
    const result = await new ExecuteWithRetryUseCase().execute(input(operation, { backoff }));
    expect(result.kind).toBe('success');
  });

  it('stops when the retry budget is exhausted', async () => {
    const operation = vi
      .fn<RetryInput<string>['operation']>()
      .mockResolvedValue({ kind: 'failure', statusCode: 503 });
    const budget: RetryBudgetPort = {
      tryAcquire: vi.fn().mockResolvedValue({
        kind: 'exhausted',
        snapshot: { key: 'orders', capacity: 10, consumed: 10, resetsAtMs: Date.now() + 1_000 },
      }),
      refund: vi.fn(),
      reset: vi.fn(),
    };
    const result = await new ExecuteWithRetryUseCase(budget).execute(
      input(operation, { budgetKey: 'orders', failOpen: true, fallback: () => 'fallback' }),
    );
    expect(result).toEqual({ kind: 'fail_open', value: 'fallback', attempts: 1 });
    expect(operation).toHaveBeenCalledTimes(1);
  });

  it('returns the fallback when the retry budget fails open', async () => {
    const operation = vi
      .fn<RetryInput<string>['operation']>()
      .mockResolvedValue({ kind: 'failure', statusCode: 503 });
    const result = await new ExecuteWithRetryUseCase().execute(
      input(operation, { failOpen: true, fallback: () => 'fallback' }),
    );
    expect(result).toEqual({ kind: 'fail_open', value: 'fallback', attempts: 3 });
  });
});
