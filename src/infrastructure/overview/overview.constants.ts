export const STATS_REQUESTS_KEY = 'gateway:stats:req';
export const STATS_ERRORS_KEY = 'gateway:stats:errors';
export const STATS_LATENCY_SAMPLES_KEY = 'gateway:stats:latency:samples';
export const AUDIT_RECENT_KEY = 'gateway:audit:recent';
export const CIRCUIT_KEY_PREFIX = 'gateway:circuit-breaker:';

export const COUNTER_TTL_SEC = 48 * 60 * 60;
export const MAX_LATENCY_SAMPLES = 1_000;
export const MGET_BATCH_SIZE = 500;
export const BUCKET_MS = 60_000;
export const SCAN_COUNT = 100;
export const SCAN_PATTERN = `${CIRCUIT_KEY_PREFIX}*`;
export const MINUTES_PER_DAY = 24 * 60;
export const CIRCLE_HISTORY_MS = 24 * 60 * 60 * 1000;
