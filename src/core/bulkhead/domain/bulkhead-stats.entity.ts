export interface BulkheadStats {
  readonly activeCount: number;
  readonly queuedCount: number;
  readonly rejectedCount: number;
}

export function createBulkheadStats(
  activeCount: number,
  queuedCount: number,
  rejectedCount: number,
): BulkheadStats {
  return Object.freeze({ activeCount, queuedCount, rejectedCount });
}
