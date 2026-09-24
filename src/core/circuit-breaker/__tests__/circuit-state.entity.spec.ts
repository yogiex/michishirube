import { describe, expect, it } from 'vitest';
import { createCircuitBreakerConfig } from '../domain/circuit-breaker-config.vo.js';
import {
  acquireCircuit,
  createClosedCircuitState,
  recordCircuitFailure,
  recordCircuitSuccess,
} from '../domain/circuit-state.entity.js';

const config = createCircuitBreakerConfig(2, 2, 1_000);

describe('CircuitState', () => {
  it('membuka circuit setelah failure threshold', () => {
    const firstFailure = recordCircuitFailure(createClosedCircuitState(), 100, config);
    expect(firstFailure).toEqual({ status: 'closed', failureCount: 1 });

    const secondFailure = recordCircuitFailure(firstFailure, 200, config);
    expect(secondFailure.status).toBe('open');
    expect(secondFailure.failureCount).toBe(2);
  });

  it('menolak request ketika circuit masih terbuka', () => {
    const state = recordCircuitFailure(createClosedCircuitState(), 100, {
      ...config,
      failureThreshold: 1,
    });
    expect(acquireCircuit(state, 1_099, config)).toEqual({
      kind: 'rejected',
      reason: 'circuit_open',
      retryAtMs: 1_100,
    });
  });

  it('masuk half-open setelah reset timeout', () => {
    const open = recordCircuitFailure(createClosedCircuitState(), 100, {
      ...config,
      failureThreshold: 1,
    });
    expect(acquireCircuit(open, 1_100, config)).toEqual({
      kind: 'allowed',
      state: { status: 'half_open', failureCount: 1, successCount: 0, inFlight: true },
    });
  });

  it('menolak probe paralel saat half-open', () => {
    const halfOpen = {
      status: 'half_open',
      failureCount: 1,
      successCount: 0,
      inFlight: true,
    } as const;
    expect(acquireCircuit(halfOpen, 1_100, config)).toEqual({
      kind: 'rejected',
      reason: 'half_open_in_flight',
      retryAtMs: 1_100,
    });
  });

  it('menutup circuit setelah success threshold', () => {
    const halfOpen = {
      status: 'half_open',
      failureCount: 1,
      successCount: 0,
      inFlight: true,
    } as const;
    const firstSuccess = recordCircuitSuccess(halfOpen, config);
    expect(firstSuccess).toEqual({
      status: 'half_open',
      failureCount: 1,
      successCount: 1,
      inFlight: false,
    });
    expect(recordCircuitSuccess(firstSuccess, config)).toEqual({
      status: 'closed',
      failureCount: 0,
    });
  });

  it('membuka kembali circuit saat probe half-open gagal', () => {
    const halfOpen = {
      status: 'half_open',
      failureCount: 1,
      successCount: 0,
      inFlight: true,
    } as const;
    expect(recordCircuitFailure(halfOpen, 1_200, config)).toEqual({
      status: 'open',
      failureCount: 2,
      openedAtMs: 1_200,
    });
  });

  it('reset failure count setelah sukses pada circuit closed', () => {
    const failed = recordCircuitFailure(createClosedCircuitState(), 100, config);
    expect(recordCircuitSuccess(failed, config)).toEqual({
      status: 'closed',
      failureCount: 0,
    });
  });
});
