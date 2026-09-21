import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module.js';
import { RedisModule } from './infrastructure/redis/redis.module.js';
import { LoggerModule } from './infrastructure/observability/logger.module.js';
import { ConfigRepositoryModule } from './infrastructure/config-repository/config-repository.module.js';
import { RbacInfrastructureModule } from './infrastructure/rbac/rbac-infrastructure.module.js';
import { RequestContextModule } from './shared/context/request-context.module.js';
import { TenantModule } from './core/tenant/tenant.module.js';
import { RbacModule } from './core/rbac/rbac.module.js';
import { MiddlewareModule } from './middleware/middleware.module.js';
import { HealthModule } from './modules/health/health.module.js';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    RedisModule,
    ConfigRepositoryModule,
    RbacInfrastructureModule,
    RequestContextModule,
    TenantModule,
    RbacModule,
    MiddlewareModule,
    HealthModule,
  ],
})
export class AppModule {}
