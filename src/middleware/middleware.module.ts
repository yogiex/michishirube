import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RequestIdMiddleware } from './request-id.middleware.js';
import { TenantContextMiddleware } from './tenant-context.middleware.js';

@Module({
  providers: [RequestIdMiddleware, TenantContextMiddleware],
  exports: [RequestIdMiddleware, TenantContextMiddleware],
})
export class MiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RequestIdMiddleware)
      .forRoutes('*')
      .apply(TenantContextMiddleware)
      .forRoutes('*');
  }
}
