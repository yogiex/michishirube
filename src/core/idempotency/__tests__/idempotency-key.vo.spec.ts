import { describe, expect, it } from 'vitest';
import { ErrorCode } from '@/shared/errors/index.js';
import { createTenantId } from '../../tenant/domain/tenant-id.vo.js';
import {
  buildIdempotencyRedisKey,
  createIdempotencyKey,
  idempotencyKeyToString,
  isValidIdempotencyKey,
} from '../domain/idempotency-key.vo.js';

describe('IdempotencyKey', () => {
  it('accepts strict printable key material', () => {
    const values = ['A', 'request_123', 'order:create~1.0', 'a'.repeat(255)];

    for (const value of values) {
      const key = createIdempotencyKey(value);
      expect(isValidIdempotencyKey(value)).toBe(true);
      expect(idempotencyKeyToString(key)).toBe(value);
    }
  });

  it('rejects empty, oversized, whitespace, control, and unsafe material', () => {
    const values = ['', 'a'.repeat(256), 'has space', 'line\nbreak', 'slash/value', 'null\0byte'];

    for (const value of values) {
      expect(isValidIdempotencyKey(value)).toBe(false);
      expect(() => createIdempotencyKey(value)).toThrowError(
        expect.objectContaining({ code: ErrorCode.IDEMP_KEY_INVALID }),
      );
    }
  });

  it('builds tenant-scoped Redis keys without key delimiters', () => {
    const tenantId = createTenantId('acme');
    const key = createIdempotencyKey('order:create~1.0');

    expect(buildIdempotencyRedisKey(tenantId, key)).toBe(
      'gateway:idempotency:acme:order%3Acreate~1.0',
    );
  });

  it('isolates identical keys across tenants', () => {
    const key = createIdempotencyKey('same-request');
    const first = buildIdempotencyRedisKey(createTenantId('acme'), key);
    const second = buildIdempotencyRedisKey(createTenantId('globex'), key);

    expect(first).not.toBe(second);
  });
});
