import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request, Response } from 'express';
import { CheckQuotaUseCase } from '@/core/rate-limit/application/check-quota.usecase.js';
import { RATE_LIMIT_KEY, type RateLimitOptions } from '@/shared/decorators/rate-limit.decorator.js';
import { IS_PUBLIC_KEY } from '@/shared/decorators/public.decorator.js';
import { HEADERS } from '@/shared/constants/headers.js';
import type { Principal } from '@/core/auth/domain/principal.entity.js';
import type { TenantId } from '@/core/tenant/domain/tenant-id.vo.js';

interface RequestWithAuth extends Omit<Request, 'user'> {
  user?: Principal;
  tenantId?: TenantId;
}

const DEFAULT_POLICY: RateLimitOptions = {
  ip: { limit: 100, windowSec: 60 },
};

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(
    private readonly checkQuota: CheckQuotaUseCase,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() !== 'http') return true;

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const http = context.switchToHttp();
    const req = http.getRequest<RequestWithAuth>();
    const res = http.getResponse<Response>();

    const policy =
      this.reflector.getAllAndOverride<RateLimitOptions>(RATE_LIMIT_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? DEFAULT_POLICY;

    const ip = this.extractIp(req);
    const route = `${req.method} ${req.route?.path ?? req.path}`;

    const result = await this.checkQuota.execute({
      ip,
      route,
      principal: req.user,
      tenantId: req.tenantId,
      policy,
    });

    if (!res.headersSent) {
      res.setHeader(HEADERS.RATE_LIMIT_LIMIT, String(result.limit));
      res.setHeader(HEADERS.RATE_LIMIT_REMAINING, String(result.remaining));
      res.setHeader(HEADERS.RATE_LIMIT_RESET, String(result.resetAt));
    }

    return true;
  }

  private extractIp(req: RequestWithAuth): string {
    const ip = req.ip ?? req.socket?.remoteAddress ?? 'unknown';
    return ip.startsWith('::ffff:') ? ip.slice(7) : ip;
  }
}
