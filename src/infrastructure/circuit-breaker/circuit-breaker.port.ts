export const CIRCUIT_BREAKER = Symbol('CIRCUIT_BREAKER');

export type CircuitState = 'closed' | 'open' | 'half_open';
export type CircuitDecision = 'allow' | 'reject';

export interface CircuitBreakerCommand {
  readonly key: string;
  readonly failureThreshold: number;
  readonly resetTimeoutMs: number;
  readonly halfOpenMaxCalls?: number;
}

export interface CircuitDecisionResult {
  readonly decision: CircuitDecision;
  readonly state: CircuitState;
  readonly failureCount: number;
  readonly retryAfterMs: number;
  readonly available: boolean;
  readonly errorCode?: 'GW_CIRCUIT_OPEN' | 'GW_CIRCUIT_HALF_OPEN_REJECTED';
}

export interface CircuitBreakerPort {
  beforeRequest(command: CircuitBreakerCommand): Promise<CircuitDecisionResult>;
  recordSuccess(command: CircuitBreakerCommand): Promise<CircuitDecisionResult>;
  recordFailure(command: CircuitBreakerCommand): Promise<CircuitDecisionResult>;
}
