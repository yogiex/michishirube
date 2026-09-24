import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExecuteWithCircuitBreakerUseCase } from '@/core/circuit-breaker/application/execute-with-circuit-breaker.usecase.js';
import { ExecuteWithBulkheadUseCase } from '@/core/bulkhead/application/execute-with-bulkhead.usecase.js';
import { ResolveRouteUseCase } from '@/core/routing/application/resolve-route.usecase.js';
import type { AppConfig } from '@/config/configuration.js';
import type { Route } from '@/core/routing/domain/route.entity.js';
import type {
  UpstreamClientPort,
  UpstreamResponse,
} from '@/core/routing/domain/upstream-client.port.js';
import {
  sanitizeRequestHeaders,
  sanitizeResponseHeaders,
} from '@/shared/security/header-sanitizer.js';
import { assertSafeUpstream } from '@/shared/security/ssrf-guard.js';
import { RequestContextHolder } from '@/shared/context/request-context.js';
import {
  InternalError,
  UpstreamConnectFailedError,
  UpstreamDnsFailedError,
  UpstreamRetryExhaustedError,
  UpstreamTimeoutError,
} from '@/shared/errors/index.js';
import { parseRetryAfterMs } from '@/shared/utils/retry-after.util.js';
import { UNDICI_PROXY_CLIENT } from '@/infrastructure/http/http.constants.js';

export interface ProxyInput {
  readonly method: string;
  readonly path: string;
  readonly query: string;
  readonly headers: Readonly<Record<string, string | string[] | undefined>>;
  readonly body?: Buffer;
  readonly ip: string;
  readonly signal?: AbortSignal;
}

export interface ProxyOutput {
  readonly status: number;
  readonly headers: Readonly<Record<string, string>>;
  readonly body: Buffer;
}

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);

  constructor(
    private readonly resolveRoute: ResolveRouteUseCase,
    @Inject(UNDICI_PROXY_CLIENT) private readonly client: UpstreamClientPort,
    private readonly executeWithBreaker: ExecuteWithCircuitBreakerUseCase,
    private readonly executeWithBulkhead: ExecuteWithBulkheadUseCase,
    private readonly config: ConfigService<AppConfig, true>,
  ) {}

  async handle(input: ProxyInput): Promise<ProxyOutput> {
    const { route, wildcard } = await this.resolveRoute.execute({
      path: input.path,
      method: input.method,
    });

    const upstreamUrl = this.buildUpstreamUrl(route, input, wildcard);

    try {
      await assertSafeUpstream(upstreamUrl);
    } catch (cause) {
      throw new InternalError('Upstream URL tidak aman', {
        meta: { upstreamUrl },
        cause,
      });
    }

    const ctx = RequestContextHolder.get();
    const overrides: Record<string, string> = {
      'x-request-id': ctx?.requestId ?? 'unknown',
    };
    if (ctx?.tenantId) overrides['x-tenant-id'] = ctx.tenantId;
    if (ctx?.userId) overrides['x-user-id'] = ctx.userId;

    const headers = sanitizeRequestHeaders(input.headers, overrides);

    const response = await this.requestWithRetry(input, route, upstreamUrl, headers);

    const cleanHeaders = sanitizeResponseHeaders(response.headers);

    this.logger.debug(
      {
        routeId: route.id,
        upstream: route.upstream,
        status: response.status,
        bytes: response.body.length,
      },
      'Proxy forwarded',
    );

    return { status: response.status, headers: cleanHeaders, body: response.body };
  }

  private async requestWithRetry(
    input: ProxyInput,
    route: Route,
    upstreamUrl: string,
    headers: Readonly<Record<string, string>>,
  ): Promise<UpstreamResponse> {
    const maxAttempts = this.canRetry(input) ? 3 : 1;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        const response = await this.executeWithBreaker.execute({
          circuitKey: this.buildCircuitKey(upstreamUrl),
          config: this.config.getOrThrow<AppConfig['circuitBreaker']>('circuitBreaker'),
          operation: () =>
            this.executeWithBulkhead.execute({
              key: this.buildCircuitKey(upstreamUrl),
              config: this.config.getOrThrow<AppConfig['bulkhead']>('bulkhead'),
              operation: () =>
                this.client.request({
                  method: input.method,
                  url: upstreamUrl,
                  headers,
                  body: input.body,
                  timeoutMs: route.timeoutMs,
                  signal: input.signal,
                }),
            }),
        });

        if (!this.isRetryableStatus(response.status)) return response;
        if (attempt === maxAttempts) return response;

        await this.waitBeforeRetry(attempt, response.headers['retry-after'], input.signal);
      } catch (error) {
        if (attempt === maxAttempts || !this.isRetryableError(error)) throw error;

        await this.waitBeforeRetry(attempt, undefined, input.signal);
      }
    }

    throw new UpstreamRetryExhaustedError('Upstream retries exhausted', {
      meta: { upstream: route.upstream },
    });
  }

  private canRetry(input: ProxyInput): boolean {
    if (['GET', 'HEAD', 'OPTIONS'].includes(input.method.toUpperCase())) return true;

    return Object.entries(input.headers).some(
      ([key, value]) =>
        key.toLowerCase() === 'idempotency-key' && typeof value === 'string' && value.trim() !== '',
    );
  }

  private isRetryableStatus(status: number): boolean {
    return (
      status === 408 ||
      status === 429 ||
      status === 500 ||
      status === 502 ||
      status === 503 ||
      status === 504
    );
  }

  private isRetryableError(error: unknown): error is Error {
    return (
      error instanceof UpstreamTimeoutError ||
      error instanceof UpstreamConnectFailedError ||
      error instanceof UpstreamDnsFailedError
    );
  }

  private async waitBeforeRetry(
    attempt: number,
    retryAfter: string | undefined,
    signal: AbortSignal | undefined,
  ): Promise<void> {
    const retryAfterMs = parseRetryAfterMs(retryAfter);
    const backoffMs = Math.min(250 * 2 ** (attempt - 1) + Math.floor(Math.random() * 100), 30_000);
    const delayMs = Math.min(retryAfterMs ?? backoffMs, 30_000);

    await new Promise<void>((resolve, reject) => {
      if (signal?.aborted) {
        reject(signal.reason);
        return;
      }

      const timer = setTimeout(() => {
        signal?.removeEventListener('abort', onAbort);
        resolve();
      }, delayMs);
      const onAbort = (): void => {
        clearTimeout(timer);
        reject(signal?.reason);
      };
      signal?.addEventListener('abort', onAbort, { once: true });
    });
  }

  private buildCircuitKey(upstreamUrl: string): string {
    const origin = new URL(upstreamUrl).origin;
    return `origin-${Buffer.from(origin).toString('hex')}`;
  }

  private buildUpstreamUrl(
    route: Route,
    input: Pick<ProxyInput, 'path' | 'query'>,
    wildcard: string | undefined,
  ): string {
    const base = route.upstream.endsWith('/') ? route.upstream.slice(0, -1) : route.upstream;

    let remainder: string;
    if (wildcard !== undefined) {
      remainder = wildcard.startsWith('/') ? wildcard : `/${wildcard}`;
    } else {
      // strip pattern's literal prefix; keep from first dynamic segment (:param/*) onward
      const patternSegs = route.path.split('/').filter((s) => s.length > 0);
      let dynIdx = patternSegs.findIndex((s) => s.startsWith(':') || s === '*');
      if (dynIdx === -1) dynIdx = patternSegs.length;
      const actualSegs = input.path.split('/').filter((s) => s.length > 0);
      const rest = actualSegs.slice(dynIdx);
      remainder = rest.length > 0 ? `/${rest.join('/')}` : '';
    }

    let url = base + remainder;
    if (input.query) {
      url += input.query.startsWith('?') ? input.query : `?${input.query}`;
    }
    return url;
  }
}
