import { Inject, Injectable, Logger } from '@nestjs/common';
import type { Redis } from 'ioredis';
import { z } from 'zod';
import { REDIS_CLIENT } from '@/infrastructure/redis/redis.constants.js';
import type { AuditRepositoryPort } from '@/core/audit/domain/audit.repository.port.js';
import type { AuditEntry, AuditListFilter } from '@/core/audit/domain/audit-entry.entity.js';
import {
  AUDIT_MAX_ENTRIES,
  AUDIT_TTL_SEC,
  createAuditEntry,
} from '@/core/audit/domain/audit-entry.entity.js';
import { InternalDependencyError } from '@/shared/errors/index.js';

const AuditEntrySchema = z.object({
  id: z.string().min(1).max(128),
  tenantId: z.string().min(1).max(128),
  actor: z.string().min(1).max(128),
  action: z.string().min(1).max(128),
  resource: z.string().min(1).max(256),
  resourceId: z.string().min(1).max(128).optional(),
  requestId: z.string().min(1).max(128).optional(),
  timestamp: z.string().datetime(),
  result: z.string().min(1).max(32),
  detail: z.string().max(1000).optional(),
});

@Injectable()
export class RedisAuditRepository implements AuditRepositoryPort {
  private readonly logger = new Logger(RedisAuditRepository.name);

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async append(entry: AuditEntry): Promise<AuditEntry> {
    try {
      const validated = AuditEntrySchema.parse(entry);
      const serialized = JSON.stringify(validated);
      const tenantKey = this.tenantKey(entry.tenantId);
      const globalKey = this.globalKey();
      const pipeline = this.redis.pipeline();
      pipeline.lpush(tenantKey, serialized);
      pipeline.ltrim(tenantKey, 0, AUDIT_MAX_ENTRIES - 1);
      pipeline.expire(tenantKey, AUDIT_TTL_SEC);
      pipeline.lpush(globalKey, serialized);
      pipeline.ltrim(globalKey, 0, AUDIT_MAX_ENTRIES - 1);
      pipeline.expire(globalKey, AUDIT_TTL_SEC);
      await pipeline.exec();
      return createAuditEntry(validated);
    } catch (cause) {
      this.logger.warn({ err: cause }, 'Failed to append audit entry');
      throw new InternalDependencyError('Audit store unavailable', { cause });
    }
  }

  record(entry: AuditEntry): Promise<AuditEntry> {
    return this.append(entry);
  }

  save(entry: AuditEntry): Promise<AuditEntry> {
    return this.append(entry);
  }

  create(entry: AuditEntry): Promise<AuditEntry> {
    return this.append(entry);
  }

  async list(filter?: AuditListFilter | string | null): Promise<readonly AuditEntry[]> {
    const normalized = this.normalizeFilter(filter);
    const keys = normalized.tenantId ? [this.tenantKey(normalized.tenantId)] : [this.globalKey()];
    const limit = Math.max(1, Math.min(normalized.limit ?? 100, AUDIT_MAX_ENTRIES));
    const items: AuditEntry[] = [];
    for (const key of keys) {
      try {
        const raw = await this.redis.lrange(key, 0, limit - 1);
        for (const entry of raw) {
          const parsed = this.parse(entry);
          if (parsed && this.matches(parsed, normalized)) items.push(parsed);
        }
      } catch (cause) {
        this.logger.warn({ err: cause, key }, 'Failed to list audit entries');
      }
    }
    return items
      .sort((left, right) => Date.parse(right.timestamp) - Date.parse(left.timestamp))
      .slice(0, limit);
  }

  findAll(filter?: AuditListFilter | string | null): Promise<readonly AuditEntry[]> {
    return this.list(filter);
  }

  listAudit(filter?: AuditListFilter | string | null): Promise<readonly AuditEntry[]> {
    return this.list(filter);
  }

  listByTenant(tenantId: string): Promise<readonly AuditEntry[]> {
    return this.list({ tenantId, limit: AUDIT_MAX_ENTRIES } as AuditListFilter);
  }

  find(filter?: AuditListFilter | string | null): Promise<readonly AuditEntry[]> {
    return this.list(filter);
  }

  query(filter?: AuditListFilter | string | null): Promise<readonly AuditEntry[]> {
    return this.list(filter);
  }

  search(filter?: AuditListFilter | string | null): Promise<readonly AuditEntry[]> {
    return this.list(filter);
  }

  private normalizeFilter(filter: AuditListFilter | string | null | undefined): AuditListFilter {
    if (typeof filter === 'string') {
      return { tenantId: filter, limit: 100 } as AuditListFilter;
    }
    return (filter ?? { limit: 100 }) as AuditListFilter;
  }

  private matches(entry: AuditEntry, filter: AuditListFilter): boolean {
    if (filter.tenantId && entry.tenantId !== filter.tenantId) return false;
    if (filter.actor && entry.actor !== filter.actor) return false;
    if (filter.action && entry.action !== filter.action) return false;
    if (filter.resource && entry.resource !== filter.resource) return false;
    if (filter.resourceId && entry.resourceId !== filter.resourceId) return false;
    if (filter.requestId && entry.requestId !== filter.requestId) return false;
    if (filter.result && entry.result !== filter.result) return false;
    const fromMs = filter.from ? Date.parse(filter.from) : NaN;
    const toMs = filter.to ? Date.parse(filter.to) : NaN;
    const ts = Date.parse(entry.timestamp);
    if (!Number.isNaN(fromMs) && (Number.isNaN(ts) || ts < fromMs)) return false;
    if (!Number.isNaN(toMs) && (Number.isNaN(ts) || ts > toMs)) return false;
    return true;
  }

  private parse(raw: string): AuditEntry | null {
    try {
      const decoded = JSON.parse(raw) as unknown;
      const parsed = AuditEntrySchema.safeParse(decoded);
      if (!parsed.success) return null;
      return createAuditEntry(parsed.data);
    } catch {
      return null;
    }
  }

  private tenantKey(tenantId: string): string {
    return `audit:tenant:${tenantId}`;
  }

  private globalKey(): string {
    return 'audit:all';
  }
}
