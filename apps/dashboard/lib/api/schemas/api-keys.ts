import { z } from 'zod';

export const ApiKeyStatusSchema = z.enum(['active', 'revoked', 'expired']);

export const ApiKeySchema = z.object({
  id: z.string().min(1).max(128),
  name: z.string().min(1).max(256),
  tenantId: z.string().min(1).max(128),
  keyPrefix: z.string().min(1).max(32).optional(),
  scopes: z.array(z.string().min(1).max(64)).min(1).max(50),
  status: ApiKeyStatusSchema,
  usageCount: z.number().int().nonnegative(),
  createdAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
  lastUsedAt: z.string().datetime().optional(),
});

export const IssueApiKeyInputSchema = z.object({
  name: z.string().min(1).max(256),
  tenantId: z.string().min(1).max(128),
  scopes: z.array(z.string().min(1).max(64)).min(1).max(50),
  expiresAt: z.string().datetime().optional(),
});

export const IssuedApiKeySchema = z.object({
  apiKey: ApiKeySchema,
  plaintextKey: z.string().min(1).max(512),
});

export type ApiKey = z.infer<typeof ApiKeySchema>;
export type IssueApiKeyInput = z.infer<typeof IssueApiKeyInputSchema>;
export type IssuedApiKey = z.infer<typeof IssuedApiKeySchema>;
