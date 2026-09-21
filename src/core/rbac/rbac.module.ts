import { Module } from '@nestjs/common';
import { CheckPermissionUseCase } from './application/check-permission.usecase.js';

@Module({
  providers: [CheckPermissionUseCase],
  exports: [CheckPermissionUseCase],
})
export class RbacModule {}
