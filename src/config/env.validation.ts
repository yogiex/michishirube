import { z } from 'zod';

export const envSchema = z.object({
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

  TENANTS_FILE: z.string().min(1).default('./config/tenants.yaml'),

  SERVICE_AUTH_URL: z.string().url().default('http://localhost:4001'),
  SERVICE_ORDER_URL: z.string().url().default('http://localhost:4002'),
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
