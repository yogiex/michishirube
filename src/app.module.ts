import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module.js';
import { RedisModule } from './infrastructure/redis/redis.module.js';
import { LoggerModule } from './infrastructure/observability/logger.module.js';
import { MiddlewareModule } from './middleware/middleware.module.js';
import { HealthModule } from './modules/health/health.module.js';

@Module({
  imports: [ConfigModule, LoggerModule, RedisModule, MiddlewareModule, HealthModule],
})
export class AppModule {}
