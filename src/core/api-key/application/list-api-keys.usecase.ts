import { Inject, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { ValidationFailedError } from '@/shared/errors/index.js';
import { API_KEY_REPOSITORY } from '../domain/api-key.repository.token.js';
import type { ApiKeyRepositoryPort } from '../domain/api-key.repository.port.js';
import type { ApiKey } from '../domain/api-key.entity.js';

const ListApiKeysSchema = z.object({
  tenantId: z
    .string()
    .min(1)
    .max(128)
    .regex(/^[A-Za-z0-9_-]+$/),
});

export type PublicApiKey = Omit<ApiKey, 'keyHash'>;
export interface ListApiKeysOutput {
  readonly items: readonly PublicApiKey[];
}

@Injectable()
export class ListApiKeysUseCase {
  constructor(@Inject(API_KEY_REPOSITORY) private readonly repository: ApiKeyRepositoryPort) {}

  async execute(rawInput: unknown): Promise<ListApiKeysOutput> {
    const result = ListApiKeysSchema.safeParse(rawInput);
    if (!result.success) {
      throw new ValidationFailedError('Input API key tidak valid', {
        fieldErrors: result.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          code: issue.code,
          message: issue.message,
        })),
      });
    }
    const items = await this.repository.findAll(result.data.tenantId);
    return {
      items: items.map(({ keyHash: _keyHash, ...apiKey }) => apiKey),
    };
  }
}
