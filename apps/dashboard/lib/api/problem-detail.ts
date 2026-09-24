import { z } from 'zod';

const FieldErrorSchema = z.object({
  field: z.string(),
  code: z.string(),
  message: z.string(),
});

export const ProblemDetailsSchema = z.object({
  type: z.string().url(),
  title: z.string().min(1),
  status: z.number().int().min(400).max(599),
  code: z.string().min(1),
  detail: z.string().optional(),
  instance: z.string(),
  requestId: z.string().min(1),
  tenantId: z.string().optional(),
  timestamp: z.iso.datetime(),
  retryable: z.boolean(),
  retryAfter: z.number().nonnegative().optional(),
  errors: z.array(FieldErrorSchema).optional(),
  traceId: z.string().optional(),
});

export type ProblemDetails = z.infer<typeof ProblemDetailsSchema>;
export type ProblemDetail = ProblemDetails;

export function isProblemDetail(value: unknown): value is ProblemDetail {
  return ProblemDetailsSchema.safeParse(value).success;
}
