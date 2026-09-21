import { Module } from '@nestjs/common';
import { ResolveTenantUseCase } from './application/resolve-tenant.usecase.js';

@Module({
  providers: [ResolveTenantUseCase],
  exports: [ResolveTenantUseCase],
})
export class TenantModule {}
