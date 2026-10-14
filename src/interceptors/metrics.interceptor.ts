import { createHash } from 'node:crypto';
import { performance } from 'node:perf_hooks';
import {
  Injectable,
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor,
} from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { Observable, tap } from 'rxjs';
import { RecordHttpMetricUseCase } from '@/core/metrics/application/record-http-metric.usecase.js';
import { RequestContextHolder } from '@/shared/context/request-context.js';

const SKIPPED_PREFIXES = Object.freeze(['/metrics', '/health', '/favicon.ico']);
const SKIPPED_SUFFIXES = Object.freeze([
  '.js',
  '.css',
  '.map',
  '.png',
  '.jpg',
  '.ico',
  '.woff',
  '.woff2',
]);

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(private readonly recordHttpMetric: RecordHttpMetricUseCase) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') return next.handle();
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const reply = context.switchToHttp().getResponse<FastifyReply>();
    const path = resolvePath(request);
    if (isSkipped(path)) return next.handle();

    const startedAt = performance.now();
    return next.handle().pipe(
      tap({
        next: () => this.record(request, reply, path, startedAt, false),
        error: () => this.record(request, reply, path, startedAt, true),
      }),
    );
  }

  private record(
    request: FastifyRequest,
    reply: FastifyReply,
    path: string,
    startedAt: number,
    failed: boolean,
  ): void {
    try {
      const currentStatus = reply.statusCode;
      const status = failed ? (currentStatus >= 400 ? currentStatus : 500) : currentStatus;
      this.recordHttpMetric.execute({
        method: request.method,
        path,
        status,
        durationMs: performance.now() - startedAt,
        tenantHash: hashTenant(RequestContextHolder.getTenantId()),
      });
    } catch (error: unknown) {
      if (error instanceof Error) return;
    }
  }
}

export function resolvePath(request: FastifyRequest): string {
  const route = request.routeOptions?.url;
  if (route !== undefined) return route;
  const queryIndex = request.url.indexOf('?');
  return queryIndex === -1 ? request.url : request.url.slice(0, queryIndex);
}

function isSkipped(path: string): boolean {
  return (
    SKIPPED_PREFIXES.some((prefix) => path.startsWith(prefix)) ||
    SKIPPED_SUFFIXES.some((suffix) => path.endsWith(suffix))
  );
}

function hashTenant(tenantId: string | undefined): string {
  if (tenantId === undefined) return 'anon';
  return createHash('sha256').update(tenantId).digest('hex').slice(0, 8);
}
