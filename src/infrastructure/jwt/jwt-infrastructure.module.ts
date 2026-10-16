import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TOKEN_VERIFIER } from '@/core/auth/domain/token-verifier.port.js';
import { JwksClient } from './jwks.client.js';
import { JwtVerifierAdapter } from './jwt-verifier.adapter.js';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: JwksClient,
      useFactory: (config: ConfigService): JwksClient =>
        new JwksClient(config.get<string>('jwt.jwksUri') ?? ''),
      inject: [ConfigService],
    },
    JwtVerifierAdapter,
    { provide: TOKEN_VERIFIER, useExisting: JwtVerifierAdapter },
  ],
  exports: [TOKEN_VERIFIER, JwtVerifierAdapter, JwksClient],
})
export class JwtInfrastructureModule {}
