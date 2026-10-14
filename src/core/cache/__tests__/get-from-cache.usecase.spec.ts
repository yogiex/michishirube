import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { GetFromCacheUseCase } from '../application/get-from-cache.usecase.js';
import { DEFAULT_CACHE_CONFIG } from '../domain/cache-config.vo.js';
import type { CachedResponse } from '../domain/cache-entry.entity.js';
import type { CacheStorePort } from '../domain/cache-store.port.js';

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
  headers: { 'content-type': 'application/json' },
  body: Buffer.from('{"ok":true}').toString('base64'),
  createdAt: 1_758_448_800_000,
  expiresAt: 1_758_448_860_000,
  age: 0,
};

describe('GetFromCacheUseCase', () => {
  let store: MockStore;
  let useCase: GetFromCacheUseCase;

  beforeEach(() => {
    store = makeStore();
    useCase = new GetFromCacheUseCase(store);
  });

  it('mengembalikan hit', async () => {
    store.get.mockResolvedValue({ kind: 'hit', entry: response, stale: false });

    const result = await useCase.execute({ key: 'cache:1', config: DEFAULT_CACHE_CONFIG });

    expect(result).toEqual({ kind: 'hit', response, stale: false });
  });

  it('mengembalikan miss', async () => {
    store.get.mockResolvedValue({ kind: 'miss' });

    const result = await useCase.execute({ key: 'cache:1', config: DEFAULT_CACHE_CONFIG });

    expect(result).toEqual({ kind: 'miss' });
  });

  it('mengubah error menjadi miss', async () => {
    store.get.mockResolvedValue({ kind: 'error', reason: 'redis down' });

    const result = await useCase.execute({ key: 'cache:1', config: DEFAULT_CACHE_CONFIG });

    expect(result).toEqual({ kind: 'miss' });
  });

  it('mengembalikan stale hit', async () => {
    store.get.mockResolvedValue({ kind: 'hit', entry: response, stale: true });

    const result = await useCase.execute({ key: 'cache:1', config: DEFAULT_CACHE_CONFIG });

    expect(result).toEqual({ kind: 'hit', response, stale: true });
  });
});
