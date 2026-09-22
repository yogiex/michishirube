import { Global, Module } from '@nestjs/common';
import { POLICY_EVALUATOR } from '@/core/rbac/domain/policy-evaluator.port.js';
import { DefaultPolicyEvaluatorAdapter } from './default-policy-evaluator.adapter.js';

@Global()
@Module({
  providers: [
    DefaultPolicyEvaluatorAdapter,
    { provide: POLICY_EVALUATOR, useExisting: DefaultPolicyEvaluatorAdapter },
  ],
  exports: [POLICY_EVALUATOR],
})
export class RbacInfrastructureModule {}
