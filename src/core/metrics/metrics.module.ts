import { Module, type DynamicModule, type Provider, type Type } from '@nestjs/common';
import { RecordHttpMetricUseCase } from './application/record-http-metric.usecase.js';
import { METRICS_REGISTRY, type MetricsRegistryPort } from './domain/metrics-registry.port.js';

export interface MetricsModuleOptions {
  readonly registry: Type<MetricsRegistryPort>;
}

@Module({})
export class MetricsModule {
  static register(options: MetricsModuleOptions): DynamicModule {
    const providers: Provider[] = [
      options.registry,
      { provide: METRICS_REGISTRY, useExisting: options.registry },
      RecordHttpMetricUseCase,
    ];
    return {
      module: MetricsModule,
      providers,
      exports: [METRICS_REGISTRY, RecordHttpMetricUseCase],
    };
  }
}
