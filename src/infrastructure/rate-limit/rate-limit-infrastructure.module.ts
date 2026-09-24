import { Global, Module } from '@nestjs/common';
import { RATE_LIMITER } from '@/core/rate-limit/domain/rate-limiter.port.js';
import { RedisSlidingWindowAdapter } from './redis-sliding-window.adapter.js';

@Global()
@Module({
  providers: [
    RedisSlidingWindowAdapter,
    { provide: RATE_LIMITER, useExisting: RedisSlidingWindowAdapter },
  ],
  exports: [RATE_LIMITER],
})
export class RateLimitInfrastructureModule {}
