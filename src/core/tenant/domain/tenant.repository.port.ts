import type { Option } from '@/shared/types/index.js';
import type { Tenant } from './tenant.entity.js';
import type { TenantId } from './tenant-id.vo.js';

export const TENANT_REPOSITORY = Symbol('TENANT_REPOSITORY');

export interface TenantRepositoryPort {
  findById(id: TenantId): Promise<Option<Tenant>>;
  findBySlug(slug: string): Promise<Option<Tenant>>;
  reload(): Promise<void>;
}
