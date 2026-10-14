import { z } from 'zod';

export const InvalidateCacheDtoSchema = z
  .object({
    key: z.string().min(1).max(500).optional(),
    tenantId: z.string().min(2).max(64).optional(),
    pattern: z
      .string()
      .min(1)
      .max(200)
      .regex(/^[A-Za-z0-9._:*?-]+$/, 'Pattern hanya boleh alfanumerik, . _ : * ? -')
      .optional(),
  })
  .refine(
    (data) => Boolean(data.key ?? data.tenantId ?? data.pattern),
    'Minimal satu dari key, tenantId, atau pattern harus diisi',
  );

export type InvalidateCacheDto = z.infer<typeof InvalidateCacheDtoSchema>;
