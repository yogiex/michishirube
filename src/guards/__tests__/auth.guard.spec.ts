import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import type { ExecutionContext, Type } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import { AuthGuard } from '../auth.guard.js';
import { VerifyTokenUseCase } from '@/core/auth/application/verify-token.usecase.js';
import { VerifyApiKeyUseCase } from '@/core/api-key/application/verify-api-key.usecase.js';
import type { TokenVerifierPort } from '@/core/auth/domain/token-verifier.port.js';
import type { ApiKeyRepositoryPort } from '@/core/api-key/domain/api-key.repository.port.js';
import type { ApiKeyHashService } from '@/core/api-key/domain/api-key-hash.service.js';
import { createPrincipal } from '@/core/auth/domain/principal.entity.js';
import type { ApiKey } from '@/core/api-key/domain/api-key.entity.js';
import { AuthMissingError, AuthInvalidError } from '@/shared/errors/index.js';

type TokenExecute = VerifyTokenUseCase['execute'];
type ApiKeyExecute = VerifyApiKeyUseCase['execute'];

function makeCtx(req: Record<string, unknown>, type = 'http'): ExecutionContext {
  const ctx: Pick<ExecutionContext, 'getType' | 'switchToHttp' | 'getHandler' | 'getClass'> = {
    getType: <T extends string = string>() => type as T,
    switchToHttp: () => ({
      getRequest: <T = unknown>() => req as T,
      getResponse: <T = unknown>() => ({}) as T,
      getNext: <T = unknown>() => (() => undefined) as T,
    }),
    getHandler: () => () => undefined,
    getClass: <T = unknown>() => class {} as Type<T>,
  };
  return ctx as ExecutionContext;
}

function makeReflector(meta: Record<string, unknown>): Reflector {
  const reflector: Pick<Reflector, 'getAllAndOverride'> = {
    getAllAndOverride: <T>(key: unknown) => meta[String(key)] as T,
  };
  return reflector as Reflector;
}

const jwtPrincipal = createPrincipal({
  userId: 'u_jwt',
  tenantId: 'acme',
  roles: ['user'],
  scopes: ['order:read'],
  expiresAt: new Date(Date.now() + 3600_000),
});

const apiKeyPrincipal = createPrincipal({
  kind: 'api-key',
  userId: 'apikey:k1',
  tenantId: 'acme',
  scopes: ['order:read'],
  expiresAt: new Date(Date.now() + 3600_000),
});

const fakeApiKey: ApiKey = {
  id: 'k1',
  name: 'test',
  tenantId: 'acme',
  keyHash: 'hash',
  keyPrefix: 'msh_sk_',
  scopes: ['order:read'],
  status: 'active',
  usageCount: 0,
  createdAt: new Date().toISOString(),
};

describe('AuthGuard', () => {
  let verifyToken: VerifyTokenUseCase;
  let verifyApiKey: VerifyApiKeyUseCase;
  let jwtExecuteMock: Mock<TokenExecute>;
  let apiKeyExecuteMock: Mock<ApiKeyExecute>;

  beforeEach(() => {
    jwtExecuteMock = vi.fn<TokenExecute>().mockResolvedValue(jwtPrincipal);
    apiKeyExecuteMock = vi
      .fn<ApiKeyExecute>()
      .mockResolvedValue({ apiKey: fakeApiKey, principal: apiKeyPrincipal });

    const tokenVerifier = { verify: vi.fn() } as TokenVerifierPort;
    verifyToken = new VerifyTokenUseCase(tokenVerifier);
    vi.spyOn(verifyToken, 'execute').mockImplementation((token) => jwtExecuteMock(token));

    const repository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      findByPlaintext: vi.fn(),
      create: vi.fn(),
      revoke: vi.fn(),
      incrementUsage: vi.fn(),
      registerIndex: vi.fn(),
    } as ApiKeyRepositoryPort;
    const hasher = {
      generatePlaintext: vi.fn(),
      hash: vi.fn(),
      verify: vi.fn(),
      indexHash: vi.fn(),
      displayPrefix: vi.fn(),
      isValidFormat: vi.fn(),
    } as ApiKeyHashService;
    verifyApiKey = new VerifyApiKeyUseCase(repository, hasher);
    vi.spyOn(verifyApiKey, 'execute').mockImplementation((rawInput) => apiKeyExecuteMock(rawInput));
  });

  function makeGuard(meta: Record<string, unknown> = {}): AuthGuard {
    return new AuthGuard(verifyToken, verifyApiKey, makeReflector(meta));
  }

  it('skip non-HTTP', async () => {
    const guard = makeGuard();
    const req: Record<string, unknown> = { headers: {}, url: '/x', method: 'GET' };
    expect(await guard.canActivate(makeCtx(req, 'rpc'))).toBe(true);
    expect(jwtExecuteMock).not.toHaveBeenCalled();
    expect(apiKeyExecuteMock).not.toHaveBeenCalled();
  });

  it('skip jika @Public()', async () => {
    const guard = makeGuard({ isPublic: true });
    const req: Record<string, unknown> = { headers: {}, url: '/x', method: 'GET' };
    expect(await guard.canActivate(makeCtx(req))).toBe(true);
    expect(jwtExecuteMock).not.toHaveBeenCalled();
    expect(apiKeyExecuteMock).not.toHaveBeenCalled();
  });

  it('throw AuthMissingError jika tidak ada credential', async () => {
    const guard = makeGuard();
    const req: Record<string, unknown> = { headers: {}, url: '/x', method: 'GET' };
    await expect(guard.canActivate(makeCtx(req))).rejects.toThrow(AuthMissingError);
    expect(jwtExecuteMock).not.toHaveBeenCalled();
    expect(apiKeyExecuteMock).not.toHaveBeenCalled();
  });

  it('JWT path: verifyToken dipanggil dan user diset', async () => {
    const guard = makeGuard();
    const req: Record<string, unknown> = {
      headers: { authorization: 'Bearer jwt-token' },
      url: '/x',
      method: 'GET',
    };
    const ctx = makeCtx(req);
    expect(await guard.canActivate(ctx)).toBe(true);
    expect(jwtExecuteMock).toHaveBeenCalledWith('jwt-token');
    expect(apiKeyExecuteMock).not.toHaveBeenCalled();
    expect((req as { user?: unknown }).user).toBe(jwtPrincipal);
  });

  it('API key path: verifyApiKey dipanggil dan user diset', async () => {
    const guard = makeGuard();
    const req: Record<string, unknown> = {
      headers: { 'x-api-key': 'secret-key' },
      url: '/x',
      method: 'GET',
    };
    const ctx = makeCtx(req);
    expect(await guard.canActivate(ctx)).toBe(true);
    expect(apiKeyExecuteMock).toHaveBeenCalledWith({ plaintextKey: 'secret-key' });
    expect(jwtExecuteMock).not.toHaveBeenCalled();
    expect((req as { user?: unknown }).user).toBe(apiKeyPrincipal);
  });

  it('both present: prioritaskan JWT', async () => {
    const guard = makeGuard();
    const req: Record<string, unknown> = {
      headers: { authorization: 'Bearer jwt-token', 'x-api-key': 'secret-key' },
      url: '/x',
      method: 'GET',
    };
    const ctx = makeCtx(req);
    expect(await guard.canActivate(ctx)).toBe(true);
    expect(jwtExecuteMock).toHaveBeenCalledWith('jwt-token');
    expect(apiKeyExecuteMock).not.toHaveBeenCalled();
    expect((req as { user?: unknown }).user).toBe(jwtPrincipal);
  });

  it('propagate error dari verifyToken', async () => {
    jwtExecuteMock.mockRejectedValue(new AuthInvalidError('bad'));
    const guard = makeGuard();
    const req: Record<string, unknown> = {
      headers: { authorization: 'Bearer jwt-token' },
      url: '/x',
      method: 'GET',
    };
    await expect(guard.canActivate(makeCtx(req))).rejects.toThrow(AuthInvalidError);
  });

  it('propagate error dari verifyApiKey', async () => {
    apiKeyExecuteMock.mockRejectedValue(new AuthInvalidError('bad'));
    const guard = makeGuard();
    const req: Record<string, unknown> = {
      headers: { 'x-api-key': 'secret-key' },
      url: '/x',
      method: 'GET',
    };
    await expect(guard.canActivate(makeCtx(req))).rejects.toThrow(AuthInvalidError);
  });

  it('rejects malformed Authorization header without credential', async () => {
    const guard = makeGuard();
    const req: Record<string, unknown> = {
      headers: { authorization: 'Bearer' },
      url: '/x',
      method: 'GET',
    };
    await expect(guard.canActivate(makeCtx(req))).rejects.toThrow(AuthMissingError);
    expect(jwtExecuteMock).not.toHaveBeenCalled();
  });

  it('rejects non-Bearer Authorization scheme', async () => {
    const guard = makeGuard();
    const req: Record<string, unknown> = {
      headers: { authorization: 'Basic dXNlcjpwYXNz' },
      url: '/x',
      method: 'GET',
    };
    await expect(guard.canActivate(makeCtx(req))).rejects.toThrow(AuthMissingError);
    expect(jwtExecuteMock).not.toHaveBeenCalled();
    expect(apiKeyExecuteMock).not.toHaveBeenCalled();
  });

  it('rejects blank X-API-Key header', async () => {
    const guard = makeGuard();
    const req: Record<string, unknown> = {
      headers: { 'x-api-key': '   ' },
      url: '/x',
      method: 'GET',
    };
    await expect(guard.canActivate(makeCtx(req))).rejects.toThrow(AuthMissingError);
    expect(apiKeyExecuteMock).not.toHaveBeenCalled();
  });

  it('propagates expired JWT errors', async () => {
    jwtExecuteMock.mockRejectedValue(
      new (await import('@/shared/errors/index.js')).AuthTokenExpiredError('expired'),
    );
    const guard = makeGuard();
    const req: Record<string, unknown> = {
      headers: { authorization: 'Bearer jwt-token' },
      url: '/x',
      method: 'GET',
    };
    await expect(guard.canActivate(makeCtx(req))).rejects.toThrow(
      (await import('@/shared/errors/index.js')).AuthTokenExpiredError,
    );
  });

  it('propagates malformed JWT errors', async () => {
    const errors = await import('@/shared/errors/index.js');
    jwtExecuteMock.mockRejectedValue(new errors.AuthTokenMalformedError('malformed'));
    const guard = makeGuard();
    const req: Record<string, unknown> = {
      headers: { authorization: 'Bearer jwt-token' },
      url: '/x',
      method: 'GET',
    };
    await expect(guard.canActivate(makeCtx(req))).rejects.toThrow(errors.AuthTokenMalformedError);
  });

  it('does not attach principal when JWT verification fails', async () => {
    jwtExecuteMock.mockRejectedValue(new AuthInvalidError('bad'));
    const guard = makeGuard();
    const req: Record<string, unknown> = {
      headers: { authorization: 'Bearer jwt-token' },
      url: '/x',
      method: 'GET',
    };
    await expect(guard.canActivate(makeCtx(req))).rejects.toThrow(AuthInvalidError);
    expect((req as { user?: unknown }).user).toBeUndefined();
  });

  it('propagates expired API key errors', async () => {
    const errors = await import('@/shared/errors/index.js');
    apiKeyExecuteMock.mockRejectedValue(new errors.AuthApiKeyExpiredError('expired'));
    const guard = makeGuard();
    const req: Record<string, unknown> = {
      headers: { 'x-api-key': 'secret-key' },
      url: '/x',
      method: 'GET',
    };
    await expect(guard.canActivate(makeCtx(req))).rejects.toThrow(errors.AuthApiKeyExpiredError);
  });

  it('propagates revoked API key errors', async () => {
    const errors = await import('@/shared/errors/index.js');
    apiKeyExecuteMock.mockRejectedValue(new errors.AuthApiKeyRevokedError('revoked'));
    const guard = makeGuard();
    const req: Record<string, unknown> = {
      headers: { 'x-api-key': 'secret-key' },
      url: '/x',
      method: 'GET',
    };
    await expect(guard.canActivate(makeCtx(req))).rejects.toThrow(errors.AuthApiKeyRevokedError);
  });

  it('does not leak credential into request user on failure', async () => {
    jwtExecuteMock.mockRejectedValue(new AuthInvalidError('bad'));
    const guard = makeGuard();
    const req: Record<string, unknown> = {
      headers: { authorization: 'Bearer secret-token' },
      url: '/x',
      method: 'GET',
    };
    await expect(guard.canActivate(makeCtx(req))).rejects.toThrow(AuthInvalidError);
    expect(Object.prototype.hasOwnProperty.call(req, 'user')).toBe(false);
  });
});
