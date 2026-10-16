import { z } from 'zod';

export const ListAuditDtoSchema = z.object({
  tenantId: z
    .string()
    .min(1)
    .max(128)
    .regex(/^[A-Za-z0-9_-]+$/)
    .optional(),
  actor: z.string().min(1).max(128).optional(),
  action: z.string().min(1).max(128).optional(),
  resource: z.string().min(1).max(256).optional(),
  resourceId: z.string().min(1).max(128).optional(),
  requestId: z.string().min(1).max(128).optional(),
  result: z.string().min(1).max(32).optional(),
  from: z.string().min(1).max(64).optional(),
  to: z.string().min(1).max(64).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  page: z.coerce.number().int().min(1).default(1).optional(),
});

export type ListAuditDto = z.infer<typeof ListAuditDtoSchema>;
