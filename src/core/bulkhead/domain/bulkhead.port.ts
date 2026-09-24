import type { BulkheadConfig } from './bulkhead-config.vo.js';
import type { BulkheadStats } from './bulkhead-stats.entity.js';

export interface BulkheadPort {
  acquire(key: string, config: BulkheadConfig): Promise<void>;
  getStats(key: string): Promise<BulkheadStats>;
  listAll(): Promise<ReadonlyMap<string, BulkheadStats>>;
  reset(key: string): Promise<void>;
}
