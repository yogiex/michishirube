import { Inject, Injectable, Logger } from '@nestjs/common';
import { z } from 'zod';
import { ValidationFailedError } from '@/shared/errors/index.js';
import type { CircuitBreakerConfig } from '../domain/circuit-breaker-config.vo.js';
import type { CircuitState } from '../domain/circuit-state.entity.js';
import type { CircuitBreakerPort } from '../domain/circuit-breaker.port.js';
import { CIRCUIT_BREAKER, withCircuitStoreTimeout } from './circuit-store-timeout.js';

const CircuitKeySchema = z
  .string()
  .trim()
  .min(1)
  .max(200)
  .regex(/^[A-Za-z0-9._~-]+$/);

export interface RecordCircuitOutcomeInput {
  readonly circuitKey: string;
  readonly state: CircuitState;
  readonly config: CircuitBreakerConfig;
  readonly outcome: 'success' | 'failure';
}

export interface RecordCircuitOutcomeOutput {
  readonly state: CircuitState;
  readonly recorded: boolean;
}

@Injectable()
export class RecordCircuitOutcomeUseCase {
  private readonly logger = new Logger(RecordCircuitOutcomeUseCase.name);

  constructor(@Inject(CIRCUIT_BREAKER) private readonly breaker: CircuitBreakerPort) {}

  async execute(rawInput: RecordCircuitOutcomeInput): Promise<RecordCircuitOutcomeOutput> {
    const input = this.validateInput(rawInput);
    const previousState = input.state.status;
    const operation =
      input.outcome === 'success'
        ? this.breaker.recordSuccess(input.state, input.config)
        : this.breaker.recordFailure(input.state, Date.now(), input.config);

    try {
      const state = await withCircuitStoreTimeout(operation);
      if (state.status !== previousState) this.logTransition(input.circuitKey, state.status);
      return { state, recorded: true };
    } catch {
      this.logger.warn(
        { circuitKey: input.circuitKey, outcome: input.outcome },
        'Circuit outcome was not recorded',
      );
      return { state: input.state, recorded: false };
    }
  }

  private validateInput(rawInput: RecordCircuitOutcomeInput): RecordCircuitOutcomeInput {
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

  private logTransition(circuitKey: string, state: CircuitState['status']): void {
    this.logger.debug({ circuitKey, state }, 'Circuit state changed');
  }
}
