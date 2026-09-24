const RETRYABLE_STATUSES = new Set([408, 425, 429, 500, 502, 503, 504]);

function readStatus(error: unknown): number | undefined {
  if (typeof error !== 'object' || error === null || !('status' in error)) return undefined;
  const status = error.status;
  return typeof status === 'number' ? status : undefined;
}

export function shouldRetryQuery(failureCount: number, error: unknown): boolean {
  if (failureCount >= 1) return false;
  const status = readStatus(error);
  if (status !== undefined) return RETRYABLE_STATUSES.has(status);
  return failureCount < 1;
}

export const QUERY_STALE_TIME_MS = 30_000;
