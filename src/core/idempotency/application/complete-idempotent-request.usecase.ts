import { Inject, Injectable, Logger } from '@nestjs/common';
import { IdempotencyStoreUnavailableError, ValidationFailedError } from '@/shared/errors/index.js';
import { z } from 'zod';
import {
  IDEMPOTENCY_STORE,
  type IdempotencyStorePort,
} from './begin-idempotent-request.usecase.js';

export const CompleteIdempotentRequestSchema = z.object({
  key: z.string().trim().min(1).max(255),
  tenantId: z.string().min(1).max(128),
  response: z.unknown(),
});

export type CompleteIdempotentRequestInput = z.input<typeof CompleteIdempotentRequestSchema>;

@Injectable()
export class CompleteIdempotentRequestUseCase {
  private readonly logger = new Logger(CompleteIdempotentRequestUseCase.name);

  constructor(@Inject(IDEMPOTENCY_STORE) private readonly store: IdempotencyStorePort) {}

  async execute(rawInput: CompleteIdempotentRequestInput): Promise<void> {
    const result = CompleteIdempotentRequestSchema.safeParse(rawInput);
    if (!result.success) {
      throw new ValidationFailedError('Input completion idempotency tidak valid', {
        fieldErrors: result.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          code: issue.code,
          message: issue.message,
        })),
      });
    }

    try {
      await this.store.complete(result.data.key, result.data.tenantId, result.data.response);
    } catch (cause) {
      this.logger.error(
        { tenantId: result.data.tenantId },
        'Idempotency store unavailable during completion',
      );
      throw new IdempotencyStoreUnavailableError('Idempotency store tidak tersedia', { cause });
    }
  }
}
