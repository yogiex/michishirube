import { createHash } from 'node:crypto';
import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { finalize, from, map, switchMap, throwError } from 'rxjs';
import type { Principal } from '@/core/auth/domain/principal.entity.js';
import { RequestContextHolder } from '@/shared/context/request-context.js';
import { HEADERS } from '@/shared/constants/headers.js';
import {
  IDEMPOTENT_KEY,
  type IdempotencyOptions,
} from '@/shared/decorators/idempotent.decorator.js';

export const IDEMPOTENCY_STORE = Symbol('IDEMPOTENCY_STORE');
export const IDEMPOTENCY_AUDIT = Symbol('IDEMPOTENCY_AUDIT');

export type IdempotencyState = 'in_progress' | 'completed';

export interface IdempotencyRecord {
  readonly state: IdempotencyState;
  readonly payloadHash: string;
  readonly statusCode?: number;
  readonly body?: unknown;
  readonly headers?: Readonly<Record<string, string>>;
}

export interface IdempotencyStore {
  claim(
    key: string,
    payloadHash: string,
    ttlSeconds: number,
  ): Promise<IdempotencyRecord | undefined>;
  complete(key: string, record: IdempotencyRecord, ttlSeconds: number): Promise<void>;
  abort(key: string): Promise<void>;
}

export interface IdempotencyAuditEvent {
  readonly action: 'replay' | 'in_progress' | 'conflict' | 'complete' | 'abort';
  readonly keyHash: string;
  readonly tenantId: string;
  readonly userId?: string;
  readonly requestId?: string;
  readonly payloadHash: string;
  readonly responseBytes?: number;
  readonly statusCode?: number;
}

export interface IdempotencyAudit {
  record(event: IdempotencyAuditEvent): void | Promise<void>;
}

interface IdempotentRequest {
  readonly method: string;
  readonly url: string;
  readonly headers: Readonly<Record<string, string | string[] | undefined>>;
  readonly body?: unknown;
  readonly user?: Principal;
}

interface IdempotentResponse {
  statusCode: number;
  body: unknown;
  headers: Record<string, string>;
}

interface HttpResponse {
  header(name: string, value: string): unknown;
  statusCode?: number;
  status?(code: number): unknown;
}

const DEFAULT_TTL_SECONDS = 86_400;
const DEFAULT_MAX_RESPONSE_BYTES = 1_048_576;
const SAFE_REPLAY_HEADERS = new Set(['content-type', 'cache-control', 'etag', 'location']);
const FORBIDDEN_REPLAY_HEADERS = new Set([
  'authorization',
  'cookie',
  'set-cookie',
  'x-tenant-id',
  'x-user-id',
  'x-forwarded-for',
  'x-forwarded-host',
  'x-real-ip',
  'host',
  'connection',
  'content-length',
  'transfer-encoding',
]);

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  private readonly logger = new Logger(IdempotencyInterceptor.name);

  constructor(
    private readonly reflector: Reflector,
    @Inject(IDEMPOTENCY_STORE) private readonly store: IdempotencyStore,
    @Inject(IDEMPOTENCY_AUDIT) private readonly audit: IdempotencyAudit,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') return next.handle();
    const options = this.reflector.getAllAndOverride<IdempotencyOptions>(IDEMPOTENT_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!options) return next.handle();

    const request = context.switchToHttp().getRequest<IdempotentRequest>();
    const response = context.switchToHttp().getResponse<HttpResponse>();
    const tenantId = request.user?.tenantId ?? RequestContextHolder.getTenantId();
    if (!tenantId || !request.user) {
      throw new UnauthorizedException('Authenticated tenant is required for idempotent requests');
    }
    const key = this.getKey(request);
    const payloadHash = this.hash(
      JSON.stringify({ method: request.method, path: request.url, body: request.body ?? null }),
    );
    const keyHash = this.hash(`${tenantId}:${key}`);
    const ttlSeconds = options.ttlSeconds ?? DEFAULT_TTL_SECONDS;
    const maxResponseBytes = options.maxResponseBytes ?? DEFAULT_MAX_RESPONSE_BYTES;

    return from(this.store.claim(keyHash, payloadHash, ttlSeconds)).pipe(
      switchMap((record) =>
        this.handleClaim(
          record,
          keyHash,
          payloadHash,
          tenantId,
          request,
          response,
          next,
          ttlSeconds,
          maxResponseBytes,
        ),
      ),
    );
  }

  private handleClaim(
    record: IdempotencyRecord | undefined,
    keyHash: string,
    payloadHash: string,
    tenantId: string,
    request: IdempotentRequest,
    response: HttpResponse,
    next: CallHandler,
    ttlSeconds: number,
    maxResponseBytes: number,
  ): Observable<unknown> {
    if (!record)
      return this.execute(next, keyHash, payloadHash, tenantId, ttlSeconds, maxResponseBytes);
    if (record.payloadHash !== payloadHash) {
      return throwError(
        () => new ConflictException('Idempotency key was used with a different payload'),
      );
    }
    if (record.state === 'in_progress') {
      return throwError(() => new ConflictException('Idempotent request is still in progress'));
    }
    this.setHeaders(response, record.headers ?? {});
    if (record.statusCode !== undefined) {
      if (response.statusCode !== undefined) response.statusCode = record.statusCode;
      else response.status?.(record.statusCode);
    }
    this.auditRecord({
      action: 'replay',
      keyHash,
      tenantId,
      userId: request.user?.userId,
      payloadHash,
      responseBytes: this.size(record.body),
      statusCode: record.statusCode,
    });
    return new Observable<unknown>((subscriber) => {
      subscriber.next(record.body);
      subscriber.complete();
    });
  }

  private execute(
    next: CallHandler,
    keyHash: string,
    payloadHash: string,
    tenantId: string,
    ttlSeconds: number,
    maxResponseBytes: number,
  ): Observable<unknown> {
    let completed = false;
    return next.handle().pipe(
      map((body) => {
        const response = this.toResponse(body);
        const responseBytes = this.size(response.body);
        if (responseBytes > maxResponseBytes) {
          this.abortAndAudit(keyHash, payloadHash, tenantId);
          return body;
        }
        completed = true;
        void this.store
          .complete(
            keyHash,
            {
              state: 'completed',
              payloadHash,
              statusCode: response.statusCode,
              body: response.body,
              headers: response.headers,
            },
            ttlSeconds,
          )
          .catch((error: unknown) => this.logFailure(error));
        this.auditRecord({
          action: 'complete',
          keyHash,
          tenantId,
          payloadHash,
          responseBytes,
          statusCode: response.statusCode,
        });
        return body;
      }),
      finalize(() => {
        if (!completed)
          void this.store.abort(keyHash).catch((error: unknown) => this.logFailure(error));
      }),
    );
  }

  private abortAndAudit(keyHash: string, payloadHash: string, tenantId: string): void {
    void this.store.abort(keyHash).catch((error: unknown) => this.logFailure(error));
    this.auditRecord({ action: 'abort', keyHash, tenantId, payloadHash });
  }

  private getKey(request: IdempotentRequest): string {
    const raw = request.headers[HEADERS.IDEMPOTENCY_KEY];
    if (typeof raw !== 'string' || raw.length < 1 || raw.length > 128) {
      throw new ConflictException('A valid Idempotency-Key header is required');
    }
    return raw;
  }

  private hash(value: string): string {
    return createHash('sha256').update(value).digest('hex');
  }
  private size(value: unknown): number {
    const serialized = JSON.stringify(value);
    return serialized === undefined ? 0 : Buffer.byteLength(serialized);
  }
  private toResponse(body: unknown): IdempotentResponse {
    if (typeof body !== 'object' || body === null || !('statusCode' in body))
      return { statusCode: 200, body, headers: {} };
    const value = body as { statusCode?: unknown; body?: unknown; headers?: unknown };
    return {
      statusCode: typeof value.statusCode === 'number' ? value.statusCode : 200,
      body: value.body ?? body,
      headers: this.safeHeaders(value.headers),
    };
  }
  private safeHeaders(raw: unknown): Record<string, string> {
    if (typeof raw !== 'object' || raw === null) return {};
    const result: Record<string, string> = {};
    for (const [key, value] of Object.entries(raw)) {
      const normalized = key.toLowerCase();
      if (
        !SAFE_REPLAY_HEADERS.has(normalized) ||
        FORBIDDEN_REPLAY_HEADERS.has(normalized) ||
        typeof value !== 'string'
      )
        continue;
      result[normalized] = value;
    }
    return result;
  }
  private setHeaders(response: HttpResponse, headers: Readonly<Record<string, string>>): void {
    for (const [name, value] of Object.entries(headers)) response.header(name, value);
  }
  private auditRecord(event: IdempotencyAuditEvent): void {
    void Promise.resolve(this.audit.record(event)).catch((error: unknown) =>
      this.logFailure(error),
    );
  }
  private logFailure(error: unknown): void {
    this.logger.warn({ err: error }, 'Idempotency operation failed');
  }
}
