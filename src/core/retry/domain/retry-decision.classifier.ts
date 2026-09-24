import { randomInt } from 'node:crypto';
import type { RetryPolicy } from './retry-policy.vo.js';

export const RETRY_REJECTION_REASONS = [
  'method_not_idempotent',
  'status_not_retryable',
  'network_error_not_retryable',
  'attempts_exhausted',
  'budget_exhausted',
] as const;

export type RetryRejectionReason = (typeof RETRY_REJECTION_REASONS)[number];

export type RetryDecision =
  | {
      readonly kind: 'retry';
      readonly attempt: number;
      readonly delayMs: number;
    }
  | {
      readonly kind: 'reject';
      readonly reason: RetryRejectionReason;
    };

export interface RetryDecisionInput {
  readonly method: string;
  readonly completedAttempts: number;
  readonly policy: RetryPolicy;
  readonly outcome:
    | { readonly kind: 'status'; readonly statusCode: number }
    | { readonly kind: 'network_error'; readonly retryable: boolean }
    | { readonly kind: 'other' };
  readonly budgetAvailable: boolean;
}

export function calculateRetryDelayMs(policy: RetryPolicy, retryNumber: number): number {
  if (!Number.isSafeInteger(retryNumber) || retryNumber < 1 || retryNumber > policy.maxRetries) {
    throw new RangeError('Retry number di luar batas policy');
  }
  const exponentialDelay = Math.min(policy.maxDelayMs, policy.baseDelayMs * 2 ** (retryNumber - 1));
  if (policy.jitterMs === 0) return exponentialDelay;

  const jitter = randomInt(0, policy.jitterMs + 1);
  return Math.min(policy.maxDelayMs, exponentialDelay + jitter);
}

export function decideRetry(input: RetryDecisionInput): RetryDecision {
  if (!input.policy.allowsMethod(input.method)) {
    return { kind: 'reject', reason: 'method_not_idempotent' };
  }
  if (!isRetryableOutcome(input)) return { kind: 'reject', reason: rejectionReason(input.outcome) };
  if (input.completedAttempts >= input.policy.maxRetries) {
    return { kind: 'reject', reason: 'attempts_exhausted' };
  }
  if (!input.budgetAvailable) return { kind: 'reject', reason: 'budget_exhausted' };

  const attempt = input.completedAttempts + 1;
  return {
    kind: 'retry',
    attempt,
    delayMs: calculateRetryDelayMs(input.policy, attempt),
  };
}

function isRetryableOutcome(input: RetryDecisionInput): boolean {
  if (input.outcome.kind === 'status') return input.policy.allowsStatus(input.outcome.statusCode);
  if (input.outcome.kind === 'network_error') return input.outcome.retryable;
  return false;
}

function rejectionReason(outcome: RetryDecisionInput['outcome']): RetryRejectionReason {
  return outcome.kind === 'network_error' ? 'network_error_not_retryable' : 'status_not_retryable';
}
