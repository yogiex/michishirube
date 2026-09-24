import { api, type ApiResult, type RequestOptions } from '../client';
import type { MetricsQuery } from '../query-keys';

export interface MetricPoint {
  readonly timestamp: string;
  readonly requests: number;
  readonly errors: number;
  readonly p95: number;
}

export interface MetricsSnapshot {
  readonly requestsPerMin: number;
  readonly errorRate: number;
  readonly p95Latency: number;
  readonly activeTenants: number;
  readonly series: readonly MetricPoint[];
}

export function getMetrics(
  query: MetricsQuery = {},
  options?: RequestOptions,
): Promise<ApiResult<MetricsSnapshot>> {
  return api.get('/admin/metrics', { ...options, query: { ...query } }) as Promise<
    ApiResult<MetricsSnapshot>
  >;
}
