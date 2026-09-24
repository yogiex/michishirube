import type { Option } from '@/shared/types/option.type.js';
import type { ApiKey } from './api-key.entity.js';

export interface ApiKeyRepositoryPort {
  findAll(tenantId: string): Promise<readonly ApiKey[]>;
  findById(id: string): Promise<Option<ApiKey>>;
  findByPlaintext(plaintextKey: string): Promise<Option<ApiKey>>;
  create(apiKey: ApiKey, indexHash: string): Promise<boolean>;
  revoke(id: string, tenantId: string): Promise<boolean>;
  incrementUsage(id: string, usedAt: Date): Promise<boolean>;
  registerIndex(indexHash: string, id: string): Promise<boolean>;
}
