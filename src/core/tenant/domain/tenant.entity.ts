import type { TenantId } from './tenant-id.vo.js';

export const TENANT_STATUSES = ['active', 'suspended', 'inactive'] as const;
export type TenantStatus = (typeof TENANT_STATUSES)[number];

export const TENANT_TIERS = ['free', 'pro', 'enterprise'] as const;
export type TenantTier = (typeof TENANT_TIERS)[number];

export interface Tenant {
  readonly id: TenantId;
  readonly slug: string;
  readonly name: string;
  readonly status: TenantStatus;
  readonly tier: TenantTier;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export function isTenantActive(t: Tenant): boolean {
  return t.status === 'active';
}
