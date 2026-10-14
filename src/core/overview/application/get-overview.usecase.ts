import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  ACTIVITY_FEED,
  ACTIVITY_FEED_MAX_ITEMS,
  CIRCUIT_OVERVIEW,
  OVERVIEW_STATS,
  TENANT_OVERVIEW,
  type ActivityFeedPort,
  type CircuitOverviewPort,
  type OverviewStatsPort,
  type TenantOverviewPort,
} from '../domain/overview-stats.port.js';
import {
  emptyRawCounters,
  type CircuitEntry,
  type Overview,
  type RawCounters,
  type TenantsStats,
} from '../domain/overview.entity.js';
import {
  computeCircuits,
  computeErrors,
  computeLatency,
  computeRequests,
  computeServiceHealth,
} from './overview-mapper.js';

const CACHE_TTL_MS = 5_000;

interface CachedOverview {
  readonly overview: Overview;
  readonly expiresAt: number;
}

@Injectable()
export class GetOverviewUseCase {
  private readonly logger = new Logger(GetOverviewUseCase.name);
  private cache: CachedOverview | undefined;

  constructor(
    @Inject(OVERVIEW_STATS) private readonly stats: OverviewStatsPort,
    @Inject(TENANT_OVERVIEW) private readonly tenants: TenantOverviewPort,
    @Inject(ACTIVITY_FEED) private readonly activity: ActivityFeedPort,
    @Inject(CIRCUIT_OVERVIEW) private readonly circuits: CircuitOverviewPort,
  ) {}

  async execute(): Promise<Overview> {
    const cached = this.cache;
    if (cached !== undefined && cached.expiresAt > Date.now()) return cached.overview;

    const [counters, tenants, recentActivity, circuits] = await Promise.all([
      this.resolve(this.stats.getCounters24h(), emptyRawCounters, 'counters'),
      this.resolve(this.tenants.getTenantStats(), emptyTenants, 'tenants'),
      this.resolve(
        this.activity.listRecentActivity(ACTIVITY_FEED_MAX_ITEMS),
        emptyActivity,
        'activity',
      ),
      this.resolve(this.circuits.listCircuits(), emptyCircuits, 'circuits'),
    ]);

    const overview: Overview = {
      requests: computeRequests(counters),
      errors: computeErrors(counters),
      latency: computeLatency(counters),
      tenants,
      circuits: computeCircuits(circuits),
      services: computeServiceHealth(circuits),
      recentActivity,
      generatedAt: new Date().toISOString(),
    };

    this.cache = { overview, expiresAt: Date.now() + CACHE_TTL_MS };
    return overview;
  }

  private async resolve<T>(pending: Promise<T>, fallback: () => T, source: string): Promise<T> {
    try {
      return await pending;
    } catch (cause) {
      this.logger.warn({ err: cause, source }, 'Overview source unavailable; using fallback');
      return fallback();
    }
  }
}

function emptyTenants(): TenantsStats {
  return { active: 0, total: 0 };
}

function emptyActivity(): readonly never[] {
  return [];
}

function emptyCircuits(): readonly CircuitEntry[] {
  return [];
}

export type { RawCounters };
