import { brandValidated, unbrand, type Brand } from '@/shared/types/index.js';

export type Permission = Brand<string, 'Permission'>;

export const PERMISSION_ACTIONS = ['read', 'write', 'delete', 'manage', '*'] as const;
export type PermissionAction = (typeof PERMISSION_ACTIONS)[number];

const PERMISSION_PATTERN = /^(\*|[a-z][a-z0-9-]{0,62}):(read|write|delete|manage|\*)$/;

export interface ParsedPermission {
  readonly resource: string;
  readonly action: string;
}

export function isValidPermission(raw: string): boolean {
  return PERMISSION_PATTERN.test(raw);
}

export function createPermission(raw: string): Permission {
  return brandValidated<'Permission'>(raw, isValidPermission, `Invalid permission: "${raw}"`);
}

export function permissionToString(p: Permission): string {
  return unbrand(p);
}

export function parsePermission(p: Permission): ParsedPermission {
  const value = unbrand(p);
  const idx = value.indexOf(':');
  return { resource: value.slice(0, idx), action: value.slice(idx + 1) };
}

export function permissionMatches(granted: Permission, required: Permission): boolean {
  if (granted === required) return true;

  const g = parsePermission(granted);
  const r = parsePermission(required);

  if (g.resource !== '*' && g.resource !== r.resource) return false;
  if (g.action !== '*' && g.action !== r.action) return false;

  return true;
}

export function hasAllPermissions(
  granted: readonly Permission[],
  required: readonly Permission[],
): boolean {
  return required.every((req) => granted.some((g) => permissionMatches(g, req)));
}

export function hasAnyPermission(
  granted: readonly Permission[],
  required: readonly Permission[],
): boolean {
  if (required.length === 0) return true;
  return required.some((req) => granted.some((g) => permissionMatches(g, req)));
}
