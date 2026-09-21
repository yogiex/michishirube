import { DomainError, DomainErrorOptions } from './domain-error.js';
import { ErrorCode } from './error-codes.js';

type Opts = Omit<DomainErrorOptions, 'cause'>;

/** Factory helper: bikin class error per kode dengan pesan default. */
const make = (code: keyof typeof ErrorCode) =>
  class extends DomainError {
    constructor(message: string, options?: Opts) {
      super(ErrorCode[code], message, options);
      this.name = code;
    }
  };

// ─── Auth ────────────────────────────────────────────────
export class AuthMissingError extends make('AUTH_MISSING') {}
export class AuthInvalidError extends make('AUTH_INVALID') {}
export class AuthTokenExpiredError extends make('AUTH_TOKEN_EXPIRED') {}
export class AuthTokenMalformedError extends make('AUTH_TOKEN_MALFORMED') {}
export class AuthTokenRevokedError extends make('AUTH_TOKEN_REVOKED') {}
export class AuthSignatureInvalidError extends make('AUTH_SIGNATURE_INVALID') {}
export class AuthIssuerInvalidError extends make('AUTH_ISSUER_INVALID') {}
export class AuthAudienceInvalidError extends make('AUTH_AUDIENCE_INVALID') {}
export class AuthJwksUnavailableError extends make('AUTH_JWKS_UNAVAILABLE') {}
export class AuthApiKeyInvalidError extends make('AUTH_APIKEY_INVALID') {}
export class AuthApiKeyRevokedError extends make('AUTH_APIKEY_REVOKED') {}
export class AuthApiKeyExpiredError extends make('AUTH_APIKEY_EXPIRED') {}
export class AuthMtlsRequiredError extends make('AUTH_MTLS_REQUIRED') {}
export class AuthMtlsInvalidError extends make('AUTH_MTLS_INVALID') {}

// ─── RBAC ────────────────────────────────────────────────
export class RbacForbiddenError extends make('RBAC_FORBIDDEN') {}
export class RbacRoleMissingError extends make('RBAC_ROLE_MISSING') {}
export class RbacScopeMissingError extends make('RBAC_SCOPE_MISSING') {}
export class RbacTenantMismatchError extends make('RBAC_TENANT_MISMATCH') {}
export class RbacResourceDeniedError extends make('RBAC_RESOURCE_DENIED') {}
export class RbacPolicyDeniedError extends make('RBAC_POLICY_DENIED') {}

// ─── Tenant ──────────────────────────────────────────────
export class TenantMissingError extends make('TENANT_MISSING') {}
export class TenantUnknownError extends make('TENANT_UNKNOWN') {}
export class TenantSuspendedError extends make('TENANT_SUSPENDED') {}
export class TenantInactiveError extends make('TENANT_INACTIVE') {}
export class TenantQuotaExceededError extends make('TENANT_QUOTA_EXCEEDED') {}
export class TenantMismatchError extends make('TENANT_MISMATCH') {}

// ─── Validation ──────────────────────────────────────────
export class ValidationFailedError extends make('VALIDATION_FAILED') {}
export class ValidationBodyInvalidError extends make('VALIDATION_BODY_INVALID') {}
export class ValidationQueryInvalidError extends make('VALIDATION_QUERY_INVALID') {}
export class ValidationParamInvalidError extends make('VALIDATION_PARAM_INVALID') {}
export class ValidationHeaderMissingError extends make('VALIDATION_HEADER_MISSING') {}
export class ValidationHeaderInvalidError extends make('VALIDATION_HEADER_INVALID') {}
export class ValidationContentTypeError extends make('VALIDATION_CONTENT_TYPE') {}
export class ValidationAcceptError extends make('VALIDATION_ACCEPT') {}
export class ValidationPayloadTooLargeError extends make('VALIDATION_PAYLOAD_TOO_LARGE') {}
export class ValidationSchemaMismatchError extends make('VALIDATION_SCHEMA_MISMATCH') {}

// ─── Routing ─────────────────────────────────────────────
export class RouteNotFoundError extends make('ROUTE_NOT_FOUND') {}
export class RouteMethodNotAllowedError extends make('ROUTE_METHOD_NOT_ALLOWED') {}
export class RouteDisabledError extends make('ROUTE_DISABLED') {}
export class RouteDeprecatedError extends make('ROUTE_DEPRECATED') {}
export class RouteUpstreamMissingError extends make('ROUTE_UPSTREAM_MISSING') {}
export class RouteConfigInvalidError extends make('ROUTE_CONFIG_INVALID') {}
export class RouteLoopDetectedError extends make('ROUTE_LOOP_DETECTED') {}

// ─── Rate Limit ──────────────────────────────────────────
export class RateLimitExceededError extends make('RATE_LIMIT_EXCEEDED') {}
export class RateLimitIpExceededError extends make('RATE_LIMIT_IP_EXCEEDED') {}
export class RateLimitUserExceededError extends make('RATE_LIMIT_USER_EXCEEDED') {}
export class RateLimitTenantExceededError extends make('RATE_LIMIT_TENANT_EXCEEDED') {}
export class RateLimitRouteExceededError extends make('RATE_LIMIT_ROUTE_EXCEEDED') {}
export class RateLimitBurstExceededError extends make('RATE_LIMIT_BURST_EXCEEDED') {}
export class RateLimitStoreUnavailableError extends make('RATE_LIMIT_STORE_UNAVAILABLE') {}
export class QuotaDailyExceededError extends make('QUOTA_DAILY_EXCEEDED') {}
export class QuotaMonthlyExceededError extends make('QUOTA_MONTHLY_EXCEEDED') {}

// ─── Idempotency ─────────────────────────────────────────
export class IdempotencyKeyMissingError extends make('IDEMP_KEY_MISSING') {}
export class IdempotencyKeyInvalidError extends make('IDEMP_KEY_INVALID') {}
export class IdempotencyInProgressError extends make('IDEMP_IN_PROGRESS') {}
export class IdempotencyConflictError extends make('IDEMP_CONFLICT') {}
export class IdempotencyExpiredError extends make('IDEMP_EXPIRED') {}
export class IdempotencyStoreUnavailableError extends make('IDEMP_STORE_UNAVAILABLE') {}

// ─── Circuit Breaker ─────────────────────────────────────
export class CircuitOpenError extends make('CIRCUIT_OPEN') {}
export class CircuitHalfOpenRejectedError extends make('CIRCUIT_HALF_OPEN_REJECTED') {}
export class CircuitForcedOpenError extends make('CIRCUIT_FORCED_OPEN') {}
export class BulkheadRejectedError extends make('BULKHEAD_REJECTED') {}

// ─── Upstream ────────────────────────────────────────────
export class UpstreamUnavailableError extends make('UPSTREAM_UNAVAILABLE') {}
export class UpstreamTimeoutError extends make('UPSTREAM_TIMEOUT') {}
export class UpstreamConnectFailedError extends make('UPSTREAM_CONNECT_FAILED') {}
export class UpstreamError extends make('UPSTREAM_ERROR') {}
export class UpstreamInvalidResponseError extends make('UPSTREAM_INVALID_RESPONSE') {}
export class UpstreamTlsError extends make('UPSTREAM_TLS_ERROR') {}
export class UpstreamDnsFailedError extends make('UPSTREAM_DNS_FAILED') {}
export class UpstreamRetryExhaustedError extends make('UPSTREAM_RETRY_EXHAUSTED') {}
export class UpstreamProtocolError extends make('UPSTREAM_PROTOCOL_ERROR') {}

// ─── Cache ───────────────────────────────────────────────
export class CacheStoreUnavailableError extends make('CACHE_STORE_UNAVAILABLE') {}
export class CacheKeyInvalidError extends make('CACHE_KEY_INVALID') {}

// ─── Internal ────────────────────────────────────────────
export class InternalError extends make('INTERNAL_ERROR') {}
export class InternalConfigError extends make('INTERNAL_CONFIG_ERROR') {}
export class InternalDependencyError extends make('INTERNAL_DEPENDENCY_ERROR') {}
export class InternalNotImplementedError extends make('INTERNAL_NOT_IMPLEMENTED') {}
export class InternalMaintenanceError extends make('INTERNAL_MAINTENANCE') {}

// ─── Ops ─────────────────────────────────────────────────
export class OpsUnauthorizedError extends make('OPS_UNAUTHORIZED') {}
export class OpsForbiddenError extends make('OPS_FORBIDDEN') {}
export class OpsRateLimitedError extends make('OPS_RATE_LIMITED') {}
export class OpsReloadInProgressError extends make('OPS_RELOAD_IN_PROGRESS') {}
export class OpsInvalidConfigError extends make('OPS_INVALID_CONFIG') {}
export class OpsMetricsUnavailableError extends make('OPS_METRICS_UNAVAILABLE') {}
