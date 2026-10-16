import { Controller, Get, Header, Inject, Res, UseGuards } from '@nestjs/common';
import type { FastifyReply } from 'fastify';
import {
  METRICS_REGISTRY,
  type MetricsRegistryPort,
} from '@/core/metrics/domain/metrics-registry.port.js';
import { Public } from '@/shared/decorators/public.decorator.js';
import { MetricsAuthGuard } from './metrics-auth.guard.js';

@Controller('metrics')
@Public()
@UseGuards(MetricsAuthGuard)
export class MetricsController {
  constructor(@Inject(METRICS_REGISTRY) private readonly registry: MetricsRegistryPort) {}

  @Get()
  @Header('Cache-Control', 'no-store, no-cache, must-revalidate')
  async metrics(@Res({ passthrough: true }) reply: FastifyReply): Promise<string> {
    reply.header('Content-Type', this.registry.contentType());
    return this.registry.render();
  }
}
