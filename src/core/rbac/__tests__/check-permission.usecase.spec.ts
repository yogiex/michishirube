import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { CheckPermissionUseCase } from '../application/check-permission.usecase.js';
import type { PolicyEvaluatorPort } from '../domain/policy-evaluator.port.js';
import { createPrincipal, type CreatePrincipalInput } from '@/core/auth/domain/principal.entity.js';
import {
  RbacPolicyDeniedError,
  RbacRoleMissingError,
  RbacScopeMissingError,
  RbacTenantMismatchError,
} from '@/shared/errors/index.js';

interface EvaluatorMock extends PolicyEvaluatorPort {
  evaluate: Mock<PolicyEvaluatorPort['evaluate']>;
  checkPermissions: Mock<PolicyEvaluatorPort['checkPermissions']>;
}

function makeEvaluator(): EvaluatorMock {
  return {
    evaluate: vi
      .fn<PolicyEvaluatorPort['evaluate']>()
      .mockResolvedValue({ allowed: true, reason: 'ok' }),
    checkPermissions: vi
      .fn<PolicyEvaluatorPort['checkPermissions']>()
      .mockReturnValue({ allowed: true, reason: 'ok' }),
  };
}

function makePrincipal(over: Partial<CreatePrincipalInput> = {}) {
  return createPrincipal({
    userId: 'u_001',
    tenantId: 'acme',
    roles: ['user'],
    scopes: ['order:read'],
    expiresAt: new Date(Date.now() + 3600_000),
    ...over,
  });
}

describe('CheckPermissionUseCase', () => {
  let evaluator: EvaluatorMock;
  let uc: CheckPermissionUseCase;

  beforeEach(() => {
    evaluator = makeEvaluator();
    uc = new CheckPermissionUseCase(evaluator);
  });

  describe('role check', () => {
    it('lolos jika punya salah satu role', async () => {
      const p = makePrincipal({ roles: ['user', 'admin'] });
      await expect(uc.execute({ principal: p, requiredRoles: ['admin'] })).resolves.toBeUndefined();
    });

    it('throw jika tidak punya role', async () => {
      await expect(
        uc.execute({ principal: makePrincipal(), requiredRoles: ['admin'] }),
      ).rejects.toThrow(RbacRoleMissingError);
    });

    it('lolos jika requiredRoles kosong', async () => {
      await expect(
        uc.execute({ principal: makePrincipal(), requiredRoles: [] }),
      ).resolves.toBeUndefined();
    });
  });

  describe('scope check', () => {
    it('lolos jika punya semua scope', async () => {
      const p = makePrincipal({ scopes: ['order:read', 'order:write'] });
      await expect(
        uc.execute({ principal: p, requiredScopes: ['order:read', 'order:write'] }),
      ).resolves.toBeUndefined();
    });

    it('throw jika kurang scope', async () => {
      await expect(
        uc.execute({ principal: makePrincipal(), requiredScopes: ['order:read', 'order:write'] }),
      ).rejects.toThrow(RbacScopeMissingError);
    });

    it('throw jika required scope tidak valid (fail-closed)', async () => {
      const p = makePrincipal({ scopes: ['*:*'] });
      await expect(uc.execute({ principal: p, requiredScopes: ['bad scope'] })).rejects.toThrow(
        RbacScopeMissingError,
      );
    });
  });

  describe('tenant check', () => {
    it('lolos jika tenant sama', async () => {
      await expect(
        uc.execute({ principal: makePrincipal(), resourceTenantId: 'acme' }),
      ).resolves.toBeUndefined();
    });

    it('throw jika tenant beda', async () => {
      await expect(
        uc.execute({ principal: makePrincipal(), resourceTenantId: 'beta' }),
      ).rejects.toThrow(RbacTenantMismatchError);
    });
  });

  describe('policy check', () => {
    it('tidak memanggil evaluator tanpa resource/action', async () => {
      await uc.execute({ principal: makePrincipal() });
      expect(evaluator.evaluate).not.toHaveBeenCalled();
    });

    it('memanggil evaluator dengan context', async () => {
      const p = makePrincipal();
      await uc.execute({
        principal: p,
        resource: 'order',
        action: 'read',
        resourceTenantId: 'acme',
      });
      expect(evaluator.evaluate).toHaveBeenCalledWith(
        { principal: p, resource: 'order', action: 'read', resourceTenantId: 'acme' },
        [],
      );
    });

    it('throw jika policy menolak', async () => {
      evaluator.evaluate.mockResolvedValue({ allowed: false, reason: 'blocked' });
      await expect(
        uc.execute({ principal: makePrincipal(), resource: 'order', action: 'read' }),
      ).rejects.toThrow(RbacPolicyDeniedError);
    });
  });

  describe('combined', () => {
    it('role + scope harus lolos semua', async () => {
      const p = makePrincipal({ roles: ['admin'], scopes: ['order:*'] });
      await expect(
        uc.execute({ principal: p, requiredRoles: ['admin'], requiredScopes: ['order:read'] }),
      ).resolves.toBeUndefined();
    });

    it('gagal jika role lolos tapi scope tidak', async () => {
      const p = makePrincipal({ roles: ['admin'], scopes: [] });
      await expect(
        uc.execute({ principal: p, requiredRoles: ['admin'], requiredScopes: ['order:read'] }),
      ).rejects.toThrow(RbacScopeMissingError);
    });
  });
});
