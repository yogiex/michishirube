import { Injectable, Logger } from '@nestjs/common';
import { Agent, request as undiciRequest, type Dispatcher } from 'undici';
import {
  DomainError,
  UpstreamTimeoutError,
  UpstreamConnectFailedError,
  UpstreamDnsFailedError,
  UpstreamError,
} from '@/shared/errors/index.js';
import type {
  UpstreamClientPort,
  UpstreamRequest,
  UpstreamResponse,
} from '@/core/routing/domain/upstream-client.port.js';

const MAX_RESPONSE_BYTES = 10 * 1024 * 1024;

@Injectable()
export class UndiciProxyAdapter implements UpstreamClientPort {
  private readonly logger = new Logger(UndiciProxyAdapter.name);
  private readonly agents = new Map<string, Dispatcher>();

  private getAgent(origin: string): Dispatcher {
    let agent = this.agents.get(origin);
    if (!agent) {
      agent = new Agent({
        connections: 32,
        pipelining: 1,
        keepAliveTimeout: 30_000,
        keepAliveMaxTimeout: 60_000,
        headersTimeout: 60_000,
        bodyTimeout: 60_000,
        connect: { timeout: 5_000 },
      });
      this.agents.set(origin, agent);
    }
    return agent;
  }

  async request(input: UpstreamRequest): Promise<UpstreamResponse> {
    const url = new URL(input.url);
    const origin = url.origin;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), input.timeoutMs);

    if (input.signal) {
      if (input.signal.aborted) {
        controller.abort();
      } else {
        input.signal.addEventListener('abort', () => controller.abort(), {
          once: true,
        });
      }
    }

    try {
      const res = await undiciRequest(input.url, {
        method: input.method,
        headers: input.headers,
        body: input.body,
        signal: controller.signal,
        dispatcher: this.getAgent(origin),
        bodyTimeout: input.timeoutMs,
        headersTimeout: input.timeoutMs,
      });

      const body = await this.readBoundedBody(res.body);

      return {
        status: res.statusCode,
        headers: this.normalizeHeaders(res.headers),
        body,
      };
    } catch (cause) {
      throw this.translateError(cause, input);
    } finally {
      clearTimeout(timer);
    }
  }

  private async readBoundedBody(stream: AsyncIterable<Uint8Array>): Promise<Buffer> {
    const chunks: Buffer[] = [];
    let total = 0;
    for await (const chunk of stream) {
      total += chunk.length;
      if (total > MAX_RESPONSE_BYTES) {
        throw new UpstreamError('Response upstream melebihi batas 10 MB');
      }
      chunks.push(Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
  }

  private normalizeHeaders(
    raw: Record<string, string | string[] | undefined>,
  ): Record<string, string> {
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(raw)) {
      if (v === undefined) continue;
      out[k.toLowerCase()] = Array.isArray(v) ? v.join(', ') : v;
    }
    return out;
  }

  private translateError(cause: unknown, input: UpstreamRequest): Error {
    if (cause instanceof DomainError) return cause;

    const err = (typeof cause === 'object' && cause !== null ? cause : {}) as {
      code?: string;
      name?: string;
      message?: string;
    };

    if (
      err.name === 'AbortError' ||
      err.code === 'UND_ERR_ABORTED' ||
      err.code === 'UND_ERR_HEADERS_TIMEOUT' ||
      err.code === 'UND_ERR_BODY_TIMEOUT'
    ) {
      return new UpstreamTimeoutError(`Upstream timeout setelah ${input.timeoutMs}ms`, {
        meta: { url: input.url, timeoutMs: input.timeoutMs },
      });
    }
    if (err.code === 'ENOTFOUND') {
      return new UpstreamDnsFailedError('DNS resolve gagal', { meta: { url: input.url }, cause });
    }
    if (err.code === 'ECONNREFUSED' || err.code === 'ECONNRESET') {
      return new UpstreamConnectFailedError('Koneksi ke upstream gagal', {
        meta: { url: input.url, code: err.code },
        cause,
      });
    }

    this.logger.error({ err: cause, url: input.url }, 'Upstream error');
    return new UpstreamError('Upstream error', { meta: { url: input.url }, cause });
  }
}
