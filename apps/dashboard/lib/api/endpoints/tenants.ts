import { api, type ApiResult, type RequestOptions } from '../client';
import type { TenantListQuery } from '../query-keys';
import type { PaginatedResponse } from './contracts';

export type TenantTier = 'free' | 'pro' | 'enterprise';
export type TenantStatus = 'active' | 'suspended' | 'inactive';

export interface Tenant {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly tier: TenantTier;
  readonly status: TenantStatus;
  readonly createdAt: string;
  readonly updatedAt?: string;
  readonly requests?: number;
}

export interface CreateTenantInput {
  readonly slug: string;
  readonly name: string;
  readonly tier: TenantTier;
  readonly status?: TenantStatus;
}

export type UpdateTenantInput = Partial<CreateTenantInput>;

function tenantPath(id?: string): string {
  return id === undefined ? '/admin/tenants' : `/admin/tenants/${encodeURIComponent(id)}`;
}

export function listTenants(
  query: TenantListQuery = {},
  options?: RequestOptions,
): Promise<ApiResult<PaginatedResponse<Tenant>>> {
  return api.get(tenantPath(), { ...options, query: { ...query } }) as Promise<
    ApiResult<PaginatedResponse<Tenant>>
  >;
}

export function getTenant(id: string, options?: RequestOptions): Promise<ApiResult<Tenant>> {
  return api.get(tenantPath(id), options) as Promise<ApiResult<Tenant>>;
}

export function createTenant(
  input: CreateTenantInput,
  options?: RequestOptions,
): Promise<ApiResult<Tenant>> {
  return api.post(tenantPath(), input, options) as Promise<ApiResult<Tenant>>;
}

export function updateTenant(
  id: string,
  input: UpdateTenantInput,
  options?: RequestOptions,
): Promise<ApiResult<Tenant>> {
  return api.patch(tenantPath(id), input, options) as Promise<ApiResult<Tenant>>;
}

export function deleteTenant(id: string, options?: RequestOptions): Promise<ApiResult<void>> {
  return api.delete(tenantPath(id), options) as Promise<ApiResult<void>>;
}
