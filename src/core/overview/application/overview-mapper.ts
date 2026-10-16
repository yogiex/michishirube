import type {
  CircuitsStats,
  CircuitEntry,
  ErrorsStats,
  LatencyStats,
  RawCounters,
  RequestsStats,
  ServiceHealthItem,
  ServiceHealthStatus,
} from '../domain/overview.entity.js';

const MINUTES_PER_DAY = 24 * 60;
const DECIMAL_PLACES = 10;

export function computeDeltaPercent(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return round1(((current - previous) / previous) * 100);
}

export function computeRequests(counters: RawCounters): RequestsStats {
  return {
    perMinute: Math.round(counters.requests24h / MINUTES_PER_DAY),
    deltaVsYesterday: computeDeltaPercent(counters.requests24h, counters.requestsPrev24h),
    total24h: counters.requests24h,
  };
}

export function computeErrors(counters: RawCounters): ErrorsStats {
  const currentRate = counters.requests24h > 0 ? counters.errors24h / counters.requests24h : 0;
  const previousRate =
    counters.requestsPrev24h > 0 ? counters.errorsPrev24h / counters.requestsPrev24h : 0;
  return {
    rate: round2(currentRate * 100),
    deltaVsYesterday: round2((currentRate - previousRate) * 100),
    total24h: counters.errors24h,
  };
}

export function computeLatency(counters: RawCounters): LatencyStats {
  return {
    p95Ms: Math.round(counters.latencyP95),
    p99Ms: Math.round(counters.latencyP99),
    deltaVsYesterday: Math.round(counters.latencyP95 - counters.latencyP95Prev),
  };
}

export function computeCircuits(entries: readonly CircuitEntry[]): CircuitsStats {
  let open = 0;
  let halfOpen = 0;
  let closed = 0;
  for (const entry of entries) {
    if (entry.status === 'open') open += 1;
    else if (entry.status === 'half_open') halfOpen += 1;
    else closed += 1;
  }
  return { open, halfOpen, closed };
}

export function computeServiceHealth(entries: readonly CircuitEntry[]): ServiceHealthItem[] {
  return entries.map((entry) => ({
    name: entry.key,
    status: healthStatus(entry),
    latencyMs: null,
  }));
}

function healthStatus(entry: CircuitEntry): ServiceHealthStatus {
  if (entry.status === 'open') return 'down';
  if (entry.status === 'half_open' || entry.failureCount > 0) return 'degraded';
  return 'healthy';
}

function round1(value: number): number {
  return Math.round(value * DECIMAL_PLACES) / DECIMAL_PLACES;
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
