import { brandValidated, unbrand, type Brand } from '@/shared/types/index.js';

export type Role = Brand<string, 'Role'>;

const ROLE_PATTERN = /^[a-z][a-z0-9_-]{0,62}$/;

export function isValidRole(raw: string): boolean {
  return ROLE_PATTERN.test(raw);
}

export function createRole(raw: string): Role {
  return brandValidated<'Role'>(raw, isValidRole, `Invalid role: "${raw}"`);
}

export function roleToString(role: Role): string {
  return unbrand(role);
}
