import { Module } from '@nestjs/common';
import { OverviewModule } from '@/core/overview/overview.module.js';
import { AuditModule } from '@/core/audit/audit.module.js';
import { RedisOverviewStatsAdapter } from '@/infrastructure/overview/redis-overview-stats.adapter.js';
import { RedisCircuitInventoryAdapter } from '@/infrastructure/overview/redis-circuit-inventory.adapter.js';
import { RedisActivityFeedAdapter } from '@/infrastructure/overview/redis-activity-feed.adapter.js';
import { TenantOverviewAdapter } from '@/infrastructure/overview/tenant-overview.adapter.js';
import { RedisAuditRepository } from '@/infrastructure/redis/redis-audit.repository.js';
import { CacheAdminController } from './cache-admin.controller.js';
import { OverviewAdminController } from './overview-admin.controller.js';
import { AuditAdminController } from './audit-admin.controller.js';

@Module({
  imports: [
    OverviewModule.register({
      stats: RedisOverviewStatsAdapter,
      tenants: TenantOverviewAdapter,
      activity: RedisActivityFeedAdapter,
      circuits: RedisCircuitInventoryAdapter,
    }),
    AuditModule.register({ repository: RedisAuditRepository }),
  ],
  controllers: [OverviewAdminController, CacheAdminController, AuditAdminController],
})
export class AdminModule {}
