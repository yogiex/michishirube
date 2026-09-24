import { Module } from '@nestjs/common';
import { RoutingModule } from '@/core/routing/routing.module.js';
import { UndiciProxyAdapter } from '@/infrastructure/http/undici-proxy.adapter.js';
import { UNDICI_PROXY_CLIENT } from '@/infrastructure/http/http.constants.js';
import { ProxyController } from './proxy.controller.js';
import { ProxyService } from './proxy.service.js';

@Module({
  imports: [RoutingModule],
  controllers: [ProxyController],
  providers: [
    ProxyService,
    UndiciProxyAdapter,
    { provide: UNDICI_PROXY_CLIENT, useExisting: UndiciProxyAdapter },
  ],
})
export class ProxyModule {}
