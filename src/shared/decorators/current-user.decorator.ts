import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import type { Principal } from '@/core/auth/domain/principal.entity.js';
import { AuthMissingError } from '@/shared/errors/index.js';

interface RequestWithPrincipal extends Omit<Request, 'user'> {
  user?: Principal;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): Principal => {
    const req = ctx.switchToHttp().getRequest<RequestWithPrincipal>();
    if (!req.user) {
      throw new AuthMissingError('Principal tidak tersedia di request');
    }
    return req.user;
  },
);
