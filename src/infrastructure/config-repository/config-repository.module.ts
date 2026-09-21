import { Global, Module } from '@nestjs/common';
import { TENANT_REPOSITORY } from '@/core/tenant/domain/tenant.repository.port.js';
import { YamlTenantRepository } from './yaml-tenant.repository.js';

@Global()
@Module({
  providers: [
    YamlTenantRepository,
    { provide: TENANT_REPOSITORY, useExisting: YamlTenantRepository },
  ],
  exports: [TENANT_REPOSITORY],
})
export class ConfigRepositoryModule {}
