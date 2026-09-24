import { describe, expect, it } from 'vitest';
import { createCircuitBreakerConfig } from '../domain/circuit-breaker-config.vo.js';
import type { CircuitBreakerPort } from '../domain/circuit-breaker.port.js';
import { createClosedCircuitState } from '../domain/circuit-state.entity.js';

describe('CircuitBreakerPort', () => {
  it('mendefinisikan operasi state breaker', async () => {
    const operations: readonly (keyof CircuitBreakerPort)[] = [
      'acquire',
      'recordSuccess',
      'recordFailure',
      'getState',
    ];
    const port: Pick<CircuitBreakerPort, (typeof operations)[number]> = {
      acquire: async () => ({ kind: 'allowed', state: createClosedCircuitState() }),
      recordSuccess: async (state) => state,
      recordFailure: async (state) => state,
      getState: async () => createClosedCircuitState(),
    };
    const config = createCircuitBreakerConfig(1, 1, 1_000);

    expect(Object.keys(port)).toEqual(operations);
    expect((await port.acquire('orders', 0, config)).kind).toBe('allowed');
  });
});
