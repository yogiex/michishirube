import { Module, type DynamicModule, type Provider, type Type } from '@nestjs/common';
import {
  BeginIdempotentRequestUseCase,
  IDEMPOTENCY_STORE,
} from './application/begin-idempotent-request.usecase.js';
import { CompleteIdempotentRequestUseCase } from './application/complete-idempotent-request.usecase.js';

export interface IdempotencyModuleOptions {
  readonly repository: Type<unknown>;
}

@Module({})
export class IdempotencyModule {
  static register(options: IdempotencyModuleOptions): DynamicModule {
    const providers: Provider[] = [
      options.repository,
      { provide: IDEMPOTENCY_STORE, useExisting: options.repository },
      BeginIdempotentRequestUseCase,
      CompleteIdempotentRequestUseCase,
    ];
    return {
      module: IdempotencyModule,
      providers,
      exports: [IDEMPOTENCY_STORE, BeginIdempotentRequestUseCase, CompleteIdempotentRequestUseCase],
    };
  }
}
