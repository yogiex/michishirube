import { Injectable, Logger, type CanActivate, type ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import type { Principal } from '@/core/auth/domain/principal.entity.js';
import { CheckPermissionUseCase } from '@/core/rbac/application/check-permission.usecase.js';
import { ROLES_KEY } from '@/shared/decorators/roles.decorator.js';
import { SCOPES_KEY } from '@/shared/decorators/scopes.decorator.js';
import { PERMISSIONS_KEY } from '@/shared/decorators/permissions.decorator.js';
import { IS_PUBLIC_KEY } from '@/shared/decorators/public.decorator.js';

interface RequestWithPrincipal extends Request {
  user?: Principal;
}

@Injectable()
export class RbacGuard implements CanActivate {
  private readonly logger = new Logger(RbacGuard.name);

  constructor(
    private readonly checkPermission: CheckPermissionUseCase,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() !== 'http') return true;
    if (this.metadata<boolean>(context, IS_PUBLIC_KEY) === true) return true;

    const req = context.switchToHttp().getRequest<RequestWithPrincipal>();
    const principal = req.user;
    if (!principal) return true;

    const requiredRoles = this.metadata<readonly string[]>(context, ROLES_KEY) ?? [];
    const requiredScopes = [
      ...(this.metadata<readonly string[]>(context, SCOPES_KEY) ?? []),
      ...(this.metadata<readonly string[]>(context, PERMISSIONS_KEY) ?? []),
    ];

    if (requiredRoles.length === 0 && requiredScopes.length === 0) return true;

    try {
      await this.checkPermission.execute({ principal, requiredRoles, requiredScopes });
    } catch (error) {
      this.logger.warn({
        requestId: req.requestId,
        tenantId: principal.tenantId,
        userId: principal.userId,
        route: req.url,
        method: req.method,
        msg: 'RBAC denied',
      });
      throw error;
    }

    return true;
  }

  private metadata<T>(context: ExecutionContext, key: string): T | undefined {
    return this.reflector.getAllAndOverride<T | undefined>(key, [
      context.getHandler(),
      context.getClass(),
    ]);
  }
}
