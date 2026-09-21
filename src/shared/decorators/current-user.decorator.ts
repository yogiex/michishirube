import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { AuthMissingError } from '@/shared/errors/index.js';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): NonNullable<Request['user']> => {
    const req = ctx.switchToHttp().getRequest<Request>();
    if (!req.user) {
      throw new AuthMissingError('Principal tidak tersedia di request');
    }
    return req.user;
  },
);
