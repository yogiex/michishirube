import { validateEnv } from './env.validation.js';

export type AppConfig = ReturnType<typeof loadConfig>;

export function loadConfig() {
  const env = validateEnv({ ...process.env });
  return {
    app: {
      name: env.SERVICE_NAME,
      env: env.NODE_ENV,
      port: env.PORT,
      logLevel: env.LOG_LEVEL,
    },
    redis: {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      password: env.REDIS_PASSWORD,
      db: env.REDIS_DB,
      keyPrefix: env.REDIS_KEY_PREFIX,
    },
    jwt: {
      issuer: env.JWT_ISSUER,
      audience: env.JWT_AUDIENCE,
      jwksUri: env.JWKS_URI,
    },
    rateLimit: {
      ttl: env.RATE_LIMIT_TTL,
      max: env.RATE_LIMIT_MAX,
    },
    retry: {
      maxRetries: env.RETRY_MAX_RETRIES,
      baseDelayMs: env.RETRY_BASE_DELAY_MS,
      maxDelayMs: env.RETRY_MAX_DELAY_MS,
      jitterMs: env.RETRY_JITTER_MS,
    },
    circuitBreaker: {
      failureThreshold: env.CIRCUIT_BREAKER_FAILURE_THRESHOLD,
      successThreshold: env.CIRCUIT_BREAKER_SUCCESS_THRESHOLD,
      resetTimeoutMs: env.CIRCUIT_BREAKER_RESET_TIMEOUT_MS,
    },
    idempotency: {
      lockTtlSec: env.IDEMPOTENCY_LOCK_TTL_SEC,
      replayTtlSec: env.IDEMPOTENCY_REPLAY_TTL_SEC,
    },
    tenants: {
      filePath: env.TENANTS_FILE,
    },
    routes: {
      filePath: env.ROUTES_FILE,
    },
    upstream: {
      auth: env.SERVICE_AUTH_URL,
      order: env.SERVICE_ORDER_URL,
    },
  };
}
