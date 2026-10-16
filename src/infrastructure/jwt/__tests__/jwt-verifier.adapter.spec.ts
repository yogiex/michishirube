import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ConfigService } from '@nestjs/config';
import {
  AuthInvalidError,
  AuthTokenExpiredError,
  AuthSignatureInvalidError,
  AuthIssuerInvalidError,
  AuthAudienceInvalidError,
  AuthJwksUnavailableError,
} from '@/shared/errors/index.js';
import { JwtVerifierAdapter } from '../jwt-verifier.adapter.js';
import { JwksClient } from '../jwks.client.js';

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

describe('JwtVerifierAdapter', () => {
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

  it('verifies token and returns principal', async () => {
    jwtVerifyMock.mockResolvedValue({
      payload: {
        sub: 'user-1',
        tenantId: 'tenant-1',
        exp: Math.floor(Date.now() / 1000) + 3600,
        iat: Math.floor(Date.now() / 1000),
        roles: ['admin'],
        scope: 'orders:read',
      },
      protectedHeader: { alg: 'RS256' },
    } as never);

    const adapter = new JwtVerifierAdapter(client, config);
    const principal = await adapter.verify('token');

    expect(principal.userId).toBe('user-1');
    expect(principal.tenantId).toBe('tenant-1');
    expect(principal.roles.map((r) => r)).toBeDefined();
  });

  it('requires non-empty sub', async () => {
    jwtVerifyMock.mockResolvedValue({
      payload: {
        sub: '',
        tenantId: 'tenant-1',
        exp: Math.floor(Date.now() / 1000) + 3600,
      },
      protectedHeader: { alg: 'RS256' },
    } as never);

    const adapter = new JwtVerifierAdapter(client, config);
    await expect(adapter.verify('token')).rejects.toBeInstanceOf(AuthInvalidError);
  });

  it('requires non-empty tenant claim', async () => {
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

  it('maps JWTExpired', async () => {
    const err = Object.assign(new Error('expired'), { name: 'JWTExpired' });
    jwtVerifyMock.mockRejectedValue(err);

    const adapter = new JwtVerifierAdapter(client, config);
    await expect(adapter.verify('token')).rejects.toBeInstanceOf(AuthTokenExpiredError);
  });

  it('maps signature failure', async () => {
    const err = Object.assign(new Error('bad sig'), { name: 'JWSSignatureVerificationFailed' });
    jwtVerifyMock.mockRejectedValue(err);

    const adapter = new JwtVerifierAdapter(client, config);
    await expect(adapter.verify('token')).rejects.toBeInstanceOf(AuthSignatureInvalidError);
  });

  it('maps issuer claim failure', async () => {
    const err = Object.assign(new Error('bad iss'), {
      name: 'JWTClaimValidationFailed',
      claim: 'iss',
    });
    jwtVerifyMock.mockRejectedValue(err);

    const adapter = new JwtVerifierAdapter(client, config);
    await expect(adapter.verify('token')).rejects.toBeInstanceOf(AuthIssuerInvalidError);
  });

  it('maps audience claim failure', async () => {
    const err = Object.assign(new Error('bad aud'), {
      name: 'JWTClaimValidationFailed',
      claim: 'aud',
    });
    jwtVerifyMock.mockRejectedValue(err);

    const adapter = new JwtVerifierAdapter(client, config);
    await expect(adapter.verify('token')).rejects.toBeInstanceOf(AuthAudienceInvalidError);
  });

  it('maps missing jwks uri', async () => {
    const emptyConfig = createConfig({
      'jwt.issuer': 'test-issuer',
      'jwt.audience': 'test-audience',
      'jwt.jwksUri': '',
    });
    const adapter = new JwtVerifierAdapter(client, emptyConfig);
    await expect(adapter.verify('token')).rejects.toBeInstanceOf(AuthJwksUnavailableError);
  });

  it('maps network errors to jwks unavailable', async () => {
    jwtVerifyMock.mockRejectedValue(new Error('fetch failed ECONNREFUSED'));
    const adapter = new JwtVerifierAdapter(client, config);
    await expect(adapter.verify('token')).rejects.toBeInstanceOf(AuthJwksUnavailableError);
  });

  it('rethrows domain errors unchanged', async () => {
    // Force an AuthInvalidError via missing exp.
    jwtVerifyMock.mockResolvedValue({
      payload: { sub: 'u', tenantId: 't' },
      protectedHeader: { alg: 'RS256' },
    } as never);

    const adapter = new JwtVerifierAdapter(client, config);
    await expect(adapter.verify('token')).rejects.toBeInstanceOf(AuthInvalidError);
  });
});
