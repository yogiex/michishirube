import { Global, Module } from '@nestjs/common';
import { RequestContextHolder } from './request-context.js';

export const REQUEST_CONTEXT = Symbol('REQUEST_CONTEXT');

@Global()
@Module({
  providers: [{ provide: REQUEST_CONTEXT, useValue: RequestContextHolder }],
  exports: [REQUEST_CONTEXT],
})
export class RequestContextModule {}
