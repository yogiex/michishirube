import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(8).max(128),
  remember: z.boolean(),
});

export type LoginFormInput = z.infer<typeof LoginFormSchema>;

export const CreateRouteFormSchema = z.object({
  path: z
    .string()
    .min(1, 'Path is required')
    .max(500, 'Path must be at most 500 characters')
    .regex(/^\/(?!\/)/, 'Path must start with a single slash'),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'ALL']),
  upstream: z
    .string()
    .url('Upstream must be a valid URL')
    .max(2048, 'Upstream must be at most 2048 characters'),
  enabled: z.boolean().default(true),
  requireAuth: z.boolean().default(false),
  requireIdempotency: z.boolean().default(false),
  rateLimit: z
    .object({
      limit: z.number().int().positive().max(100_000),
      windowSec: z.number().int().positive().max(86_400),
    })
    .optional(),
  roles: z.array(z.string().min(1).max(64)).max(20).default([]),
});

export type CreateRouteFormInput = z.infer<typeof CreateRouteFormSchema>;

export const CreateTenantFormSchema = z.object({
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(128, 'Slug must be at most 128 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  name: z.string().min(1, 'Name is required').max(256, 'Name must be at most 256 characters'),
  tier: z.enum(['free', 'pro', 'enterprise']),
  status: z.enum(['active', 'suspended', 'inactive']).default('active'),
});

export type CreateTenantFormInput = z.infer<typeof CreateTenantFormSchema>;

export const IssueApiKeyFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(256, 'Name must be at most 256 characters'),
  tenantId: z
    .string()
    .min(1, 'Tenant ID is required')
    .max(128, 'Tenant ID must be at most 128 characters'),
  scopes: z
    .array(z.string().min(1).max(64))
    .min(1, 'At least one scope is required')
    .max(50, 'At most 50 scopes allowed'),
  expiresAt: z.string().datetime().optional(),
});

export type IssueApiKeyFormInput = z.infer<typeof IssueApiKeyFormSchema>;
