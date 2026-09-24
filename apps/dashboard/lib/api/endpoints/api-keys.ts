import { api, type ApiResult, type RequestOptions } from '../client';
import type { ApiKeyListQuery } from '../query-keys';
import type { PaginatedResponse } from './contracts';

export type ApiKeyStatus = 'active' | 'revoked' | 'expired';

export interface ApiKey {
  readonly id: string;
  readonly name: string;
  readonly tenantId: string;
  readonly keyPrefix?: string;
  readonly scopes: readonly string[];
  readonly status: ApiKeyStatus;
  readonly usageCount: number;
  readonly createdAt: string;
  readonly expiresAt?: string;
  readonly lastUsedAt?: string;
}

export interface IssueApiKeyInput {
  readonly name: string;
  readonly tenantId: string;
  readonly scopes: readonly string[];
  readonly expiresAt?: string;
}

export interface IssuedApiKey {
  readonly apiKey: ApiKey;
  readonly plaintextKey: string;
}

function apiKeyPath(id?: string): string {
  return id === undefined ? '/admin/api-keys' : `/admin/api-keys/${encodeURIComponent(id)}`;
}

export function listApiKeys(
  query: ApiKeyListQuery = {},
  options?: RequestOptions,
): Promise<ApiResult<PaginatedResponse<ApiKey>>> {
  return api.get(apiKeyPath(), { ...options, query: { ...query } }) as Promise<
    ApiResult<PaginatedResponse<ApiKey>>
  >;
}

export function getApiKey(id: string, options?: RequestOptions): Promise<ApiResult<ApiKey>> {
  return api.get(apiKeyPath(id), options) as Promise<ApiResult<ApiKey>>;
}

export function issueApiKey(
  input: IssueApiKeyInput,
  options?: RequestOptions,
): Promise<ApiResult<IssuedApiKey>> {
  return api.post(apiKeyPath(), input, options) as Promise<ApiResult<IssuedApiKey>>;
}

export function revokeApiKey(id: string, options?: RequestOptions): Promise<ApiResult<ApiKey>> {
  return api.post(`${apiKeyPath(id)}/revoke`, undefined, options) as Promise<ApiResult<ApiKey>>;
}

export function deleteApiKey(id: string, options?: RequestOptions): Promise<ApiResult<void>> {
  return api.delete(apiKeyPath(id), options) as Promise<ApiResult<void>>;
}
