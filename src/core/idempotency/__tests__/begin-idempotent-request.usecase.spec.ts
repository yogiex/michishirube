import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  BeginIdempotentRequestUseCase,
  type IdempotencyRecord,
  type IdempotencyStorePort,
} from '../application/begin-idempotent-request.usecase.js';
import {
  IdempotencyConflictError,
  IdempotencyExpiredError,
  IdempotencyInProgressError,
  IdempotencyStoreUnavailableError,
  ValidationFailedError,
} from '@/shared/errors/index.js';

function record(overrides: Partial<IdempotencyRecord> = {}): IdempotencyRecord {
  return {
    key: 'key_1',
    tenantId: 'tenant_1',
    requestHash: 'hash_1',
    state: 'acquired',
    startedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 60_000).toISOString(),
    ...overrides,
  };
}

describe('BeginIdempotentRequestUseCase', () => {
  let store: IdempotencyStorePort;
  let useCase: BeginIdempotentRequestUseCase;

  beforeEach(() => {
    store = {
      begin: vi.fn().mockResolvedValue(record()),
      complete: vi.fn(),
    };
    useCase = new BeginIdempotentRequestUseCase(store);
  });

  it('returns started for a newly acquired record', async () => {
    const result = await useCase.execute({
      key: 'key_1',
      tenantId: 'tenant_1',
      requestHash: 'hash_1',
    });
    expect(result).toEqual({
      kind: 'started',
      record: expect.objectContaining({ state: 'acquired' }),
    });
  });

  it('returns replay for a completed record', async () => {
    vi.mocked(store.begin).mockResolvedValue(record({ state: 'completed', response: { id: '1' } }));
    const result = await useCase.execute({
      key: 'key_1',
      tenantId: 'tenant_1',
      requestHash: 'hash_1',
    });
    expect(result).toEqual({ kind: 'replay', response: { id: '1' } });
  });

  it('rejects a reused key with a different request', async () => {
    vi.mocked(store.begin).mockResolvedValue(record({ requestHash: 'hash_2' }));
    await expect(
      useCase.execute({ key: 'key_1', tenantId: 'tenant_1', requestHash: 'hash_1' }),
    ).rejects.toThrow(IdempotencyConflictError);
  });

  it('rejects in-progress and expired records', async () => {
    vi.mocked(store.begin).mockResolvedValue(record({ state: 'in_progress' }));
    await expect(
      useCase.execute({ key: 'key_1', tenantId: 'tenant_1', requestHash: 'hash_1' }),
    ).rejects.toThrow(IdempotencyInProgressError);
    vi.mocked(store.begin).mockResolvedValue(record({ state: 'expired' }));
    await expect(
      useCase.execute({ key: 'key_1', tenantId: 'tenant_1', requestHash: 'hash_1' }),
    ).rejects.toThrow(IdempotencyExpiredError);
  });

  it('fails closed when the store cannot begin', async () => {
    vi.mocked(store.begin).mockRejectedValue(new Error('redis down'));
    await expect(
      useCase.execute({ key: 'key_1', tenantId: 'tenant_1', requestHash: 'hash_1' }),
    ).rejects.toThrow(IdempotencyStoreUnavailableError);
  });

  it('rejects invalid input before accessing the store', async () => {
    await expect(
      useCase.execute({ key: '', tenantId: 'tenant_1', requestHash: 'hash_1' }),
    ).rejects.toThrow(ValidationFailedError);
    expect(store.begin).not.toHaveBeenCalled();
  });
});
