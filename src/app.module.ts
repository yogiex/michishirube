import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from './config/config.module.js';
import { RedisModule } from './infrastructure/redis/redis.module.js';
import { LoggerModule } from './infrastructure/observability/logger.module.js';
import { ConfigRepositoryModule } from './infrastructure/config-repository/config-repository.module.js';
import { RbacInfrastructureModule } from './infrastructure/rbac/rbac-infrastructure.module.js';
import { RateLimitInfrastructureModule } from './infrastructure/rate-limit/rate-limit-infrastructure.module.js';
import { RequestContextModule } from './shared/context/request-context.module.js';
import { TenantModule } from './core/tenant/tenant.module.js';
import { RbacModule } from './core/rbac/rbac.module.js';
import { RateLimitModule } from './core/rate-limit/rate-limit.module.js';
import { RateLimitGuard } from './guards/rate-limit.guard.js';
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
    MiddlewareModule,
    HealthModule,
    ProxyModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: RateLimitGuard }],
})
export class AppModule {}
