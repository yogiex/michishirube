import { describe, expect, it } from 'vitest';
import type { RetryBudgetPort, RetryBudgetSnapshot } from '../domain/retry-budget.port.js';

describe('RetryBudgetPort', () => {
  it('mendefinisikan operasi acquire, refund, dan reset', async () => {
    const snapshot: RetryBudgetSnapshot = {
      key: 'orders',
      capacity: 20,
      consumed: 1,
      resetsAtMs: 60_000,
    };
    const port: RetryBudgetPort = {
      tryAcquire: async (key) => ({
        kind: 'acquired',
        snapshot: { ...snapshot, key },
      }),
      refund: async (key) => ({ ...snapshot, key, consumed: 0 }),
      reset: async (key) => ({ ...snapshot, key, consumed: 0 }),
    };

    expect((await port.tryAcquire('orders', 0, 60_000)).kind).toBe('acquired');
    expect((await port.refund('orders', 1)).consumed).toBe(0);
    expect((await port.reset('orders', 60_001)).resetsAtMs).toBe(60_000);
  });
});
