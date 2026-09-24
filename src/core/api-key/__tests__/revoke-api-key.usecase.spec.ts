import { describe, expect, it, vi, type Mock } from 'vitest';
import { RevokeApiKeyUseCase } from '../application/revoke-api-key.usecase.js';
import { ValidationFailedError } from '@/shared/errors/index.js';
import type { ApiKeyRepositoryPort } from '../domain/api-key.repository.port.js';

type MockRepository = { [K in keyof ApiKeyRepositoryPort]: Mock<ApiKeyRepositoryPort[K]> };

function makeRepository(): MockRepository {
  return {
    findAll: vi.fn(),
    findById: vi.fn(),
    findByPlaintext: vi.fn(),
    create: vi.fn(),
    revoke: vi.fn(),
    incrementUsage: vi.fn(),
    registerIndex: vi.fn(),
  };
}

const ID = '0194f5d4-3d2c-7b8a-9f10-1234567890ab';

describe('RevokeApiKeyUseCase', () => {
  it('isolates revocation by tenant', async () => {
    const repository = makeRepository();
    repository.revoke.mockResolvedValueOnce(false).mockResolvedValueOnce(true);
    const useCase = new RevokeApiKeyUseCase(repository);

    await expect(useCase.execute({ id: ID, tenantId: 'tenant_b' })).resolves.toEqual({
      revoked: false,
    });
    await expect(useCase.execute({ id: ID, tenantId: 'tenant_a' })).resolves.toEqual({
      revoked: true,
    });
    expect(repository.revoke).toHaveBeenNthCalledWith(1, ID, 'tenant_b');
    expect(repository.revoke).toHaveBeenNthCalledWith(2, ID, 'tenant_a');
  });

  it('rejects traversal, SQL, oversized, and malformed boundaries', async () => {
    const repository = makeRepository();
    const useCase = new RevokeApiKeyUseCase(repository);
    for (const input of [
      { id: '../key', tenantId: 'tenant_a' },
      { id: ID, tenantId: "tenant' OR 1=1" },
      { id: ID, tenantId: 'a'.repeat(129) },
      {},
    ]) {
      await expect(useCase.execute(input)).rejects.toBeInstanceOf(ValidationFailedError);
    }
    expect(repository.revoke).not.toHaveBeenCalled();
  });
});
