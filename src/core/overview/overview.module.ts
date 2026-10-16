import { Module, type DynamicModule, type Provider, type Type } from '@nestjs/common';
import { GetOverviewUseCase } from './application/get-overview.usecase.js';
import {
  ACTIVITY_FEED,
  CIRCUIT_OVERVIEW,
  OVERVIEW_STATS,
  TENANT_OVERVIEW,
  type ActivityFeedPort,
  type CircuitOverviewPort,
  type OverviewStatsPort,
  type TenantOverviewPort,
} from './domain/overview-stats.port.js';

export interface OverviewModuleOptions {
  readonly stats: Type<OverviewStatsPort>;
  readonly tenants: Type<TenantOverviewPort>;
  readonly activity: Type<ActivityFeedPort>;
  readonly circuits: Type<CircuitOverviewPort>;
}

@Module({})
export class OverviewModule {
  static register(options: OverviewModuleOptions): DynamicModule {
    const providers: Provider[] = [
      options.stats,
      { provide: OVERVIEW_STATS, useExisting: options.stats },
      options.tenants,
      { provide: TENANT_OVERVIEW, useExisting: options.tenants },
      options.activity,
      { provide: ACTIVITY_FEED, useExisting: options.activity },
      options.circuits,
      { provide: CIRCUIT_OVERVIEW, useExisting: options.circuits },
      GetOverviewUseCase,
    ];
    return {
      module: OverviewModule,
      providers,
      exports: [
        GetOverviewUseCase,
        OVERVIEW_STATS,
        TENANT_OVERVIEW,
        ACTIVITY_FEED,
        CIRCUIT_OVERVIEW,
      ],
    };
  }
}
