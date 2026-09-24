import { Module, type DynamicModule, type Provider, type Type } from '@nestjs/common';
import { ExecuteWithRetryUseCase, RETRY_BUDGET } from './application/execute-with-retry.usecase.js';

export interface RetryModuleOptions {
  readonly budget: Type<unknown>;
}

@Module({
  providers: [ExecuteWithRetryUseCase],
  exports: [ExecuteWithRetryUseCase],
})
export class RetryModule {
  static register(options: RetryModuleOptions): DynamicModule {
    const providers: Provider[] = [
      options.budget,
      { provide: RETRY_BUDGET, useExisting: options.budget },
      ExecuteWithRetryUseCase,
    ];
    return {
      module: RetryModule,
      providers,
      exports: [RETRY_BUDGET, ExecuteWithRetryUseCase],
    };
  }

  static withoutBudget(): DynamicModule {
    return {
      module: RetryModule,
      providers: [ExecuteWithRetryUseCase],
      exports: [ExecuteWithRetryUseCase],
    };
  }
}
