import { Module } from '@nestjs/common';
import { MetricsAuthGuard } from './metrics-auth.guard.js';
import { MetricsController } from './metrics.controller.js';

@Module({
  controllers: [MetricsController],
  providers: [MetricsAuthGuard],
})
export class MetricsModule {}
