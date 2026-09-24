import { Inject, Injectable, Logger } from '@nestjs/common';
import { z } from 'zod';
import {
  IdempotencyConflictError,
  IdempotencyExpiredError,
  IdempotencyInProgressError,
  IdempotencyStoreUnavailableError,
  ValidationFailedError,
} from '@/shared/errors/index.js';

export const IDEMPOTENCY_STORE = 'IDEMPOTENCY_STORE';

export const IdempotencyBeginSchema = z.object({
  key: z.string().trim().min(1).max(255),
  tenantId: z.string().min(1).max(128),
  requestHash: z
    .string()
    .min(1)
    .max(128)
    .regex(/^[A-Za-z0-9_-]+$/),
  ttlSeconds: z.number().int().min(1).max(86_400).default(86_400),
});

export type IdempotencyBeginInput = z.input<typeof IdempotencyBeginSchema>;

export type IdempotencyRecordState = 'acquired' | 'in_progress' | 'completed' | 'expired';

export interface IdempotencyRecord {
  readonly key: string;
  readonly tenantId: string;
  readonly requestHash: string;
  readonly state: IdempotencyRecordState;
  readonly response?: unknown;
  readonly startedAt: string;
  readonly expiresAt: string;
}

export interface IdempotencyStorePort {
  begin(
    key: string,
    tenantId: string,
    requestHash: string,
    ttlSeconds: number,
  ): Promise<IdempotencyRecord>;
  complete(key: string, tenantId: string, response: unknown): Promise<void>;
}

export type IdempotencyBeginOutput =
  | { readonly kind: 'started'; readonly record: IdempotencyRecord }
  | { readonly kind: 'replay'; readonly response: unknown }
  | { readonly kind: 'in_progress'; readonly retryAfter: number };

@Injectable()
export class BeginIdempotentRequestUseCase {
  private readonly logger = new Logger(BeginIdempotentRequestUseCase.name);

  constructor(@Inject(IDEMPOTENCY_STORE) private readonly store: IdempotencyStorePort) {}

  async execute(rawInput: IdempotencyBeginInput): Promise<IdempotencyBeginOutput> {
    const input = this.validateInput(rawInput);
    let record: IdempotencyRecord;
    try {
      record = await this.store.begin(
        input.key,
        input.tenantId,
        input.requestHash,
        input.ttlSeconds,
      );
    } catch (cause) {
      this.logger.error({ tenantId: input.tenantId }, 'Idempotency store unavailable during begin');
      throw new IdempotencyStoreUnavailableError('Idempotency store tidak tersedia', { cause });
    }

    if (record.state === 'expired') {
      throw new IdempotencyExpiredError('Idempotency record sudah kedaluwarsa');
    }
    if (record.requestHash !== input.requestHash) {
      throw new IdempotencyConflictError('Idempotency key digunakan dengan payload berbeda');
    }
    if (record.state === 'completed') {
      return { kind: 'replay', response: record.response };
    }
    if (record.state === 'acquired') {
      return { kind: 'started', record };
    }
    if (record.state === 'in_progress') {
      const retryAfter = Math.max(1, Math.ceil((Date.parse(record.expiresAt) - Date.now()) / 1000));
      throw new IdempotencyInProgressError('Permintaan idempotent masih diproses', { retryAfter });
    }
    return { kind: 'started', record };
  }

  private validateInput(rawInput: IdempotencyBeginInput): z.output<typeof IdempotencyBeginSchema> {
    const result = IdempotencyBeginSchema.safeParse(rawInput);
    if (result.success) return result.data;
    throw new ValidationFailedError('Input idempotency tidak valid', {
      fieldErrors: result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        code: issue.code,
        message: issue.message,
      })),
    });
  }
}
