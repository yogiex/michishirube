import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
  DASHBOARD_SESSION_SECRET: z
    .string()
    .min(32, 'DASHBOARD_SESSION_SECRET must contain at least 32 characters')
    .optional(),
  DASHBOARD_ADMIN_EMAIL: z.string().email().optional(),
  DASHBOARD_ADMIN_PASSWORD: z
    .string()
    .min(12, 'DASHBOARD_ADMIN_PASSWORD must contain at least 12 characters')
    .optional(),
  DASHBOARD_ADMIN_USER_ID: z.string().min(1).max(128).optional(),
  DASHBOARD_ADMIN_TENANT_ID: z.string().min(1).max(128).optional(),
});

export type Env = z.infer<typeof EnvSchema>;

let cachedEnv: Env | null = null;

export function getEnv(): Env {
  if (cachedEnv !== null) return cachedEnv;

  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
    throw new Error(`Environment validation failed:\n${issues.join('\n')}`);
  }

  cachedEnv = parsed.data;
  return cachedEnv;
}

export function requireDashboardSecrets(): void {
  const env = getEnv();
  if (env.NODE_ENV !== 'production') return;

  if (!env.DASHBOARD_SESSION_SECRET) {
    throw new Error('DASHBOARD_SESSION_SECRET is required in production');
  }
  if (!env.DASHBOARD_ADMIN_EMAIL || !env.DASHBOARD_ADMIN_PASSWORD) {
    throw new Error(
      'DASHBOARD_ADMIN_EMAIL and DASHBOARD_ADMIN_PASSWORD are required in production',
    );
  }
}
