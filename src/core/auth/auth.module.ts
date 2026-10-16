import { Module } from '@nestjs/common';
import { VerifyTokenUseCase } from './application/verify-token.usecase.js';

@Module({
  providers: [VerifyTokenUseCase],
  exports: [VerifyTokenUseCase],
})
export class AuthModule {}
