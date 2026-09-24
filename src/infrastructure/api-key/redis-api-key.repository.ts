import { Inject, Injectable } from '@nestjs/common';
import type { Redis } from 'ioredis';
import { z } from 'zod';
import type { ApiKeyHashService } from '@/core/api-key/domain/api-key-hash.service.js';
import { API_KEY_STATUSES, type ApiKey } from '@/core/api-key/domain/api-key.entity.js';
import type { ApiKeyRepositoryPort } from '@/core/api-key/domain/api-key.repository.port.js';
import { REDIS_CLIENT } from '@/infrastructure/redis/redis.constants.js';
import { InternalDependencyError, ValidationFailedError } from '@/shared/errors/index.js';
import { none, some, type Option } from '@/shared/types/option.type.js';
import {
  API_KEY_ENTITY_PREFIX,
  API_KEY_HASH_INDEX_PREFIX,
  API_KEY_TENANT_INDEX_PREFIX,
  CREATE_API_KEY_SCRIPT,
  INCREMENT_API_KEY_USAGE_SCRIPT,
  REGISTER_API_KEY_INDEX_SCRIPT,
  REVOKE_API_KEY_SCRIPT,
} from './api-key.constants.js';

const ApiKeySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(128),
  tenantId: z
    .string()
    .min(1)
    .max(128)
    .regex(/^[A-Za-z0-9_-]+$/),
  keyHash: z.string().min(32).max(512),
  keyPrefix: z.string().min(8).max(32),
  scopes: z.array(z.string().min(1).max(128)).min(1).max(100),
  status: z.enum(API_KEY_STATUSES),
  usageCount: z.number().int().nonnegative(),
  createdAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
  lastUsedAt: z.string().datetime().optional(),
});
const IdSchema = z.string().uuid();
const TenantIdSchema = z
  .string()
  .min(1)
  .max(128)
  .regex(/^[A-Za-z0-9_-]+$/);
const IdListSchema = z.array(IdSchema);
const ResultSchema = z.number().int().min(0).max(1);

export interface RedisApiKeyClient {
  eval(
    script: string,
    numberOfKeys: number,
    ...arguments_: Array<string | number>
  ): Promise<unknown>;
  get(key: string): Promise<string | null>;
  mget(...keys: string[]): Promise<Array<string | null>>;
  smembers(key: string): Promise<string[]>;
}

@Injectable()
export class RedisApiKeyRepository implements ApiKeyRepositoryPort {
  constructor(
    @Inject(REDIS_CLIENT) private readonly redis: Redis | RedisApiKeyClient,
    private readonly hasher: ApiKeyHashService,
  ) {}

  async findAll(tenantId: string): Promise<readonly ApiKey[]> {
    const validTenantId = this.parseInput(TenantIdSchema, tenantId);
    const ids = await this.run(() => this.redis.smembers(this.tenantIndexKey(validTenantId)));
    const validIds = this.parseStored(IdListSchema, ids, 'findAll');
    if (validIds.length === 0) return [];
    const values = await this.run(() =>
      this.redis.mget(...validIds.map((id) => this.entityKey(id))),
    );
    return this.parseList(values, validTenantId);
  }

  async findById(id: string): Promise<Option<ApiKey>> {
    const validId = this.parseInput(IdSchema, id);
    const raw = await this.run(() => this.redis.get(this.entityKey(validId)));
    return raw === null ? none() : some(this.parseStoredEntity(raw, 'findById'));
  }

  async findByPlaintext(plaintextKey: string): Promise<Option<ApiKey>> {
    if (!this.hasher.isValidFormat(plaintextKey)) return none();
    const indexHash = this.hasher.indexHash(plaintextKey);
    const id = await this.run(() => this.redis.get(this.hashIndexKey(indexHash)));
    if (id === null) return none();
    const validId = this.parseStored(IdSchema, id, 'findByPlaintext');
    const found = await this.findById(validId);
    if (!found.some || !(await this.hasher.verify(found.value.keyHash, plaintextKey)))
      return none();
    return found;
  }

  async create(apiKey: ApiKey, indexHash: string): Promise<boolean> {
    const key = this.parseInput(ApiKeySchema, apiKey);
    const validIndex = this.parseInput(
      z
        .string()
        .length(64)
        .regex(/^[a-f0-9]+$/),
      indexHash,
    );
    const result = await this.run(() =>
      this.redis.eval(
        CREATE_API_KEY_SCRIPT,
        3,
        this.entityKey(key.id),
        this.tenantIndexKey(key.tenantId),
        this.hashIndexKey(validIndex),
        key.id,
        JSON.stringify(key),
      ),
    );
    return this.parseResult(result, 'create') === 1;
  }

  async revoke(id: string, tenantId: string): Promise<boolean> {
    const validId = this.parseInput(IdSchema, id);
    const validTenantId = this.parseInput(TenantIdSchema, tenantId);
    const result = await this.run(() =>
      this.redis.eval(REVOKE_API_KEY_SCRIPT, 1, this.entityKey(validId), validTenantId),
    );
    return this.parseResult(result, 'revoke') === 1;
  }

  async incrementUsage(id: string, usedAt: Date): Promise<boolean> {
    const validId = this.parseInput(IdSchema, id);
    const validDate = this.parseInput(z.string().datetime(), usedAt.toISOString());
    const result = await this.run(() =>
      this.redis.eval(INCREMENT_API_KEY_USAGE_SCRIPT, 1, this.entityKey(validId), validDate),
    );
    return this.parseResult(result, 'incrementUsage') === 1;
  }

  async registerIndex(indexHash: string, id: string): Promise<boolean> {
    const validIndex = this.parseInput(
      z
        .string()
        .length(64)
        .regex(/^[a-f0-9]+$/),
      indexHash,
    );
    const validId = this.parseInput(IdSchema, id);
    const result = await this.run(() =>
      this.redis.eval(REGISTER_API_KEY_INDEX_SCRIPT, 1, this.hashIndexKey(validIndex), validId),
    );
    return this.parseResult(result, 'registerIndex') === 1;
  }

  private parseList(values: readonly (string | null)[], tenantId: string): readonly ApiKey[] {
    const keys: ApiKey[] = [];
    for (const raw of values) {
      if (raw === null) continue;
      const key = this.parseStoredEntity(raw, 'findAll');
      if (key.tenantId === tenantId) keys.push(key);
    }
    return keys.sort((left, right) => right.createdAt.localeCompare(left.createdAt));
  }

  private parseStoredEntity(raw: string, operation: string): ApiKey {
    let decoded: unknown;
    try {
      decoded = JSON.parse(raw);
    } catch (cause) {
      throw this.corruptError(operation, cause);
    }
    return this.parseStored(ApiKeySchema, decoded, operation);
  }

  private parseStored<T>(schema: z.ZodType<T>, value: unknown, operation: string): T {
    const result = schema.safeParse(value);
    if (result.success) return result.data;
    throw this.corruptError(operation, result.error);
  }

  private parseInput<T>(schema: z.ZodType<T>, value: unknown): T {
    const result = schema.safeParse(value);
    if (result.success) return result.data;
    throw new ValidationFailedError('Input API key tidak valid', {
      fieldErrors: result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        code: issue.code,
        message: issue.message,
      })),
    });
  }

  private parseResult(value: unknown, operation: string): number {
    const result = ResultSchema.safeParse(value);
    if (result.success) return result.data;
    throw this.corruptError(operation, result.error);
  }

  private entityKey(id: string): string {
    return `${API_KEY_ENTITY_PREFIX}${id}`;
  }
  private hashIndexKey(indexHash: string): string {
    return `${API_KEY_HASH_INDEX_PREFIX}${indexHash}`;
  }
  private tenantIndexKey(tenantId: string): string {
    return `${API_KEY_TENANT_INDEX_PREFIX}${tenantId}`;
  }

  private async run<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch (cause) {
      if (cause instanceof ValidationFailedError) throw cause;
      throw new InternalDependencyError('API key storage unavailable', { cause });
    }
  }

  private corruptError(operation: string, cause: unknown): InternalDependencyError {
    return new InternalDependencyError('API key storage data tidak valid', {
      meta: { operation },
      cause,
    });
  }
}
