import { z } from 'zod';

export const RouteMethodSchema = z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'ALL']);

export const RouteRateLimitSchema = z.object({
  limit: z.number().int().positive().max(100_000),
  windowSec: z.number().int().positive().max(86_400),
});

export const RouteSchema = z.object({
  id: z.string().min(1).max(128),
  path: z
    .string()
    .min(1)
    .max(500)
    .regex(/^\/(?!\/)/, 'Path must start with a single slash'),
  method: RouteMethodSchema,
  upstream: z.string().url().max(2048),
  enabled: z.boolean(),
  requireAuth: z.boolean(),
  requireIdempotency: z.boolean().optional(),
  rateLimit: RouteRateLimitSchema.optional(),
  roles: z.array(z.string().min(1).max(64)).max(20).optional(),
  createdAt: z.string().datetime(),
});

export const CreateRouteInputSchema = z.object({
  path: RouteSchema.shape.path,
  method: RouteMethodSchema,
  upstream: RouteSchema.shape.upstream,
  enabled: z.boolean().optional(),
  requireAuth: z.boolean().optional(),
  requireIdempotency: z.boolean().optional(),
  rateLimit: RouteRateLimitSchema.optional(),
  roles: z.array(z.string().min(1).max(64)).max(20).optional(),
});

export const UpdateRouteInputSchema = CreateRouteInputSchema.partial();

export const ReloadRoutesResultSchema = z.object({
  reloaded: z.boolean(),
  total: z.number().int().nonnegative(),
});

export type Route = z.infer<typeof RouteSchema>;
export type CreateRouteInput = z.infer<typeof CreateRouteInputSchema>;
export type UpdateRouteInput = z.infer<typeof UpdateRouteInputSchema>;
export type ReloadRoutesResult = z.infer<typeof ReloadRoutesResultSchema>;
