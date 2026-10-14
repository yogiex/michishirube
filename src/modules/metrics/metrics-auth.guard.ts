import { timingSafeEqual } from 'node:crypto';
import { CanActivate, Injectable, Logger, type ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { FastifyRequest } from 'fastify';
import type { AppConfig } from '@/config/configuration.js';
import { RbacForbiddenError } from '@/shared/errors/index.js';

export interface MetricsAccessInput {
  readonly token: string;
  readonly ipAllowlist: string;
  readonly clientIp: string;
  readonly providedToken: string | undefined;
}

export function isMetricsAccessAllowed(input: MetricsAccessInput): boolean {
  const allowlist = parseAllowlist(input.ipAllowlist);
  if (input.token.length === 0 && allowlist.length === 0) return true;
  const ip = normalizeIp(input.clientIp);
  if (allowlist.includes(ip)) return true;
  return input.providedToken !== undefined && safeEqual(input.providedToken, input.token);
}

@Injectable()
export class MetricsAuthGuard implements CanActivate {
  private readonly logger = new Logger(MetricsAuthGuard.name);

  constructor(private readonly config: ConfigService<AppConfig, true>) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const token = this.config.get<string>('metrics.token', { infer: true }) ?? '';
    const ipAllowlist = this.config.get<string>('metrics.ipAllowlist', { infer: true }) ?? '';
    const providedToken = firstHeader(request.headers['x-metrics-token']);
    const clientIp = request.ip;
    const allowed = isMetricsAccessAllowed({ token, ipAllowlist, clientIp, providedToken });
    if (allowed) return true;

    this.logger.warn({ clientIp, hasToken: providedToken !== undefined }, 'Metrics access denied');
    throw new RbacForbiddenError('Metrics access denied');
  }
}

function firstHeader(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    const first = value[0];
    return typeof first === 'string' ? first : undefined;
  }
  return value;
}

function parseAllowlist(value: string): readonly string[] {
  return value
    .split(',')
    .map((entry) => normalizeIp(entry.trim()))
    .filter((entry) => entry.length > 0);
}

function normalizeIp(value: string): string {
  return value.startsWith('::ffff:') ? value.slice(7) : value;
}

function safeEqual(provided: string, expected: string): boolean {
  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);
  if (providedBuffer.length !== expectedBuffer.length) return false;
  return timingSafeEqual(providedBuffer, expectedBuffer);
}
