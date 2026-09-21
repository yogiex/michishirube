import type { Principal } from '@/core/auth/domain/principal.entity.js';
import type { Policy, PolicyRule } from './policy.entity.js';
import type { Permission } from './permission.vo.js';

export const POLICY_EVALUATOR = Symbol('POLICY_EVALUATOR');

export interface EvaluationContext {
  readonly principal: Principal;
  readonly resource: string;
  readonly action: string;
  readonly resourceTenantId?: string;
}

export type EvaluationResult =
  | { readonly allowed: true; readonly reason: string; readonly matchedRule?: PolicyRule }
  | { readonly allowed: false; readonly reason: string; readonly matchedRule?: PolicyRule };

export interface PolicyEvaluatorPort {
  evaluate(context: EvaluationContext, policies: readonly Policy[]): Promise<EvaluationResult>;
  checkPermissions(principal: Principal, required: readonly Permission[]): EvaluationResult;
}
