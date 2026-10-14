// Shared JWT constants for the infrastructure layer.
// Keep algorithm allow-list minimal: RS256 only (see ADR 0005).

export const JWT_ALGORITHMS = ['RS256'] as const;

export type JwtAlgorithm = (typeof JWT_ALGORITHMS)[number];

// Claim keys that may carry the tenant id; first present wins.
export const TENANT_CLAIM_KEYS = ['tenantId', 'tenant_id', 'tid'] as const;

// Claim keys that may carry the user/subject identity.
export const USER_ID_CLAIM_KEYS = ['sub'] as const;

// Claim keys that may carry roles.
export const ROLE_CLAIM_KEYS = ['roles', 'role', 'groups'] as const;

// Claim keys that may carry scopes/permissions.
export const SCOPE_CLAIM_KEYS = ['scope', 'scopes', 'permissions'] as const;

// Aliases kept for callers that expect a generic fallback list name.
export const CLAIM_FALLBACK_KEYS = TENANT_CLAIM_KEYS;
export const JWT_CLAIM_FALLBACK_KEYS = TENANT_CLAIM_KEYS;
export const TENANT_CLAIM_FALLBACK_KEYS = TENANT_CLAIM_KEYS;

export const JWT_DEFAULT_TIMEOUT_MS = 5_000;
export const JWT_DEFAULT_COOLDOWN_MS = 30_000;
export const JWT_DEFAULT_CACHE_MAX_AGE_MS = 600_000;
