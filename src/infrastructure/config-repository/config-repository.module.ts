import { Global, Module } from '@nestjs/common';
import { TENANT_REPOSITORY } from '@/core/tenant/domain/tenant.repository.port.js';
import { ROUTE_REPOSITORY } from '@/core/routing/domain/route.repository.port.js';
import { YamlTenantRepository } from './yaml-tenant.repository.js';
import { YamlRouteRepository } from './yaml-route.repository.js';

@Global()
@Module({
  providers: [
    YamlTenantRepository,
    { provide: TENANT_REPOSITORY, useExisting: YamlTenantRepository },
    YamlRouteRepository,
    { provide: ROUTE_REPOSITORY, useExisting: YamlRouteRepository },
  ],
  exports: [TENANT_REPOSITORY, ROUTE_REPOSITORY],
})
export class ConfigRepositoryModule {}
