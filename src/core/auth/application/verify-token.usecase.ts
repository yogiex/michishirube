import { Inject, Injectable } from '@nestjs/common';
import { AuthInvalidError, AuthMissingError } from '@/shared/errors/index.js';
import type { Principal } from '@/core/auth/domain/principal.entity.js';
import { TOKEN_VERIFIER, type TokenVerifierPort } from '@/core/auth/domain/token-verifier.port.js';

@Injectable()
export class VerifyTokenUseCase {
  constructor(
    @Inject(TOKEN_VERIFIER)
    private readonly verifier: TokenVerifierPort,
  ) {}

  async execute(token: string | undefined): Promise<Principal> {
    if (!token || token.trim().length === 0) {
      throw new AuthMissingError('Token autentikasi tidak ditemukan');
    }
    const normalized = token.startsWith('Bearer ')
      ? token.slice('Bearer '.length).trim()
      : token.trim();

    if (normalized.length === 0) {
      throw new AuthMissingError('Token autentikasi tidak ditemukan');
    }

    try {
      return await this.verifier.verify(normalized);
    } catch (cause) {
      if (cause instanceof Error === false) {
        throw new AuthInvalidError('Token tidak valid');
      }
      throw cause;
    }
  }
}
