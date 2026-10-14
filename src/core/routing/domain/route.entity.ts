import { z } from 'zod';

export const ROUTE_METHODS = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'HEAD',
  'OPTIONS',
  'ALL',
] as const;
export type RouteMethod = (typeof ROUTE_METHODS)[number];

export interface RouteRateLimit {
  readonly limit: number;
  readonly windowSec: number;
}

export interface Route {
  readonly id: string;
  readonly path: string;
  readonly method: RouteMethod;
  readonly upstream: string;
  readonly enabled: boolean;
  readonly disabledReason?: string | undefined;
  readonly requireAuth: boolean;
  readonly requireIdempotency: boolean;
  readonly roles: readonly string[];
  readonly rateLimit?: RouteRateLimit | undefined;
  readonly timeoutMs: number;
  readonly createdAt: string; // ISO 8601
  // Tenant scoping (empty / undefined = semua tenant)
  readonly tenantId?: string | undefined;
  readonly tenantIds?: readonly string[] | undefined;
  readonly tenants?: readonly string[] | undefined;
  readonly allowedTenants?: readonly string[] | undefined;
}

export const RouteMethodSchema = z.enum(ROUTE_METHODS);
