import { describe, expect, it, vi } from 'vitest';
import { CircuitOpenError, ValidationFailedError } from '@/shared/errors/index.js';
import { createCircuitBreakerConfig } from '../domain/circuit-breaker-config.vo.js';
import type { CircuitBreakerPort } from '../domain/circuit-breaker.port.js';
import { createClosedCircuitState, type CircuitState } from '../domain/circuit-state.entity.js';
import { ExecuteWithCircuitBreakerUseCase } from '../application/execute-with-circuit-breaker.usecase.js';
import { RecordCircuitOutcomeUseCase } from '../application/record-circuit-outcome.usecase.js';

const config = createCircuitBreakerConfig(2, 1, 1_000);

function createPort(overrides: Partial<CircuitBreakerPort> = {}): CircuitBreakerPort {
  const closed = createClosedCircuitState();
  return {
    acquire: vi.fn().mockResolvedValue({ kind: 'allowed', state: closed }),
    recordSuccess: vi.fn().mockResolvedValue(closed),
    recordFailure: vi.fn().mockResolvedValue(closed),
    getState: vi.fn().mockResolvedValue(closed),
    ...overrides,
  };
}

function createUseCases(port: CircuitBreakerPort): {
  readonly execute: ExecuteWithCircuitBreakerUseCase;
  readonly record: RecordCircuitOutcomeUseCase;
} {
  const record = new RecordCircuitOutcomeUseCase(port);
  return { execute: new ExecuteWithCircuitBreakerUseCase(port, record), record };
}

describe('circuit breaker application', () => {
  it('executes and records success', async () => {
    const port = createPort();
    const { execute } = createUseCases(port);

    await expect(
      execute.execute({ circuitKey: 'orders', config, operation: async () => 'ok' }),
    ).resolves.toBe('ok');
    expect(port.recordSuccess).toHaveBeenCalledOnce();
  });

  it('records failure without replacing the operation error', async () => {
    const operationError = new Error('upstream failed');
    const port = createPort();
    const { execute } = createUseCases(port);

    await expect(
      execute.execute({
        circuitKey: 'orders',
        config,
        operation: async () => {
          throw operationError;
        },
      }),
    ).rejects.toBe(operationError);
    expect(port.recordFailure).toHaveBeenCalledOnce();
  });

  it('fails open when acquiring state times out or the store fails', async () => {
    vi.useFakeTimers();
    try {
      const port = createPort({
        acquire: vi.fn().mockReturnValue(new Promise<CircuitState>(() => undefined)),
      });
      const { execute } = createUseCases(port);
      const result = execute.execute({ circuitKey: 'orders', config, operation: async () => 'ok' });
      await vi.advanceTimersByTimeAsync(50);
      await expect(result).resolves.toBe('ok');

      const failing = createPort({
        acquire: vi.fn().mockRejectedValue(new Error('redis unavailable')),
      });
      const failOpen = createUseCases(failing);
      await expect(
        failOpen.execute.execute({ circuitKey: 'orders', config, operation: async () => 'ok' }),
      ).resolves.toBe('ok');
    } finally {
      vi.useRealTimers();
    }
  });

  it('rejects an open circuit with the standard domain error', async () => {
    const port = createPort({
      acquire: vi.fn().mockResolvedValue({
        kind: 'rejected',
        reason: 'circuit_open',
        retryAtMs: Date.now() + 1_000,
      }),
    });
    const { execute } = createUseCases(port);

    await expect(
      execute.execute({ circuitKey: 'orders', config, operation: async () => 'ok' }),
    ).rejects.toBeInstanceOf(CircuitOpenError);
  });

  it('keeps the original outcome when recording fails or times out', async () => {
    vi.useFakeTimers();
    try {
      const state: CircuitState = { status: 'closed', failureCount: 1 };
      const port = createPort({
        recordSuccess: vi.fn().mockReturnValue(new Promise<CircuitState>(() => undefined)),
      });
      const { record } = createUseCases(port);
      const result = record.execute({ circuitKey: 'orders', state, config, outcome: 'success' });
      await vi.advanceTimersByTimeAsync(50);
      await expect(result).resolves.toEqual({ state, recorded: false });
    } finally {
      vi.useRealTimers();
    }
  });

  it('returns the updated state after recording success', async () => {
    const previous: CircuitState = {
      status: 'half_open',
      failureCount: 2,
      successCount: 0,
      inFlight: true,
    };
    const next: CircuitState = createClosedCircuitState();
    const port = createPort({ recordSuccess: vi.fn().mockResolvedValue(next) });
    const { record } = createUseCases(port);

    await expect(
      record.execute({ circuitKey: 'orders', state: previous, config, outcome: 'success' }),
    ).resolves.toEqual({ state: next, recorded: true });
  });

  it('validates circuit keys before store access', async () => {
    const port = createPort();
    const { execute } = createUseCases(port);

    await expect(
      execute.execute({ circuitKey: 'orders?token=secret', config, operation: async () => 'ok' }),
    ).rejects.toBeInstanceOf(ValidationFailedError);
    expect(port.acquire).not.toHaveBeenCalled();
  });
});
