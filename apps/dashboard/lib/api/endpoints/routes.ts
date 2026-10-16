import { api, ApiError, type ApiResult, type RequestOptions } from '../client';
import type { RouteListQuery } from '../query-keys';
import {
  CreateRouteInputSchema,
  ReloadRoutesResultSchema,
  RouteSchema,
  UpdateRouteInputSchema,
  type CreateRouteInput,
  type ReloadRoutesResult,
  type Route,
  type UpdateRouteInput,
} from '../schemas/routes';
import { PaginatedResponseSchema } from '../schemas/contracts';
import { z } from 'zod';

export type RouteMethod = z.infer<typeof RouteSchema.shape.method>;
export type {
  Route,
  CreateRouteInput,
  UpdateRouteInput,
  ReloadRoutesResult,
} from '../schemas/routes';

const RouteListSchema = PaginatedResponseSchema(RouteSchema);

function routePath(id?: string): string {
  return id === undefined ? '/admin/routes' : `/admin/routes/${encodeURIComponent(id)}`;
}

function malformedError(cause: unknown): ApiError {
  return new ApiError(
    500,
    'GW_FRONTEND_MALFORMED_RESPONSE',
    'Endpoint route tidak valid',
    undefined,
    undefined,
    {
      cause: cause instanceof Error ? cause : undefined,
    },
  );
}

function parseBody<T extends z.ZodTypeAny>(schema: T, data: unknown): z.infer<T> {
  const parsed = schema.safeParse(data);
  if (!parsed.success) throw parsed.error;
  return parsed.data;
}

function buildGetOptions(options?: RequestOptions, query?: RouteListQuery): RequestOptions {
  return { ...options, ...(query !== undefined ? { query: { ...query } } : {}) };
}

export function listRoutes(
  query: RouteListQuery = {},
  options?: RequestOptions,
): Promise<ApiResult<Route[]>> {
  return executeListRoutes(query, options);
}

async function executeListRoutes(
  query: RouteListQuery,
  options?: RequestOptions,
): Promise<ApiResult<Route[]>> {
  const result = await api.get<unknown>(routePath(), buildGetOptions(options, query));
  if (!result || !result.ok)
    return result ?? { ok: false, error: malformedError('API request failed') };
  const parsed = RouteListSchema.safeParse(result.data);
  if (!parsed.success) return { ok: false, error: malformedError(parsed.error) };
  return { ok: true, data: parsed.data.items };
}

export function getRoute(id: string, options?: RequestOptions): Promise<ApiResult<Route>> {
  return executeGetRoute(id, options);
}

async function executeGetRoute(id: string, options?: RequestOptions): Promise<ApiResult<Route>> {
  const result = await api.get<unknown>(routePath(id), options);
  if (!result || !result.ok)
    return result ?? { ok: false, error: malformedError('API request failed') };
  const parsed = RouteSchema.safeParse(result.data);
  if (!parsed.success) return { ok: false, error: malformedError(parsed.error) };
  return { ok: true, data: parsed.data };
}

export function createRoute(
  input: CreateRouteInput,
  options?: RequestOptions,
): Promise<ApiResult<Route>> {
  return executeCreateRoute(input, options);
}

async function executeCreateRoute(
  input: CreateRouteInput,
  options?: RequestOptions,
): Promise<ApiResult<Route>> {
  const validated = parseBody(CreateRouteInputSchema, input);
  const result = await api.post<unknown>(routePath(), validated, options);
  if (!result || !result.ok)
    return result ?? { ok: false, error: malformedError('API request failed') };
  const parsed = RouteSchema.safeParse(result.data);
  if (!parsed.success) return { ok: false, error: malformedError(parsed.error) };
  return { ok: true, data: parsed.data };
}

export function updateRoute(
  id: string,
  input: UpdateRouteInput,
  options?: RequestOptions,
): Promise<ApiResult<Route>> {
  return executeUpdateRoute(id, input, options);
}

async function executeUpdateRoute(
  id: string,
  input: UpdateRouteInput,
  options?: RequestOptions,
): Promise<ApiResult<Route>> {
  const validated = parseBody(UpdateRouteInputSchema, input);
  const result = await api.patch<unknown>(routePath(id), validated, options);
  if (!result || !result.ok)
    return result ?? { ok: false, error: malformedError('API request failed') };
  const parsed = RouteSchema.safeParse(result.data);
  if (!parsed.success) return { ok: false, error: malformedError(parsed.error) };
  return { ok: true, data: parsed.data };
}

export function deleteRoute(id: string, options?: RequestOptions): Promise<ApiResult<void>> {
  return executeDeleteRoute(id, options);
}

async function executeDeleteRoute(id: string, options?: RequestOptions): Promise<ApiResult<void>> {
  const result = await api.delete<unknown>(routePath(id), options);
  if (!result || !result.ok)
    return result ?? { ok: false, error: malformedError('API request failed') };
  return { ok: true, data: undefined };
}

export function reloadRoutes(options?: RequestOptions): Promise<ApiResult<ReloadRoutesResult>> {
  return executeReloadRoutes(options);
}

async function executeReloadRoutes(
  options?: RequestOptions,
): Promise<ApiResult<ReloadRoutesResult>> {
  const result = await api.post<unknown>('/admin/routes/reload', undefined, options);
  if (!result || !result.ok)
    return result ?? { ok: false, error: malformedError('API request failed') };
  const parsed = ReloadRoutesResultSchema.safeParse(result.data);
  if (!parsed.success) return { ok: false, error: malformedError(parsed.error) };
  return { ok: true, data: parsed.data };
}
