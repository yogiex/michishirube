import type {
  IdempotencyAcquireResult,
  IdempotencyLookup,
  IdempotencyResponse,
  IdempotencyStoreAcquireCommand,
  IdempotencyStoreResult,
} from './idempotency-record.entity.js';
import type { IdempotencyRedisKey } from './idempotency-key.vo.js';

export const IDEMPOTENCY_STORE = Symbol('IDEMPOTENCY_STORE');

export type {
  IdempotencyAcquireResult,
  IdempotencyLookup,
  IdempotencyResponse,
  IdempotencyStoreAcquireCommand,
  IdempotencyStoreResult,
} from './idempotency-record.entity.js';

export interface IdempotencyStorePort {
  acquire(command: IdempotencyStoreAcquireCommand): Promise<IdempotencyAcquireResult>;
  get(redisKey: IdempotencyRedisKey): Promise<IdempotencyLookup>;
  complete(
    redisKey: IdempotencyRedisKey,
    response: IdempotencyResponse,
  ): Promise<IdempotencyStoreResult<void>>;
  release(redisKey: IdempotencyRedisKey): Promise<IdempotencyStoreResult<void>>;
}
