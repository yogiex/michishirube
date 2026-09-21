import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { TenantMissingError } from '@/shared/errors/index.js';

export const CurrentTenant = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const req = ctx.switchToHttp().getRequest<Request>();
    if (!req.tenantId) {
      throw new TenantMissingError('Tenant tidak tersedia di request');
    }
    return req.tenantId;
  },
);
