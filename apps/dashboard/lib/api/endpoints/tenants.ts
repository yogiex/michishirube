import { api, ApiError, type ApiResult, type RequestOptions } from '../client';
import type { TenantListQuery } from '../query-keys';
import {
  CreateTenantInputSchema,
  TenantSchema,
  UpdateTenantInputSchema,
  type CreateTenantInput,
  type Tenant,
  type UpdateTenantInput,
} from '../schemas/tenants';
import { PaginatedResponseSchema } from '../schemas/contracts';
import { z } from 'zod';

export type { Tenant, CreateTenantInput, UpdateTenantInput } from '../schemas/tenants';
export type TenantTier = z.infer<typeof TenantSchema.shape.tier>;
export type TenantStatus = z.infer<typeof TenantSchema.shape.status>;

const TenantListSchema = PaginatedResponseSchema(TenantSchema);

function tenantPath(id?: string): string {
  return id === undefined ? '/admin/tenants' : `/admin/tenants/${encodeURIComponent(id)}`;
}

function malformedError(cause: unknown): ApiError {
  return new ApiError(
    500,
    'GW_FRONTEND_MALFORMED_RESPONSE',
    'Endpoint tenant tidak valid',
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

function buildGetOptions(options?: RequestOptions, query?: TenantListQuery): RequestOptions {
  return { ...options, ...(query !== undefined ? { query: { ...query } } : {}) };
}

export function listTenants(
  query: TenantListQuery = {},
  options?: RequestOptions,
): Promise<ApiResult<Tenant[]>> {
  return executeListTenants(query, options);
}

async function executeListTenants(
  query: TenantListQuery,
  options?: RequestOptions,
): Promise<ApiResult<Tenant[]>> {
  const result = await api.get<unknown>(tenantPath(), buildGetOptions(options, query));
  if (!result || !result.ok)
    return result ?? { ok: false, error: malformedError('API request failed') };
  const parsed = TenantListSchema.safeParse(result.data);
  if (!parsed.success) return { ok: false, error: malformedError(parsed.error) };
  return { ok: true, data: parsed.data.items };
}

export function getTenant(id: string, options?: RequestOptions): Promise<ApiResult<Tenant>> {
  return executeGetTenant(id, options);
}

async function executeGetTenant(id: string, options?: RequestOptions): Promise<ApiResult<Tenant>> {
  const result = await api.get<unknown>(tenantPath(id), options);
  if (!result || !result.ok)
    return result ?? { ok: false, error: malformedError('API request failed') };
  const parsed = TenantSchema.safeParse(result.data);
  if (!parsed.success) return { ok: false, error: malformedError(parsed.error) };
  return { ok: true, data: parsed.data };
}

export function createTenant(
  input: CreateTenantInput,
  options?: RequestOptions,
): Promise<ApiResult<Tenant>> {
  return executeCreateTenant(input, options);
}

async function executeCreateTenant(
  input: CreateTenantInput,
  options?: RequestOptions,
): Promise<ApiResult<Tenant>> {
  const validated = parseBody(CreateTenantInputSchema, input);
  const result = await api.post<unknown>(tenantPath(), validated, options);
  if (!result || !result.ok)
    return result ?? { ok: false, error: malformedError('API request failed') };
  const parsed = TenantSchema.safeParse(result.data);
  if (!parsed.success) return { ok: false, error: malformedError(parsed.error) };
  return { ok: true, data: parsed.data };
}

export function updateTenant(
  id: string,
  input: UpdateTenantInput,
  options?: RequestOptions,
): Promise<ApiResult<Tenant>> {
  return executeUpdateTenant(id, input, options);
}

async function executeUpdateTenant(
  id: string,
  input: UpdateTenantInput,
  options?: RequestOptions,
): Promise<ApiResult<Tenant>> {
  const validated = parseBody(UpdateTenantInputSchema, input);
  const result = await api.patch<unknown>(tenantPath(id), validated, options);
  if (!result || !result.ok)
    return result ?? { ok: false, error: malformedError('API request failed') };
  const parsed = TenantSchema.safeParse(result.data);
  if (!parsed.success) return { ok: false, error: malformedError(parsed.error) };
  return { ok: true, data: parsed.data };
}

export function deleteTenant(id: string, options?: RequestOptions): Promise<ApiResult<void>> {
  return executeDeleteTenant(id, options);
}

async function executeDeleteTenant(id: string, options?: RequestOptions): Promise<ApiResult<void>> {
  const result = await api.delete<unknown>(tenantPath(id), options);
  if (!result || !result.ok)
    return result ?? { ok: false, error: malformedError('API request failed') };
  return { ok: true, data: undefined };
}
