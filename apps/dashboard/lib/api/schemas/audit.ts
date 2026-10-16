import { z } from 'zod';

export const AuditStatusSchema = z.enum(['success', 'warning', 'error']);

export const AuditEntrySchema = z.object({
  id: z.string().min(1).max(128),
  timestamp: z.string().datetime(),
  actor: z.string().min(1).max(128),
  action: z.string().min(1).max(128),
  target: z.string().min(1).max(256),
  status: AuditStatusSchema,
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type AuditEntry = z.infer<typeof AuditEntrySchema>;
