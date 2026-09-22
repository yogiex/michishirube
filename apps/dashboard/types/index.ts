export interface Route {
  id: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'ALL';
  upstream: string;
  enabled: boolean;
  requireAuth: boolean;
  requireIdempotency?: boolean;
  rateLimit?: { limit: number; windowSec: number };
  roles?: string[];
  createdAt: string;
}

export interface Tenant {
  id: string;
  slug: string;
  name: string;
  tier: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'suspended' | 'inactive';
  createdAt: string;
  requests: number;
}

export interface ApiKey {
  id: string;
  name: string;
  tenantId: string;
  scopes: string[];
  status: 'active' | 'revoked';
  usageCount: number;
  createdAt: string;
  lastUsedAt?: string;
}

export interface ServiceHealth {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  latencyMs: number;
  endpoint: string;
}

export interface Activity {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target: string;
  status: 'success' | 'warning' | 'error';
}

export interface MetricPoint {
  time: string;
  requests: number;
  errors: number;
  p95: number;
}
