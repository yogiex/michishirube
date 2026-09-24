import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from './config/config.module.js';
import { RedisModule } from './infrastructure/redis/redis.module.js';
import { LoggerModule } from './infrastructure/observability/logger.module.js';
import { ConfigRepositoryModule } from './infrastructure/config-repository/config-repository.module.js';
import { RbacInfrastructureModule } from './infrastructure/rbac/rbac-infrastructure.module.js';
import { RateLimitInfrastructureModule } from './infrastructure/rate-limit/rate-limit-infrastructure.module.js';
import { RedisCircuitBreakerAdapter } from './infrastructure/circuit-breaker/redis-circuit-breaker.adapter.js';
import { RedisApiKeyRepository } from './infrastructure/api-key/redis-api-key.repository.js';
import { Argon2ApiKeyHashService } from './infrastructure/api-key/argon2-api-key-hash.service.js';
import { RequestContextModule } from './shared/context/request-context.module.js';
import { TenantModule } from './core/tenant/tenant.module.js';
import { RbacModule } from './core/rbac/rbac.module.js';
import { RateLimitModule } from './core/rate-limit/rate-limit.module.js';
import { CircuitBreakerModule } from './core/circuit-breaker/circuit-breaker.module.js';
import { BulkheadModule } from './core/bulkhead/bulkhead.module.js';
import { ApiKeyModule } from './core/api-key/api-key.module.js';
import { IdempotencyModule } from './core/idempotency/idempotency.module.js';
import { RetryModule } from './core/retry/retry.module.js';
import { RateLimitGuard } from './guards/rate-limit.guard.js';
import { IdempotencyInterceptor } from './interceptors/idempotency.interceptor.js';
import { MiddlewareModule } from './middleware/middleware.module.js';
import { HealthModule } from './modules/health/health.module.js';
import { ProxyModule } from './modules/proxy/proxy.module.js';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    RedisModule,
    ConfigRepositoryModule,
    RbacInfrastructureModule,
    RateLimitInfrastructureModule,
    RequestContextModule,
    TenantModule,
    RbacModule,
    RateLimitModule,
    CircuitBreakerModule.register({ breaker: RedisCircuitBreakerAdapter }),
    BulkheadModule,
    IdempotencyModule,
    RetryModule,
    ApiKeyModule.register({
      repository: RedisApiKeyRepository,
      hashService: Argon2ApiKeyHashService,
    }),
    MiddlewareModule,
    HealthModule,
    ProxyModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: RateLimitGuard },
    { provide: APP_INTERCEPTOR, useClass: IdempotencyInterceptor },
  ],
})
export class AppModule {}
