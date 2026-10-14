import { describe, expect, it, vi } from 'vitest';
import { VerifyTokenUseCase } from '../application/verify-token.usecase.js';
import {
  AuthInvalidError,
  AuthMissingError,
  AuthTokenExpiredError,
  AuthTokenMalformedError,
} from '@/shared/errors/index.js';
import type { TokenVerifierPort } from '../domain/token-verifier.port.js';
import type { Principal } from '../domain/principal.entity.js';

const PRINCIPAL: Principal = {
  kind: 'user',
  userId: 'user_1',
  tenantId: 'tenant_1',
  roles: [],
  scopes: [],
  expiresAt: new Date('2026-10-14T10:00:00.000Z'),
  claims: {},
};

function verifier(impl: TokenVerifierPort['verify']): TokenVerifierPort {
  return { verify: vi.fn(impl) };
}

describe('VerifyTokenUseCase', () => {
  it('throws AuthMissingError when token is missing', async () => {
    const uc = new VerifyTokenUseCase(verifier(async () => PRINCIPAL));
    await expect(uc.execute(undefined)).rejects.toBeInstanceOf(AuthMissingError);
    await expect(uc.execute('   ')).rejects.toBeInstanceOf(AuthMissingError);
  });

  it('strips Bearer prefix and delegates to verifier', async () => {
    const verify = vi.fn(async () => PRINCIPAL);
    const uc = new VerifyTokenUseCase({ verify });
    const result = await uc.execute('Bearer token-123');
    expect(verify).toHaveBeenCalledWith('token-123');
    expect(result).toEqual(PRINCIPAL);
  });

  it('propagates verifier errors', async () => {
    const uc = new VerifyTokenUseCase(
      verifier(async () => {
        throw new AuthInvalidError('bad');
      }),
    );
    await expect(uc.execute('token-123')).rejects.toBeInstanceOf(AuthInvalidError);
  });

  it('propagates invalid token errors', async () => {
    const uc = new VerifyTokenUseCase(
      verifier(async () => {
        throw new AuthInvalidError('invalid token');
      }),
    );
    await expect(uc.execute('token-invalid')).rejects.toBeInstanceOf(AuthInvalidError);
  });

  it('propagates expired token errors', async () => {
    const uc = new VerifyTokenUseCase(
      verifier(async () => {
        throw new AuthTokenExpiredError('expired token');
      }),
    );
    await expect(uc.execute('token-expired')).rejects.toBeInstanceOf(AuthTokenExpiredError);
  });

  it('propagates malformed token errors', async () => {
    const uc = new VerifyTokenUseCase(
      verifier(async () => {
        throw new AuthTokenMalformedError('malformed token');
      }),
    );
    await expect(uc.execute('token-malformed')).rejects.toBeInstanceOf(AuthTokenMalformedError);
  });

  it('rejects empty tokens after Bearer stripping', async () => {
    const verify = vi.fn(async () => PRINCIPAL);
    const uc = new VerifyTokenUseCase({ verify });
    await expect(uc.execute('Bearer   ')).rejects.toBeInstanceOf(AuthMissingError);
    expect(verify).not.toHaveBeenCalled();
  });

  it('does not invoke verifier for missing token', async () => {
    const verify = vi.fn(async () => PRINCIPAL);
    const uc = new VerifyTokenUseCase({ verify });
    await expect(uc.execute(undefined)).rejects.toBeInstanceOf(AuthMissingError);
    expect(verify).not.toHaveBeenCalled();
  });
});
