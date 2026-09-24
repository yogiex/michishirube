import { Inject, Injectable, Logger } from '@nestjs/common';
import { InternalConfigError } from '@/shared/errors/index.js';

export const BULKHEAD = 'BULKHEAD';

export interface BulkheadConfig {
  readonly maxConcurrent: number;
  readonly maxQueue: number;
  readonly queueTimeoutMs: number;
}

export interface BulkheadLease {
  readonly queued: boolean;
  release(): Promise<void>;
}

export interface BulkheadPort {
  acquire(key: string, config: BulkheadConfig): Promise<BulkheadLease>;
}

export interface ExecuteWithBulkheadInput<T> {
  readonly key: string;
  readonly config: BulkheadConfig;
  readonly operation: () => Promise<T>;
}

@Injectable()
export class ExecuteWithBulkheadUseCase {
  private readonly logger = new Logger(ExecuteWithBulkheadUseCase.name);

  constructor(@Inject(BULKHEAD) private readonly bulkhead: BulkheadPort) {}

  async execute<T>(input: ExecuteWithBulkheadInput<T>): Promise<T> {
    this.validateInput(input);
    const lease = await this.bulkhead.acquire(input.key, input.config);
    if (lease.queued) {
      this.logger.debug({ key: input.key }, 'Bulkhead request queued');
    }
    try {
      return await input.operation();
    } finally {
      await lease.release();
    }
  }

  private validateInput<T>(input: ExecuteWithBulkheadInput<T>): void {
    if (input.key.trim().length === 0 || input.key.length > 200) {
      throw new InternalConfigError('Bulkhead key tidak valid');
    }
    if (!Number.isSafeInteger(input.config.maxConcurrent) || input.config.maxConcurrent <= 0) {
      throw new InternalConfigError('Bulkhead maxConcurrent tidak valid');
    }
    if (!Number.isSafeInteger(input.config.maxQueue) || input.config.maxQueue < 0) {
      throw new InternalConfigError('Bulkhead maxQueue tidak valid');
    }
    if (
      !Number.isSafeInteger(input.config.queueTimeoutMs) ||
      input.config.queueTimeoutMs <= 0 ||
      input.config.queueTimeoutMs > 3_600_000
    ) {
      throw new InternalConfigError('Bulkhead queueTimeoutMs tidak valid');
    }
  }
}
