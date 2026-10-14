export const METRICS_REGISTRY = Symbol('METRICS_REGISTRY');

export interface HttpMetricInput {
  readonly method: string;
  readonly route: string;
  readonly status: number;
  readonly durationMs: number;
  readonly tenantHash: string;
  readonly upstream?: string;
}

export interface CircuitMetricInput {
  readonly upstream: string;
  readonly state: 'closed' | 'open' | 'half_open';
}

export interface CircuitTransitionMetricInput {
  readonly upstream: string;
  readonly from: string;
  readonly to: string;
}

export interface BulkheadMetricInput {
  readonly upstream: string;
  readonly result: 'acquired' | 'queued' | 'rejected' | 'timeout';
}

export interface CacheMetricInput {
  readonly result: 'hit' | 'miss' | 'stale' | 'error';
  readonly route: string;
}

export interface IdempotencyMetricInput {
  readonly result: 'acquired' | 'replay' | 'conflict' | 'in_progress' | 'error';
  readonly route: string;
}

export interface RetryMetricInput {
  readonly upstream: string;
  readonly attempt: number;
  readonly result: 'success' | 'failure' | 'exhausted';
}

export interface RateLimitMetricInput {
  readonly dimension: 'ip' | 'user' | 'tenant' | 'route';
  readonly result: 'allowed' | 'exceeded' | 'fail_open';
}

export interface MetricsRegistryPort {
  recordHttp(input: HttpMetricInput): void;
  recordCircuit(input: CircuitMetricInput): void;
  recordCircuitTransition(input: CircuitTransitionMetricInput): void;
  recordBulkhead(input: BulkheadMetricInput): void;
  recordBulkheadRelease(upstream: string): void;
  recordCache(input: CacheMetricInput): void;
  recordIdempotency(input: IdempotencyMetricInput): void;
  recordRetry(input: RetryMetricInput): void;
  recordRateLimit(input: RateLimitMetricInput): void;
  render(): Promise<string>;
  contentType(): string;
}
