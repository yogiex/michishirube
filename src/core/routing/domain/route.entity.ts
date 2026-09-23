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
  readonly requireAuth: boolean;
  readonly requireIdempotency: boolean;
  readonly roles: readonly string[];
  readonly rateLimit?: RouteRateLimit | undefined;
  readonly timeoutMs: number;
  readonly createdAt: string; // ISO 8601
}

export const RouteMethodSchema = z.enum(ROUTE_METHODS);
