export const METRIC_NAMES = {
  HTTP_REQUESTS_TOTAL: 'gateway_http_requests_total',
  HTTP_REQUEST_DURATION: 'gateway_http_request_duration_seconds',
  HTTP_REQUESTS_IN_FLIGHT: 'gateway_http_requests_in_flight',
  CIRCUIT_STATE: 'gateway_circuit_state',
  CIRCUIT_TRANSITIONS_TOTAL: 'gateway_circuit_transitions_total',
  BULKHEAD_ACQUIRED: 'gateway_bulkhead_acquired_total',
  BULKHEAD_QUEUED: 'gateway_bulkhead_queued_total',
  BULKHEAD_REJECTED: 'gateway_bulkhead_rejected_total',
  BULKHEAD_ACTIVE: 'gateway_bulkhead_active',
  CACHE_REQUESTS: 'gateway_cache_requests_total',
  IDEMPOTENCY_REQUESTS: 'gateway_idempotency_requests_total',
  RETRY_ATTEMPTS: 'gateway_retry_attempts_total',
  RATE_LIMIT_REQUESTS: 'gateway_rate_limit_requests_total',
} as const;

export const HTTP_DURATION_BUCKETS_SEC = [
  0.001, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10,
] as const;

export const MAX_UNIQUE_LABEL_VALUES = 1000;
