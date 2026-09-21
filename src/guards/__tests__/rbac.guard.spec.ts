import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import type { ExecutionContext, Type } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import { RbacGuard } from '../rbac.guard.js';
import type { CheckPermissionUseCase } from '@/core/rbac/application/check-permission.usecase.js';
import { createPrincipal } from '@/core/auth/domain/principal.entity.js';
import { RbacRoleMissingError } from '@/shared/errors/index.js';

type Execute = CheckPermissionUseCase['execute'];

function makeCtx(req: Record<string, unknown>, type = 'http'): ExecutionContext {
  const ctx: Pick<ExecutionContext, 'getType' | 'switchToHttp' | 'getHandler' | 'getClass'> = {
    getType: <T extends string = string>() => type as T,
    switchToHttp: () => ({
      getRequest: <T = unknown>() => req as T,
      getResponse: <T = unknown>() => ({}) as T,
      getNext: <T = unknown>() => (() => undefined) as T,
    }),
    getHandler: () => () => undefined,
    getClass: <T = unknown>() => class {} as Type<T>,
  };
  return ctx as ExecutionContext;
}

function makeReflector(meta: Record<string, unknown>): Reflector {
  const reflector: Pick<Reflector, 'getAllAndOverride'> = {
    getAllAndOverride: <T>(key: unknown) => meta[String(key)] as T,
  };
  return reflector as Reflector;
}

function makeGuard(execute: Mock<Execute>, meta: Record<string, unknown>): RbacGuard {
  const uc: Pick<CheckPermissionUseCase, 'execute'> = { execute };
  return new RbacGuard(uc as CheckPermissionUseCase, makeReflector(meta));
}

const principal = createPrincipal({
  userId: 'u_001',
  tenantId: 'acme',
  roles: ['user'],
  scopes: ['order:read'],
  expiresAt: new Date(Date.now() + 3600_000),
});

describe('RbacGuard', () => {
  let execute: Mock<Execute>;

  beforeEach(() => {
    execute = vi.fn<Execute>().mockResolvedValue(undefined);
  });

  it('skip jika @Public()', async () => {
    const guard = makeGuard(execute, { isPublic: true, requiredRoles: ['admin'] });
    expect(await guard.canActivate(makeCtx({ user: principal }))).toBe(true);
    expect(execute).not.toHaveBeenCalled();
  });

  it('skip non-HTTP', async () => {
    const guard = makeGuard(execute, { requiredRoles: ['admin'] });
    expect(await guard.canActivate(makeCtx({}, 'rpc'))).toBe(true);
    expect(execute).not.toHaveBeenCalled();
  });

  it('skip jika tidak ada user', async () => {
    const guard = makeGuard(execute, { requiredRoles: ['admin'] });
    expect(await guard.canActivate(makeCtx({ headers: {} }))).toBe(true);
    expect(execute).not.toHaveBeenCalled();
  });

  it('skip jika tidak ada requirement', async () => {
    const guard = makeGuard(execute, {});
    expect(await guard.canActivate(makeCtx({ user: principal }))).toBe(true);
    expect(execute).not.toHaveBeenCalled();
  });

  it('panggil use case jika ada @Roles', async () => {
    const guard = makeGuard(execute, { requiredRoles: ['admin'] });
    await guard.canActivate(makeCtx({ user: principal }));
    expect(execute).toHaveBeenCalledWith({
      principal,
      requiredRoles: ['admin'],
      requiredScopes: [],
    });
  });

  it('gabung scopes + permissions', async () => {
    const guard = makeGuard(execute, {
      requiredScopes: ['order:read'],
      requiredPermissions: ['user:read'],
    });
    await guard.canActivate(makeCtx({ user: principal }));
    expect(execute).toHaveBeenCalledWith({
      principal,
      requiredRoles: [],
      requiredScopes: ['order:read', 'user:read'],
    });
  });

  it('propagate error dari use case', async () => {
    execute.mockRejectedValue(new RbacRoleMissingError('x'));
    const guard = makeGuard(execute, { requiredRoles: ['admin'] });
    await expect(
      guard.canActivate(makeCtx({ user: principal, url: '/x', method: 'GET' })),
    ).rejects.toThrow(RbacRoleMissingError);
  });
});
