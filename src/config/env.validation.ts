import { z } from 'zod';

export const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().int().positive().default(3000),
    SERVICE_NAME: z.string().default('api-gateway'),
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),

    REDIS_HOST: z.string().default('localhost'),
    REDIS_PORT: z.coerce.number().int().positive().default(6379),
    REDIS_PASSWORD: z.string().default(''),
    REDIS_DB: z.coerce.number().int().min(0).max(15).default(0),
    REDIS_KEY_PREFIX: z.string().min(1).max(32).default('gw'),

    JWT_ISSUER: z.string().default(''),
    JWT_AUDIENCE: z.string().default(''),
    JWKS_URI: z.string().default(''),

    RATE_LIMIT_TTL: z.coerce.number().int().positive().default(60),
    RATE_LIMIT_MAX: z.coerce.number().int().positive().default(1000),

    RETRY_MAX_RETRIES: z.coerce.number().int().min(0).max(10).default(2),
    RETRY_BASE_DELAY_MS: z.coerce.number().int().min(1).max(3_600_000).default(100),
    RETRY_MAX_DELAY_MS: z.coerce.number().int().min(1).max(3_600_000).default(2_000),
    RETRY_JITTER_MS: z.coerce.number().int().min(0).max(3_600_000).default(50),

    CIRCUIT_BREAKER_FAILURE_THRESHOLD: z.coerce.number().int().min(1).max(1_000_000).default(5),
    CIRCUIT_BREAKER_SUCCESS_THRESHOLD: z.coerce.number().int().min(1).max(1_000_000).default(2),
    CIRCUIT_BREAKER_RESET_TIMEOUT_MS: z.coerce
      .number()
      .int()
      .min(1)
      .max(86_400_000)
      .default(30_000),

    IDEMPOTENCY_LOCK_TTL_SEC: z.coerce.number().int().positive().default(30),
    IDEMPOTENCY_REPLAY_TTL_SEC: z.coerce.number().int().positive().default(86_400),

    TENANTS_FILE: z.string().min(1).default('./config/tenants.yaml'),
    ROUTES_FILE: z.string().min(1).default('./config/routes.yaml'),

    SERVICE_AUTH_URL: z.string().url().default('http://localhost:4001'),
    SERVICE_ORDER_URL: z.string().url().default('http://localhost:4002'),
  })
  .superRefine((env, context) => {
    if (env.RETRY_MAX_DELAY_MS < env.RETRY_BASE_DELAY_MS) {
      context.addIssue({
        code: 'custom',
        path: ['RETRY_MAX_DELAY_MS'],
        message: 'must be greater than or equal to RETRY_BASE_DELAY_MS',
      });
    }
  });

export type Env = z.infer<typeof envSchema>;

export function validateEnv(config: Record<string, unknown>): Env {
  const parsed = envSchema.safeParse(config);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join('.')}: ${i.message}`)
      .join('\n');
    throw new Error(`Invalid environment variables:\n${issues}`);
  }

  if (parsed.data.NODE_ENV === 'production') {
    const forbidden = [
      parsed.data.REDIS_PASSWORD === '',
      parsed.data.JWKS_URI.includes('localhost'),
      parsed.data.LOG_LEVEL === 'debug',
    ];
    if (forbidden.some(Boolean)) {
      throw new Error('Production config tidak boleh pakai nilai development');
    }
  }

  return parsed.data;
}
