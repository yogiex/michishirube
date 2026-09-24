import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { Redis } from 'ioredis';
import { z } from 'zod';
import type {
  IdempotencyAcquireResult,
  IdempotencyLookup,
  IdempotencyResponse,
  IdempotencyStoreAcquireCommand,
  IdempotencyStorePort,
  IdempotencyStoreResult,
} from '@/core/idempotency/domain/idempotency-store.port.js';
import {
  createIdempotencyKey,
  type IdempotencyRedisKey,
} from '@/core/idempotency/domain/idempotency-key.vo.js';
import { createTenantId } from '@/core/tenant/domain/tenant-id.vo.js';
import { unbrand } from '@/shared/types/index.js';
import { ValidationFailedError } from '@/shared/errors/index.js';
import { REDIS_CLIENT } from '@/infrastructure/redis/redis.constants.js';
import {
  IDEMPOTENCY_DEFAULT_TTL_MS,
  IDEMPOTENCY_LUA,
  IDEMPOTENCY_MAX_HEADER_BYTES,
  IDEMPOTENCY_MAX_HEADER_COUNT,
  IDEMPOTENCY_MAX_RESPONSE_BYTES,
  IDEMPOTENCY_MAX_TTL_MS,
} from './idempotency.constants.js';

const HeaderNameSchema = z
  .string()
  .min(1)
  .max(128)
  .regex(/^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/);
const HeaderValueSchema = z.string().max(8_192);
const ResponseSchema = z.object({
  statusCode: z.number().int().min(100).max(599),
  headers: z.record(HeaderNameSchema, HeaderValueSchema),
  body: z.string().max(IDEMPOTENCY_MAX_RESPONSE_BYTES),
});
const StoredResponseSchema = ResponseSchema.optional();
const StoredRecordSchema = z.object({
  status: z.enum(['in_progress', 'completed']),
  fingerprint: z.string().min(1).max(128),
  createdAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
  response: StoredResponseSchema,
});
const RedisKeySchema = z
  .string()
  .min(1)
  .max(640)
  .regex(/^gateway:idempotency:[A-Za-z0-9_-]+:[A-Za-z0-9._~%!$&'()*+,;=:@/-]+$/);
const FingerprintSchema = z
  .string()
  .min(1)
  .max(128)
  .regex(/^[A-Za-z0-9_-]+$/);
const TtlSchema = z.number().int().min(1).max(IDEMPOTENCY_MAX_TTL_MS);
const ScriptShaSchema = z
  .string()
  .length(40)
  .regex(/^[a-f0-9]+$/);
const NumberResultSchema = z.number().int().min(0).max(1);
const RedisGetSchema = z.union([z.string(), z.null()]);

export interface RedisIdempotencyClient {
  script(command: 'LOAD', script: string): Promise<unknown>;
  get(key: string): Promise<unknown>;
  evalsha(
    sha: string,
    numberOfKeys: number,
    key: string,
    operation: 'acquire' | 'complete' | 'release',
    fingerprint: string,
    ttl: string,
    createdAt: string,
    expiresAt: string,
    response: string,
  ): Promise<unknown>;
}

@Injectable()
export class RedisIdempotencyStoreAdapter implements IdempotencyStorePort, OnModuleInit {
  private scriptSha: string | undefined;

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis | RedisIdempotencyClient) {}

  async onModuleInit(): Promise<void> {
    this.scriptSha = await this.loadScript();
  }

  async acquire(command: IdempotencyStoreAcquireCommand): Promise<IdempotencyAcquireResult> {
    const values = this.parseCommand(command);
    const result = await this.execute(
      'acquire',
      values.redisKey,
      values.fingerprint,
      values.ttl,
      values.createdAt,
      values.expiresAt,
      '{}',
    );
    if (Array.isArray(result) && result[0] === 'acquired') return { kind: 'acquired' };
    if (Array.isArray(result) && result[0] === 'in_progress') return { kind: 'in_progress' };
    if (Array.isArray(result) && result[0] === 'conflict') return { kind: 'conflict' };
    return { kind: 'unavailable' };
  }

  async get(redisKey: IdempotencyRedisKey): Promise<IdempotencyLookup> {
    const key = this.parse(RedisKeySchema, unbrand(redisKey));
    try {
      const raw = this.parse(RedisGetSchema, await this.redis.get(key));
      if (raw === null) return { kind: 'not_found' };
      return this.parseStored(raw, key);
    } catch (cause) {
      if (cause instanceof ValidationFailedError) return { kind: 'unavailable' };
      return { kind: 'unavailable' };
    }
  }

  async complete(
    redisKey: IdempotencyRedisKey,
    response: IdempotencyResponse,
  ): Promise<IdempotencyStoreResult<void>> {
    const key = this.parse(RedisKeySchema, unbrand(redisKey));
    const validResponse = this.parseResponse(response);
    const serialized = this.serializeResponse(validResponse);
    const now = new Date();
    const expiresAt = new Date(now.getTime() + IDEMPOTENCY_DEFAULT_TTL_MS);
    try {
      const result = await this.execute(
        'complete',
        key,
        '',
        IDEMPOTENCY_DEFAULT_TTL_MS,
        now.toISOString(),
        expiresAt.toISOString(),
        serialized,
      );
      const parsed = NumberResultSchema.safeParse(result);
      if (!parsed.success || parsed.data !== 1) return { kind: 'unavailable' };
      return { kind: 'ok', value: undefined };
    } catch (cause) {
      if (cause instanceof ValidationFailedError) throw cause;
      return { kind: 'unavailable' };
    }
  }

  async release(redisKey: IdempotencyRedisKey): Promise<IdempotencyStoreResult<void>> {
    const key = this.parse(RedisKeySchema, unbrand(redisKey));
    try {
      const result = await this.execute(
        'release',
        key,
        '',
        IDEMPOTENCY_DEFAULT_TTL_MS,
        '',
        '',
        '{}',
      );
      const parsed = NumberResultSchema.safeParse(result);
      if (!parsed.success || parsed.data !== 1) return { kind: 'unavailable' };
      return { kind: 'ok', value: undefined };
    } catch {
      return { kind: 'unavailable' };
    }
  }

  private async loadScript(): Promise<string> {
    try {
      return this.parse(ScriptShaSchema, await this.redis.script('LOAD', IDEMPOTENCY_LUA));
    } catch (cause) {
      if (cause instanceof ValidationFailedError) throw cause;
      throw new ValidationFailedError('Idempotency script tidak dapat dimuat', { cause });
    }
  }

  private async execute(
    operation: 'acquire' | 'complete' | 'release',
    key: string,
    fingerprint: string,
    ttl: number,
    createdAt: string,
    expiresAt: string,
    response: string,
  ): Promise<unknown> {
    const sha = this.scriptSha;
    if (sha === undefined) throw new Error('IDEMPOTENCY_SCRIPT_NOT_LOADED');
    return this.redis.evalsha(
      sha,
      1,
      key,
      operation,
      fingerprint,
      String(ttl),
      createdAt,
      expiresAt,
      response,
    );
  }

  private parseCommand(command: IdempotencyStoreAcquireCommand): {
    readonly redisKey: string;
    readonly fingerprint: string;
    readonly ttl: number;
    readonly createdAt: string;
    readonly expiresAt: string;
  } {
    const now = this.parse(z.date(), command.now);
    if (Number.isNaN(now.getTime())) throw this.validationError('now');
    return {
      redisKey: this.parse(RedisKeySchema, unbrand(command.redisKey)),
      fingerprint: this.parse(FingerprintSchema, command.requestFingerprint),
      ttl: this.parse(TtlSchema, command.ttlMs),
      createdAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + this.parse(TtlSchema, command.ttlMs)).toISOString(),
    };
  }

  private parseResponse(response: IdempotencyResponse): IdempotencyResponse {
    const parsed = ResponseSchema.safeParse(response);
    if (!parsed.success) throw this.validationError(parsed.error);
    const headers = parsed.data.headers;
    const bytes = Object.entries(headers).reduce(
      (total, [name, value]) => total + Buffer.byteLength(name) + Buffer.byteLength(value),
      0,
    );
    if (
      Object.keys(headers).length > IDEMPOTENCY_MAX_HEADER_COUNT ||
      bytes > IDEMPOTENCY_MAX_HEADER_BYTES
    ) {
      throw new ValidationFailedError('Header response idempotency terlalu besar');
    }
    return parsed.data;
  }

  private serializeResponse(response: IdempotencyResponse): string {
    const serialized = JSON.stringify(response);
    if (Buffer.byteLength(serialized) > IDEMPOTENCY_MAX_RESPONSE_BYTES) {
      throw new ValidationFailedError('Response idempotency terlalu besar');
    }
    return serialized;
  }

  private parseStored(raw: string, key: string): IdempotencyLookup {
    let decoded: unknown;
    try {
      decoded = JSON.parse(raw);
    } catch (cause) {
      throw this.validationError(cause);
    }
    const parsed = StoredRecordSchema.safeParse(decoded);
    if (!parsed.success) throw this.validationError(parsed.error);
    return this.toLookup(key, parsed.data);
  }

  private toLookup(key: string, stored: z.infer<typeof StoredRecordSchema>): IdempotencyLookup {
    const tenant = key.split(':')[2] ?? '';
    const keyValue = key.split(':').slice(3).join(':');
    const base = {
      key: createIdempotencyKey(decodeURIComponent(keyValue)),
      tenantId: createTenantId(tenant),
      requestFingerprint: stored.fingerprint,
      createdAt: new Date(stored.createdAt),
      expiresAt: new Date(stored.expiresAt),
    } as const;
    const response = stored.response;
    if (stored.status === 'completed' && response !== undefined) {
      return { kind: 'completed', record: { ...base, status: 'completed', response } };
    }
    return { kind: 'in_progress', record: { ...base, status: 'in_progress' } };
  }

  private parse<T>(schema: z.ZodType<T>, value: unknown): T {
    const parsed = schema.safeParse(value);
    if (parsed.success) return parsed.data;
    throw this.validationError(parsed.error);
  }

  private validationError(cause: unknown): ValidationFailedError {
    return new ValidationFailedError('Input idempotency tidak valid', { cause });
  }
}
