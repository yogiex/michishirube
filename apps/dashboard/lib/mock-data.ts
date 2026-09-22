import type { Route, Tenant, ApiKey, ServiceHealth, Activity, MetricPoint } from '@/types';

export const mockRoutes: Route[] = [
  {
    id: 'r_001',
    path: '/api/v1/orders',
    method: 'GET',
    upstream: 'order-svc',
    enabled: true,
    requireAuth: true,
    createdAt: '2026-08-15T10:00:00Z',
  },
  {
    id: 'r_002',
    path: '/api/v1/orders',
    method: 'POST',
    upstream: 'order-svc',
    enabled: true,
    requireAuth: true,
    requireIdempotency: true,
    createdAt: '2026-08-15T10:00:00Z',
  },
  {
    id: 'r_003',
    path: '/api/v1/orders/:id',
    method: 'GET',
    upstream: 'order-svc',
    enabled: true,
    requireAuth: true,
    createdAt: '2026-08-15T10:00:00Z',
  },
  {
    id: 'r_004',
    path: '/api/v1/users',
    method: 'GET',
    upstream: 'auth-svc',
    enabled: true,
    requireAuth: true,
    createdAt: '2026-08-15T10:00:00Z',
  },
  {
    id: 'r_005',
    path: '/api/v1/users/:id',
    method: 'GET',
    upstream: 'auth-svc',
    enabled: true,
    requireAuth: true,
    createdAt: '2026-08-15T10:00:00Z',
  },
  {
    id: 'r_006',
    path: '/api/v1/billing',
    method: 'GET',
    upstream: 'billing-svc',
    enabled: false,
    requireAuth: true,
    createdAt: '2026-08-20T10:00:00Z',
  },
  {
    id: 'r_007',
    path: '/api/v1/webhooks',
    method: 'POST',
    upstream: 'notif-svc',
    enabled: true,
    requireAuth: false,
    createdAt: '2026-09-01T10:00:00Z',
  },
  {
    id: 'r_008',
    path: '/api/v1/legacy/*',
    method: 'ALL',
    upstream: 'legacy-svc',
    enabled: false,
    requireAuth: false,
    createdAt: '2026-09-10T10:00:00Z',
  },
];

export const mockTenants: Tenant[] = [
  {
    id: 't_001',
    slug: 'acme',
    name: 'Acme Corporation',
    tier: 'enterprise',
    status: 'active',
    createdAt: '2026-08-15T10:00:00Z',
    requests: 1_245_231,
  },
  {
    id: 't_002',
    slug: 'beta',
    name: 'Beta Inc',
    tier: 'pro',
    status: 'active',
    createdAt: '2026-08-20T10:00:00Z',
    requests: 456_102,
  },
  {
    id: 't_003',
    slug: 'gamma',
    name: 'Gamma LLC',
    tier: 'free',
    status: 'suspended',
    createdAt: '2026-08-25T10:00:00Z',
    requests: 12_003,
  },
  {
    id: 't_004',
    slug: 'delta',
    name: 'Delta Co',
    tier: 'pro',
    status: 'active',
    createdAt: '2026-09-01T10:00:00Z',
    requests: 89_441,
  },
  {
    id: 't_005',
    slug: 'epsilon',
    name: 'Epsilon Ltd',
    tier: 'free',
    status: 'inactive',
    createdAt: '2026-09-10T10:00:00Z',
    requests: 0,
  },
];

export const mockApiKeys: ApiKey[] = [
  {
    id: 'k_001',
    name: 'partner-acme',
    tenantId: 'acme',
    scopes: ['order:read'],
    status: 'active',
    usageCount: 4200,
    createdAt: '2026-08-20T10:00:00Z',
    lastUsedAt: '2026-09-22T12:32:00Z',
  },
  {
    id: 'k_002',
    name: 'prod-acme-01',
    tenantId: 'acme',
    scopes: ['*:*'],
    status: 'active',
    usageCount: 1_200_000,
    createdAt: '2026-08-15T10:00:00Z',
    lastUsedAt: '2026-09-22T12:34:00Z',
  },
  {
    id: 'k_003',
    name: 'prod-beta-01',
    tenantId: 'beta',
    scopes: ['order:*'],
    status: 'active',
    usageCount: 456_000,
    createdAt: '2026-08-20T10:00:00Z',
    lastUsedAt: '2026-09-22T11:15:00Z',
  },
  {
    id: 'k_004',
    name: 'staging-old',
    tenantId: 'acme',
    scopes: ['order:read'],
    status: 'revoked',
    usageCount: 0,
    createdAt: '2026-06-01T10:00:00Z',
  },
];

export const mockHealth: ServiceHealth[] = [
  { name: 'Redis', status: 'healthy', latencyMs: 0.8, endpoint: '127.0.0.1:7380' },
  { name: 'Auth Service', status: 'healthy', latencyMs: 12.4, endpoint: 'auth.internal' },
  { name: 'Order Service', status: 'degraded', latencyMs: 340.0, endpoint: 'order.internal' },
  { name: 'Billing Service', status: 'healthy', latencyMs: 18.9, endpoint: 'billing.internal' },
  { name: 'Notification', status: 'down', latencyMs: 0, endpoint: 'notif.internal' },
];

export const mockActivity: Activity[] = [
  {
    id: 'a_1',
    timestamp: '2026-09-22T12:34:21Z',
    actor: 'admin',
    action: 'config.reload',
    target: 'routes',
    status: 'success',
  },
  {
    id: 'a_2',
    timestamp: '2026-09-22T12:30:02Z',
    actor: 'admin',
    action: 'api_key.create',
    target: 'partner-acme',
    status: 'success',
  },
  {
    id: 'a_3',
    timestamp: '2026-09-22T12:15:44Z',
    actor: 'system',
    action: 'circuit.open',
    target: 'billing-svc',
    status: 'warning',
  },
  {
    id: 'a_4',
    timestamp: '2026-09-22T12:10:11Z',
    actor: 'admin',
    action: 'tenant.update',
    target: 'beta',
    status: 'success',
  },
];

export function generateMetricSeries(hours = 24): MetricPoint[] {
  return Array.from({ length: hours }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    const base = 3000 + Math.sin(i / 3) * 1500 + Math.random() * 500;
    return {
      time: `${hour}:00`,
      requests: Math.round(base),
      errors: Math.round(base * 0.001 * Math.random()),
      p95: Math.round(40 + Math.random() * 20),
    };
  });
}

export const mockMetrics = {
  requestsPerMin: 4821,
  requestsDelta: 12.3,
  errorRate: 0.08,
  errorDelta: -0.02,
  p95Latency: 45,
  latencyDelta: 3,
  activeTenants: 12,
  totalTenants: 13,
};
