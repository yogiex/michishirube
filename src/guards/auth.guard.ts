import { Injectable, Logger, type CanActivate, type ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import type { Principal } from '@/core/auth/domain/principal.entity.js';
import { IS_PUBLIC_KEY } from '@/shared/decorators/public.decorator.js';
import { VerifyTokenUseCase } from '@/core/auth/application/verify-token.usecase.js';
import { VerifyApiKeyUseCase } from '@/core/api-key/application/verify-api-key.usecase.js';
import { AuthMissingError } from '@/shared/errors/index.js';

interface RequestWithPrincipal extends Omit<Request, 'user'> {
  user?: Principal;
}

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly verifyToken: VerifyTokenUseCase,
    private readonly verifyApiKey: VerifyApiKeyUseCase,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() !== 'http') return true;
    if (this.metadata<boolean>(context, IS_PUBLIC_KEY) === true) return true;

    const req = context.switchToHttp().getRequest<RequestWithPrincipal>();
    const bearerToken = this.extractBearerToken(req);
    const apiKey = this.extractApiKey(req);

    if (!bearerToken && !apiKey) {
      this.logger.warn({
        requestId: (req as { requestId?: string }).requestId,
        route: req.url,
        method: req.method,
        msg: 'Auth missing',
      });
      throw new AuthMissingError('Token autentikasi diperlukan');
    }

    try {
      if (bearerToken) {
        if (apiKey) {
          this.logger.warn({
            requestId: (req as { requestId?: string }).requestId,
            route: req.url,
            method: req.method,
            msg: 'Both Authorization bearer and X-API-Key present; prioritizing JWT',
          });
        }
        req.user = await this.verifyToken.execute(bearerToken);
      } else if (apiKey) {
        const result = await this.verifyApiKey.execute({ plaintextKey: apiKey });
        req.user = result.principal;
      }
    } catch (error) {
      this.logger.warn({
        requestId: (req as { requestId?: string }).requestId,
        route: req.url,
        method: req.method,
        msg: 'Auth rejected',
      });
      throw error;
    }

    return true;
  }

  private extractBearerToken(req: RequestWithPrincipal): string | undefined {
    const authorization = req.headers?.authorization;
    if (typeof authorization !== 'string') return undefined;
    const lowered = authorization.toLowerCase();
    if (!lowered.startsWith('bearer ')) return undefined;
    const value = authorization.slice(7).trim();
    return value.length > 0 ? value : undefined;
  }

  private extractApiKey(req: RequestWithPrincipal): string | undefined {
    const value = req.headers?.['x-api-key'];
    if (typeof value !== 'string') return undefined;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  private metadata<T>(context: ExecutionContext, key: string): T | undefined {
    return this.reflector.getAllAndOverride<T | undefined>(key, [
      context.getHandler(),
      context.getClass(),
    ]);
  }
}
