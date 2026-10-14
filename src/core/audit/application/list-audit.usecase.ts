import { Inject, Injectable, Logger } from '@nestjs/common';
import { z } from 'zod';
import { AUDIT_REPOSITORY } from '../domain/audit.repository.token.js';
import type { AuditRepositoryPort } from '../domain/audit.repository.port.js';
import { ValidationFailedError } from '@/shared/errors/index.js';
import {
  createAuditEntry,
  type AuditEntry,
  type AuditListFilter,
} from '../domain/audit-entry.entity.js';

const ListAuditSchema = z.object({
  tenantId: z
    .string()
    .min(1)
    .max(128)
    .regex(/^[A-Za-z0-9_-]+$/)
    .optional(),
  actor: z.string().min(1).max(128).optional(),
  action: z.string().min(1).max(128).optional(),
  resource: z.string().min(1).max(256).optional(),
  resourceId: z.string().min(1).max(128).optional(),
  requestId: z.string().min(1).max(128).optional(),
  result: z.string().min(1).max(32).optional(),
  from: z.string().min(1).max(64).optional(),
  to: z.string().min(1).max(64).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  page: z.coerce.number().int().min(1).default(1).optional(),
});

export interface ListAuditInput {
  readonly tenantId?: string;
  readonly actor?: string;
  readonly action?: string;
  readonly resource?: string;
  readonly resourceId?: string;
  readonly requestId?: string;
  readonly result?: string;
  readonly from?: string;
  readonly to?: string;
  readonly limit?: number;
  readonly page?: number;
}

export interface ListAuditOutput {
  readonly items: readonly AuditEntry[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
}

@Injectable()
export class ListAuditUseCase {
  private readonly logger = new Logger(ListAuditUseCase.name);

  constructor(@Inject(AUDIT_REPOSITORY) private readonly repository: AuditRepositoryPort) {}

  async execute(rawInput: unknown): Promise<ListAuditOutput> {
    const parsed = ListAuditSchema.safeParse(rawInput ?? {});
    if (!parsed.success) {
      throw new ValidationFailedError('Input audit list tidak valid', {
        fieldErrors: parsed.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          code: issue.code,
          message: issue.message,
        })),
      });
    }
    const data = parsed.data;

    const filter: AuditListFilter = {
      tenantId: data.tenantId,
      actor: data.actor,
      action: data.action,
      resource: data.resource,
      resourceId: data.resourceId,
      requestId: data.requestId,
      result: data.result,
      from: data.from,
      to: data.to,
      limit: data.limit,
    };

    const repo = this.repository as unknown as Record<string, (arg: unknown) => Promise<unknown>>;
    let raw: unknown;
    if (typeof repo.list === 'function') {
      raw = await repo.list(filter);
    } else if (typeof repo.listAudit === 'function') {
      raw = await repo.listAudit(filter);
    } else if (typeof repo.findAll === 'function') {
      raw = await repo.findAll(filter);
    } else if (typeof repo.find === 'function') {
      raw = await repo.find(filter);
    } else if (typeof repo.query === 'function') {
      raw = await repo.query(filter);
    } else if (typeof repo.search === 'function') {
      raw = await repo.search(filter);
    } else if (typeof repo.listByTenant === 'function' && data.tenantId) {
      raw = await repo.listByTenant(data.tenantId);
    } else {
      throw new Error('Audit repository list method not available');
    }

    const entries = Array.isArray(raw) ? (raw as AuditEntry[]) : [];
    const validated = entries.map((entry) => {
      try {
        return createAuditEntry(entry);
      } catch {
        return entry;
      }
    });

    const fromMs = data.from ? Date.parse(data.from) : NaN;
    const toMs = data.to ? Date.parse(data.to) : NaN;

    const filtered = validated.filter((entry) => {
      if (data.tenantId && entry.tenantId !== data.tenantId) return false;
      if (data.actor && entry.actor !== data.actor) return false;
      if (data.action && entry.action !== data.action) return false;
      if (data.resource && entry.resource !== data.resource) return false;
      if (data.resourceId && entry.resourceId !== data.resourceId) return false;
      if (data.requestId && entry.requestId !== data.requestId) return false;
      if (data.result && entry.result !== data.result) return false;
      const ts = Date.parse(entry.timestamp);
      if (!Number.isNaN(fromMs) && (Number.isNaN(ts) || ts < fromMs)) return false;
      if (!Number.isNaN(toMs) && (Number.isNaN(ts) || ts > toMs)) return false;
      return true;
    });

    const page = data.page ?? 1;
    const limit = data.limit;
    const start = (page - 1) * limit;
    const items = filtered.slice(start, start + limit);

    return { items, total: filtered.length, page, limit };
  }
}
