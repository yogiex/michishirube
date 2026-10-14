import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from './config/config.module.js';
import { RedisModule } from './infrastructure/redis/redis.module.js';
import { LoggerModule } from './infrastructure/observability/logger.module.js';
import { ConfigRepositoryModule } from './infrastructure/config-repository/config-repository.module.js';
import { RbacInfrastructureModule } from './infrastructure/rbac/rbac-infrastructure.module.js';
import { RateLimitInfrastructureModule } from './infrastructure/rate-limit/rate-limit-infrastructure.module.js';
import { RedisApiKeyRepository } from './infrastructure/api-key/redis-api-key.repository.js';
import { Argon2ApiKeyHashService } from './infrastructure/api-key/argon2-api-key-hash.service.js';
import { RequestContextModule } from './shared/context/request-context.module.js';
import { TenantModule } from './core/tenant/tenant.module.js';
import { RbacModule } from './core/rbac/rbac.module.js';
import { RateLimitModule } from './core/rate-limit/rate-limit.module.js';
import { CircuitBreakerInfrastructureModule } from './infrastructure/circuit-breaker/circuit-breaker-infrastructure.module.js';
import { BulkheadInfrastructureModule } from './infrastructure/bulkhead/bulkhead-infrastructure.module.js';
import { ApiKeyModule } from './core/api-key/api-key.module.js';
import { IdempotencyModule } from './core/idempotency/idempotency.module.js';
import { RetryModule } from './core/retry/retry.module.js';
import { RateLimitGuard } from './guards/rate-limit.guard.js';
import { OverviewModule } from './core/overview/overview.module.js';
import { RedisOverviewStatsAdapter } from './infrastructure/overview/redis-overview-stats.adapter.js';
import { RedisCircuitInventoryAdapter } from './infrastructure/overview/redis-circuit-inventory.adapter.js';
import { RedisActivityFeedAdapter } from './infrastructure/overview/redis-activity-feed.adapter.js';
import { TenantOverviewAdapter } from './infrastructure/overview/tenant-overview.adapter.js';
import { RedisIdempotencyStoreAdapter } from './infrastructure/idempotency/redis-idempotency-store.adapter.js';
import { IdempotencyInterceptor } from './interceptors/idempotency.interceptor.js';
import { StatsInterceptor } from './interceptors/stats.interceptor.js';
import { CacheInterceptor } from './interceptors/cache.interceptor.js';
import { CacheInfrastructureModule } from './infrastructure/cache/cache-infrastructure.module.js';
import { MetricsInfrastructureModule } from './infrastructure/metrics/metrics-infrastructure.module.js';
import { MiddlewareModule } from './middleware/middleware.module.js';
import { HealthModule } from './modules/health/health.module.js';
import { ProxyModule } from './modules/proxy/proxy.module.js';
import { AdminModule } from './modules/admin/admin.module.js';
import { MetricsModule } from './modules/metrics/metrics.module.js';
import { MetricsInterceptor } from './interceptors/metrics.interceptor.js';
import { JwtInfrastructureModule } from './infrastructure/jwt/jwt-infrastructure.module.js';
import { AuthModule } from './core/auth/auth.module.js';
import { AuthGuard } from './guards/auth.guard.js';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    RedisModule,
    JwtInfrastructureModule,
    ConfigRepositoryModule,
    CacheInfrastructureModule,
    MetricsInfrastructureModule,
    RbacInfrastructureModule,
    RateLimitInfrastructureModule,
    RequestContextModule,
    TenantModule,
    AuthModule,
    RbacModule,
    RateLimitModule,
    CircuitBreakerInfrastructureModule,
    BulkheadInfrastructureModule,
    IdempotencyModule.register({ repository: RedisIdempotencyStoreAdapter }),
    RetryModule,
    ApiKeyModule.register({
      repository: RedisApiKeyRepository,
      hashService: Argon2ApiKeyHashService,
    }),
    MiddlewareModule,
    HealthModule,
    ProxyModule,
    OverviewModule.register({
      stats: RedisOverviewStatsAdapter,
      tenants: TenantOverviewAdapter,
      activity: RedisActivityFeedAdapter,
      circuits: RedisCircuitInventoryAdapter,
    }),
    AdminModule,
    MetricsModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RateLimitGuard },
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
    { provide: APP_INTERCEPTOR, useClass: MetricsInterceptor },
    { provide: APP_INTERCEPTOR, useClass: IdempotencyInterceptor },
    { provide: APP_INTERCEPTOR, useClass: StatsInterceptor },
  ],
})
export class AppModule {}
