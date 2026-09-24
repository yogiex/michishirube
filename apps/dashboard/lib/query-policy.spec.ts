import { describe, expect, it } from 'vitest';
import { QUERY_STALE_TIME_MS, shouldRetryQuery } from './query-policy';

describe('query policy', () => {
  it.each([408, 425, 429, 500, 502, 503, 504])('retries status %i once', (status) => {
    expect(shouldRetryQuery(0, { status })).toBe(true);
    expect(shouldRetryQuery(1, { status })).toBe(false);
  });

  it.each([400, 401, 403, 404, 422])('does not retry status %i', (status) => {
    expect(shouldRetryQuery(0, { status })).toBe(false);
  });

  it('retries unknown network failures once', () => {
    expect(shouldRetryQuery(0, new Error('offline'))).toBe(true);
    expect(shouldRetryQuery(1, new Error('offline'))).toBe(false);
  });

  it('uses a stable stale time', () => {
    expect(QUERY_STALE_TIME_MS).toBe(30_000);
  });
});
