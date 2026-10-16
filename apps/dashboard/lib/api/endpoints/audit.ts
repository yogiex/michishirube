import { api, ApiError, type ApiResult, type RequestOptions } from '../client';
import type { AuditListQuery } from '../query-keys';
import { AuditEntrySchema, type AuditEntry } from '../schemas/audit';
import { PaginatedResponseSchema } from '../schemas/contracts';

export type { AuditEntry } from '../schemas/audit';
export type AuditStatus = AuditEntry['status'];

const AuditListSchema = PaginatedResponseSchema(AuditEntrySchema);

function malformedError(cause: unknown): ApiError {
  return new ApiError(
    500,
    'GW_FRONTEND_MALFORMED_RESPONSE',
    'Endpoint audit tidak valid',
    undefined,
    undefined,
    {
      cause: cause instanceof Error ? cause : undefined,
    },
  );
}

export function listAuditEntries(
  query: AuditListQuery = {},
  options?: RequestOptions,
): Promise<ApiResult<AuditEntry[]>> {
  return executeListAuditEntries(query, options);
}

async function executeListAuditEntries(
  query: AuditListQuery,
  options?: RequestOptions,
): Promise<ApiResult<AuditEntry[]>> {
  const result = await api.get<unknown>('/admin/audit', { ...options, query: { ...query } });
  if (!result || !result.ok)
    return result ?? { ok: false, error: malformedError('API request failed') };
  const parsed = AuditListSchema.safeParse(result.data);
  if (!parsed.success) return { ok: false, error: malformedError(parsed.error) };
  return { ok: true, data: parsed.data.items };
}
