import { SetMetadata, type CustomDecorator } from '@nestjs/common';

export const PERMISSIONS_KEY = 'requiredPermissions';

export const RequirePermissions = (...permissions: readonly string[]): CustomDecorator<string> =>
  SetMetadata(PERMISSIONS_KEY, permissions);
