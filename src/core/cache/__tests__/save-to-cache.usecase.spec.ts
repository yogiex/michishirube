import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { InvalidateCacheUseCase } from '../application/invalidate-cache.usecase.js';
import { SaveToCacheUseCase } from '../application/save-to-cache.usecase.js';
import { DEFAULT_CACHE_CONFIG } from '../domain/cache-config.vo.js';
import type { CachedResponse } from '../domain/cache-entry.entity.js';
import type { CacheStorePort } from '../domain/cache-store.port.js';
import { CacheKeyInvalidError } from '@/shared/errors/index.js';

type MockStore = { [K in keyof CacheStorePort]: Mock<CacheStorePort[K]> };

function makeStore(): MockStore {
  return {
    get: vi.fn<CacheStorePort['get']>(),
    save: vi.fn<CacheStorePort['save']>(),
    invalidate: vi.fn<CacheStorePort['invalidate']>(),
    invalidateByTenant: vi.fn<CacheStorePort['invalidateByTenant']>(),
    invalidateByPattern: vi.fn<CacheStorePort['invalidateByPattern']>(),
  };
}

const response: CachedResponse = {
  status: 200,
  headers: {},
  body: Buffer.from('data').toString('base64'),
  createdAt: 1_758_448_800_000,
  expiresAt: 1_758_448_860_000,
  age: 0,
};

const config = { ...DEFAULT_CACHE_CONFIG, maxBodySize: 4 };

describe('SaveToCacheUseCase', () => {
  let store: MockStore;
  let useCase: SaveToCacheUseCase;

  beforeEach(() => {
    store = makeStore();
    store.save.mockResolvedValue(undefined);
    useCase = new SaveToCacheUseCase(store);
  });

  it('menyimpan GET 200', async () => {
    await useCase.execute({ key: 'cache:1', config, method: 'GET', status: 200, response });
    expect(store.save).toHaveBeenCalledWith({ key: 'cache:1', config, response });
  });

  it('melewati POST', async () => {
    await useCase.execute({ key: 'cache:1', config, method: 'POST', status: 200, response });
    expect(store.save).not.toHaveBeenCalled();
  });

  it('melewati status yang tidak dapat di-cache', async () => {
    await useCase.execute({ key: 'cache:1', config, method: 'GET', status: 500, response });
    expect(store.save).not.toHaveBeenCalled();
  });

  it('melewati body yang terlalu besar', async () => {
    const largeResponse = { ...response, body: Buffer.from('large').toString('base64') };
    await useCase.execute({
      key: 'cache:1',
      config,
      method: 'GET',
      status: 200,
      response: largeResponse,
    });
    expect(store.save).not.toHaveBeenCalled();
  });

  it('tidak melempar error saat penyimpanan gagal', async () => {
    store.save.mockRejectedValue(new Error('redis down'));
    await expect(
      useCase.execute({ key: 'cache:1', config, method: 'GET', status: 200, response }),
    ).resolves.toBeUndefined();
  });
});

describe('InvalidateCacheUseCase', () => {
  let store: MockStore;
  let useCase: InvalidateCacheUseCase;

  beforeEach(() => {
    store = makeStore();
    useCase = new InvalidateCacheUseCase(store);
  });

  it('menginvalidasi berdasarkan key', async () => {
    await expect(useCase.execute({ key: 'cache:1' })).resolves.toBe(1);
    expect(store.invalidate).toHaveBeenCalledWith('cache:1');
  });

  it('menginvalidasi berdasarkan tenant', async () => {
    store.invalidateByTenant.mockResolvedValue(3);
    await expect(useCase.execute({ tenantId: 'tenant-1' })).resolves.toBe(3);
  });

  it('menginvalidasi berdasarkan pattern valid', async () => {
    store.invalidateByPattern.mockResolvedValue(5);
    await expect(useCase.execute({ pattern: 'cache:tenant-1:*' })).resolves.toBe(5);
  });

  it('mengembalikan nol tanpa target', async () => {
    await expect(useCase.execute({})).resolves.toBe(0);
  });

  it('menolak pattern tidak valid', async () => {
    await expect(useCase.execute({ pattern: 'cache/[ab' })).rejects.toThrow(CacheKeyInvalidError);
    expect(store.invalidateByPattern).not.toHaveBeenCalled();
  });
});
