export interface RetryBudgetSnapshot {
  readonly key: string;
  readonly capacity: number;
  readonly consumed: number;
  readonly resetsAtMs: number;
}

export type RetryBudgetAcquireResult =
  | {
      readonly kind: 'acquired';
      readonly snapshot: RetryBudgetSnapshot;
    }
  | {
      readonly kind: 'exhausted';
      readonly snapshot: RetryBudgetSnapshot;
    }
  | {
      readonly kind: 'unavailable';
    };

export interface RetryBudgetPort {
  tryAcquire(key: string, nowMs: number, ttlMs: number): Promise<RetryBudgetAcquireResult>;
  refund(key: string, nowMs: number): Promise<RetryBudgetSnapshot>;
  reset(key: string, nowMs: number): Promise<RetryBudgetSnapshot>;
}
