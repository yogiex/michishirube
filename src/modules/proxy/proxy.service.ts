import { Inject, Injectable, Logger } from '@nestjs/common';
import { ResolveRouteUseCase } from '@/core/routing/application/resolve-route.usecase.js';
import type { Route } from '@/core/routing/domain/route.entity.js';
import type { UpstreamClientPort } from '@/core/routing/domain/upstream-client.port.js';
import {
  sanitizeRequestHeaders,
  sanitizeResponseHeaders,
} from '@/shared/security/header-sanitizer.js';
import { assertSafeUpstream } from '@/shared/security/ssrf-guard.js';
import { RequestContextHolder } from '@/shared/context/request-context.js';
import { InternalError } from '@/shared/errors/index.js';
import { UNDICI_PROXY_CLIENT } from '@/infrastructure/http/http.constants.js';

export interface ProxyInput {
  readonly method: string;
  readonly path: string;
  readonly query: string;
  readonly headers: Readonly<Record<string, string | string[] | undefined>>;
  readonly body?: Buffer;
  readonly ip: string;
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

    const response = await this.client.request({
      method: input.method,
      url: upstreamUrl,
      headers,
      body: input.body,
      timeoutMs: route.timeoutMs,
    });

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
