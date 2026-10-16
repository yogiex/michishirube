import { Global, Module } from '@nestjs/common';
import { CircuitBreakerModule } from '@/core/circuit-breaker/circuit-breaker.module.js';
import { RedisCircuitBreakerAdapter } from './redis-circuit-breaker.adapter.js';

@Global()
@Module({
  imports: [CircuitBreakerModule.register({ breaker: RedisCircuitBreakerAdapter })],
  exports: [CircuitBreakerModule],
})
export class CircuitBreakerInfrastructureModule {}
