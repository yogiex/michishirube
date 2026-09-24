import { describe, expect, it, vi, type Mock } from 'vitest';
import { VerifyApiKeyUseCase } from '../application/verify-api-key.usecase.js';
import {
  AuthApiKeyExpiredError,
  AuthApiKeyInvalidError,
  AuthApiKeyRevokedError,
} from '@/shared/errors/index.js';
import { some } from '@/shared/types/index.js';
import type { ApiKeyRepositoryPort } from '../domain/api-key.repository.port.js';
import type { ApiKeyHashService } from '../domain/api-key-hash.service.js';
import type { ApiKey } from '../domain/api-key.entity.js';

type MockRepository = { [K in keyof ApiKeyRepositoryPort]: Mock<ApiKeyRepositoryPort[K]> };
const PLAINTEXT = `msh_sk_${'a'.repeat(43)}`;
const KEY: ApiKey = {
  id: '0194f5d4-3d2c-7b8a-9f10-1234567890ab',
  name: 'orders',
  tenantId: 'tenant_a',
  keyHash: 'argon-hash',
  keyPrefix: 'msh_sk_aaaaaaaa',
  scopes: ['orders:read'],
  status: 'active',
  usageCount: 0,
  createdAt: '2026-09-24T00:00:00.000Z',
  expiresAt: '2027-01-01T00:00:00.000Z',
};

function dependencies(key: ApiKey | null = KEY) {
  const repository: MockRepository = {
    findAll: vi.fn(),
    findById: vi.fn(),
    findByPlaintext: vi.fn().mockResolvedValue(key ? some(key) : { some: false }),
    create: vi.fn(),
    revoke: vi.fn(),
    incrementUsage: vi.fn().mockResolvedValue(true),
    registerIndex: vi.fn(),
  };
  const hasher: ApiKeyHashService = {
    generatePlaintext: vi.fn(),
    hash: vi.fn(),
    verify: vi.fn(),
    indexHash: vi.fn(),
    displayPrefix: vi.fn(),
    isValidFormat: vi.fn<ApiKeyHashService['isValidFormat']>().mockReturnValue(true),
  };
  return { repository, hasher };
}

describe('VerifyApiKeyUseCase', () => {
  it('has no tenant input, creates apikey principal, and updates usage asynchronously', async () => {
    const { repository, hasher } = dependencies();
    const result = await new VerifyApiKeyUseCase(repository, hasher).execute({
      plaintextKey: PLAINTEXT,
    });

    expect(repository.findByPlaintext).toHaveBeenCalledWith(PLAINTEXT);
    expect(result.principal).toMatchObject({
      kind: 'api-key',
      userId: `apikey:${KEY.id}`,
      tenantId: 'tenant_a',
    });
    expect(result.apiKey).toEqual(KEY);
    await vi.waitFor(() =>
      expect(repository.incrementUsage).toHaveBeenCalledWith(KEY.id, expect.any(Date)),
    );
  });

  it('fails uniformly for unknown and malformed keys', async () => {
    const { repository, hasher } = dependencies(null);
    const useCase = new VerifyApiKeyUseCase(repository, hasher);
    await expect(useCase.execute({ plaintextKey: PLAINTEXT })).rejects.toBeInstanceOf(
      AuthApiKeyInvalidError,
    );
    vi.mocked(hasher.isValidFormat).mockReturnValueOnce(false);
    await expect(useCase.execute({ plaintextKey: '../secret' })).rejects.toBeInstanceOf(
      AuthApiKeyInvalidError,
    );
  });

  it('distinguishes revoked and expired keys without recording usage', async () => {
    const revoked = dependencies({ ...KEY, status: 'revoked' });
    await expect(
      new VerifyApiKeyUseCase(revoked.repository, revoked.hasher).execute({
        plaintextKey: PLAINTEXT,
      }),
    ).rejects.toBeInstanceOf(AuthApiKeyRevokedError);
    const expired = dependencies({ ...KEY, expiresAt: '2020-01-01T00:00:00.000Z' });
    await expect(
      new VerifyApiKeyUseCase(expired.repository, expired.hasher).execute({
        plaintextKey: PLAINTEXT,
      }),
    ).rejects.toBeInstanceOf(AuthApiKeyExpiredError);
    expect(revoked.repository.incrementUsage).not.toHaveBeenCalled();
    expect(expired.repository.incrementUsage).not.toHaveBeenCalled();
  });

  it('keeps verification successful when background usage fails', async () => {
    const { repository, hasher } = dependencies();
    repository.incrementUsage.mockRejectedValue(new Error('redis unavailable'));
    const result = await new VerifyApiKeyUseCase(repository, hasher).execute({
      plaintextKey: PLAINTEXT,
    });
    expect(result.principal.userId).toBe(`apikey:${KEY.id}`);
  });
});
