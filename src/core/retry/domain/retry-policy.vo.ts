import { InternalConfigError } from '@/shared/errors/index.js';

export const IDEMPOTENT_METHODS = ['GET', 'HEAD', 'OPTIONS'] as const;
export const RETRYABLE_STATUS_CODES = [408, 425, 429, 500, 502, 503, 504] as const;

export type IdempotentMethod = (typeof IDEMPOTENT_METHODS)[number];
export type RetryableStatusCode = (typeof RETRYABLE_STATUS_CODES)[number];

export interface RetryPolicyInput {
  readonly maxRetries: number;
  readonly baseDelayMs: number;
  readonly maxDelayMs: number;
  readonly jitterMs: number;
  readonly retryableStatusCodes: readonly number[];
}

const MAX_RETRIES = 10;
const MAX_DELAY_MS = 3_600_000;
const MAX_JITTER_MS = 3_600_000;

function isValidInteger(value: number, min: number, max: number): boolean {
  return Number.isSafeInteger(value) && value >= min && value <= max;
}

function validateStatusCodes(statusCodes: readonly number[]): void {
  if (statusCodes.length === 0 || new Set(statusCodes).size !== statusCodes.length) {
    throw new InternalConfigError('Retry policy harus memiliki status code unik');
  }
  if (statusCodes.some((statusCode) => !isValidInteger(statusCode, 100, 599))) {
    throw new InternalConfigError('Retry policy memiliki status code HTTP tidak valid');
  }
}

function isIdempotentMethod(method: string): method is IdempotentMethod {
  const normalizedMethod = method.toUpperCase();
  return IDEMPOTENT_METHODS.some((candidate) => candidate === normalizedMethod);
}

export class RetryPolicy {
  readonly maxRetries: number;
  readonly baseDelayMs: number;
  readonly maxDelayMs: number;
  readonly jitterMs: number;
  readonly retryableStatusCodes: ReadonlySet<number>;

  constructor(input: RetryPolicyInput) {
    if (!isValidInteger(input.maxRetries, 0, MAX_RETRIES)) {
      throw new InternalConfigError(`Retry maxRetries tidak valid: ${input.maxRetries}`);
    }
    if (!isValidInteger(input.baseDelayMs, 1, MAX_DELAY_MS)) {
      throw new InternalConfigError(`Retry baseDelayMs tidak valid: ${input.baseDelayMs}`);
    }
    if (!isValidInteger(input.maxDelayMs, input.baseDelayMs, MAX_DELAY_MS)) {
      throw new InternalConfigError(`Retry maxDelayMs tidak valid: ${input.maxDelayMs}`);
    }
    if (!isValidInteger(input.jitterMs, 0, MAX_JITTER_MS)) {
      throw new InternalConfigError(`Retry jitterMs tidak valid: ${input.jitterMs}`);
    }
    validateStatusCodes(input.retryableStatusCodes);

    this.maxRetries = input.maxRetries;
    this.baseDelayMs = input.baseDelayMs;
    this.maxDelayMs = input.maxDelayMs;
    this.jitterMs = input.jitterMs;
    this.retryableStatusCodes = Object.freeze(new Set(input.retryableStatusCodes));
    Object.freeze(this);
  }

  allowsMethod(method: string): method is IdempotentMethod {
    return isIdempotentMethod(method);
  }

  allowsStatus(statusCode: number): boolean {
    return this.retryableStatusCodes.has(statusCode);
  }
}

export function createRetryPolicy(input: RetryPolicyInput): RetryPolicy {
  return new RetryPolicy(input);
}
