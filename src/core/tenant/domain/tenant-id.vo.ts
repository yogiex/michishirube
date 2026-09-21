import { brandValidated, unbrand, type Brand } from '@/shared/types/index.js';

export type TenantId = Brand<string, 'TenantId'>;

const SLUG_PATTERN = /^[a-z0-9][a-z0-9_-]{1,62}[a-z0-9]$/;

export function isValidTenantId(raw: string): boolean {
  return SLUG_PATTERN.test(raw);
}

export function createTenantId(raw: string): TenantId {
  return brandValidated<'TenantId'>(raw, isValidTenantId, `Invalid tenant id: "${raw}"`);
}

export function tenantIdToString(id: TenantId): string {
  return unbrand(id);
}

export function slugFromSubdomain(subdomain: string): string {
  return subdomain.trim().toLowerCase();
}
