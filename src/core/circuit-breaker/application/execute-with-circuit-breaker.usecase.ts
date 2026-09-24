import { Inject, Injectable, Logger } from '@nestjs/common';
import { z } from 'zod';
import {
  CircuitHalfOpenRejectedError,
  CircuitOpenError,
  ValidationFailedError,
} from '@/shared/errors/index.js';
import type { CircuitBreakerConfig } from '../domain/circuit-breaker-config.vo.js';
import type { CircuitBreakerPort } from '../domain/circuit-breaker.port.js';
import { createClosedCircuitState, type CircuitState } from '../domain/circuit-state.entity.js';
import { CIRCUIT_BREAKER, withCircuitStoreTimeout } from './circuit-store-timeout.js';
import { RecordCircuitOutcomeUseCase } from './record-circuit-outcome.usecase.js';

const CircuitKeySchema = z
  .string()
  .trim()
  .min(1)
  .max(200)
  .regex(/^[A-Za-z0-9._~-]+$/);

export interface ExecuteWithCircuitBreakerInput<T> {
  readonly circuitKey: string;
  readonly config: CircuitBreakerConfig;
  readonly operation: () => Promise<T>;
}

@Injectable()
export class ExecuteWithCircuitBreakerUseCase {
  private readonly logger = new Logger(ExecuteWithCircuitBreakerUseCase.name);

  constructor(
    @Inject(CIRCUIT_BREAKER) private readonly breaker: CircuitBreakerPort,
    private readonly recordOutcome: RecordCircuitOutcomeUseCase,
  ) {}

  async execute<T>(rawInput: ExecuteWithCircuitBreakerInput<T>): Promise<T> {
    const input = this.validateInput(rawInput);
    const state = await this.acquire(input.circuitKey, input.config);

    try {
      const result = await input.operation();
      await this.recordOutcome.execute({
        circuitKey: input.circuitKey,
        state,
        config: input.config,
        outcome: 'success',
      });
      return result;
    } catch (error) {
      await this.recordOutcome.execute({
        circuitKey: input.circuitKey,
        state,
        config: input.config,
        outcome: 'failure',
      });
      throw error;
    }
  }

  private async acquire(circuitKey: string, config: CircuitBreakerConfig): Promise<CircuitState> {
    try {
      const result = await withCircuitStoreTimeout(
        this.breaker.acquire(circuitKey, Date.now(), config),
      );
      if (result.kind === 'rejected') {
        const retryAfter = Math.max(1, Math.ceil((result.retryAtMs - Date.now()) / 1_000));
        if (result.reason === 'half_open_in_flight') {
          throw new CircuitHalfOpenRejectedError('Circuit half-open sedang digunakan', {
            retryAfter,
            meta: { circuitKey },
          });
        }
        throw new CircuitOpenError('Circuit sedang terbuka', { retryAfter, meta: { circuitKey } });
      }
      this.logger.debug({ circuitKey, state: result.state.status }, 'Circuit request acquired');
      return result.state;
    } catch (error) {
      if (error instanceof CircuitOpenError || error instanceof CircuitHalfOpenRejectedError) {
        throw error;
      }
      this.logger.warn({ circuitKey }, 'Circuit store unavailable; request allowed');
      return createClosedCircuitState();
    }
  }

  private validateInput<T>(
    rawInput: ExecuteWithCircuitBreakerInput<T>,
  ): ExecuteWithCircuitBreakerInput<T> {
    const result = CircuitKeySchema.safeParse(rawInput.circuitKey);
    if (!result.success) {
      throw new ValidationFailedError('Circuit key tidak valid', {
        fieldErrors: result.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          code: issue.code,
          message: issue.message,
        })),
      });
    }
    return { ...rawInput, circuitKey: result.data };
  }
}
