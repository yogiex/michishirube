import { ErrorCode, ErrorCodeValue } from './error-codes.js';

export interface ErrorCatalogEntry {
  status: number;
  title: string;
  retryable: boolean;
  /** Sembunyikan detail di produksi (untuk 5xx) */
  hideDetailInProd?: boolean;
}

export const ERROR_CATALOG: Record<ErrorCodeValue, ErrorCatalogEntry> = {
  // Auth
  [ErrorCode.AUTH_MISSING]:                 { status: 401, title: 'Missing credentials', retryable: false },
  [ErrorCode.AUTH_INVALID]:                 { status: 401, title: 'Invalid credentials', retryable: false },
  [ErrorCode.AUTH_TOKEN_EXPIRED]:           { status: 401, title: 'Token expired', retryable: false },
  [ErrorCode.AUTH_TOKEN_MALFORMED]:         { status: 401, title: 'Malformed token', retryable: false },
  [ErrorCode.AUTH_TOKEN_REVOKED]:           { status: 401, title: 'Token revoked', retryable: false },
  [ErrorCode.AUTH_SIGNATURE_INVALID]:       { status: 401, title: 'Invalid signature', retryable: false },
  [ErrorCode.AUTH_ISSUER_INVALID]:          { status: 401, title: 'Invalid token issuer', retryable: false },
  [ErrorCode.AUTH_AUDIENCE_INVALID]:        { status: 401, title: 'Invalid token audience', retryable: false },
  [ErrorCode.AUTH_JWKS_UNAVAILABLE]:        { status: 503, title: 'JWKS unavailable', retryable: true },
  [ErrorCode.AUTH_APIKEY_INVALID]:          { status: 401, title: 'Invalid API key', retryable: false },
  [ErrorCode.AUTH_APIKEY_REVOKED]:          { status: 401, title: 'API key revoked', retryable: false },
  [ErrorCode.AUTH_APIKEY_EXPIRED]:          { status: 401, title: 'API key expired', retryable: false },
  [ErrorCode.AUTH_MTLS_REQUIRED]:           { status: 401, title: 'mTLS required', retryable: false },
  [ErrorCode.AUTH_MTLS_INVALID]:            { status: 401, title: 'Invalid client certificate', retryable: false },

  // RBAC
  [ErrorCode.RBAC_FORBIDDEN]:               { status: 403, title: 'Forbidden', retryable: false },
  [ErrorCode.RBAC_ROLE_MISSING]:            { status: 403, title: 'Missing role', retryable: false },
  [ErrorCode.RBAC_SCOPE_MISSING]:           { status: 403, title: 'Missing scope', retryable: false },
  [ErrorCode.RBAC_TENANT_MISMATCH]:         { status: 403, title: 'Tenant mismatch', retryable: false },
  [ErrorCode.RBAC_RESOURCE_DENIED]:         { status: 403, title: 'Resource access denied', retryable: false },
  [ErrorCode.RBAC_POLICY_DENIED]:           { status: 403, title: 'Denied by policy', retryable: false },

  // Tenant
  [ErrorCode.TENANT_MISSING]:               { status: 400, title: 'Tenant not identified', retryable: false },
  [ErrorCode.TENANT_UNKNOWN]:               { status: 404, title: 'Unknown tenant', retryable: false },
  [ErrorCode.TENANT_SUSPENDED]:             { status: 403, title: 'Tenant suspended', retryable: false },
  [ErrorCode.TENANT_INACTIVE]:              { status: 403, title: 'Tenant inactive', retryable: false },
  [ErrorCode.TENANT_QUOTA_EXCEEDED]:        { status: 429, title: 'Tenant quota exceeded', retryable: true },
  [ErrorCode.TENANT_MISMATCH]:              { status: 403, title: 'Tenant mismatch', retryable: false },

  // Validation
  [ErrorCode.VALIDATION_FAILED]:            { status: 400, title: 'Validation failed', retryable: false },
  [ErrorCode.VALIDATION_BODY_INVALID]:      { status: 400, title: 'Invalid request body', retryable: false },
  [ErrorCode.VALIDATION_QUERY_INVALID]:     { status: 400, title: 'Invalid query', retryable: false },
  [ErrorCode.VALIDATION_PARAM_INVALID]:     { status: 400, title: 'Invalid path parameter', retryable: false },
  [ErrorCode.VALIDATION_HEADER_MISSING]:    { status: 400, title: 'Missing header', retryable: false },
  [ErrorCode.VALIDATION_HEADER_INVALID]:    { status: 400, title: 'Invalid header', retryable: false },
  [ErrorCode.VALIDATION_CONTENT_TYPE]:      { status: 415, title: 'Unsupported media type', retryable: false },
  [ErrorCode.VALIDATION_ACCEPT]:            { status: 406, title: 'Not acceptable', retryable: false },
  [ErrorCode.VALIDATION_PAYLOAD_TOO_LARGE]: { status: 413, title: 'Payload too large', retryable: false },
  [ErrorCode.VALIDATION_SCHEMA_MISMATCH]:   { status: 400, title: 'Schema mismatch', retryable: false },

  // Routing
  [ErrorCode.ROUTE_NOT_FOUND]:              { status: 404, title: 'Route not found', retryable: false },
  [ErrorCode.ROUTE_METHOD_NOT_ALLOWED]:     { status: 405, title: 'Method not allowed', retryable: false },
  [ErrorCode.ROUTE_DISABLED]:               { status: 503, title: 'Route disabled', retryable: false },
  [ErrorCode.ROUTE_DEPRECATED]:             { status: 410, title: 'Route deprecated', retryable: false },
  [ErrorCode.ROUTE_UPSTREAM_MISSING]:       { status: 500, title: 'Upstream not configured', retryable: false, hideDetailInProd: true },
  [ErrorCode.ROUTE_CONFIG_INVALID]:         { status: 500, title: 'Invalid route configuration', retryable: false, hideDetailInProd: true },
  [ErrorCode.ROUTE_LOOP_DETECTED]:          { status: 508, title: 'Routing loop detected', retryable: false },

  // Rate Limit
  [ErrorCode.RATE_LIMIT_EXCEEDED]:          { status: 429, title: 'Rate limit exceeded', retryable: true },
  [ErrorCode.RATE_LIMIT_IP_EXCEEDED]:       { status: 429, title: 'IP rate limit exceeded', retryable: true },
  [ErrorCode.RATE_LIMIT_USER_EXCEEDED]:     { status: 429, title: 'User rate limit exceeded', retryable: true },
  [ErrorCode.RATE_LIMIT_TENANT_EXCEEDED]:   { status: 429, title: 'Tenant rate limit exceeded', retryable: true },
  [ErrorCode.RATE_LIMIT_ROUTE_EXCEEDED]:    { status: 429, title: 'Route rate limit exceeded', retryable: true },
  [ErrorCode.RATE_LIMIT_BURST_EXCEEDED]:    { status: 429, title: 'Burst limit exceeded', retryable: true },
  [ErrorCode.RATE_LIMIT_STORE_UNAVAILABLE]: { status: 503, title: 'Rate limit store unavailable', retryable: true },
  [ErrorCode.QUOTA_DAILY_EXCEEDED]:         { status: 429, title: 'Daily quota exceeded', retryable: true },
  [ErrorCode.QUOTA_MONTHLY_EXCEEDED]:       { status: 429, title: 'Monthly quota exceeded', retryable: true },

  // Idempotency
  [ErrorCode.IDEMP_KEY_MISSING]:            { status: 400, title: 'Idempotency key missing', retryable: false },
  [ErrorCode.IDEMP_KEY_INVALID]:            { status: 400, title: 'Invalid idempotency key', retryable: false },
  [ErrorCode.IDEMP_IN_PROGRESS]:            { status: 409, title: 'Request in progress', retryable: true },
  [ErrorCode.IDEMP_CONFLICT]:               { status: 409, title: 'Idempotency conflict', retryable: false },
  [ErrorCode.IDEMP_EXPIRED]:                { status: 409, title: 'Idempotency record expired', retryable: false },
  [ErrorCode.IDEMP_STORE_UNAVAILABLE]:      { status: 503, title: 'Idempotency store unavailable', retryable: true },

  // Circuit Breaker
  [ErrorCode.CIRCUIT_OPEN]:                 { status: 503, title: 'Service temporarily unavailable', retryable: true },
  [ErrorCode.CIRCUIT_HALF_OPEN_REJECTED]:   { status: 503, title: 'Service recovering', retryable: true },
  [ErrorCode.CIRCUIT_FORCED_OPEN]:          { status: 503, title: 'Service disabled', retryable: true },
  [ErrorCode.BULKHEAD_REJECTED]:            { status: 503, title: 'Concurrency limit reached', retryable: true },

  // Upstream
  [ErrorCode.UPSTREAM_UNAVAILABLE]:         { status: 503, title: 'Upstream unavailable', retryable: true },
  [ErrorCode.UPSTREAM_TIMEOUT]:             { status: 504, title: 'Upstream timeout', retryable: true },
  [ErrorCode.UPSTREAM_CONNECT_FAILED]:      { status: 502, title: 'Upstream connection failed', retryable: true },
  [ErrorCode.UPSTREAM_ERROR]:               { status: 502, title: 'Upstream error', retryable: true },
  [ErrorCode.UPSTREAM_INVALID_RESPONSE]:    { status: 502, title: 'Invalid upstream response', retryable: false },
  [ErrorCode.UPSTREAM_TLS_ERROR]:           { status: 502, title: 'Upstream TLS error', retryable: false },
  [ErrorCode.UPSTREAM_DNS_FAILED]:          { status: 502, title: 'Upstream DNS failure', retryable: true },
  [ErrorCode.UPSTREAM_RETRY_EXHAUSTED]:     { status: 504, title: 'Upstream retries exhausted', retryable: false },
  [ErrorCode.UPSTREAM_PROTOCOL_ERROR]:      { status: 502, title: 'Upstream protocol error', retryable: false },

  // Cache
  [ErrorCode.CACHE_STORE_UNAVAILABLE]:      { status: 503, title: 'Cache store unavailable', retryable: true },
  [ErrorCode.CACHE_KEY_INVALID]:            { status: 500, title: 'Invalid cache key', retryable: false, hideDetailInProd: true },

  // Internal
  [ErrorCode.INTERNAL_ERROR]:               { status: 500, title: 'Internal server error', retryable: false, hideDetailInProd: true },
  [ErrorCode.INTERNAL_CONFIG_ERROR]:        { status: 500, title: 'Configuration error', retryable: false, hideDetailInProd: true },
  [ErrorCode.INTERNAL_DEPENDENCY_ERROR]:    { status: 500, title: 'Dependency error', retryable: false, hideDetailInProd: true },
  [ErrorCode.INTERNAL_NOT_IMPLEMENTED]:     { status: 501, title: 'Not implemented', retryable: false },
  [ErrorCode.INTERNAL_MAINTENANCE]:         { status: 503, title: 'Maintenance mode', retryable: true },

  // Ops
  [ErrorCode.OPS_UNAUTHORIZED]:             { status: 401, title: 'Admin unauthorized', retryable: false },
  [ErrorCode.OPS_FORBIDDEN]:                { status: 403, title: 'Admin forbidden', retryable: false },
  [ErrorCode.OPS_RATE_LIMITED]:             { status: 429, title: 'Admin rate limited', retryable: true },
  [ErrorCode.OPS_RELOAD_IN_PROGRESS]:       { status: 409, title: 'Reload in progress', retryable: true },
  [ErrorCode.OPS_INVALID_CONFIG]:           { status: 422, title: 'Invalid configuration', retryable: false },
  [ErrorCode.OPS_METRICS_UNAVAILABLE]:      { status: 503, title: 'Metrics unavailable', retryable: true },
};