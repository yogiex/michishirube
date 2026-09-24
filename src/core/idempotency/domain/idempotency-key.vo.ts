import { IdempotencyKeyInvalidError } from '@/shared/errors/index.js';
import { brand, unbrand, type Brand } from '@/shared/types/index.js';
import type { TenantId } from '../../tenant/domain/tenant-id.vo.js';

export type IdempotencyKey = Brand<string, 'IdempotencyKey'>;
export type IdempotencyRedisKey = Brand<string, 'IdempotencyRedisKey'>;

const IDEMPOTENCY_KEY_PATTERN = /^[A-Za-z0-9._~:-]{1,255}$/;
const REDIS_KEY_PREFIX = 'gateway:idempotency';

export function isValidIdempotencyKey(raw: string): boolean {
  return IDEMPOTENCY_KEY_PATTERN.test(raw);
}

export function createIdempotencyKey(raw: string): IdempotencyKey {
  if (!isValidIdempotencyKey(raw)) {
    throw new IdempotencyKeyInvalidError('Idempotency key tidak valid');
  }

  return brand<'IdempotencyKey'>(raw);
}

export function idempotencyKeyToString(key: IdempotencyKey): string {
  return unbrand(key);
}

export function buildIdempotencyRedisKey(
  tenantId: TenantId,
  key: IdempotencyKey,
): IdempotencyRedisKey {
  const encodedKey = encodeURIComponent(unbrand(key));
  return brand<'IdempotencyRedisKey'>(`${REDIS_KEY_PREFIX}:${unbrand(tenantId)}:${encodedKey}`);
}
