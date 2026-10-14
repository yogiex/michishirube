export interface RequestsStats {
  readonly perMinute: number;
  readonly deltaVsYesterday: number;
  readonly total24h: number;
}

export interface ErrorsStats {
  readonly rate: number;
  readonly deltaVsYesterday: number;
  readonly total24h: number;
}

export interface LatencyStats {
  readonly p95Ms: number;
  readonly p99Ms: number;
  readonly deltaVsYesterday: number;
}

export interface TenantsStats {
  readonly active: number;
  readonly total: number;
}

export interface CircuitsStats {
  readonly open: number;
  readonly halfOpen: number;
  readonly closed: number;
}

export const SERVICE_HEALTH_STATUSES = ['healthy', 'degraded', 'down'] as const;
export type ServiceHealthStatus = (typeof SERVICE_HEALTH_STATUSES)[number];

export interface ServiceHealthItem {
  readonly name: string;
  readonly status: ServiceHealthStatus;
  readonly latencyMs: number | null;
}

export const ACTIVITY_STATUSES = ['success', 'warning', 'error'] as const;
export type ActivityStatus = (typeof ACTIVITY_STATUSES)[number];

export interface ActivityItem {
  readonly id: string;
  readonly timestamp: string;
  readonly actor: string;
  readonly action: string;
  readonly target: string;
  readonly status: ActivityStatus;
}

export interface Overview {
  readonly requests: RequestsStats;
  readonly errors: ErrorsStats;
  readonly latency: LatencyStats;
  readonly tenants: TenantsStats;
  readonly circuits: CircuitsStats;
  readonly services: readonly ServiceHealthItem[];
  readonly recentActivity: readonly ActivityItem[];
  readonly generatedAt: string;
}

export interface RawCounters {
  readonly requests24h: number;
  readonly requestsPrev24h: number;
  readonly errors24h: number;
  readonly errorsPrev24h: number;
  readonly latencyP95: number;
  readonly latencyP99: number;
  readonly latencyP95Prev: number;
}

export const CIRCUIT_STATUSES = ['closed', 'open', 'half_open'] as const;
export type CircuitStatus = (typeof CIRCUIT_STATUSES)[number];

export interface CircuitEntry {
  readonly key: string;
  readonly status: CircuitStatus;
  readonly failureCount: number;
  readonly openedAtMs: number;
}

export function emptyRawCounters(): RawCounters {
  return {
    requests24h: 0,
    requestsPrev24h: 0,
    errors24h: 0,
    errorsPrev24h: 0,
    latencyP95: 0,
    latencyP99: 0,
    latencyP95Prev: 0,
  };
}
