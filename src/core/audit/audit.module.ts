import { Module, type DynamicModule, type Provider, type Type } from '@nestjs/common';
import { AUDIT_REPOSITORY } from './domain/audit.repository.token.js';
import { RecordAuditUseCase } from './application/record-audit.usecase.js';
import { ListAuditUseCase } from './application/list-audit.usecase.js';

export interface AuditModuleOptions {
  readonly repository: Type<unknown>;
}

@Module({})
export class AuditModule {
  static register(options: AuditModuleOptions): DynamicModule {
    const providers: Provider[] = [
      options.repository,
      { provide: AUDIT_REPOSITORY, useExisting: options.repository },
      RecordAuditUseCase,
      ListAuditUseCase,
    ];
    return {
      module: AuditModule,
      providers,
      exports: [AUDIT_REPOSITORY, RecordAuditUseCase, ListAuditUseCase],
    };
  }
}
