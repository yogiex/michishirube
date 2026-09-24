import { Module, type DynamicModule, type Provider, type Type } from '@nestjs/common';
import { API_KEY_HASH_SERVICE } from './domain/api-key-hash.service.token.js';
import { API_KEY_REPOSITORY } from './domain/api-key.repository.token.js';
import { IssueApiKeyUseCase } from './application/issue-api-key.usecase.js';
import { ListApiKeysUseCase } from './application/list-api-keys.usecase.js';
import { RevokeApiKeyUseCase } from './application/revoke-api-key.usecase.js';
import { VerifyApiKeyUseCase } from './application/verify-api-key.usecase.js';

export interface ApiKeyModuleOptions {
  readonly repository: Type<unknown>;
  readonly hashService: Type<unknown>;
}

@Module({})
export class ApiKeyModule {
  static register(options: ApiKeyModuleOptions): DynamicModule {
    const providers: Provider[] = [
      options.repository,
      options.hashService,
      { provide: API_KEY_REPOSITORY, useExisting: options.repository },
      { provide: API_KEY_HASH_SERVICE, useExisting: options.hashService },
      IssueApiKeyUseCase,
      ListApiKeysUseCase,
      RevokeApiKeyUseCase,
      VerifyApiKeyUseCase,
    ];
    return {
      module: ApiKeyModule,
      providers,
      exports: [
        API_KEY_REPOSITORY,
        API_KEY_HASH_SERVICE,
        IssueApiKeyUseCase,
        ListApiKeysUseCase,
        RevokeApiKeyUseCase,
        VerifyApiKeyUseCase,
      ],
    };
  }
}
