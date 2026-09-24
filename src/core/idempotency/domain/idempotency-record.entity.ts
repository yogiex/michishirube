import type { IdempotencyKey, IdempotencyRedisKey } from './idempotency-key.vo.js';
import type { TenantId } from '../../tenant/domain/tenant-id.vo.js';

export interface IdempotencyResponse {
  readonly statusCode: number;
  readonly headers: Readonly<Record<string, string>>;
  readonly body: string;
}

export interface IdempotencyRecordBase {
  readonly tenantId: TenantId;
  readonly key: IdempotencyKey;
  readonly requestFingerprint: string;
  readonly createdAt: Date;
  readonly expiresAt: Date;
}

export type IdempotencyRecord =
  | (IdempotencyRecordBase & {
      readonly status: 'in_progress';
    })
  | (IdempotencyRecordBase & {
      readonly status: 'completed';
      readonly response: IdempotencyResponse;
    });

export interface InProgressIdempotencyRecord extends IdempotencyRecordBase {
  readonly status: 'in_progress';
}

export interface CompletedIdempotencyRecord extends IdempotencyRecordBase {
  readonly status: 'completed';
  readonly response: IdempotencyResponse;
}

export function createInProgressIdempotencyRecord(
  input: IdempotencyRecordBase,
): InProgressIdempotencyRecord {
  return Object.freeze({ ...input, status: 'in_progress' });
}

export function createCompletedIdempotencyRecord(
  input: IdempotencyRecordBase & { readonly response: IdempotencyResponse },
): CompletedIdempotencyRecord {
  return Object.freeze({
    ...input,
    status: 'completed',
    response: Object.freeze({
      ...input.response,
      headers: Object.freeze({ ...input.response.headers }),
    }),
  });
}

export type IdempotencyLookup =
  | { readonly kind: 'not_found' }
  | { readonly kind: 'in_progress'; readonly record: InProgressIdempotencyRecord }
  | { readonly kind: 'completed'; readonly record: CompletedIdempotencyRecord }
  | { readonly kind: 'conflict' }
  | { readonly kind: 'unavailable' };

export type IdempotencyStoreResult<T> =
  { readonly kind: 'ok'; readonly value: T } | { readonly kind: 'unavailable' };

export interface IdempotencyStoreAcquireCommand {
  readonly redisKey: IdempotencyRedisKey;
  readonly tenantId: TenantId;
  readonly key: IdempotencyKey;
  readonly requestFingerprint: string;
  readonly now: Date;
  readonly ttlMs: number;
}

export type IdempotencyAcquireResult =
  | { readonly kind: 'acquired' }
  | { readonly kind: 'in_progress' }
  | { readonly kind: 'conflict' }
  | { readonly kind: 'unavailable' };
