import { Inject, Injectable } from '@nestjs/common';
import {
  RbacPolicyDeniedError,
  RbacRoleMissingError,
  RbacScopeMissingError,
  RbacTenantMismatchError,
} from '@/shared/errors/index.js';
import { hasAnyRole, type Principal } from '@/core/auth/domain/principal.entity.js';
import { roleToString } from '@/core/auth/domain/role.vo.js';
import { POLICY_EVALUATOR, type PolicyEvaluatorPort } from '../domain/policy-evaluator.port.js';
import type { Policy } from '../domain/policy.entity.js';
import {
  createPermission,
  hasAllPermissions,
  isValidPermission,
  permissionToString,
} from '../domain/permission.vo.js';

export interface CheckPermissionInput {
  readonly principal: Principal;
  readonly requiredRoles?: readonly string[];
  readonly requiredScopes?: readonly string[];
  readonly resource?: string;
  readonly action?: string;
  readonly resourceTenantId?: string;
  readonly policies?: readonly Policy[];
}

@Injectable()
export class CheckPermissionUseCase {
  constructor(@Inject(POLICY_EVALUATOR) private readonly evaluator: PolicyEvaluatorPort) {}

  async execute(input: CheckPermissionInput): Promise<void> {
    const { principal } = input;

    this.checkTenant(principal, input.resourceTenantId);
    this.checkRoles(principal, input.requiredRoles ?? []);
    this.checkScopes(principal, input.requiredScopes ?? []);

    if (input.resource && input.action) {
      await this.checkPolicy(input, input.resource, input.action);
    }
  }

  private checkTenant(principal: Principal, resourceTenantId: string | undefined): void {
    if (resourceTenantId && resourceTenantId !== principal.tenantId) {
      throw new RbacTenantMismatchError('Akses lintas tenant ditolak', {
        meta: { principalTenant: principal.tenantId, resourceTenant: resourceTenantId },
      });
    }
  }

  private checkRoles(principal: Principal, requiredRoles: readonly string[]): void {
    if (requiredRoles.length === 0) return;
    if (!hasAnyRole(principal, requiredRoles)) {
      throw new RbacRoleMissingError('Role tidak mencukupi', {
        detail: `Butuh salah satu dari: ${requiredRoles.join(', ')}`,
        meta: { required: requiredRoles, owned: principal.roles.map(roleToString) },
      });
    }
  }

  private checkScopes(principal: Principal, requiredScopes: readonly string[]): void {
    if (requiredScopes.length === 0) return;

    const invalid = requiredScopes.filter((s) => !isValidPermission(s));
    if (invalid.length > 0) {
      throw new RbacScopeMissingError('Scope yang diminta tidak valid', {
        meta: { invalid },
      });
    }

    const required = requiredScopes.map(createPermission);
    if (!hasAllPermissions(principal.scopes, required)) {
      throw new RbacScopeMissingError('Scope tidak mencukupi', {
        detail: `Butuh semua: ${requiredScopes.join(', ')}`,
        meta: { required: requiredScopes, owned: principal.scopes.map(permissionToString) },
      });
    }
  }

  private async checkPolicy(
    input: CheckPermissionInput,
    resource: string,
    action: string,
  ): Promise<void> {
    const context = input.resourceTenantId
      ? { principal: input.principal, resource, action, resourceTenantId: input.resourceTenantId }
      : { principal: input.principal, resource, action };

    const result = await this.evaluator.evaluate(context, input.policies ?? []);
    if (!result.allowed) {
      throw new RbacPolicyDeniedError('Akses ditolak oleh policy', {
        detail: result.reason,
        meta: { resource, action },
      });
    }
  }
}
