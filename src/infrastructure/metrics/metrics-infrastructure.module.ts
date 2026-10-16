import { Global, Module } from '@nestjs/common';
import { MetricsModule } from '@/core/metrics/metrics.module.js';
import { PrometheusRegistryAdapter } from './prometheus-registry.adapter.js';

@Global()
@Module({
  imports: [MetricsModule.register({ registry: PrometheusRegistryAdapter })],
  exports: [MetricsModule],
})
export class MetricsInfrastructureModule {}
