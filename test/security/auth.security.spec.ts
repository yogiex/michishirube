import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ConfigService } from '@nestjs/config';
import { JwtVerifierAdapter } from '@/infrastructure/jwt/jwt-verifier.adapter.js';
import { JwksClient } from '@/infrastructure/jwt/jwks.client.js';
import { VerifyTokenUseCase } from '@/core/auth/application/verify-token.usecase.js';
import { AuthGuard } from '@/guards/auth.guard.js';
import {
  AuthAudienceInvalidError,
  AuthInvalidError,
  AuthIssuerInvalidError,
  AuthJwksUnavailableError,
  AuthMissingError,
  AuthSignatureInvalidError,
  AuthTokenExpiredError,
  AuthTokenMalformedError,
} from '@/shared/errors/index.js';

vi.mock('jose', async (importOriginal) => {
  const actual = await importOriginal<typeof import('jose')>();
  return {
    ...actual,
    jwtVerify: vi.fn(),
  };
});

import { jwtVerify } from 'jose';

const jwtVerifyMock = vi.mocked(jwtVerify);

function createConfig(values: Record<string, string | undefined>) {
  return {
    get: <T = unknown>(key: string): T | undefined => values[key] as T | undefined,
  } as ConfigService;
}

function reflector(meta: Record<string, unknown>) {
  return {
    getAllAndOverride: <T>(key: unknown) => meta[String(key)] as T,
  } as never;
}

describe('auth security', () => {
  let client: JwksClient;
  let config: ConfigService;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new JwksClient('http://localhost/.well-known/jwks.json');
    config = createConfig({
      'jwt.issuer': 'test-issuer',
      'jwt.audience': 'test-audience',
      'jwt.jwksUri': 'http://localhost/.well-known/jwks.json',
    });
  });

  describe('missing credentials', () => {
    it('rejects missing token at use case', async () => {
      const uc = new VerifyTokenUseCase({ verify: vi.fn() });
      await expect(uc.execute(undefined)).rejects.toBeInstanceOf(AuthMissingError);
      await expect(uc.execute('')).rejects.toBeInstanceOf(AuthMissingError);
      await expect(uc.execute('   ')).rejects.toBeInstanceOf(AuthMissingError);
      await expect(uc.execute('Bearer   ')).rejects.toBeInstanceOf(AuthMissingError);
    });

    it('rejects missing credential at guard', async () => {
      const guard = new AuthGuard(
        new VerifyTokenUseCase({ verify: vi.fn() }),
        { execute: vi.fn() } as never,
        reflector({}),
      );
      const req: Record<string, unknown> = { headers: {}, url: '/x', method: 'GET' };
      const ctx = {
        getType: () => 'http',
        switchToHttp: () => ({
          getRequest: () => req,
          getResponse: () => ({}),
          getNext: () => () => undefined,
        }),
        getHandler: () => () => undefined,
        getClass: () => class {},
      } as never;
      await expect(guard.canActivate(ctx)).rejects.toBeInstanceOf(AuthMissingError);
    });

    it('rejects missing JWKS configuration', async () => {
      const emptyConfig = createConfig({
        'jwt.issuer': 'test-issuer',
        'jwt.audience': 'test-audience',
        'jwt.jwksUri': '',
      });
      const adapter = new JwtVerifierAdapter(client, emptyConfig);
      await expect(adapter.verify('token')).rejects.toBeInstanceOf(AuthJwksUnavailableError);
    });
  });

  describe('malformed tokens', () => {
    it('rejects structurally invalid JWT', async () => {
      jwtVerifyMock.mockRejectedValue(Object.assign(new Error('bad'), { name: 'JWSInvalid' }));
      const adapter = new JwtVerifierAdapter(client, config);
      await expect(adapter.verify('not.a.jwt')).rejects.toBeInstanceOf(AuthSignatureInvalidError);
    });

    it('rejects invalid JWT payloads', async () => {
      jwtVerifyMock.mockRejectedValue(Object.assign(new Error('bad'), { name: 'JWTInvalid' }));
      const adapter = new JwtVerifierAdapter(client, config);
      await expect(adapter.verify('bad-token')).rejects.toBeInstanceOf(AuthInvalidError);
    });

    it('propagates malformed token errors from verifier', async () => {
      const verify = vi.fn(async () => {
        throw new AuthTokenMalformedError('malformed');
      });
      const uc = new VerifyTokenUseCase({ verify });
      await expect(uc.execute('malformed-token')).rejects.toBeInstanceOf(AuthTokenMalformedError);
    });
  });

  describe('wrong algorithm', () => {
    it('rejects unsupported algorithm', async () => {
      jwtVerifyMock.mockRejectedValue(
        Object.assign(new Error('alg'), { name: 'JOSEAlgNotAllowed' }),
      );
      const adapter = new JwtVerifierAdapter(client, config);
      await expect(adapter.verify('token')).rejects.toBeInstanceOf(AuthInvalidError);
    });

    it('rejects unsupported feature', async () => {
      jwtVerifyMock.mockRejectedValue(Object.assign(new Error('ns'), { name: 'JOSENotSupported' }));
      const adapter = new JwtVerifierAdapter(client, config);
      await expect(adapter.verify('token')).rejects.toBeInstanceOf(AuthInvalidError);
    });
  });

  describe('expired tokens', () => {
    it('rejects expired JWT', async () => {
      const err = Object.assign(new Error('expired'), { name: 'JWTExpired' });
      jwtVerifyMock.mockRejectedValue(err);
      const adapter = new JwtVerifierAdapter(client, config);
      await expect(adapter.verify('token')).rejects.toBeInstanceOf(AuthTokenExpiredError);
    });
  });

  describe('tampered tokens', () => {
    it('rejects invalid signature', async () => {
      const err = Object.assign(new Error('sig'), { name: 'JWSSignatureVerificationFailed' });
      jwtVerifyMock.mockRejectedValue(err);
      const adapter = new JwtVerifierAdapter(client, config);
      await expect(adapter.verify('token')).rejects.toBeInstanceOf(AuthSignatureInvalidError);
    });
  });

  describe('issuer and audience', () => {
    it('rejects wrong issuer', async () => {
      const err = Object.assign(new Error('iss'), {
        name: 'JWTClaimValidationFailed',
        claim: 'iss',
      });
      jwtVerifyMock.mockRejectedValue(err);
      const adapter = new JwtVerifierAdapter(client, config);
      await expect(adapter.verify('token')).rejects.toBeInstanceOf(AuthIssuerInvalidError);
    });

    it('rejects wrong audience', async () => {
      const err = Object.assign(new Error('aud'), {
        name: 'JWTClaimValidationFailed',
        claim: 'aud',
      });
      jwtVerifyMock.mockRejectedValue(err);
      const adapter = new JwtVerifierAdapter(client, config);
      await expect(adapter.verify('token')).rejects.toBeInstanceOf(AuthAudienceInvalidError);
    });
  });

  describe('boundary claims', () => {
    it('rejects missing exp claim', async () => {
      jwtVerifyMock.mockResolvedValue({
        payload: {
          sub: 'user-1',
          tenantId: 'tenant-1',
        },
        protectedHeader: { alg: 'RS256' },
      } as never);
      const adapter = new JwtVerifierAdapter(client, config);
      await expect(adapter.verify('token')).rejects.toBeInstanceOf(AuthInvalidError);
    });

    it('rejects missing sub claim', async () => {
      jwtVerifyMock.mockResolvedValue({
        payload: {
          tenantId: 'tenant-1',
          exp: Math.floor(Date.now() / 1000) + 3600,
        },
        protectedHeader: { alg: 'RS256' },
      } as never);
      const adapter = new JwtVerifierAdapter(client, config);
      await expect(adapter.verify('token')).rejects.toBeInstanceOf(AuthInvalidError);
    });

    it('rejects missing tenant claim', async () => {
      jwtVerifyMock.mockResolvedValue({
        payload: {
          sub: 'user-1',
          exp: Math.floor(Date.now() / 1000) + 3600,
        },
        protectedHeader: { alg: 'RS256' },
      } as never);
      const adapter = new JwtVerifierAdapter(client, config);
      await expect(adapter.verify('token')).rejects.toBeInstanceOf(AuthInvalidError);
    });

    it('accepts valid boundary token', async () => {
      jwtVerifyMock.mockResolvedValue({
        payload: {
          sub: 'user-1',
          tenantId: 'tenant-1',
          exp: Math.floor(Date.now() / 1000) + 3600,
        },
        protectedHeader: { alg: 'RS256' },
      } as never);
      const adapter = new JwtVerifierAdapter(client, config);
      await expect(adapter.verify('token')).resolves.toBeDefined();
    });

    it('handles very long token input', async () => {
      jwtVerifyMock.mockRejectedValue(Object.assign(new Error('bad'), { name: 'JWTInvalid' }));
      const adapter = new JwtVerifierAdapter(client, config);
      await expect(adapter.verify('a'.repeat(10000))).rejects.toBeInstanceOf(AuthInvalidError);
    });
  });
});
