import { Global, Module, type OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setupTracing } from './otel.setup.js';
import { TracingInterceptor } from '../../../interceptors/tracing.interceptor.js';

class TracingBootstrap implements OnModuleInit {
  constructor(private readonly config: ConfigService) {}

  async onModuleInit(): Promise<void> {
    try {
      setupTracing({
        enabled: this.config.get<boolean>('tracing.enabled') ?? true,
        serviceName: this.config.get<string>('tracing.serviceName') ?? undefined,
        endpoint: this.config.get<string>('tracing.exporterEndpoint') ?? undefined,
      });
    } catch {
      // Tracing must never break gateway startup.
    }
  }
}

@Global()
@Module({
  providers: [TracingInterceptor, TracingBootstrap],
  exports: [TracingInterceptor],
})
export class TracingModule {}
