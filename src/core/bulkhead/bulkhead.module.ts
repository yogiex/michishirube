import { Module, type DynamicModule, type Provider, type Type } from '@nestjs/common';
import {
  BULKHEAD,
  ExecuteWithBulkheadUseCase,
  type BulkheadPort,
} from './application/execute-with-bulkhead.usecase.js';

export interface BulkheadModuleOptions {
  readonly bulkhead: Type<BulkheadPort>;
}

@Module({})
export class BulkheadModule {
  static register(options: BulkheadModuleOptions): DynamicModule {
    const providers: Provider[] = [
      options.bulkhead,
      { provide: BULKHEAD, useExisting: options.bulkhead },
      ExecuteWithBulkheadUseCase,
    ];
    return {
      module: BulkheadModule,
      providers,
      exports: [BULKHEAD, ExecuteWithBulkheadUseCase],
    };
  }
}
