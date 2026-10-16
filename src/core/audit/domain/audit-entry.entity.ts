export const AUDIT_MAX_ENTRIES = 10_000 as const;
export const AUDIT_TTL_SEC = 30 * 24 * 60 * 60;
export const AUDIT_ACTIONS = [
  'auth.failed',
  'auth.expired',
  'auth.revoked',
  'route.create',
  'route.update',
  'route.delete',
  'config.reload',
  'tenant.create',
  'tenant.update',
  'tenant.delete',
  'api_key.create',
  'api_key.revoke',
  'circuit.reset',
] as const;
export type AuditAction = (typeof AUDIT_ACTIONS)[number] | (string & {});

export interface AuditEntry {
  readonly id: string;
  readonly tenantId: string;
  readonly actor: string;
  readonly action: string;
  readonly resource: string;
  readonly resourceId?: string;
  readonly requestId?: string;
  readonly timestamp: string;
  readonly result: string;
  readonly detail?: string;
}

export interface AuditListFilter {
  readonly tenantId?: string;
  readonly actor?: string;
  readonly action?: string;
  readonly resource?: string;
  readonly resourceId?: string;
  readonly requestId?: string;
  readonly result?: string;
  readonly from?: string;
  readonly to?: string;
  readonly limit: number;
}

import { randomUUID } from 'node:crypto';

export function createAuditEntry(
  input: Omit<AuditEntry, 'id' | 'timestamp'> & {
    readonly id?: string;
    readonly timestamp?: string;
  },
): AuditEntry {
  return Object.freeze({
    id: input.id ?? randomUUID(),
    tenantId: input.tenantId,
    actor: input.actor,
    action: input.action,
    resource: input.resource,
    resourceId: input.resourceId,
    requestId: input.requestId,
    timestamp: input.timestamp ?? new Date().toISOString(),
    result: input.result,
    detail: input.detail,
  });
}
