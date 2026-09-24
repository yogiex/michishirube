import { api, type ApiResult, type RequestOptions } from '../client';
import type { RouteListQuery } from '../query-keys';
import type { PaginatedResponse } from './contracts';

export type RouteMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'ALL';

export interface Route {
  readonly id: string;
  readonly path: string;
  readonly method: RouteMethod;
  readonly upstream: string;
  readonly enabled: boolean;
  readonly requireAuth: boolean;
  readonly requireIdempotency?: boolean;
  readonly rateLimit?: { readonly limit: number; readonly windowSec: number };
  readonly roles?: readonly string[];
  readonly createdAt: string;
}

export interface CreateRouteInput {
  readonly path: string;
  readonly method: RouteMethod;
  readonly upstream: string;
  readonly enabled?: boolean;
  readonly requireAuth?: boolean;
  readonly requireIdempotency?: boolean;
  readonly rateLimit?: { readonly limit: number; readonly windowSec: number };
  readonly roles?: readonly string[];
}

export type UpdateRouteInput = Partial<CreateRouteInput>;

export interface ReloadRoutesResult {
  readonly reloaded: boolean;
  readonly total: number;
}

function routePath(id?: string): string {
  return id === undefined ? '/admin/routes' : `/admin/routes/${encodeURIComponent(id)}`;
}

export function listRoutes(
  query: RouteListQuery = {},
  options?: RequestOptions,
): Promise<ApiResult<PaginatedResponse<Route>>> {
  return api.get(routePath(), { ...options, query: { ...query } }) as Promise<
    ApiResult<PaginatedResponse<Route>>
  >;
}

export function getRoute(id: string, options?: RequestOptions): Promise<ApiResult<Route>> {
  return api.get(routePath(id), options) as Promise<ApiResult<Route>>;
}

export function createRoute(
  input: CreateRouteInput,
  options?: RequestOptions,
): Promise<ApiResult<Route>> {
  return api.post(routePath(), input, options) as Promise<ApiResult<Route>>;
}

export function updateRoute(
  id: string,
  input: UpdateRouteInput,
  options?: RequestOptions,
): Promise<ApiResult<Route>> {
  return api.patch(routePath(id), input, options) as Promise<ApiResult<Route>>;
}

export function deleteRoute(id: string, options?: RequestOptions): Promise<ApiResult<void>> {
  return api.delete(routePath(id), options) as Promise<ApiResult<void>>;
}

export function reloadRoutes(options?: RequestOptions): Promise<ApiResult<ReloadRoutesResult>> {
  return api.post('/admin/routes/reload', undefined, options) as Promise<
    ApiResult<ReloadRoutesResult>
  >;
}
