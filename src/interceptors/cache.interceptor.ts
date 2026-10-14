import {
  Injectable,
  Logger,
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';
import { GetFromCacheUseCase } from '@/core/cache/application/get-from-cache.usecase.js';
import { SaveToCacheUseCase } from '@/core/cache/application/save-to-cache.usecase.js';
import { buildCacheKey, cacheKeyForLog } from '@/core/cache/domain/cache-key.vo.js';
import {
  isCacheableMethod,
  isCacheableStatus,
  resolveCacheConfig,
  type CacheConfig,
} from '@/core/cache/domain/cache-config.vo.js';
import type { CachedResponse } from '@/core/cache/domain/cache-entry.entity.js';
import { RequestContextHolder } from '@/shared/context/request-context.js';
import { HEADERS } from '@/shared/constants/headers.js';
import { CACHEABLE_KEY, type CacheableOptions } from '@/shared/decorators/cacheable.decorator.js';

const CACHE_BLOCKED_HEADERS = new Set([
  'set-cookie',
  'authorization',
  'www-authenticate',
  'connection',
  'keep-alive',
  'transfer-encoding',
  'proxy-authenticate',
  'proxy-authorization',
  HEADERS.REQUEST_ID,
  HEADERS.RATE_LIMIT_LIMIT,
  HEADERS.RATE_LIMIT_REMAINING,
  HEADERS.RATE_LIMIT_RESET,
  HEADERS.RETRY_AFTER,
  'content-length',
]);

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private readonly logger = new Logger(CacheInterceptor.name);

  constructor(
    private readonly getFromCache: GetFromCacheUseCase,
    private readonly saveToCache: SaveToCacheUseCase,
    private readonly reflector: Reflector,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
    if (context.getType() !== 'http') return next.handle();
    const options = this.reflector.getAllAndOverride<CacheableOptions>(CACHEABLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!options) return next.handle();
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    if (!isCacheableMethod(request.method)) return next.handle();
    const config = resolveCacheConfig(options);
    const requestContext = RequestContextHolder.get();
    const tenantId = requestContext?.tenantId;
    const userId = requestContext?.userId;
    if (!tenantId) return next.handle();
    if (config.scope === 'user' && !userId) return next.handle();
    const key = this.buildKey(request, config, tenantId, userId);
    const result = await this.getFromCache.execute({ key, config });
    const reply = context.switchToHttp().getResponse<FastifyReply>();
    if (result.kind === 'miss') return this.handleMiss(next, request, reply, key, config);
    this.replay(reply, result.response, result.stale, key);
    return new Observable<unknown>((subscriber) => {
      subscriber.next(this.parseBody(result.response.body));
      subscriber.complete();
    });
  }

  private handleMiss(
    next: CallHandler,
    request: FastifyRequest,
    reply: FastifyReply,
    key: string,
    config: CacheConfig,
  ): Observable<unknown> {
    return next.handle().pipe(
      tap({
        next: (data) => {
          void this.saveResponse(request, reply, key, config, data);
        },
      }),
    );
  }

  private buildKey(
    request: FastifyRequest,
    config: CacheConfig,
    tenantId: string,
    userId: string | undefined,
  ): string {
    const queryIndex = request.url.indexOf('?');
    return buildCacheKey({
      tenantId,
      userId,
      method: request.method,
      path: queryIndex === -1 ? request.url : request.url.slice(0, queryIndex),
      query: queryIndex === -1 ? '' : request.url.slice(queryIndex),
      varyHeaders: this.extractVaryHeaders(request, config.varyHeaders),
      isAuthenticated: userId !== undefined,
    });
  }

  private extractVaryHeaders(
    request: FastifyRequest,
    configured: readonly string[],
  ): Readonly<Record<string, string>> {
    const result: Record<string, string> = {};
    for (const name of configured) {
      const value = request.headers[name.toLowerCase()];
      if (value === undefined) continue;
      result[name.toLowerCase()] = Array.isArray(value) ? value.join(', ') : value;
    }
    return result;
  }

  private async saveResponse(
    request: FastifyRequest,
    reply: FastifyReply,
    key: string,
    config: CacheConfig,
    data: unknown,
  ): Promise<void> {
    try {
      const status = reply.statusCode;
      if (!isCacheableStatus(status)) return;
      const body = this.serializeBody(data);
      if (config.skipIfLarger && Buffer.byteLength(body, 'base64') > config.maxBodySize) return;
      const now = Date.now();
      const response: CachedResponse = {
        status,
        headers: this.safeHeaders(reply.getHeaders()),
        body,
        createdAt: now,
        expiresAt: now + config.ttlSec * 1000,
        age: 0,
      };
      await this.saveToCache.execute({ key, config, method: request.method, status, response });
      this.logger.debug({ key: cacheKeyForLog(key) }, 'Respons berhasil disimpan ke cache');
    } catch (error: unknown) {
      this.logger.warn(
        { err: error, key: cacheKeyForLog(key) },
        'Gagal menyimpan respons ke cache',
      );
    }
  }

  private replay(reply: FastifyReply, response: CachedResponse, stale: boolean, key: string): void {
    reply.statusCode = response.status;
    for (const [name, value] of Object.entries(this.safeHeaders(response.headers))) {
      reply.header(name, value);
    }
    const maxAge = Math.max(0, Math.floor((response.expiresAt - Date.now()) / 1000));
    reply.header('age', String(response.age));
    reply.header('x-cache', 'HIT');
    reply.header('cache-control', `max-age=${maxAge}`);
    if (stale) reply.header('warning', '110 - "Response is Stale"');
    this.logger.debug(
      { key: cacheKeyForLog(key), stale, age: response.age },
      'Respons cache ditemukan',
    );
  }

  private serializeBody(data: unknown): string {
    if (data === undefined || data === null) return '';
    if (Buffer.isBuffer(data)) return data.toString('base64');
    if (typeof data === 'string') return Buffer.from(data).toString('base64');
    const json = JSON.stringify(data);
    return json === undefined ? '' : Buffer.from(json).toString('base64');
  }

  private parseBody(base64: string): unknown {
    if (base64.length === 0) return null;
    try {
      const decoded = Buffer.from(base64, 'base64').toString('utf8');
      try {
        return JSON.parse(decoded) as unknown;
      } catch {
        return decoded;
      }
    } catch {
      return null;
    }
  }

  private safeHeaders(
    raw: Readonly<Record<string, string | string[] | number | undefined>>,
  ): Record<string, string> {
    const result: Record<string, string> = {};
    for (const [name, value] of Object.entries(raw)) {
      if (value === undefined || CACHE_BLOCKED_HEADERS.has(name.toLowerCase())) continue;
      result[name.toLowerCase()] = Array.isArray(value) ? value.join(', ') : String(value);
    }
    return result;
  }
}
