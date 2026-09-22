export const HEADERS = {
  REQUEST_ID: 'x-request-id',
  TENANT_ID: 'x-tenant-id',
  IDEMPOTENCY_KEY: 'idempotency-key',
  RATE_LIMIT_LIMIT: 'x-ratelimit-limit',
  RATE_LIMIT_REMAINING: 'x-ratelimit-remaining',
  RATE_LIMIT_RESET: 'x-ratelimit-reset',
  RATE_LIMIT_POLICY: 'x-ratelimit-policy',
  RETRY_AFTER: 'retry-after',
} as const;
