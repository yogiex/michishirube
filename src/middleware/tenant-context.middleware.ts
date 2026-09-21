import { Injectable, type NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { ResolveTenantUseCase } from '@/core/tenant/application/resolve-tenant.usecase.js';
import { tenantIdToString } from '@/core/tenant/domain/tenant-id.vo.js';
import { RequestContextHolder } from '@/shared/context/request-context.js';

export const TENANT_ID_HEADER = 'x-tenant-id';
const MAX_HEADER_LENGTH = 64;
const IPV4_PATTERN = /^\d{1,3}(\.\d{1,3}){3}$/;

@Injectable()
export class TenantContextMiddleware implements NestMiddleware {
  constructor(private readonly resolveTenant: ResolveTenantUseCase) {}

  async use(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const subdomain = this.extractSubdomain(this.extractHostname(req));
    const headerTenantId = this.extractHeader(req);
    const requestId = req.requestId ?? 'unknown';

    await RequestContextHolder.run({ requestId, startedAt: Date.now() }, async () => {
      try {
        const result = await this.resolveTenant.execute({ subdomain, headerTenantId });
        const tenantId = tenantIdToString(result.tenantId);
        req.tenantId = tenantId;
        RequestContextHolder.setTenantId(tenantId);
        next();
      } catch (error) {
        next(error);
      }
    });
  }

  private extractHostname(req: Request): string | undefined {
    const host = req.headers.host ?? req.hostname;
    if (typeof host !== 'string' || host.length === 0) return undefined;
    const withoutPort = host.startsWith('[') ? host : (host.split(':')[0] ?? host);
    return withoutPort.toLowerCase();
  }

  private extractSubdomain(hostname: string | undefined): string | undefined {
    if (!hostname || hostname === 'localhost' || hostname.startsWith('[')) return undefined;
    if (IPV4_PATTERN.test(hostname)) return undefined;

    const parts = hostname.split('.');
    if (parts.length < 3) return undefined;
    const first = parts[0];
    return first && first.length > 0 ? first : undefined;
  }

  private extractHeader(req: Request): string | undefined {
    const raw = req.headers[TENANT_ID_HEADER];
    if (typeof raw !== 'string') return undefined;
    return raw.length > 0 && raw.length <= MAX_HEADER_LENGTH ? raw : undefined;
  }
}
