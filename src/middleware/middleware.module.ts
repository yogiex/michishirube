import { type MiddlewareConsumer, Module, type NestModule } from '@nestjs/common';
import { TenantModule } from '@/core/tenant/tenant.module.js';
import { RequestIdMiddleware } from './request-id.middleware.js';
import { TenantContextMiddleware } from './tenant-context.middleware.js';

@Module({
  imports: [TenantModule],
})
export class MiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
    consumer.apply(TenantContextMiddleware).exclude('health', 'health/*path').forRoutes('*');
  }
}
