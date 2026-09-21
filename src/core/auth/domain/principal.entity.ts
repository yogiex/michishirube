import { createPermission, type Permission } from '@/core/rbac/domain/permission.vo.js';
import { createRole, roleToString, type Role } from './role.vo.js';

export const PRINCIPAL_KINDS = ['user', 'service', 'api-key'] as const;
export type PrincipalKind = (typeof PRINCIPAL_KINDS)[number];

export interface Principal {
  readonly kind: PrincipalKind;
  readonly userId: string;
  readonly tenantId: string;
  readonly roles: readonly Role[];
  readonly scopes: readonly Permission[];
  readonly issuedAt?: Date;
  readonly expiresAt: Date;
  readonly claims: Readonly<Record<string, unknown>>;
}

export interface CreatePrincipalInput {
  readonly kind?: PrincipalKind;
  readonly userId: string;
  readonly tenantId: string;
  readonly roles?: readonly string[];
  readonly scopes?: readonly string[];
  readonly issuedAt?: Date;
  readonly expiresAt: Date;
  readonly claims?: Readonly<Record<string, unknown>>;
}

export function createPrincipal(input: CreatePrincipalInput): Principal {
  const principal: Principal = {
    kind: input.kind ?? 'user',
    userId: input.userId,
    tenantId: input.tenantId,
    roles: [...new Set(input.roles ?? [])].map(createRole),
    scopes: [...new Set(input.scopes ?? [])].map(createPermission),
    expiresAt: input.expiresAt,
    claims: input.claims ?? {},
  };
  return input.issuedAt ? { ...principal, issuedAt: input.issuedAt } : principal;
}

export function hasRole(principal: Principal, role: string): boolean {
  return principal.roles.some((r) => roleToString(r) === role);
}

export function hasAnyRole(principal: Principal, roles: readonly string[]): boolean {
  if (roles.length === 0) return true;
  const owned = new Set(principal.roles.map(roleToString));
  return roles.some((r) => owned.has(r));
}

export function isExpired(principal: Principal, now: Date = new Date()): boolean {
  return principal.expiresAt.getTime() <= now.getTime();
}
