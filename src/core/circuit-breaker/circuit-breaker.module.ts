import { Module, type DynamicModule, type Provider, type Type } from '@nestjs/common';
import { ExecuteWithCircuitBreakerUseCase } from './application/execute-with-circuit-breaker.usecase.js';
import { CIRCUIT_BREAKER } from './application/circuit-store-timeout.js';
import { RecordCircuitOutcomeUseCase } from './application/record-circuit-outcome.usecase.js';

export interface CircuitBreakerModuleOptions {
  readonly breaker: Type<unknown>;
}

@Module({})
export class CircuitBreakerModule {
  static register(options: CircuitBreakerModuleOptions): DynamicModule {
    const providers: Provider[] = [
      options.breaker,
      { provide: CIRCUIT_BREAKER, useExisting: options.breaker },
      RecordCircuitOutcomeUseCase,
      ExecuteWithCircuitBreakerUseCase,
    ];
    return {
      module: CircuitBreakerModule,
      providers,
      exports: [CIRCUIT_BREAKER, RecordCircuitOutcomeUseCase, ExecuteWithCircuitBreakerUseCase],
    };
  }
}
