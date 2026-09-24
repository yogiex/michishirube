import { describe, expect, it, vi, type Mock } from 'vitest';
import { IssueApiKeyUseCase, IssueApiKeySchema } from '../application/issue-api-key.usecase.js';
import { InternalDependencyError, ValidationFailedError } from '@/shared/errors/index.js';
import type { ApiKeyRepositoryPort } from '../domain/api-key.repository.port.js';
import type { ApiKeyHashService } from '../domain/api-key-hash.service.js';

type MockRepository = { [K in keyof ApiKeyRepositoryPort]: Mock<ApiKeyRepositoryPort[K]> };
const PLAINTEXT = `msh_sk_${'a'.repeat(43)}`;

function dependencies(createResult = true) {
  const repository: MockRepository = {
    findAll: vi.fn(),
    findById: vi.fn(),
    findByPlaintext: vi.fn(),
    create: vi.fn().mockResolvedValue(createResult),
    revoke: vi.fn(),
    incrementUsage: vi.fn(),
    registerIndex: vi.fn(),
  };
  const hasher: ApiKeyHashService = {
    generatePlaintext: vi.fn().mockReturnValue(PLAINTEXT),
    hash: vi.fn().mockResolvedValue('argon-hash'),
    verify: vi.fn(),
    indexHash: vi.fn().mockReturnValue('a'.repeat(64)),
    displayPrefix: vi.fn().mockReturnValue('msh_sk_aaaaaaaa'),
    isValidFormat: vi.fn().mockReturnValue(true),
  };
  return { repository, hasher };
}

describe('IssueApiKeyUseCase', () => {
  it('issues once with default 90-day expiry and correct prefix', async () => {
    const { repository, hasher } = dependencies();
    const result = await new IssueApiKeyUseCase(repository, hasher).execute({
      tenantId: 'tenant_a',
      name: 'orders',
      scopes: ['orders:read'],
    });

    expect(result.plaintextKey).toBe(PLAINTEXT);
    expect(result.apiKey).toMatchObject({
      name: 'orders',
      tenantId: 'tenant_a',
      keyPrefix: 'msh_sk_aaaaaaaa',
      keyHash: 'argon-hash',
      status: 'active',
      usageCount: 0,
    });
    expect(Date.parse(result.apiKey.expiresAt ?? '') - Date.parse(result.apiKey.createdAt)).toBe(
      90 * 86_400_000,
    );
    expect(repository.create).toHaveBeenCalledWith(result.apiKey, 'a'.repeat(64));
  });

  it('accepts the 365-day boundary and deduplicates scopes', async () => {
    const { repository, hasher } = dependencies();
    const result = await new IssueApiKeyUseCase(repository, hasher).execute({
      tenantId: 'tenant_a',
      name: 'orders',
      scopes: ['orders:read', 'orders:read'],
      expiresInDays: 365,
    });
    expect(result.apiKey.scopes).toEqual(['orders:read']);
  });

  it('rejects malformed, oversized, and out-of-range input before generation', async () => {
    const { repository, hasher } = dependencies();
    const useCase = new IssueApiKeyUseCase(repository, hasher);
    for (const input of [
      { tenantId: '', name: 'orders', scopes: ['orders:read'] },
      { tenantId: 'tenant_a', name: ' ', scopes: ['orders:read'] },
      { tenantId: 'tenant_a', name: 'a'.repeat(129), scopes: ['orders:read'] },
      { tenantId: 'tenant_a', name: 'orders', scopes: [] },
      { tenantId: 'tenant_a', name: 'orders', scopes: ['orders:read'], expiresInDays: 0 },
      { tenantId: 'tenant_a', name: 'orders', scopes: ['orders:read'], expiresInDays: 366 },
    ]) {
      await expect(useCase.execute(input)).rejects.toBeInstanceOf(ValidationFailedError);
    }
    expect(
      IssueApiKeySchema.parse({ tenantId: 'tenant_a', name: 'orders', scopes: ['read'] })
        .expiresInDays,
    ).toBe(90);
    expect(hasher.generatePlaintext).not.toHaveBeenCalled();
  });

  it('fails closed when atomic persistence rejects a collision', async () => {
    const { repository, hasher } = dependencies(false);
    await expect(
      new IssueApiKeyUseCase(repository, hasher).execute({
        tenantId: 'tenant_a',
        name: 'orders',
        scopes: ['orders:read'],
      }),
    ).rejects.toBeInstanceOf(InternalDependencyError);
  });
});
