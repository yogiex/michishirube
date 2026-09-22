import { describe, it, expect } from 'vitest';
import { DefaultPolicyEvaluatorAdapter } from '../default-policy-evaluator.adapter.js';
import { createPrincipal } from '@/core/auth/domain/principal.entity.js';
import { createRole } from '@/core/auth/domain/role.vo.js';
import { createPermission } from '@/core/rbac/domain/permission.vo.js';
import type { Policy } from '@/core/rbac/domain/policy.entity.js';

const evaluator = new DefaultPolicyEvaluatorAdapter();

const principal = createPrincipal({
  userId: 'u_1',
  tenantId: 'acme',
  roles: ['admin'],
  scopes: ['order:read'],
  expiresAt: new Date(Date.now() + 3600_000),
});

const ctx = { principal, resource: 'order', action: 'read' };

describe('DefaultPolicyEvaluatorAdapter.evaluate', () => {
  it('allow jika tidak ada policy untuk resource', async () => {
    const result = await evaluator.evaluate(ctx, [{ resource: 'user', rules: [] }]);
    expect(result.allowed).toBe(true);
  });

  it('deny menang atas allow', async () => {
    const policies: Policy[] = [
      {
        resource: 'order',
        rules: [
          { effect: 'allow', roles: [createRole('admin')] },
          { effect: 'deny', tenantIds: ['acme'], description: 'blocked tenant' },
        ],
      },
    ];
    const result = await evaluator.evaluate(ctx, policies);
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe('blocked tenant');
  });

  it('allow jika rule allow cocok', async () => {
    const policies: Policy[] = [
      {
        resource: 'order',
        rules: [{ effect: 'allow', roles: [createRole('admin')], description: 'admin ok' }],
      },
    ];
    const result = await evaluator.evaluate(ctx, policies);
    expect(result.allowed).toBe(true);
    expect(result.reason).toBe('admin ok');
  });

  it('default deny jika tidak ada rule cocok', async () => {
    const policies: Policy[] = [
      { resource: 'order', rules: [{ effect: 'allow', roles: [createRole('owner')] }] },
    ];
    const result = await evaluator.evaluate(ctx, policies);
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe('no matching rule');
  });

  it('rule permissions harus semua terpenuhi', async () => {
    const policies: Policy[] = [
      {
        resource: 'order',
        rules: [
          {
            effect: 'allow',
            permissions: [createPermission('order:read'), createPermission('order:write')],
          },
        ],
      },
    ];
    expect((await evaluator.evaluate(ctx, policies)).allowed).toBe(false);
  });

  it('rule tenantIds membatasi tenant', async () => {
    const policies: Policy[] = [
      { resource: 'order', rules: [{ effect: 'allow', tenantIds: ['beta'] }] },
    ];
    expect((await evaluator.evaluate(ctx, policies)).allowed).toBe(false);
  });

  it('rule tanpa kondisi cocok untuk semua', async () => {
    const policies: Policy[] = [{ resource: 'order', rules: [{ effect: 'allow' }] }];
    const result = await evaluator.evaluate(ctx, policies);
    expect(result.allowed).toBe(true);
    expect(result.reason).toBe('allowed by rule');
  });
});

describe('DefaultPolicyEvaluatorAdapter.checkPermissions', () => {
  it('allowed jika scope cukup', () => {
    expect(evaluator.checkPermissions(principal, [createPermission('order:read')]).allowed).toBe(
      true,
    );
  });

  it('denied jika scope kurang', () => {
    const result = evaluator.checkPermissions(principal, [createPermission('order:write')]);
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe('missing permissions');
  });
});
