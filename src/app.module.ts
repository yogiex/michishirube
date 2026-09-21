import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module.js';
import { RedisModule } from './infrastructure/redis/redis.module.js';
import { LoggerModule } from './infrastructure/observability/logger.module.js';
import { ConfigRepositoryModule } from './infrastructure/config-repository/config-repository.module.js';
import { RequestContextModule } from './shared/context/request-context.module.js';
import { TenantModule } from './core/tenant/tenant.module.js';
import { MiddlewareModule } from './middleware/middleware.module.js';
import { HealthModule } from './modules/health/health.module.js';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    RedisModule,
    ConfigRepositoryModule,
    RequestContextModule,
    TenantModule,
    MiddlewareModule,
    HealthModule,
  ],
})
export class AppModule {}
