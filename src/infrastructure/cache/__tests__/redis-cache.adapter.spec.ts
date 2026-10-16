import { Test } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DEFAULT_CACHE_CONFIG } from '@/core/cache/domain/cache-config.vo.js';
import type { CachedResponse } from '@/core/cache/domain/cache-entry.entity.js';
import { REDIS_CLIENT } from '@/infrastructure/redis/redis.constants.js';
import { CACHE_STORE_KEY_PREFIX, MAX_ENTRY_SIZE } from '../cache.constants.js';
import { RedisCacheAdapter } from '../redis-cache.adapter.js';

function createRedisMock() {
  return {
    get: vi.fn(),
    set: vi.fn(),
    del: vi.fn(),
    scan: vi.fn(),
  };
}

function createEntry(overrides: Partial<CachedResponse> = {}): CachedResponse {
  const now = Date.now();
  return {
    status: 200,
    headers: { 'content-type': 'application/json' },
    body: '{"ok":true}',
    createdAt: now,
    expiresAt: now + 60_000,
    age: 0,
    ...overrides,
  };
}

describe('RedisCacheAdapter', () => {
  const redisMock = createRedisMock();
  let adapter: RedisCacheAdapter;

  beforeEach(async () => {
    vi.clearAllMocks();
    const module = await Test.createTestingModule({
      providers: [RedisCacheAdapter, { provide: REDIS_CLIENT, useValue: redisMock }],
    }).compile();
    adapter = module.get(RedisCacheAdapter);
  });

  it('mengembalikan miss saat key tidak ada', async () => {
    redisMock.get.mockResolvedValue(null);
    await expect(
      adapter.get({ key: 'cache:missing', config: DEFAULT_CACHE_CONFIG }),
    ).resolves.toEqual({
      kind: 'miss',
    });
  });

  it('mengembalikan hit fresh dengan stale false', async () => {
    const entry = createEntry();
    redisMock.get.mockResolvedValue(JSON.stringify(entry));
    await expect(
      adapter.get({ key: 'cache:fresh', config: DEFAULT_CACHE_CONFIG }),
    ).resolves.toEqual({
      kind: 'hit',
      entry,
      stale: false,
    });
  });

  it('mengembalikan stale hit dalam masa stale while revalidate', async () => {
    const entry = createEntry({ expiresAt: Date.now() - 10_000 });
    redisMock.get.mockResolvedValue(JSON.stringify(entry));
    await expect(
      adapter.get({
        key: 'cache:stale',
        config: { ...DEFAULT_CACHE_CONFIG, staleWhileRevalidateSec: 30 },
      }),
    ).resolves.toEqual({ kind: 'hit', entry, stale: true });
  });

  it('mengembalikan miss saat stale melewati masa tenggang', async () => {
    const entry = createEntry({ expiresAt: Date.now() - 31_000 });
    redisMock.get.mockResolvedValue(JSON.stringify(entry));
    await expect(
      adapter.get({
        key: 'cache:expired',
        config: { ...DEFAULT_CACHE_CONFIG, staleWhileRevalidateSec: 30 },
      }),
    ).resolves.toEqual({ kind: 'miss' });
  });

  it('mengembalikan error saat Redis gagal', async () => {
    redisMock.get.mockRejectedValue(new Error('redis down'));
    await expect(
      adapter.get({ key: 'cache:error', config: DEFAULT_CACHE_CONFIG }),
    ).resolves.toEqual({
      kind: 'error',
      reason: 'redis_error',
    });
  });

  it('mengembalikan miss untuk JSON rusak', async () => {
    redisMock.get.mockResolvedValue('{rusak');
    await expect(
      adapter.get({ key: 'cache:corrupt', config: DEFAULT_CACHE_CONFIG }),
    ).resolves.toEqual({
      kind: 'miss',
    });
  });

  it('menyimpan response dengan TTL 60 detik', async () => {
    const response = createEntry();
    await adapter.save({ key: 'cache:save', config: DEFAULT_CACHE_CONFIG, response });
    expect(redisMock.set).toHaveBeenCalledWith('cache:save', JSON.stringify(response), 'EX', 60);
  });

  it('menambahkan masa stale ke TTL Redis', async () => {
    const response = createEntry();
    await adapter.save({
      key: 'cache:save-swr',
      config: { ...DEFAULT_CACHE_CONFIG, staleWhileRevalidateSec: 300 },
      response,
    });
    expect(redisMock.set).toHaveBeenCalledWith(
      'cache:save-swr',
      JSON.stringify(response),
      'EX',
      360,
    );
  });

  it('melewati response yang melebihi ukuran maksimum', async () => {
    const response = createEntry({ body: 'x'.repeat(MAX_ENTRY_SIZE) });
    await adapter.save({ key: 'cache:large', config: DEFAULT_CACHE_CONFIG, response });
    expect(redisMock.set).not.toHaveBeenCalled();
  });

  it('melempar kembali error Redis saat save', async () => {
    const error = new Error('write gagal');
    redisMock.set.mockRejectedValue(error);
    await expect(
      adapter.save({ key: 'cache:failure', config: DEFAULT_CACHE_CONFIG, response: createEntry() }),
    ).rejects.toBe(error);
  });

  it('menghapus seluruh key tenant pada beberapa halaman scan', async () => {
    redisMock.scan
      .mockResolvedValueOnce(['12', ['cache:acme:1', 'cache:acme:2']])
      .mockResolvedValueOnce(['0', ['cache:acme:3']]);
    redisMock.del.mockResolvedValueOnce(2).mockResolvedValueOnce(1);

    await expect(adapter.invalidateByTenant('acme')).resolves.toBe(3);
    expect(redisMock.scan).toHaveBeenNthCalledWith(1, '0', 'MATCH', 'cache:acme:*', 'COUNT', 100);
    expect(redisMock.scan).toHaveBeenNthCalledWith(2, '12', 'MATCH', 'cache:acme:*', 'COUNT', 100);
    expect(redisMock.del).toHaveBeenNthCalledWith(1, 'cache:acme:1', 'cache:acme:2');
    expect(redisMock.del).toHaveBeenNthCalledWith(2, 'cache:acme:3');
  });

  it('menyanitize tenantId yang berbahaya', async () => {
    redisMock.scan.mockResolvedValue(['0', []]);
    await adapter.invalidateByTenant('acme;DROP');
    expect(redisMock.scan).toHaveBeenCalledWith(
      '0',
      'MATCH',
      `${CACHE_STORE_KEY_PREFIX}acme_DROP:*`,
      'COUNT',
      100,
    );
  });

  it('mengembalikan nol saat invalidasi tenant gagal', async () => {
    redisMock.scan.mockRejectedValue(new Error('redis down'));
    await expect(adapter.invalidateByTenant('acme')).resolves.toBe(0);
  });
});
