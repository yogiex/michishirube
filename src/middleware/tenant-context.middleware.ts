import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export const TENANT_ID_HEADER = 'x-tenant-id';

/**
 * Menyelesaikan tenant dari header `X-Tenant-ID`.
 * Resolusi penuh (JWT claim → subdomain → header) menyusul bersama core/tenant.
 */
@Injectable()
export class TenantContextMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction): void {
    const header = req.headers[TENANT_ID_HEADER];
    const tenantId = Array.isArray(header) ? undefined : header;

    if (tenantId && String(tenantId).length > 0) {
      req.tenantId = String(tenantId);
    }
    next();
  }
}