import { createHash } from 'node:crypto';
import {
  Inject,
  Injectable,
  Logger,
  Optional,
  UnauthorizedException,
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, of } from 'rxjs';
import { catchError, finalize, from, map, switchMap, throwError } from 'rxjs';

import type { Principal } from '@/core/auth/domain/principal.entity.js';
import { BeginIdempotentRequestUseCase } from '@/core/idempotency/application/begin-idempotent-request.usecase.js';
import { CompleteIdempotentRequestUseCase } from '@/core/idempotency/application/complete-idempotent-request.usecase.js';
import { RequestContextHolder } from '@/shared/context/request-context.js';
import { HEADERS } from '@/shared/constants/headers.js';
import {
  DomainError,
  IdempotencyInProgressError,
  IdempotencyKeyInvalidError,
  IdempotencyKeyMissingError,
  IdempotencyStoreUnavailableError,
  InternalDependencyError,
} from '@/shared/errors/index.js';
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
  readonly statusCode: number;
  readonly body: unknown;
  readonly headers: Record<string, string>;
}

interface HttpResponse {
  header(name: string, value: string): unknown;
  statusCode?: number;
  status?(code: number): unknown;
}

const DEFAULT_TTL_SECONDS = 86_400;
const DEFAULT_MAX_RESPONSE_BYTES = 1_048_576;
const IDEMPOTENCY_KEY_PATTERN = /^[A-Za-z0-9_-]{16,128}$/;
const SAFE_REPLAY_HEADERS = new Set<string>(['content-type', 'cache-control', 'etag', 'location']);
const FORBIDDEN_REPLAY_HEADERS = new Set<string>([
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
    private readonly begin: BeginIdempotentRequestUseCase,
    private readonly complete: CompleteIdempotentRequestUseCase,
    @Optional() @Inject(IDEMPOTENCY_AUDIT) private readonly audit?: IdempotencyAudit,
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

    const rawKey = this.getKey(request);

    const payloadHash = this.hashPayload(request);
    const scopedKey = this.hash(`${tenantId}:${request.method}:${request.url}:${rawKey}`);
    const ttlSeconds = options.ttlSeconds ?? DEFAULT_TTL_SECONDS;
    const maxResponseBytes = options.maxResponseBytes ?? DEFAULT_MAX_RESPONSE_BYTES;

    return from(
      this.begin.execute({
        key: scopedKey,
        tenantId,
        requestHash: payloadHash,
        ttlSeconds,
      }),
    ).pipe(
      switchMap((result) => {
        if (result.kind === 'replay') {
          return this.handleReplay(
            result.response,
            tenantId,
            request,
            payloadHash,
            scopedKey,
            response,
          );
        }
        if (result.kind === 'in_progress') {
          this.auditRecord({
            action: 'in_progress',
            keyHash: scopedKey,
            tenantId,
            userId: request.user?.userId,
            payloadHash,
          });
          throw new IdempotencyInProgressError('Permintaan idempotent masih diproses', {
            retryAfter: result.retryAfter,
          });
        }
        return this.execute(
          next,
          response,
          scopedKey,
          payloadHash,
          tenantId,
          request,
          ttlSeconds,
          maxResponseBytes,
        );
      }),
      catchError((cause: unknown) => throwError(() => this.toSafeError(cause))),
    );
  }

  private handleReplay(
    stored: unknown,
    tenantId: string,
    request: IdempotentRequest,
    payloadHash: string,
    scopedKey: string,
    response: HttpResponse,
  ): Observable<unknown> {
    const isWrapper =
      typeof stored === 'object' &&
      stored !== null &&
      ('statusCode' in stored || 'headers' in stored || 'body' in stored);
    const wrapper = isWrapper ? this.extractStoredResponse(stored) : undefined;
    const statusCode = wrapper?.statusCode ?? 200;
    const headers = this.safeHeaders(wrapper?.headers);
    const body = wrapper ? wrapper.body : stored;

    this.setHeaders(response, headers);
    if (response.statusCode !== undefined) {
      response.statusCode = statusCode;
    } else {
      response.status?.(statusCode);
    }

    this.auditRecord({
      action: 'replay',
      keyHash: scopedKey,
      tenantId,
      userId: request.user?.userId,
      payloadHash,
      responseBytes: this.size(body),
      statusCode,
    });

    return of(body);
  }

  private execute(
    next: CallHandler,
    response: HttpResponse,
    scopedKey: string,
    payloadHash: string,
    tenantId: string,
    request: IdempotentRequest,
    ttlSeconds: number,
    maxResponseBytes: number,
  ): Observable<unknown> {
    let completed = false;

    return next.handle().pipe(
      map((body: unknown) => {
        const responseWrapper = this.toResponse(body);
        const responseBytes = this.size(responseWrapper.body);

        if (responseBytes > maxResponseBytes) {
          this.auditRecord({
            action: 'abort',
            keyHash: scopedKey,
            tenantId,
            userId: request.user?.userId,
            payloadHash,
            responseBytes,
            statusCode: responseWrapper.statusCode,
          });
          return body;
        }

        completed = true;
        void this.complete
          .execute({
            key: scopedKey,
            tenantId,
            response: {
              statusCode: responseWrapper.statusCode,
              headers: responseWrapper.headers,
              body: responseWrapper.body,
            },
          })
          .catch((error: unknown) => this.logFailure(error));

        this.auditRecord({
          action: 'complete',
          keyHash: scopedKey,
          tenantId,
          userId: request.user?.userId,
          payloadHash,
          responseBytes,
          statusCode: responseWrapper.statusCode,
        });

        return body;
      }),
      finalize(() => {
        if (!completed) {
          this.auditRecord({
            action: 'abort',
            keyHash: scopedKey,
            tenantId,
            userId: request.user?.userId,
            payloadHash,
          });
        }
      }),
    );
  }

  private getKey(request: IdempotentRequest): string {
    const rawHeader = request.headers[HEADERS.IDEMPOTENCY_KEY];
    if (typeof rawHeader !== 'string') {
      if (rawHeader === undefined) {
        throw new IdempotencyKeyMissingError('Idempotency-Key header is required');
      }
      throw new IdempotencyKeyInvalidError('A valid Idempotency-Key header is required');
    }
    if (!IDEMPOTENCY_KEY_PATTERN.test(rawHeader)) {
      throw new IdempotencyKeyInvalidError('A valid Idempotency-Key header is required');
    }
    return rawHeader;
  }

  private hashPayload(request: IdempotentRequest): string {
    return this.hash(
      JSON.stringify({
        method: request.method,
        path: request.url,
        body: request.body ?? null,
      }),
    );
  }

  private hash(value: string): string {
    return createHash('sha256').update(value).digest('hex');
  }

  private size(value: unknown): number {
    const serialized = JSON.stringify(value);
    return serialized === undefined ? 0 : Buffer.byteLength(serialized);
  }

  private toResponse(body: unknown): IdempotentResponse {
    if (typeof body !== 'object' || body === null || !('statusCode' in body)) {
      return { statusCode: 200, body, headers: {} };
    }
    const value = body as { statusCode?: unknown; body?: unknown; headers?: unknown };
    return {
      statusCode: typeof value.statusCode === 'number' ? value.statusCode : 200,
      body: value.body ?? body,
      headers: this.safeHeaders(value.headers),
    };
  }

  private extractStoredResponse(
    stored: unknown,
  ): { statusCode: number; headers: unknown; body: unknown } | undefined {
    if (typeof stored !== 'object' || stored === null) return undefined;
    const value = stored as { statusCode?: unknown; headers?: unknown; body?: unknown };
    return {
      statusCode: typeof value.statusCode === 'number' ? value.statusCode : 200,
      headers: value.headers,
      body: value.body,
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
      ) {
        continue;
      }
      result[normalized] = value;
    }
    return result;
  }

  private setHeaders(response: HttpResponse, headers: Readonly<Record<string, string>>): void {
    for (const [name, value] of Object.entries(headers)) {
      response.header(name, value);
    }
  }

  private auditRecord(event: IdempotencyAuditEvent): void {
    if (!this.audit) return;
    try {
      void Promise.resolve(this.audit.record(event)).catch((error: unknown) =>
        this.logFailure(error),
      );
    } catch (error: unknown) {
      this.logFailure(error);
    }
  }

  private toSafeError(cause: unknown): Error {
    if (cause instanceof DomainError) {
      this.logger.warn({ err: cause }, 'Idempotency domain error');
      return cause;
    }
    if (cause instanceof Error) {
      this.logger.error({ err: cause }, 'Unexpected idempotency error');
      return new IdempotencyStoreUnavailableError('Idempotency store tidak tersedia', { cause });
    }
    this.logger.error({ err: cause }, 'Unexpected idempotency error');
    return new InternalDependencyError('Idempotency dependency unavailable', { cause });
  }

  private logFailure(error: unknown): void {
    this.logger.warn({ err: error }, 'Idempotency operation failed');
  }
}
