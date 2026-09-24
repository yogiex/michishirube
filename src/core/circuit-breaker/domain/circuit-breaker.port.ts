import type { CircuitBreakerConfig } from './circuit-breaker-config.vo.js';
import type { CircuitBreakerResult } from './circuit-breaker-result.type.js';
import type { CircuitState } from './circuit-state.entity.js';

export interface CircuitBreakerPort {
  acquire(
    circuitKey: string,
    nowMs: number,
    config: CircuitBreakerConfig,
  ): Promise<CircuitBreakerResult>;
  recordSuccess(state: CircuitState, config: CircuitBreakerConfig): Promise<CircuitState>;
  recordFailure(
    state: CircuitState,
    nowMs: number,
    config?: CircuitBreakerConfig,
  ): Promise<CircuitState>;
  getState(circuitKey: string): Promise<CircuitState>;
}
