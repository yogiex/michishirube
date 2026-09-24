import { InternalConfigError } from '@/shared/errors/index.js';
import type { CircuitBreakerConfig } from './circuit-breaker-config.vo.js';
import { rejectedCircuitResult, type CircuitBreakerResult } from './circuit-breaker-result.type.js';

export interface ClosedCircuitState {
  readonly status: 'closed';
  readonly failureCount: number;
}

export interface OpenCircuitState {
  readonly status: 'open';
  readonly failureCount: number;
  readonly openedAtMs: number;
  readonly successCount?: number;
  readonly inFlight?: boolean;
}

export interface HalfOpenCircuitState {
  readonly status: 'half_open';
  readonly failureCount: number;
  readonly successCount: number;
  readonly inFlight: boolean;
}

export type CircuitState = ClosedCircuitState | OpenCircuitState | HalfOpenCircuitState;

export function createClosedCircuitState(): ClosedCircuitState {
  return { status: 'closed', failureCount: 0 };
}

function validateTimestamp(timestampMs: number): void {
  if (!Number.isSafeInteger(timestampMs) || timestampMs < 0) {
    throw new InternalConfigError('Circuit timestamp tidak valid');
  }
}

export function acquireCircuit(
  state: CircuitState,
  nowMs: number,
  config: CircuitBreakerConfig,
): CircuitBreakerResult {
  validateTimestamp(nowMs);
  switch (state.status) {
    case 'closed':
      return { kind: 'allowed', state };
    case 'open': {
      const retryAtMs = state.openedAtMs + config.resetTimeoutMs;
      if (nowMs < retryAtMs) {
        return rejectedCircuitResult('circuit_open', retryAtMs);
      }
      return {
        kind: 'allowed',
        state: {
          status: 'half_open',
          failureCount: state.failureCount,
          successCount: 0,
          inFlight: true,
        },
      };
    }
    case 'half_open':
      if (state.inFlight) {
        return rejectedCircuitResult('half_open_in_flight', nowMs);
      }
      return {
        kind: 'allowed',
        state: { ...state, inFlight: true },
      };
  }
}

export function recordCircuitSuccess(
  state: CircuitState,
  config: CircuitBreakerConfig,
): CircuitState {
  if (state.status === 'closed') {
    return createClosedCircuitState();
  }
  if (state.status === 'open') {
    return state;
  }
  const successCount = state.successCount + 1;
  if (successCount >= config.successThreshold) {
    return createClosedCircuitState();
  }
  return { ...state, successCount, inFlight: false };
}

export function recordCircuitFailure(
  state: CircuitState,
  nowMs: number,
  config?: CircuitBreakerConfig,
): CircuitState {
  validateTimestamp(nowMs);
  const failureCount = state.failureCount + 1;
  if (state.status === 'closed' && failureCount < (config?.failureThreshold ?? 1)) {
    return { status: 'closed', failureCount };
  }
  return { status: 'open', failureCount, openedAtMs: nowMs };
}
