export { AUDIT_REPOSITORY } from './audit.repository.token.js';
import type { AuditEntry, AuditListFilter } from './audit-entry.entity.js';

export interface AuditRepositoryPort {
  append?(entry: AuditEntry): Promise<AuditEntry>;
  record?(entry: AuditEntry): Promise<AuditEntry>;
  save?(entry: AuditEntry): Promise<AuditEntry>;
  create?(entry: AuditEntry): Promise<AuditEntry>;
  list?(filter: AuditListFilter): Promise<readonly AuditEntry[]>;
  listAudit?(filter: AuditListFilter): Promise<readonly AuditEntry[]>;
  findAll?(filter: AuditListFilter): Promise<readonly AuditEntry[]>;
  find?(filter: AuditListFilter): Promise<readonly AuditEntry[]>;
  query?(filter: AuditListFilter): Promise<readonly AuditEntry[]>;
  search?(filter: AuditListFilter): Promise<readonly AuditEntry[]>;
  listByTenant?(tenantId: string): Promise<readonly AuditEntry[]>;
}

// Alias token re-export already above. Re-export entity types for convenience.
export type { AuditEntry, AuditListFilter } from './audit-entry.entity.js';
