import { describe, expect, it } from 'vitest';
import type { IdempotencyStorePort } from '../domain/idempotency-store.port.js';

describe('IdempotencyStorePort', () => {
  it('models unavailable outcomes for fail-closed operations', () => {
    const unavailableStore: IdempotencyStorePort = {
      acquire: async () => ({ kind: 'unavailable' }),
      get: async () => ({ kind: 'unavailable' }),
      complete: async () => ({ kind: 'unavailable' }),
      release: async () => ({ kind: 'unavailable' }),
    };

    expect(unavailableStore).toEqual({
      acquire: expect.any(Function),
      get: expect.any(Function),
      complete: expect.any(Function),
      release: expect.any(Function),
    });
  });
});
