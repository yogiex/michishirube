import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { IdempotencyStorePort } from '../application/begin-idempotent-request.usecase.js';
import { CompleteIdempotentRequestUseCase } from '../application/complete-idempotent-request.usecase.js';
import { IdempotencyStoreUnavailableError, ValidationFailedError } from '@/shared/errors/index.js';

describe('CompleteIdempotentRequestUseCase', () => {
  let store: IdempotencyStorePort;
  let useCase: CompleteIdempotentRequestUseCase;

  beforeEach(() => {
    store = { begin: vi.fn(), complete: vi.fn() };
    useCase = new CompleteIdempotentRequestUseCase(store);
  });

  it('persists the completed response', async () => {
    await useCase.execute({ key: 'key_1', tenantId: 'tenant_1', response: { status: 201 } });
    expect(store.complete).toHaveBeenCalledWith('key_1', 'tenant_1', { status: 201 });
  });

  it('fails closed when persistence fails', async () => {
    vi.mocked(store.complete).mockRejectedValue(new Error('redis down'));
    await expect(
      useCase.execute({ key: 'key_1', tenantId: 'tenant_1', response: { status: 201 } }),
    ).rejects.toThrow(IdempotencyStoreUnavailableError);
  });

  it('rejects invalid input before persistence', async () => {
    await expect(useCase.execute({ key: '', tenantId: 'tenant_1', response: {} })).rejects.toThrow(
      ValidationFailedError,
    );
    expect(store.complete).not.toHaveBeenCalled();
  });
});
