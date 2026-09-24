export const BULKHEAD = Symbol('BULKHEAD');

export const BULKHEAD_DEFAULTS = Object.freeze({
  maxKeys: 10_000,
  idleTtlMs: 60_000,
  cleanupIntervalMs: 30_000,
});

export const BULKHEAD_KEY_MIN_LENGTH = 1;
export const BULKHEAD_KEY_MAX_LENGTH = 200;
export const BULKHEAD_KEY_PATTERN = /^[A-Za-z0-9._~:/-]+$/;

export const BULKHEAD_MAX_CONCURRENT = 10_000;
export const BULKHEAD_MAX_QUEUE = 10_000;
export const BULKHEAD_MAX_QUEUE_TIMEOUT_MS = 3_600_000;
