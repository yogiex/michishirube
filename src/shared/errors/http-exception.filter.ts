import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { DomainError } from './domain-error.js';
import { ErrorCode, ErrorCodeValue } from './error-codes.js';
import { buildProblemDetails, buildUnknownProblem } from './error.factory.js';
import { ProblemDetailsDto } from './error-response.dto.js';

interface RequestWithContext extends FastifyRequest {
  requestId?: string;
  tenantId?: string;
  user?: { id?: string };
}

/**
 * Global exception filter.
 * - DomainError → ProblemDetails sesuai katalog.
 * - HttpException NestJS → mapped ke kode gateway.
 * - Unknown → GW_INTERNAL_ERROR.
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);
  private readonly isProduction = () => process.env.NODE_ENV === 'production';

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<FastifyReply>();
    const req = ctx.getRequest<RequestWithContext>();

    const requestId = this.resolveRequestId(req);
    const tenantId = req.tenantId;
    const traceId = this.resolveTraceId(req);
    const instance = req.originalUrl || req.url || '/';
    const isProduction = this.isProduction();

    // ─── 1. DomainError ────────────────────────────────
    if (exception instanceof DomainError) {
      const dto = buildProblemDetails(exception, {
        instance,
        requestId,
        tenantId,
        traceId,
        isProduction,
      });
      this.logDomainError(exception, dto, req);
      this.send(res, dto);
      return;
    }

    // ─── 2. HttpException ──────────────────────────────
    if (exception instanceof HttpException) {
      const mapped = this.mapHttpException(exception);
      const domain = new DomainError(mapped.code, mapped.message, {
        detail: mapped.detail,
      });
      const dto = buildProblemDetails(domain, {
        instance,
        requestId,
        tenantId,
        traceId,
        isProduction,
      });
      this.logHttpException(exception, dto, req);
      this.send(res, dto);
      return;
    }

    // ─── 3. Unknown ────────────────────────────────────
    const dto = buildUnknownProblem({
      error: exception,
      instance,
      requestId,
      tenantId,
      traceId,
      isProduction,
    });
    this.logUnknown(exception, dto, req);
    this.send(res, dto);
  }

  // ─── Helpers ─────────────────────────────────────────

  private send(res: FastifyReply, dto: ProblemDetailsDto): void {
    if (dto.retryAfter !== undefined && !res.getHeader('Retry-After')) {
      res.header('Retry-After', String(dto.retryAfter));
    }
    res.status(dto.status).send(dto);
  }

  private resolveRequestId(req: RequestWithContext): string {
    return (
      req.requestId ||
      (req.headers?.['x-request-id'] as string) ||
      'unknown'
    );
  }

  private resolveTraceId(req: RequestWithContext): string | undefined {
    const header = req.headers?.['traceparent'] as string | undefined;
    if (!header) return undefined;
    // W3C traceparent: 00-<trace-id>-<span-id>-<flags>
    const parts = header.split('-');
    return parts.length >= 4 ? parts[1] : undefined;
  }

  private mapHttpException(exception: HttpException): {
    code: ErrorCodeValue;
    message: string;
    detail?: string;
  } {
    const status = exception.getStatus();
    const response = exception.getResponse();
    const message =
      typeof response === 'string'
        ? response
        : (response as { message?: string | string[] }).message;

    const detail = Array.isArray(message) ? message.join(', ') : message;

    const map: Record<number, ErrorCodeValue> = {
      [HttpStatus.BAD_REQUEST]: ErrorCode.VALIDATION_FAILED,
      [HttpStatus.UNAUTHORIZED]: ErrorCode.AUTH_MISSING,
      [HttpStatus.FORBIDDEN]: ErrorCode.RBAC_FORBIDDEN,
      [HttpStatus.NOT_FOUND]: ErrorCode.ROUTE_NOT_FOUND,
      [HttpStatus.METHOD_NOT_ALLOWED]: ErrorCode.ROUTE_METHOD_NOT_ALLOWED,
      [HttpStatus.NOT_ACCEPTABLE]: ErrorCode.VALIDATION_ACCEPT,
      [HttpStatus.CONFLICT]: ErrorCode.IDEMP_CONFLICT,
      [HttpStatus.GONE]: ErrorCode.ROUTE_DEPRECATED,
      [HttpStatus.PAYLOAD_TOO_LARGE]: ErrorCode.VALIDATION_PAYLOAD_TOO_LARGE,
      [HttpStatus.UNSUPPORTED_MEDIA_TYPE]: ErrorCode.VALIDATION_CONTENT_TYPE,
      [HttpStatus.UNPROCESSABLE_ENTITY]: ErrorCode.OPS_INVALID_CONFIG,
      [HttpStatus.TOO_MANY_REQUESTS]: ErrorCode.RATE_LIMIT_EXCEEDED,
      [HttpStatus.NOT_IMPLEMENTED]: ErrorCode.INTERNAL_NOT_IMPLEMENTED,
      [HttpStatus.BAD_GATEWAY]: ErrorCode.UPSTREAM_ERROR,
      [HttpStatus.SERVICE_UNAVAILABLE]: ErrorCode.UPSTREAM_UNAVAILABLE,
      [HttpStatus.GATEWAY_TIMEOUT]: ErrorCode.UPSTREAM_TIMEOUT,
    };

    return {
      code: map[status] ?? ErrorCode.INTERNAL_ERROR,
      message: exception.message || 'Request failed',
      detail: typeof detail === 'string' ? detail : undefined,
    };
  }

  // ─── Logging ─────────────────────────────────────────

  private baseLog(dto: ProblemDetailsDto, req: RequestWithContext) {
    return {
      code: dto.code,
      status: dto.status,
      method: req.method,
      path: dto.instance,
      requestId: dto.requestId,
      tenantId: dto.tenantId,
      traceId: dto.traceId,
      userId: req.user?.id,
    };
  }

  private logDomainError(
    err: DomainError,
    dto: ProblemDetailsDto,
    req: RequestWithContext,
  ): void {
    const ctx = { ...this.baseLog(dto, req), detail: dto.detail };
    if (dto.status >= 500) {
      this.logger.error({ ...ctx, cause: err.cause }, err.message, err.stack);
    } else {
      this.logger.warn(ctx, err.message);
    }
  }

  private logHttpException(
    err: HttpException,
    dto: ProblemDetailsDto,
    req: RequestWithContext,
  ): void {
    const ctx = this.baseLog(dto, req);
    if (dto.status >= 500) {
      this.logger.error(ctx, err.message, err.stack);
    } else {
      this.logger.warn(ctx, err.message);
    }
  }

  private logUnknown(
    err: unknown,
    dto: ProblemDetailsDto,
    req: RequestWithContext,
  ): void {
    const ctx = this.baseLog(dto, req);
    if (err instanceof Error) {
      this.logger.error(ctx, err.message, err.stack);
    } else {
      this.logger.error({ ...ctx, raw: String(err) }, 'Unknown error');
    }
  }
}