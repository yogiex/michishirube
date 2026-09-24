import { describe, expect, it, vi, type Mock } from 'vitest';
import { ListApiKeysUseCase } from '../application/list-api-keys.usecase.js';
import { ValidationFailedError } from '@/shared/errors/index.js';
import type { ApiKeyRepositoryPort } from '../domain/api-key.repository.port.js';
import type { ApiKey } from '../domain/api-key.entity.js';

type MockRepository = { [K in keyof ApiKeyRepositoryPort]: Mock<ApiKeyRepositoryPort[K]> };
const KEY: ApiKey = {
  id: '0194f5d4-3d2c-7b8a-9f10-1234567890ab',
  name: 'orders',
  tenantId: 'tenant_a',
  keyHash: 'secret-hash',
  keyPrefix: 'msh_sk_abcdefgh',
  scopes: ['orders:read'],
  status: 'active',
  usageCount: 0,
  createdAt: '2026-09-24T00:00:00.000Z',
  expiresAt: '2026-12-23T00:00:00.000Z',
};

describe('ListApiKeysUseCase', () => {
  it('returns tenant keys without key hashes', async () => {
    const repository: MockRepository = {
      findAll: vi.fn().mockResolvedValue([KEY]),
      findById: vi.fn(),
      findByPlaintext: vi.fn(),
      create: vi.fn(),
      revoke: vi.fn(),
      incrementUsage: vi.fn(),
      registerIndex: vi.fn(),
    };
    const result = await new ListApiKeysUseCase(repository).execute({ tenantId: 'tenant_a' });

    expect(repository.findAll).toHaveBeenCalledWith('tenant_a');
    expect(result.items).toEqual([
      {
        id: KEY.id,
        name: KEY.name,
        tenantId: KEY.tenantId,
        keyPrefix: KEY.keyPrefix,
        scopes: KEY.scopes,
        status: KEY.status,
        usageCount: KEY.usageCount,
        createdAt: KEY.createdAt,
        expiresAt: KEY.expiresAt,
      },
    ]);
    expect(result.items[0]).not.toHaveProperty('keyHash');
  });

  it('rejects invalid tenant input', async () => {
    const repository: MockRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      findByPlaintext: vi.fn(),
      create: vi.fn(),
      revoke: vi.fn(),
      incrementUsage: vi.fn(),
      registerIndex: vi.fn(),
    };
    const useCase = new ListApiKeysUseCase(repository);
    for (const tenantId of ['', 'tenant/a', 'a'.repeat(129)]) {
      await expect(useCase.execute({ tenantId })).rejects.toBeInstanceOf(ValidationFailedError);
    }
  });
});
