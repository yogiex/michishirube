import type { ActivityItem, CircuitEntry, RawCounters, TenantsStats } from './overview.entity.js';

export const OVERVIEW_STATS = Symbol('OVERVIEW_STATS');

export interface OverviewStatsPort {
  getCounters24h(): Promise<RawCounters>;
  recordRequest(durationMs: number, isError: boolean): Promise<void>;
}

export const TENANT_OVERVIEW = Symbol('TENANT_OVERVIEW');

export interface TenantOverviewPort {
  getTenantStats(): Promise<TenantsStats>;
}

export const CIRCUIT_OVERVIEW = Symbol('CIRCUIT_OVERVIEW');

export interface CircuitOverviewPort {
  listCircuits(): Promise<readonly CircuitEntry[]>;
}

export const ACTIVITY_FEED = Symbol('ACTIVITY_FEED');

export const ACTIVITY_FEED_MAX_ITEMS = 10;

export interface ActivityFeedPort {
  listRecentActivity(limit: number): Promise<readonly ActivityItem[]>;
}
