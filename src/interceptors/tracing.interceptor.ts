import { finalize, tap } from 'rxjs';
import { Observable } from 'rxjs';
import {
  Injectable,
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor,
} from '@nestjs/common';
import {
  context as otelContext,
  trace,
  SpanKind,
  SpanStatusCode,
  TraceFlags,
} from '@opentelemetry/api';
import type { FastifyReply, FastifyRequest } from 'fastify';

export const TRACEPARENT_HEADER = 'traceparent';
export const TRACEPARENT_PATTERN = /^00-[0-9a-f]{32}-[0-9a-f]{16}-[0-9a-f]{2}$/i;

export function isValidTraceparent(value: unknown): value is string {
  return typeof value === 'string' && TRACEPARENT_PATTERN.test(value.trim());
}

export function buildTraceparent(traceId: string, spanId: string, sampled: boolean): string {
  const flags = sampled ? '01' : '00';
  return `00-${traceId.toLowerCase()}-${spanId.toLowerCase()}-${flags}`;
}

export function extractRouteTemplate(request: FastifyRequest): string {
  const route = request.routeOptions?.url;
  if (typeof route === 'string' && route.length > 0) return route;
  const url = request.url ?? '';
  const queryIndex = url.indexOf('?');
  return queryIndex === -1 ? url : url.slice(0, queryIndex);
}

@Injectable()
export class TracingInterceptor implements NestInterceptor {
  private serviceName(): string {
    return (
      (process.env.OTEL_SERVICE_NAME ?? process.env.SERVICE_NAME ?? 'api-gateway').trim() ||
      'api-gateway'
    );
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const reply = context.switchToHttp().getResponse<FastifyReply>();

    const method = (request.method ?? 'GET').toUpperCase();
    const route = extractRouteTemplate(request);
    const spanName = `${method} ${route}`;

    const tracer = trace.getTracer(this.serviceName());
    const span = tracer.startSpan(spanName, { kind: SpanKind.SERVER });
    const attributes: Record<string, string> = {
      'http.request.method': method,
      'http.route': route,
    };
    span.setAttributes(attributes);

    const spanContext = span.spanContext();
    let traceparent: string | undefined;
    if (trace.isSpanContextValid(spanContext)) {
      traceparent = buildTraceparent(
        spanContext.traceId,
        spanContext.spanId,
        Boolean(spanContext.traceFlags & TraceFlags.SAMPLED),
      );

      const headers = (request.headers ?? {}) as Record<string, string | string[] | undefined>;
      headers[TRACEPARENT_HEADER] = traceparent;
      request.headers = headers;

      try {
        reply.header(TRACEPARENT_HEADER, traceparent);
      } catch {
        // Response may already be closed; ignore.
      }
    }

    const activeContext = trace.setSpan(otelContext.active(), span);

    return otelContext
      .with(activeContext, () => next.handle())
      .pipe(
        tap({
          next: () => span.setStatus({ code: SpanStatusCode.OK }),
          error: (error: unknown) => {
            span.setStatus({
              code: SpanStatusCode.ERROR,
              message: error instanceof Error ? error.message : 'unknown error',
            });
          },
        }),
        finalize(() => {
          span.end();
        }),
      );
  }
}
