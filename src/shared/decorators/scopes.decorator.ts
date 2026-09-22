import { SetMetadata, type CustomDecorator } from '@nestjs/common';

export const SCOPES_KEY = 'requiredScopes';

export const Scopes = (...scopes: readonly string[]): CustomDecorator<string> =>
  SetMetadata(SCOPES_KEY, scopes);
