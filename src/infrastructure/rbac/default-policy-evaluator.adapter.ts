import { Injectable } from '@nestjs/common';
import type { Principal } from '@/core/auth/domain/principal.entity.js';
import { roleToString } from '@/core/auth/domain/role.vo.js';
import type {
  EvaluationContext,
  EvaluationResult,
  PolicyEvaluatorPort,
} from '@/core/rbac/domain/policy-evaluator.port.js';
import type { Policy, PolicyRule } from '@/core/rbac/domain/policy.entity.js';
import { hasAllPermissions, type Permission } from '@/core/rbac/domain/permission.vo.js';

@Injectable()
export class DefaultPolicyEvaluatorAdapter implements PolicyEvaluatorPort {
  async evaluate(ctx: EvaluationContext, policies: readonly Policy[]): Promise<EvaluationResult> {
    const relevant = policies.filter((p) => p.resource === ctx.resource);
    if (relevant.length === 0) {
      return { allowed: true, reason: 'no policy defined' };
    }

    let matchedAllow: PolicyRule | undefined;

    for (const policy of relevant) {
      for (const rule of policy.rules) {
        if (!this.matches(ctx, rule)) continue;
        if (rule.effect === 'deny') {
          return {
            allowed: false,
            reason: rule.description ?? 'denied by rule',
            matchedRule: rule,
          };
        }
        matchedAllow ??= rule;
      }
    }

    if (matchedAllow) {
      return {
        allowed: true,
        reason: matchedAllow.description ?? 'allowed by rule',
        matchedRule: matchedAllow,
      };
    }

    return { allowed: false, reason: 'no matching rule' };
  }

  checkPermissions(principal: Principal, required: readonly Permission[]): EvaluationResult {
    const allowed = hasAllPermissions(principal.scopes, required);
    return { allowed, reason: allowed ? 'all permissions granted' : 'missing permissions' };
  }

  private matches(ctx: EvaluationContext, rule: PolicyRule): boolean {
    if (rule.tenantIds && !rule.tenantIds.includes(ctx.principal.tenantId)) return false;

    if (rule.roles && rule.roles.length > 0) {
      const owned = new Set(ctx.principal.roles.map(roleToString));
      if (!rule.roles.some((r) => owned.has(roleToString(r)))) return false;
    }

    if (rule.permissions && rule.permissions.length > 0) {
      if (!hasAllPermissions(ctx.principal.scopes, rule.permissions)) return false;
    }

    return true;
  }
}
