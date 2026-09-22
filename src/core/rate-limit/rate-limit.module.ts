import { Module } from '@nestjs/common';
import { CheckQuotaUseCase } from './application/check-quota.usecase.js';

@Module({
  providers: [CheckQuotaUseCase],
  exports: [CheckQuotaUseCase],
})
export class RateLimitModule {}
