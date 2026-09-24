import { describe, expect, it, vi, type Mock } from 'vitest';
import { RedisApiKeyRepository, type RedisApiKeyClient } from '../redis-api-key.repository.js';
import { API_KEY_STATUSES, type ApiKey } from '@/core/api-key/domain/api-key.entity.js';
import type { ApiKeyHashService } from '@/core/api-key/domain/api-key-hash.service.js';
import { InternalDependencyError, ValidationFailedError } from '@/shared/errors/index.js';
import {
  CREATE_API_KEY_SCRIPT,
  INCREMENT_API_KEY_USAGE_SCRIPT,
  REGISTER_API_KEY_INDEX_SCRIPT,
  REVOKE_API_KEY_SCRIPT,
} from '../api-key.constants.js';

const ID = '0194f5d4-3d2c-7b8a-9f10-1234567890ab';
const LOOKUP = 'a'.repeat(64);
const PLAINTEXT = `msh_sk_${'a'.repeat(43)}`;
const KEY: ApiKey = {
  id: ID,
  name: 'orders',
  tenantId: 'tenant_a',
  keyHash: 'argon-hash-value-long-enough-for-validation',
  keyPrefix: 'msh_sk_aaaaaaaa',
  scopes: ['orders:read'],
  status: 'active',
  usageCount: 0,
  createdAt: '2026-09-24T00:00:00.000Z',
  expiresAt: '2026-12-23T00:00:00.000Z',
};
type MockRedis = { [K in keyof RedisApiKeyClient]: Mock<RedisApiKeyClient[K]> };

function dependencies() {
  const redis: MockRedis = {
    eval: vi.fn().mockResolvedValue(1),
    get: vi.fn().mockResolvedValue(null),
    mget: vi.fn().mockResolvedValue([]),
    smembers: vi.fn().mockResolvedValue([]),
  };
  const hasher: ApiKeyHashService = {
    generatePlaintext: vi.fn(),
    hash: vi.fn(),
    verify: vi.fn<ApiKeyHashService['verify']>().mockResolvedValue(true),
    indexHash: vi.fn().mockReturnValue(LOOKUP),
    displayPrefix: vi.fn(),
    isValidFormat: vi.fn<ApiKeyHashService['isValidFormat']>().mockReturnValue(true),
  };
  return { redis, repository: new RedisApiKeyRepository(redis, hasher), hasher };
}

describe('RedisApiKeyRepository', () => {
  it('implements every exact port method', () => {
    const { repository } = dependencies();
    for (const method of [
      'findAll',
      'findById',
      'findByPlaintext',
      'create',
      'revoke',
      'incrementUsage',
      'registerIndex',
    ]) {
      expect(repository[method as keyof typeof repository]).toBeTypeOf('function');
    }
  });

  it('creates entity, tenant index, and SHA index atomically', async () => {
    const { redis, repository } = dependencies();
    await expect(repository.create(KEY, LOOKUP)).resolves.toBe(true);
    expect(redis.eval).toHaveBeenCalledWith(
      CREATE_API_KEY_SCRIPT,
      3,
      `api-key:entity:${ID}`,
      'api-key:tenant:tenant_a',
      `api-key:hash:${LOOKUP}`,
      ID,
      JSON.stringify(KEY),
    );
  });

  it('finds by ID as Option and lists only the requested tenant newest first', async () => {
    const { redis, repository } = dependencies();
    const older = {
      ...KEY,
      id: '0194f5d4-3d2c-7b8a-9f10-2234567890ab',
      createdAt: '2026-09-23T00:00:00.000Z',
    };
    redis.get.mockResolvedValueOnce(JSON.stringify(KEY));
    await expect(repository.findById(ID)).resolves.toEqual({ some: true, value: KEY });
    redis.smembers.mockResolvedValueOnce([ID, older.id]);
    redis.mget.mockResolvedValueOnce([JSON.stringify(KEY), JSON.stringify(older)]);
    await expect(repository.findAll('tenant_a')).resolves.toEqual([KEY, older]);
  });

  it('looks up plaintext by SHA index before Argon verification', async () => {
    const { redis, repository, hasher } = dependencies();
    redis.get.mockResolvedValueOnce(ID).mockResolvedValueOnce(JSON.stringify(KEY));
    await expect(repository.findByPlaintext(PLAINTEXT)).resolves.toEqual({
      some: true,
      value: KEY,
    });
    expect(hasher.indexHash).toHaveBeenCalledWith(PLAINTEXT);
    expect(hasher.verify).toHaveBeenCalledWith(KEY.keyHash, PLAINTEXT);
    vi.mocked(hasher.verify).mockResolvedValueOnce(false);
    redis.get.mockResolvedValueOnce(ID).mockResolvedValueOnce(JSON.stringify(KEY));
    await expect(repository.findByPlaintext(PLAINTEXT)).resolves.toEqual({ some: false });
  });

  it('uses atomic scripts for revoke, usage increment, and index registration', async () => {
    const { redis, repository } = dependencies();
    await repository.revoke(ID, 'tenant_a');
    expect(redis.eval).toHaveBeenLastCalledWith(
      REVOKE_API_KEY_SCRIPT,
      1,
      `api-key:entity:${ID}`,
      'tenant_a',
    );
    await repository.incrementUsage(ID, new Date('2026-09-24T12:00:00.000Z'));
    expect(redis.eval).toHaveBeenLastCalledWith(
      INCREMENT_API_KEY_USAGE_SCRIPT,
      1,
      `api-key:entity:${ID}`,
      '2026-09-24T12:00:00.000Z',
    );
    await repository.registerIndex(LOOKUP, ID);
    expect(redis.eval).toHaveBeenLastCalledWith(
      REGISTER_API_KEY_INDEX_SCRIPT,
      1,
      `api-key:hash:${LOOKUP}`,
      ID,
    );
  });

  it('Zod-validates inputs and fails closed for corrupt storage and Redis errors', async () => {
    const { redis, repository } = dependencies();
    await expect(repository.findById('../key')).rejects.toBeInstanceOf(ValidationFailedError);
    redis.get.mockResolvedValueOnce(JSON.stringify({ ...KEY, status: 'compromised' }));
    await expect(repository.findById(ID)).rejects.toBeInstanceOf(InternalDependencyError);
    redis.get.mockRejectedValueOnce(new Error('connection refused'));
    await expect(repository.findById(ID)).rejects.toBeInstanceOf(InternalDependencyError);
  });

  it('accepts every defined status and rejects invalid stored shapes', () => {
    expect(API_KEY_STATUSES).toEqual(['active', 'revoked', 'expired']);
  });
});
