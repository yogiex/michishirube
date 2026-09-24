import { Inject, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { ValidationFailedError } from '@/shared/errors/index.js';
import { API_KEY_REPOSITORY } from '../domain/api-key.repository.token.js';
import type { ApiKeyRepositoryPort } from '../domain/api-key.repository.port.js';

const RevokeApiKeySchema = z.object({
  id: z.string().uuid(),
  tenantId: z
    .string()
    .min(1)
    .max(128)
    .regex(/^[A-Za-z0-9_-]+$/),
});

export type RevokeApiKeyInput = z.infer<typeof RevokeApiKeySchema>;
export interface RevokeApiKeyOutput {
  readonly revoked: boolean;
}

@Injectable()
export class RevokeApiKeyUseCase {
  constructor(@Inject(API_KEY_REPOSITORY) private readonly repository: ApiKeyRepositoryPort) {}

  async execute(rawInput: unknown): Promise<RevokeApiKeyOutput> {
    const result = RevokeApiKeySchema.safeParse(rawInput);
    if (!result.success) {
      throw new ValidationFailedError('Input API key tidak valid', {
        fieldErrors: result.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          code: issue.code,
          message: issue.message,
        })),
      });
    }
    return { revoked: await this.repository.revoke(result.data.id, result.data.tenantId) };
  }
}
