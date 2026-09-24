import { InternalConfigError } from '@/shared/errors/index.js';

export const CIRCUIT_REJECTION_REASONS = ['circuit_open', 'half_open_in_flight'] as const;

export type CircuitRejectionReason = (typeof CIRCUIT_REJECTION_REASONS)[number];

export type CircuitBreakerResult =
  | {
      readonly kind: 'allowed';
      readonly state: import('./circuit-state.entity.js').CircuitState;
    }
  | {
      readonly kind: 'rejected';
      readonly reason: CircuitRejectionReason;
      readonly retryAtMs: number;
    };

export function rejectedCircuitResult(
  reason: CircuitRejectionReason,
  retryAtMs: number,
): CircuitBreakerResult {
  if (!Number.isSafeInteger(retryAtMs) || retryAtMs < 0) {
    throw new InternalConfigError('Circuit retryAtMs tidak valid');
  }
  return { kind: 'rejected', reason, retryAtMs };
}
