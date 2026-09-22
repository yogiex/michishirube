import { InternalConfigError } from '@/shared/errors/index.js';

export interface Quota {
  readonly limit: number;
  readonly windowSec: number;
}

const MIN_WINDOW_SEC = 1;
const MAX_WINDOW_SEC = 3600;
const MIN_LIMIT = 1;
const MAX_LIMIT = 1_000_000;

export function createQuota(limit: number, windowSec: number): Quota {
  if (!Number.isInteger(limit) || limit < MIN_LIMIT || limit > MAX_LIMIT) {
    throw new InternalConfigError(
      `Quota limit tidak valid: ${limit} (harus ${MIN_LIMIT}..${MAX_LIMIT})`,
    );
  }
  if (!Number.isInteger(windowSec) || windowSec < MIN_WINDOW_SEC || windowSec > MAX_WINDOW_SEC) {
    throw new InternalConfigError(
      `Quota window tidak valid: ${windowSec}s (harus ${MIN_WINDOW_SEC}..${MAX_WINDOW_SEC}s)`,
    );
  }
  return { limit, windowSec };
}

export type QuotaDimension = 'ip' | 'user' | 'tenant' | 'route';

export function singleQuota(limit: number, windowSec: number): Quota {
  return createQuota(limit, windowSec);
}
