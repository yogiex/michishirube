import { Inject, Injectable, Optional } from '@nestjs/common';
import { randomInt } from 'node:crypto';
import { InternalConfigError, UpstreamRetryExhaustedError } from '@/shared/errors/index.js';
import type { RetryPolicy } from '../domain/retry-policy.vo.js';
import type { RetryBudgetPort } from '../domain/retry-budget.port.js';

export const RETRY_BUDGET = 'RETRY_BUDGET';

export type RetryBackoffStrategy = 'exponential' | 'linear' | 'fixed';

export type RetryAttemptResult<T> =
  | { readonly kind: 'success'; readonly value: T }
  | {
      readonly kind: 'failure';
      readonly statusCode: number;
      readonly retryAfterMs?: number;
    };

export interface RetryInput<T> {
  readonly method: string;
  readonly policy: RetryPolicy;
  readonly attemptTimeoutMs: number;
  readonly totalDeadlineMs: number;
  readonly backoff: RetryBackoffStrategy;
  readonly failOpen: boolean;
  readonly fallback: () => T;
  readonly budgetKey?: string;
  readonly budgetTtlMs?: number;
  readonly budgetFailOpen?: boolean;
  readonly operation: (signal: AbortSignal, attempt: number) => Promise<RetryAttemptResult<T>>;
}

export type RetryOutput<T> =
  | { readonly kind: 'success'; readonly value: T; readonly attempts: number }
  | { readonly kind: 'fail_open'; readonly value: T; readonly attempts: number }
  | { readonly kind: 'failed'; readonly statusCode: number; readonly attempts: number };

@Injectable()
export class ExecuteWithRetryUseCase {
  constructor(@Optional() @Inject(RETRY_BUDGET) private readonly budget?: RetryBudgetPort) {}

  async execute<T>(input: RetryInput<T>): Promise<RetryOutput<T>> {
    this.validateInput(input);
    if (!input.policy.allowsMethod(input.method)) {
      return this.runWithoutRetry(input);
    }
    return this.runWithRetry(input);
  }

  private async runWithoutRetry<T>(input: RetryInput<T>): Promise<RetryOutput<T>> {
    const result = await this.runAttempt(input.operation, input.attemptTimeoutMs, 1);
    if (result.kind === 'success') {
      return { kind: 'success', value: result.value, attempts: 1 };
    }
    if (input.failOpen) return { kind: 'fail_open', value: input.fallback(), attempts: 1 };
    throw this.exhaustedError(result.statusCode, 1, input);
  }

  private async runWithRetry<T>(input: RetryInput<T>): Promise<RetryOutput<T>> {
    const startedAt = Date.now();
    const deadline = startedAt + input.totalDeadlineMs;
    let attempts = 0;
    let lastStatusCode = 0;

    while (attempts <= input.policy.maxRetries) {
      const remaining = deadline - Date.now();
      if (remaining <= 0) break;
      attempts += 1;
      const result = await this.runAttempt(
        input.operation,
        Math.min(input.attemptTimeoutMs, remaining),
        attempts,
      );
      if (result.kind === 'success') {
        return { kind: 'success', value: result.value, attempts };
      }
      lastStatusCode = result.statusCode;
      if (!input.policy.allowsStatus(result.statusCode) || attempts > input.policy.maxRetries)
        break;
      if (!(await this.acquireBudget(input))) break;
      const delay = this.delayFor(input, attempts, result.retryAfterMs);
      if (delay === null || Date.now() + delay >= deadline) break;
      await this.sleep(delay);
    }

    if (input.failOpen) return { kind: 'fail_open', value: input.fallback(), attempts };
    throw this.exhaustedError(lastStatusCode, attempts, input);
  }

  private async acquireBudget<T>(input: RetryInput<T>): Promise<boolean> {
    if (input.budgetKey === undefined || this.budget === undefined) return true;
    const ttlMs = input.budgetTtlMs ?? 60_000;
    if (!Number.isSafeInteger(ttlMs) || ttlMs <= 0 || ttlMs > 86_400_000) {
      throw new InternalConfigError('Retry budget ttlMs tidak valid');
    }
    const result = await this.budget.tryAcquire(input.budgetKey, Date.now(), ttlMs);
    return (
      result.kind !== 'exhausted' &&
      (result.kind !== 'unavailable' || (input.budgetFailOpen ?? true))
    );
  }

  private async runAttempt<T>(
    operation: RetryInput<T>['operation'],
    timeoutMs: number,
    attempt: number,
  ): Promise<RetryAttemptResult<T>> {
    const controller = new AbortController();
    const abortTimer = setTimeout(() => controller.abort(), timeoutMs);
    let timeoutTimer: ReturnType<typeof setTimeout> | undefined;
    const timeout = new Promise<RetryAttemptResult<T>>((resolve) => {
      timeoutTimer = setTimeout(() => resolve({ kind: 'failure', statusCode: 408 }), timeoutMs);
    });
    try {
      return await Promise.race([operation(controller.signal, attempt), timeout]);
    } finally {
      clearTimeout(abortTimer);
      if (timeoutTimer !== undefined) clearTimeout(timeoutTimer);
    }
  }

  private delayFor<T>(
    input: RetryInput<T>,
    retryNumber: number,
    retryAfterMs: number | undefined,
  ): number | null {
    if (retryAfterMs !== undefined) {
      if (!Number.isSafeInteger(retryAfterMs) || retryAfterMs < 0) {
        throw new InternalConfigError('Retry-After tidak valid');
      }
      return Math.min(retryAfterMs, input.policy.maxDelayMs);
    }
    const base = this.baseDelay(input, retryNumber);
    const capped = Math.min(base, input.policy.maxDelayMs);
    if (input.policy.jitterMs === 0) return capped;
    return capped + randomInt(input.policy.jitterMs + 1);
  }

  private baseDelay<T>(input: RetryInput<T>, retryNumber: number): number {
    if (input.backoff === 'fixed') return input.policy.baseDelayMs;
    if (input.backoff === 'linear') return input.policy.baseDelayMs * retryNumber;
    return input.policy.baseDelayMs * 2 ** (retryNumber - 1);
  }

  private exhaustedError<T>(
    statusCode: number,
    attempts: number,
    input: RetryInput<T>,
  ): UpstreamRetryExhaustedError {
    return new UpstreamRetryExhaustedError('Upstream retry habis', {
      meta: { statusCode, attempts, maxRetries: input.policy.maxRetries },
    });
  }

  private validateInput<T>(input: RetryInput<T>): void {
    if (!Number.isSafeInteger(input.attemptTimeoutMs) || input.attemptTimeoutMs <= 0) {
      throw new InternalConfigError('Retry attemptTimeoutMs tidak valid');
    }
    if (!Number.isSafeInteger(input.totalDeadlineMs) || input.totalDeadlineMs <= 0) {
      throw new InternalConfigError('Retry totalDeadlineMs tidak valid');
    }
  }

  private sleep(delayMs: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, delayMs));
  }
}
