import { describe, expect, it, vi } from 'vitest';
import { InternalConfigError } from '@/shared/errors/index.js';
import {
  ExecuteWithBulkheadUseCase,
  type BulkheadLease,
  type BulkheadPort,
} from '../application/execute-with-bulkhead.usecase.js';

const config = {
  maxConcurrent: 1,
  maxQueue: 2,
  queueTimeoutMs: 100,
};

describe('ExecuteWithBulkheadUseCase', () => {
  it('executes the operation and releases its lease', async () => {
    const release = vi.fn<() => Promise<void>>().mockResolvedValue(undefined);
    const lease: BulkheadLease = { queued: false, release };
    const bulkhead: BulkheadPort = { acquire: vi.fn().mockResolvedValue(lease) };
    const operation = vi.fn().mockResolvedValue('ok');

    const result = await new ExecuteWithBulkheadUseCase(bulkhead).execute({
      key: 'orders',
      config,
      operation,
    });

    expect(result).toBe('ok');
    expect(bulkhead.acquire).toHaveBeenCalledWith('orders', config);
    expect(operation).toHaveBeenCalledOnce();
    expect(release).toHaveBeenCalledOnce();
  });

  it('releases the lease when the operation fails and propagates the error', async () => {
    const release = vi.fn<() => Promise<void>>().mockResolvedValue(undefined);
    const error = new Error('operation failed');
    const bulkhead: BulkheadPort = {
      acquire: vi.fn().mockResolvedValue({ queued: true, release }),
    };

    await expect(
      new ExecuteWithBulkheadUseCase(bulkhead).execute({
        key: 'orders',
        config,
        operation: vi.fn().mockRejectedValue(error),
      }),
    ).rejects.toBe(error);
    expect(release).toHaveBeenCalledOnce();
  });

  it('rejects invalid configuration before acquiring', async () => {
    const bulkhead: BulkheadPort = { acquire: vi.fn() };
    const useCase = new ExecuteWithBulkheadUseCase(bulkhead);

    await expect(
      useCase.execute({
        key: 'orders',
        config: { ...config, maxConcurrent: 0 },
        operation: vi.fn(),
      }),
    ).rejects.toBeInstanceOf(InternalConfigError);
    await expect(
      useCase.execute({
        key: 'orders',
        config: { ...config, queueTimeoutMs: 0 },
        operation: vi.fn(),
      }),
    ).rejects.toBeInstanceOf(InternalConfigError);
    expect(bulkhead.acquire).not.toHaveBeenCalled();
  });
});
