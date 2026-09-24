import { randomUUID } from 'node:crypto';
import { Inject, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { InternalDependencyError, ValidationFailedError } from '@/shared/errors/index.js';
import { API_KEY_REPOSITORY } from '../domain/api-key.repository.token.js';
import { API_KEY_HASH_SERVICE } from '../domain/api-key-hash.service.token.js';
import type { ApiKeyHashService } from '../domain/api-key-hash.service.js';
import type { IssuedApiKey } from '../domain/api-key.entity.js';
import type { ApiKeyRepositoryPort } from '../domain/api-key.repository.port.js';

const DAY_MS = 86_400_000;

export const IssueApiKeySchema = z.object({
  tenantId: z
    .string()
    .min(1)
    .max(128)
    .regex(/^[A-Za-z0-9_-]+$/),
  name: z.string().trim().min(1).max(128),
  scopes: z.array(z.string().min(1).max(128)).min(1).max(100),
  expiresInDays: z.number().int().min(1).max(365).default(90),
});

export type IssueApiKeyInput = z.input<typeof IssueApiKeySchema>;
export type ValidIssueApiKeyInput = z.output<typeof IssueApiKeySchema>;

@Injectable()
export class IssueApiKeyUseCase {
  constructor(
    @Inject(API_KEY_REPOSITORY) private readonly repository: ApiKeyRepositoryPort,
    @Inject(API_KEY_HASH_SERVICE) private readonly hasher: ApiKeyHashService,
  ) {}

  async execute(rawInput: IssueApiKeyInput): Promise<IssuedApiKey> {
    const input = this.validateInput(rawInput);
    const plaintextKey = this.hasher.generatePlaintext();
    const now = new Date();
    const apiKey = {
      id: randomUUID(),
      name: input.name,
      tenantId: input.tenantId,
      keyHash: await this.hasher.hash(plaintextKey),
      keyPrefix: this.hasher.displayPrefix(plaintextKey),
      scopes: [...new Set(input.scopes)],
      status: 'active' as const,
      usageCount: 0,
      createdAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + input.expiresInDays * DAY_MS).toISOString(),
    };

    const created = await this.repository.create(apiKey, this.hasher.indexHash(plaintextKey));
    if (!created) {
      throw new InternalDependencyError('API key tidak dapat disimpan', {
        meta: { tenantId: input.tenantId, keyId: apiKey.id },
      });
    }
    return { apiKey, plaintextKey };
  }

  private validateInput(rawInput: IssueApiKeyInput): ValidIssueApiKeyInput {
    const result = IssueApiKeySchema.safeParse(rawInput);
    if (result.success) return result.data;
    throw new ValidationFailedError('Input API key tidak valid', {
      fieldErrors: result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        code: issue.code,
        message: issue.message,
      })),
    });
  }
}
