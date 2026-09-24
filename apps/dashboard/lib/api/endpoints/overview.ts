import { api, type ApiResult, type RequestOptions } from '../client';
import type { AuditEntry } from './audit';
import type { MetricsSnapshot } from './metrics';
import type { Route } from './routes';
import type { ServiceHealth } from './contracts';

export interface OverviewTopRoute {
  readonly path: string;
  readonly method: Route['method'];
  readonly requests: number;
}

export interface Overview {
  readonly metrics: MetricsSnapshot;
  readonly health: readonly ServiceHealth[];
  readonly activity: readonly AuditEntry[];
  readonly topRoutes: readonly OverviewTopRoute[];
}

export function getOverview(options?: RequestOptions): Promise<ApiResult<Overview>> {
  return api.get('/admin/overview', options) as Promise<import('../client').ApiResult<Overview>>;
}
