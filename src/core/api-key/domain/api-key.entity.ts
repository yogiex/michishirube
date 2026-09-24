export const API_KEY_PREFIX = 'msh_sk_' as const;
export const API_KEY_STATUSES = ['active', 'revoked', 'expired'] as const;

export type ApiKeyStatus = (typeof API_KEY_STATUSES)[number];

export interface ApiKey {
  readonly id: string;
  readonly name: string;
  readonly tenantId: string;
  readonly keyHash: string;
  readonly keyPrefix: string;
  readonly scopes: readonly string[];
  readonly status: ApiKeyStatus;
  readonly usageCount: number;
  readonly createdAt: string;
  readonly expiresAt?: string;
  readonly lastUsedAt?: string;
}

export interface IssuedApiKey {
  readonly apiKey: ApiKey;
  readonly plaintextKey: string;
}
