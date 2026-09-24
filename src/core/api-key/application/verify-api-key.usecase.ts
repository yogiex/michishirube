import { Inject, Injectable, Logger } from '@nestjs/common';
import { z } from 'zod';
import { createPrincipal, type Principal } from '@/core/auth/domain/principal.entity.js';
import {
  AuthApiKeyExpiredError,
  AuthApiKeyInvalidError,
  AuthApiKeyRevokedError,
} from '@/shared/errors/index.js';
import type { Option } from '@/shared/types/option.type.js';
import { API_KEY_HASH_SERVICE } from '../domain/api-key-hash.service.token.js';
import { API_KEY_REPOSITORY } from '../domain/api-key.repository.token.js';
import type { ApiKeyHashService } from '../domain/api-key-hash.service.js';
import type { ApiKey } from '../domain/api-key.entity.js';
import type { ApiKeyRepositoryPort } from '../domain/api-key.repository.port.js';

const VerifyApiKeySchema = z.object({ plaintextKey: z.string().min(1).max(512) });

export interface VerifyApiKeyInput {
  readonly plaintextKey: string;
}

export interface VerifyApiKeyOutput {
  readonly apiKey: ApiKey;
  readonly principal: Principal;
}

@Injectable()
export class VerifyApiKeyUseCase {
  private readonly logger = new Logger(VerifyApiKeyUseCase.name);

  constructor(
    @Inject(API_KEY_REPOSITORY) private readonly repository: ApiKeyRepositoryPort,
    @Inject(API_KEY_HASH_SERVICE) private readonly hasher: ApiKeyHashService,
  ) {}

  async execute(rawInput: VerifyApiKeyInput): Promise<VerifyApiKeyOutput> {
    const input = VerifyApiKeySchema.safeParse(rawInput);
    if (!input.success || !this.hasher.isValidFormat(input.data.plaintextKey)) {
      throw new AuthApiKeyInvalidError('API key tidak valid');
    }

    const found = await this.repository.findByPlaintext(input.data.plaintextKey);
    const apiKey = this.requireActive(found);
    const principal = this.toPrincipal(apiKey);
    void this.recordUsage(apiKey);
    return { apiKey, principal };
  }

  private requireActive(found: Option<ApiKey>): ApiKey {
    if (!found.some) throw new AuthApiKeyInvalidError('API key tidak valid');
    if (found.value.status === 'revoked') {
      throw new AuthApiKeyRevokedError('API key telah dicabut');
    }
    if (
      found.value.status === 'expired' ||
      (found.value.expiresAt !== undefined && Date.parse(found.value.expiresAt) <= Date.now())
    ) {
      throw new AuthApiKeyExpiredError('API key telah kedaluwarsa');
    }
    if (found.value.status !== 'active') {
      throw new AuthApiKeyInvalidError('API key tidak valid');
    }
    return found.value;
  }

  private toPrincipal(apiKey: ApiKey): Principal {
    if (apiKey.expiresAt === undefined) {
      throw new AuthApiKeyInvalidError('API key tidak valid');
    }
    return createPrincipal({
      kind: 'api-key',
      userId: `apikey:${apiKey.id}`,
      tenantId: apiKey.tenantId,
      scopes: apiKey.scopes,
      issuedAt: new Date(apiKey.createdAt),
      expiresAt: new Date(apiKey.expiresAt),
      claims: { apiKeyId: apiKey.id },
    });
  }

  private async recordUsage(apiKey: ApiKey): Promise<void> {
    try {
      await this.repository.incrementUsage(apiKey.id, new Date());
    } catch (cause) {
      this.logger.warn(
        {
          keyId: apiKey.id,
          tenantId: apiKey.tenantId,
          err: cause,
        },
        'API key usage increment failed',
      );
    }
  }
}
