import { describe, it, expect } from 'vitest';
import { createRole } from '@/core/auth/domain/role.vo.js';
import { createPermission } from '../domain/permission.vo.js';
import { POLICY_EFFECTS, type Policy, type PolicyRule } from '../domain/policy.entity.js';

describe('Policy entity', () => {
  it('struktur rule valid', () => {
    const rule: PolicyRule = {
      effect: 'allow',
      roles: [createRole('admin')],
      permissions: [createPermission('order:read')],
      description: 'Admin bisa baca order',
    };
    expect(rule.effect).toBe('allow');
    expect(rule.roles).toHaveLength(1);
  });

  it('struktur policy valid', () => {
    const policy: Policy = {
      resource: 'order',
      rules: [
        { effect: 'allow', roles: [createRole('admin')] },
        { effect: 'deny', tenantIds: ['t_blocked'] },
      ],
    };
    expect(policy.rules).toHaveLength(2);
  });

  it('rule bisa tanpa roles (pure tenant-based)', () => {
    const rule: PolicyRule = { effect: 'deny', tenantIds: ['t_blocked'] };
    expect(rule.roles).toBeUndefined();
  });

  it('effect hanya allow/deny', () => {
    expect(POLICY_EFFECTS).toEqual(['allow', 'deny']);
  });
});
