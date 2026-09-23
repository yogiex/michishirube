import { Module } from '@nestjs/common';
import { ResolveRouteUseCase } from './application/resolve-route.usecase.js';

@Module({
  providers: [ResolveRouteUseCase],
  exports: [ResolveRouteUseCase],
})
export class RoutingModule {}
