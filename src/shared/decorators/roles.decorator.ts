import { SetMetadata, type CustomDecorator } from '@nestjs/common';

export const ROLES_KEY = 'requiredRoles';

export const Roles = (...roles: readonly string[]): CustomDecorator<string> =>
  SetMetadata(ROLES_KEY, roles);
