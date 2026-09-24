import { InternalConfigError } from '@/shared/errors/index.js';

export interface CircuitBreakerConfig {
  readonly failureThreshold: number;
  readonly successThreshold: number;
  readonly resetTimeoutMs: number;
}

const MIN_THRESHOLD = 1;
const MAX_THRESHOLD = 1_000_000;
const MIN_TIMEOUT_MS = 1;
const MAX_TIMEOUT_MS = 86_400_000;

function isValidInteger(value: number, min: number, max: number): boolean {
  return Number.isSafeInteger(value) && value >= min && value <= max;
}

export function createCircuitBreakerConfig(
  failureThreshold: number,
  successThreshold: number,
  resetTimeoutMs: number,
): CircuitBreakerConfig {
  if (!isValidInteger(failureThreshold, MIN_THRESHOLD, MAX_THRESHOLD)) {
    throw new InternalConfigError(
      `Circuit breaker failureThreshold tidak valid: ${failureThreshold}`,
    );
  }
  if (!isValidInteger(successThreshold, MIN_THRESHOLD, MAX_THRESHOLD)) {
    throw new InternalConfigError(
      `Circuit breaker successThreshold tidak valid: ${successThreshold}`,
    );
  }
  if (!isValidInteger(resetTimeoutMs, MIN_TIMEOUT_MS, MAX_TIMEOUT_MS)) {
    throw new InternalConfigError(`Circuit breaker resetTimeoutMs tidak valid: ${resetTimeoutMs}`);
  }
  return { failureThreshold, successThreshold, resetTimeoutMs };
}
