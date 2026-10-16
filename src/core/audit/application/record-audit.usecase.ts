import { Inject, Injectable, Logger } from '@nestjs/common';
import { z } from 'zod';
import { AUDIT_REPOSITORY } from '../domain/audit.repository.token.js';
import type { AuditRepositoryPort } from '../domain/audit.repository.port.js';
import { ValidationFailedError } from '@/shared/errors/index.js';
import { createAuditEntry, type AuditEntry } from '../domain/audit-entry.entity.js';

const RecordAuditSchema = z.object({
  tenantId: z
    .string()
    .min(1)
    .max(128)
    .regex(/^[A-Za-z0-9_-]+$/),
  actor: z.string().min(1).max(128),
  action: z
    .string()
    .min(1)
    .max(128)
    .regex(/^[A-Za-z0-9._:-]+$/),
  resource: z.string().min(1).max(256),
  resourceId: z.string().min(1).max(128).optional(),
  requestId: z.string().min(1).max(128).optional(),
  result: z.string().min(1).max(32),
  detail: z.string().max(4000).optional(),
  timestamp: z.string().datetime().optional(),
});

export interface RecordAuditInput {
  readonly tenantId: string;
  readonly actor: string;
  readonly action: string;
  readonly resource: string;
  readonly resourceId?: string;
  readonly requestId?: string;
  readonly result: string;
  readonly detail?: string;
  readonly timestamp?: string;
}

function sanitizeDetail(detail: string | undefined): string | undefined {
  if (detail === undefined) return undefined;
  const cleaned = detail
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 1000);
  return cleaned.length > 0 ? cleaned : undefined;
}

@Injectable()
export class RecordAuditUseCase {
  private readonly logger = new Logger(RecordAuditUseCase.name);

  constructor(@Inject(AUDIT_REPOSITORY) private readonly repository: AuditRepositoryPort) {}

  async execute(rawInput: unknown): Promise<AuditEntry> {
    const parsed = RecordAuditSchema.safeParse(rawInput);
    if (!parsed.success) {
      throw new ValidationFailedError('Input audit tidak valid', {
        fieldErrors: parsed.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          code: issue.code,
          message: issue.message,
        })),
      });
    }
    const data = parsed.data;
    const entry = createAuditEntry({
      tenantId: data.tenantId,
      actor: data.actor,
      action: data.action,
      resource: data.resource,
      resourceId: data.resourceId,
      requestId: data.requestId,
      result: data.result,
      detail: sanitizeDetail(data.detail),
      timestamp: data.timestamp,
    });

    const repo = this.repository as unknown as Record<
      string,
      (value: AuditEntry) => Promise<unknown>
    >;
    if (typeof repo.append === 'function') {
      return (await repo.append(entry)) as AuditEntry;
    }
    if (typeof repo.record === 'function') {
      return (await repo.record(entry)) as AuditEntry;
    }
    if (typeof repo.save === 'function') {
      return (await repo.save(entry)) as AuditEntry;
    }
    if (typeof repo.create === 'function') {
      return (await repo.create(entry)) as AuditEntry;
    }
    throw new Error('Audit repository save method not available');
  }
}
