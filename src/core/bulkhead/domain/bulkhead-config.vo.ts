import { InternalConfigError } from '@/shared/errors/index.js';

export interface BulkheadConfigInput {
  readonly maxConcurrency: number;
  readonly maxQueueSize: number;
  readonly timeoutMs: number;
}

const MIN_CONCURRENCY = 1;
const MAX_CONCURRENCY = 10_000;
const MIN_QUEUE_SIZE = 0;
const MAX_QUEUE_SIZE = 10_000;
const MIN_TIMEOUT_MS = 100;
const MAX_TIMEOUT_MS = 300_000;

function isValidInteger(value: number, min: number, max: number): boolean {
  return Number.isSafeInteger(value) && value >= min && value <= max;
}

export class BulkheadConfig {
  readonly maxConcurrency: number;
  readonly maxQueueSize: number;
  readonly timeoutMs: number;

  constructor(input: BulkheadConfigInput) {
    if (!isValidInteger(input.maxConcurrency, MIN_CONCURRENCY, MAX_CONCURRENCY)) {
      throw new InternalConfigError(`Bulkhead maxConcurrency tidak valid: ${input.maxConcurrency}`);
    }
    if (!isValidInteger(input.maxQueueSize, MIN_QUEUE_SIZE, MAX_QUEUE_SIZE)) {
      throw new InternalConfigError(`Bulkhead maxQueueSize tidak valid: ${input.maxQueueSize}`);
    }
    if (!isValidInteger(input.timeoutMs, MIN_TIMEOUT_MS, MAX_TIMEOUT_MS)) {
      throw new InternalConfigError(`Bulkhead timeoutMs tidak valid: ${input.timeoutMs}`);
    }

    this.maxConcurrency = input.maxConcurrency;
    this.maxQueueSize = input.maxQueueSize;
    this.timeoutMs = input.timeoutMs;
    Object.freeze(this);
  }
}

export function createBulkheadConfig(input: BulkheadConfigInput): BulkheadConfig {
  return new BulkheadConfig(input);
}
