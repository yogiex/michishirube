import { describe, expect, it } from 'vitest';
import { createTenantId } from '../../tenant/domain/tenant-id.vo.js';
import { createIdempotencyKey } from '../domain/idempotency-key.vo.js';
import {
  createCompletedIdempotencyRecord,
  createInProgressIdempotencyRecord,
  type IdempotencyRecordBase,
} from '../domain/idempotency-record.entity.js';

const input: IdempotencyRecordBase = {
  tenantId: createTenantId('acme'),
  key: createIdempotencyKey('order-123'),
  requestFingerprint: 'sha256:request-hash',
  createdAt: new Date('2026-09-24T10:00:00.000Z'),
  expiresAt: new Date('2026-09-25T10:00:00.000Z'),
};

describe('IdempotencyRecord', () => {
  it('creates an immutable in-progress record', () => {
    const record = createInProgressIdempotencyRecord(input);

    expect(record.status).toBe('in_progress');
    expect(Object.isFrozen(record)).toBe(true);
  });

  it('creates an immutable completed record with copied response data', () => {
    const headers = { 'content-type': 'application/json' };
    const record = createCompletedIdempotencyRecord({
      ...input,
      response: { statusCode: 201, headers, body: '{"id":1}' },
    });

    headers['content-type'] = 'text/plain';
    expect(record).toEqual({
      ...input,
      status: 'completed',
      response: {
        statusCode: 201,
        headers: { 'content-type': 'application/json' },
        body: '{"id":1}',
      },
    });
    expect(Object.isFrozen(record)).toBe(true);
    expect(Object.isFrozen(record.response.headers)).toBe(true);
  });
});
