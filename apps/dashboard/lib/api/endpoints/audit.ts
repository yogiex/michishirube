import { api, type ApiResult, type RequestOptions } from '../client';
import type { AuditListQuery } from '../query-keys';
import type { PaginatedResponse } from './contracts';

export type AuditStatus = 'success' | 'warning' | 'error';

export interface AuditEntry {
  readonly id: string;
  readonly timestamp: string;
  readonly actor: string;
  readonly action: string;
  readonly target: string;
  readonly status: AuditStatus;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export function listAuditEntries(
  query: AuditListQuery = {},
  options?: RequestOptions,
): Promise<ApiResult<PaginatedResponse<AuditEntry>>> {
  return api.get('/admin/audit', {
    ...options,
    query: { ...query },
  }) as Promise<ApiResult<PaginatedResponse<AuditEntry>>>;
}
