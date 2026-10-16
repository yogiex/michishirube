import { Inject, Injectable } from '@nestjs/common';
import {
  TENANT_REPOSITORY,
  type TenantRepositoryPort,
} from '@/core/tenant/domain/tenant.repository.port.js';
import { isTenantActive } from '@/core/tenant/domain/tenant.entity.js';
import type { TenantOverviewPort } from '@/core/overview/domain/overview-stats.port.js';
import type { TenantsStats } from '@/core/overview/domain/overview.entity.js';

@Injectable()
export class TenantOverviewAdapter implements TenantOverviewPort {
  constructor(@Inject(TENANT_REPOSITORY) private readonly tenants: TenantRepositoryPort) {}

  async getTenantStats(): Promise<TenantsStats> {
    const all = await this.tenants.listAll();
    return {
      active: all.filter((tenant) => isTenantActive(tenant)).length,
      total: all.length,
    };
  }
}
