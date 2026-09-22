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
    tenants: {
      filePath: env.TENANTS_FILE,
    },
    upstream: {
      auth: env.SERVICE_AUTH_URL,
      order: env.SERVICE_ORDER_URL,
    },
  };
}
