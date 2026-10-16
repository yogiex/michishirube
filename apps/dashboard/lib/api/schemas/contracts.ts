import { z } from 'zod';

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    items: z.array(itemSchema),
    total: z.number().int().nonnegative(),
    page: z.number().int().positive(),
    limit: z.number().int().positive(),
    totalPages: z.number().int().nonnegative(),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  });

export const ServiceStatusSchema = z.enum(['healthy', 'degraded', 'down']);

export const ServiceHealthSchema = z.object({
  name: z.string().min(1).max(128),
  status: ServiceStatusSchema,
  latencyMs: z.number().nonnegative(),
  endpoint: z.string().min(1).max(512),
});

export type ServiceHealth = z.infer<typeof ServiceHealthSchema>;
