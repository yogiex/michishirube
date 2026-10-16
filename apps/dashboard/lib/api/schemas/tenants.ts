import { z } from 'zod';

export const TenantTierSchema = z.enum(['free', 'pro', 'enterprise']);
export const TenantStatusSchema = z.enum(['active', 'suspended', 'inactive']);

export const TenantSchema = z.object({
  id: z.string().min(1).max(128),
  slug: z
    .string()
    .min(1)
    .max(128)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  name: z.string().min(1).max(256),
  tier: TenantTierSchema,
  status: TenantStatusSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
  requests: z.number().int().nonnegative().optional(),
});

export const CreateTenantInputSchema = z.object({
  slug: TenantSchema.shape.slug,
  name: TenantSchema.shape.name,
  tier: TenantTierSchema,
  status: TenantStatusSchema.optional(),
});

export const UpdateTenantInputSchema = CreateTenantInputSchema.partial();

export type Tenant = z.infer<typeof TenantSchema>;
export type CreateTenantInput = z.infer<typeof CreateTenantInputSchema>;
export type UpdateTenantInput = z.infer<typeof UpdateTenantInputSchema>;
