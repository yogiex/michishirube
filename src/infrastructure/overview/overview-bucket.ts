import { BUCKET_MS } from './overview.constants.js';

export function bucketFor(ms: number): string {
  const date = new Date(ms);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}-${hours}-${minutes}`;
}

export function bucketRange(startMs: number, endMs: number): string[] {
  const buckets: string[] = [];
  const last = Math.floor(endMs / BUCKET_MS) * BUCKET_MS;
  for (
    let cursor = Math.floor(startMs / BUCKET_MS) * BUCKET_MS;
    cursor <= last;
    cursor += BUCKET_MS
  ) {
    buckets.push(bucketFor(cursor));
  }
  return buckets;
}

export function percentile(sorted: readonly number[], ratio: number): number {
  if (sorted.length === 0) return 0;
  const index = Math.min(sorted.length - 1, Math.floor(sorted.length * ratio));
  return sorted[index] ?? 0;
}
