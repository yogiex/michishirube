import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  TenantInactiveError,
  TenantMismatchError,
  TenantMissingError,
  TenantSuspendedError,
  TenantUnknownError,
} from '@/shared/errors/index.js';
import { TENANT_REPOSITORY, type TenantRepositoryPort } from '../domain/tenant.repository.port.js';
import {
  createTenantId,
  isValidTenantId,
  slugFromSubdomain,
  type TenantId,
} from '../domain/tenant-id.vo.js';
import { isTenantActive, type Tenant } from '../domain/tenant.entity.js';

export type TenantResolutionSource = 'jwt' | 'subdomain' | 'header';

export interface ResolveTenantInput {
  readonly jwtTenantId?: string | undefined;
  readonly subdomain?: string | undefined;
  readonly headerTenantId?: string | undefined;
}

export interface ResolveTenantOutput {
  readonly tenant: Tenant;
  readonly tenantId: TenantId;
  readonly source: TenantResolutionSource;
}

@Injectable()
export class ResolveTenantUseCase {
  private readonly logger = new Logger(ResolveTenantUseCase.name);

  constructor(@Inject(TENANT_REPOSITORY) private readonly tenants: TenantRepositoryPort) {}

  async execute(input: ResolveTenantInput): Promise<ResolveTenantOutput> {
    const { jwtTenantId, subdomain, headerTenantId } = input;

    if (!jwtTenantId && !subdomain && !headerTenantId) {
      throw new TenantMissingError('Tenant tidak teridentifikasi', {
        detail: 'Sertakan JWT, subdomain, atau header X-Tenant-ID',
      });
    }

    if (jwtTenantId && headerTenantId && jwtTenantId !== headerTenantId) {
      this.logger.warn({ jwtTenantId, headerTenantId }, 'Tenant mismatch: JWT != header');
      throw new TenantMismatchError('Tenant di JWT berbeda dengan header', {
        detail: 'Nilai X-Tenant-ID tidak cocok dengan klaim JWT',
        meta: { jwtTenantId, headerTenantId },
      });
    }

    const resolved = await this.resolveByPriority(jwtTenantId, subdomain, headerTenantId);
    this.assertTenantUsable(resolved.tenant);
    return resolved;
  }

  private async resolveByPriority(
    jwtTenantId: string | undefined,
    subdomain: string | undefined,
    headerTenantId: string | undefined,
  ): Promise<ResolveTenantOutput> {
    if (jwtTenantId) {
      const tenant = await this.loadById(jwtTenantId, 'jwt');
      return { tenant, tenantId: tenant.id, source: 'jwt' };
    }

    if (subdomain) {
      const tenant = await this.loadBySlug(slugFromSubdomain(subdomain));
      return { tenant, tenantId: tenant.id, source: 'subdomain' };
    }

    if (headerTenantId) {
      const tenant = await this.loadById(headerTenantId, 'header');
      return { tenant, tenantId: tenant.id, source: 'header' };
    }

    throw new TenantMissingError('Tenant tidak teridentifikasi');
  }

  private async loadById(rawId: string, source: TenantResolutionSource): Promise<Tenant> {
    if (!isValidTenantId(rawId)) {
      throw new TenantUnknownError('Tenant id tidak valid', { meta: { source } });
    }

    const opt = await this.tenants.findById(createTenantId(rawId));
    if (!opt.some) {
      throw new TenantUnknownError('Tenant tidak terdaftar', {
        meta: { tenantId: rawId, source },
      });
    }
    return opt.value;
  }

  private async loadBySlug(slug: string): Promise<Tenant> {
    const opt = await this.tenants.findBySlug(slug);
    if (!opt.some) {
      throw new TenantUnknownError('Tenant tidak terdaftar', {
        meta: { slug, source: 'subdomain' },
      });
    }
    return opt.value;
  }

  private assertTenantUsable(tenant: Tenant): void {
    if (tenant.status === 'suspended') {
      throw new TenantSuspendedError('Tenant disuspend', {
        meta: { tenantId: tenant.id, status: tenant.status },
      });
    }
    if (!isTenantActive(tenant)) {
      throw new TenantInactiveError('Tenant tidak aktif', {
        meta: { tenantId: tenant.id, status: tenant.status },
      });
    }
  }
}
