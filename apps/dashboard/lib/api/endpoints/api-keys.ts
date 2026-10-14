import { api, ApiError, type ApiResult, type RequestOptions } from '../client';
import type { ApiKeyListQuery } from '../query-keys';
import {
  ApiKeySchema,
  IssueApiKeyInputSchema,
  IssuedApiKeySchema,
  type ApiKey,
  type IssueApiKeyInput,
  type IssuedApiKey,
} from '../schemas/api-keys';
import { PaginatedResponseSchema } from '../schemas/contracts';
import { z } from 'zod';

export type { ApiKey, IssueApiKeyInput, IssuedApiKey } from '../schemas/api-keys';
export type ApiKeyStatus = z.infer<typeof ApiKeySchema.shape.status>;

const ApiKeyListSchema = PaginatedResponseSchema(ApiKeySchema);

function apiKeyPath(id?: string): string {
  return id === undefined ? '/admin/api-keys' : `/admin/api-keys/${encodeURIComponent(id)}`;
}

function malformedError(cause: unknown): ApiError {
  return new ApiError(
    500,
    'GW_FRONTEND_MALFORMED_RESPONSE',
    'Endpoint api-keys tidak valid',
    undefined,
    undefined,
    { cause: cause instanceof Error ? cause : undefined },
  );
}

function parseBody<T extends z.ZodTypeAny>(schema: T, data: unknown): z.infer<T> {
  const parsed = schema.safeParse(data);
  if (!parsed.success) throw parsed.error;
  return parsed.data;
}

function buildGetOptions(options?: RequestOptions, query?: ApiKeyListQuery): RequestOptions {
  return { ...options, ...(query !== undefined ? { query: { ...query } } : {}) };
}

export function listApiKeys(
  query: ApiKeyListQuery = {},
  options?: RequestOptions,
): Promise<ApiResult<ApiKey[]>> {
  return executeListApiKeys(query, options);
}

async function executeListApiKeys(
  query: ApiKeyListQuery,
  options?: RequestOptions,
): Promise<ApiResult<ApiKey[]>> {
  const result = await api.get<unknown>(apiKeyPath(), buildGetOptions(options, query));
  if (!result || !result.ok)
    return result ?? { ok: false, error: malformedError('API request failed') };
  const parsed = ApiKeyListSchema.safeParse(result.data);
  if (!parsed.success) return { ok: false, error: malformedError(parsed.error) };
  return { ok: true, data: parsed.data.items };
}

export function getApiKey(id: string, options?: RequestOptions): Promise<ApiResult<ApiKey>> {
  return executeGetApiKey(id, options);
}

async function executeGetApiKey(id: string, options?: RequestOptions): Promise<ApiResult<ApiKey>> {
  const result = await api.get<unknown>(apiKeyPath(id), options);
  if (!result || !result.ok)
    return result ?? { ok: false, error: malformedError('API request failed') };
  const parsed = ApiKeySchema.safeParse(result.data);
  if (!parsed.success) return { ok: false, error: malformedError(parsed.error) };
  return { ok: true, data: parsed.data };
}

export function issueApiKey(
  input: IssueApiKeyInput,
  options?: RequestOptions,
): Promise<ApiResult<IssuedApiKey>> {
  return executeIssueApiKey(input, options);
}

async function executeIssueApiKey(
  input: IssueApiKeyInput,
  options?: RequestOptions,
): Promise<ApiResult<IssuedApiKey>> {
  const validated = parseBody(IssueApiKeyInputSchema, input);
  const result = await api.post<unknown>(apiKeyPath(), validated, options);
  if (!result || !result.ok)
    return result ?? { ok: false, error: malformedError('API request failed') };
  const parsed = IssuedApiKeySchema.safeParse(result.data);
  if (!parsed.success) return { ok: false, error: malformedError(parsed.error) };
  return { ok: true, data: parsed.data };
}

export function revokeApiKey(id: string, options?: RequestOptions): Promise<ApiResult<ApiKey>> {
  return executeRevokeApiKey(id, options);
}

async function executeRevokeApiKey(
  id: string,
  options?: RequestOptions,
): Promise<ApiResult<ApiKey>> {
  const result = await api.post<unknown>(`${apiKeyPath(id)}/revoke`, undefined, options);
  if (!result || !result.ok)
    return result ?? { ok: false, error: malformedError('API request failed') };
  const parsed = ApiKeySchema.safeParse(result.data);
  if (!parsed.success) return { ok: false, error: malformedError(parsed.error) };
  return { ok: true, data: parsed.data };
}

export function deleteApiKey(id: string, options?: RequestOptions): Promise<ApiResult<void>> {
  return executeDeleteApiKey(id, options);
}

async function executeDeleteApiKey(id: string, options?: RequestOptions): Promise<ApiResult<void>> {
  const result = await api.delete<unknown>(apiKeyPath(id), options);
  if (!result || !result.ok)
    return result ?? { ok: false, error: malformedError('API request failed') };
  return { ok: true, data: undefined };
}
