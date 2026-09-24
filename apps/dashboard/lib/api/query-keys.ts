export interface PageQuery {
  readonly page?: number;
  readonly limit?: number;
}

export interface RouteListQuery extends PageQuery {
  readonly search?: string;
  readonly method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'ALL';
  readonly enabled?: boolean;
}

export interface TenantListQuery extends PageQuery {
  readonly search?: string;
  readonly tier?: 'free' | 'pro' | 'enterprise';
  readonly status?: 'active' | 'suspended' | 'inactive';
}

export interface ApiKeyListQuery extends PageQuery {
  readonly search?: string;
  readonly tenantId?: string;
  readonly status?: 'active' | 'revoked';
}

export interface AuditListQuery extends PageQuery {
  readonly search?: string;
  readonly action?: string;
  readonly status?: 'success' | 'warning' | 'error';
}

export interface MetricsQuery {
  readonly from?: string;
  readonly to?: string;
  readonly interval?: 'minute' | 'hour' | 'day';
}

export const queryKeys = {
  overview: {
    all: ['overview'] as const,
  },
  routes: {
    all: ['routes'] as const,
    lists: () => [...queryKeys.routes.all, 'list'] as const,
    list: (query: RouteListQuery = {}) => [...queryKeys.routes.lists(), query] as const,
    details: () => [...queryKeys.routes.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.routes.details(), id] as const,
  },
  tenants: {
    all: ['tenants'] as const,
    lists: () => [...queryKeys.tenants.all, 'list'] as const,
    list: (query: TenantListQuery = {}) => [...queryKeys.tenants.lists(), query] as const,
    details: () => [...queryKeys.tenants.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.tenants.details(), id] as const,
  },
  apiKeys: {
    all: ['api-keys'] as const,
    lists: () => [...queryKeys.apiKeys.all, 'list'] as const,
    list: (query: ApiKeyListQuery = {}) => [...queryKeys.apiKeys.lists(), query] as const,
    details: () => [...queryKeys.apiKeys.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.apiKeys.details(), id] as const,
  },
  metrics: {
    all: ['metrics'] as const,
    series: (query: MetricsQuery = {}) => [...queryKeys.metrics.all, 'series', query] as const,
  },
  audit: {
    all: ['audit'] as const,
    lists: () => [...queryKeys.audit.all, 'list'] as const,
    list: (query: AuditListQuery = {}) => [...queryKeys.audit.lists(), query] as const,
  },
} as const satisfies Record<string, unknown>;

export type DashboardQueryKeys = typeof queryKeys;
