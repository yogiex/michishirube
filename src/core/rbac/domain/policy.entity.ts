import type { Role } from '@/core/auth/domain/role.vo.js';
import type { Permission } from './permission.vo.js';

export const POLICY_EFFECTS = ['allow', 'deny'] as const;
export type PolicyEffect = (typeof POLICY_EFFECTS)[number];

export interface PolicyRule {
  readonly effect: PolicyEffect;
  readonly roles?: readonly Role[];
  readonly permissions?: readonly Permission[];
  readonly tenantIds?: readonly string[];
  readonly description?: string;
}

export interface Policy {
  readonly resource: string;
  readonly rules: readonly PolicyRule[];
}
