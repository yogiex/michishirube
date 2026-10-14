import { createHash } from 'node:crypto';
import { CanActivate, Injectable, Logger, Optional, type ExecutionContext } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import type { AppConfig } from '@/config/configuration.js';
import { OpsForbiddenError } from '@/shared/errors/index.js';

interface ConfigLike {
  get(key: string): unknown;
}

export interface IpAllowlistGuardOptions {
  readonly allowlist?: string | readonly string[];
  readonly ipAllowlist?: string | readonly string[];
  readonly trustedProxies?: boolean | string;
  readonly nodeEnv?: string;
}

type TrustedInput = boolean | string | undefined;

function parseBoolean(value: TrustedInput): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    return normalized === 'true' || normalized === '1' || normalized === 'yes';
  }
  return false;
}

function normalizeIp(value: unknown): string {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (trimmed.toLowerCase().startsWith('::ffff:')) {
    const rest = trimmed.slice(7);
    if (isIpv4(rest)) return rest;
  }
  return trimmed;
}

function isIpv4(value: string): boolean {
  const parts = value.split('.');
  if (parts.length !== 4) return false;
  return parts.every((part) => {
    if (!/^\d{1,3}$/.test(part)) return false;
    const num = Number(part);
    return num >= 0 && num <= 255;
  });
}

function ipv4ToNumber(value: string): number | null {
  if (!isIpv4(value)) return null;
  const parts = value.split('.').map(Number);
  return (((parts[0] << 24) >>> 0) + (parts[1] << 16) + (parts[2] << 8) + parts[3]) >>> 0;
}

function parseIpv6(value: string): bigint | null {
  let input = value.split('%')[0].trim();
  if (input === '') return null;

  if (input.includes('.')) {
    const lastColon = input.lastIndexOf(':');
    if (lastColon < 0) return null;
    const ipv4Part = input.slice(lastColon + 1);
    const ipv4Number = ipv4ToNumber(ipv4Part);
    if (ipv4Number === null) return null;
    const high = (ipv4Number >>> 16) & 0xffff;
    const low = ipv4Number & 0xffff;
    input = `${input.slice(0, lastColon)}:${high.toString(16)}:${low.toString(16)}`;
  }

  let segments: string[];
  if (input.includes('::')) {
    const halves = input.split('::');
    if (halves.length > 2) return null;
    const left = halves[0] === '' ? [] : halves[0].split(':');
    const right = halves[1] === '' ? [] : halves[1].split(':');
    const missing = 8 - left.length - right.length;
    if (missing < 0) return null;
    segments = [...left, ...Array.from({ length: missing }, () => '0'), ...right];
  } else {
    segments = input.split(':');
  }

  if (segments.length !== 8) return null;
  let result = 0n;
  for (const segment of segments) {
    if (!/^[0-9a-fA-F]{1,4}$/.test(segment)) return null;
    result = (result << 16n) + BigInt(`0x${segment}`);
  }
  return result;
}

function inIpv4Cidr(network: string, prefix: number, ip: string): boolean {
  const net = ipv4ToNumber(network);
  const addr = ipv4ToNumber(ip);
  if (net === null || addr === null) return false;
  if (prefix === 0) return true;
  if (prefix > 32) return false;
  const mask = (0xffffffff << (32 - prefix)) >>> 0;
  return (net & mask) === (addr & mask);
}

function inIpv6Cidr(network: string, prefix: number, ip: string): boolean {
  const net = parseIpv6(network);
  const addr = parseIpv6(ip);
  if (net === null || addr === null) return false;
  if (prefix < 0 || prefix > 128) return false;
  if (prefix === 0) return true;
  const shift = 128 - prefix;
  return net >> BigInt(shift) === addr >> BigInt(shift);
}

export function parseIpAllowlist(value: unknown): readonly string[] {
  const entries: string[] = [];
  if (Array.isArray(value)) {
    value.forEach((entry) => {
      if (typeof entry === 'string') entries.push(entry.trim());
    });
  } else if (typeof value === 'string') {
    value.split(',').forEach((entry) => entries.push(entry.trim()));
  }
  return entries
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0)
    .map((entry) => normalizeIp(entry));
}

function splitCidr(entry: string): { network: string; prefix: number } | null {
  if (!entry.includes('/')) return null;
  const [network, prefixText] = entry.split('/');
  const prefix = Number(prefixText);
  if (!Number.isInteger(prefix)) return null;
  return { network: normalizeIp(network), prefix };
}

export function ipMatchesAllowlist(
  clientIp: string,
  allowlist: string | readonly string[],
): boolean {
  const target = normalizeIp(clientIp);
  const entries = parseIpAllowlist(allowlist);
  if (entries.length === 0) return false;
  return entries.some((entry) => {
    const cidr = splitCidr(entry);
    if (cidr) {
      const isV6 = entry.includes(':');
      return isV6
        ? inIpv6Cidr(cidr.network, cidr.prefix, target)
        : inIpv4Cidr(cidr.network, cidr.prefix, target);
    }
    return entry === target;
  });
}

export const isIpAllowed = ipMatchesAllowlist;
export const matchIpAllowlist = ipMatchesAllowlist;
export { normalizeIp };

export function maskIp(value: string): string {
  const ip = normalizeIp(value);
  if (isIpv4(ip)) {
    const parts = ip.split('.');
    return `${parts[0]}.${parts[1]}.*.*`;
  }
  return ip.length > 8 ? `${ip.slice(0, 8)}...` : ip;
}

@Injectable()
export class IpAllowlistGuard implements CanActivate {
  private readonly logger = new Logger(IpAllowlistGuard.name);
  private readonly allowlistRaw: unknown;
  private readonly trustedProxies: boolean;
  private readonly nodeEnv: string;

  constructor(
    @Optional()
    first?: ConfigService<AppConfig, true> | string | IpAllowlistGuardOptions,
    ...rest: unknown[]
  ) {
    if (typeof first === 'string') {
      this.allowlistRaw = first;
      this.trustedProxies = parseBoolean(rest[0] as TrustedInput);
      this.nodeEnv = String(rest[1] ?? process.env.NODE_ENV ?? 'development');
      return;
    }

    if (
      first !== null &&
      first !== undefined &&
      typeof first === 'object' &&
      'get' in first &&
      typeof (first as ConfigLike).get === 'function'
    ) {
      const config = first as ConfigLike;
      this.allowlistRaw = this.readConfig(config, [
        'admin.ipAllowlist',
        'admin.ip_allowlist',
        'ipAllowlist',
        'ip_allowlist',
        'metrics.ipAllowlist',
      ]);
      this.trustedProxies = parseBoolean(
        this.readConfig(config, [
          'admin.trustedProxies',
          'admin.trusted_proxies',
          'trustedProxies',
          'trusted_proxies',
          'TRUSTED_PROXIES',
        ]) as TrustedInput,
      );
      const envValue = this.readConfig(config, ['app.env', 'NODE_ENV']);
      this.nodeEnv = String(envValue ?? process.env.NODE_ENV ?? 'development');
      return;
    }

    if (first !== null && first !== undefined && typeof first === 'object') {
      const options = first as IpAllowlistGuardOptions;
      this.allowlistRaw = options.allowlist ?? options.ipAllowlist ?? '';
      this.trustedProxies = parseBoolean(options.trustedProxies as TrustedInput);
      this.nodeEnv = options.nodeEnv ?? process.env.NODE_ENV ?? 'development';
      return;
    }

    this.allowlistRaw =
      process.env.ADMIN_IP_ALLOWLIST ??
      process.env.IP_ALLOWLIST ??
      process.env.METRICS_IP_ALLOWLIST ??
      '';
    this.trustedProxies = parseBoolean(process.env.TRUSTED_PROXIES);
    this.nodeEnv = process.env.NODE_ENV ?? 'development';
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() !== 'http') return true;

    const req = context.switchToHttp().getRequest<Record<string, unknown>>();
    const candidatePaths = [
      req.url,
      req.path,
      req.originalUrl,
      (req.route as { path?: unknown } | undefined)?.path,
    ];
    const path =
      candidatePaths
        .map((value) => (typeof value === 'string' ? value : ''))
        .find((value) => value.length > 0) ?? '';
    const normalizedPath = path.split('?')[0].toLowerCase();
    const isAdmin = normalizedPath === '/admin' || normalizedPath.startsWith('/admin/');
    if (!isAdmin) return true;

    const clientIp = this.extractClientIp(req);
    const entries = parseIpAllowlist(this.allowlistRaw);

    if (entries.length === 0) {
      if (this.nodeEnv === 'production') {
        this.logDenied(clientIp, normalizedPath);
        throw new OpsForbiddenError('IP not allowlisted');
      }
      return true;
    }

    if (ipMatchesAllowlist(clientIp, entries)) return true;

    this.logDenied(clientIp, normalizedPath);
    throw new OpsForbiddenError('IP not allowlisted');
  }

  private extractClientIp(req: Record<string, unknown>): string {
    const socket = req.socket as { remoteAddress?: unknown } | undefined;
    const raw = req.raw as { socket?: { remoteAddress?: unknown } } | undefined;
    let ip: unknown =
      socket?.remoteAddress ??
      raw?.socket?.remoteAddress ??
      req.ip ??
      (req.connection as { remoteAddress?: unknown } | undefined)?.remoteAddress ??
      'unknown';

    if (this.trustedProxies) {
      const headers = req.headers as Record<string, unknown> | undefined;
      const forwarded = headers?.['x-forwarded-for'];
      const first =
        typeof forwarded === 'string'
          ? forwarded.split(',')[0]
          : Array.isArray(forwarded)
            ? String(forwarded[0]).split(',')[0]
            : undefined;
      if (typeof first === 'string' && first.trim().length > 0) {
        ip = first.trim();
      }
    }

    return normalizeIp(String(ip));
  }

  private readConfig(config: ConfigLike, keys: readonly string[]): unknown {
    for (const key of keys) {
      try {
        const value = config.get(key);
        if (value !== undefined && value !== null) return value;
      } catch {
        // ignore unsupported config shapes
      }
    }
    return undefined;
  }

  private logDenied(clientIp: string, path: string): void {
    const ipHash = createHash('sha256').update(clientIp).digest('hex').slice(0, 12);
    this.logger.warn(
      {
        ipHash,
        ipMasked: maskIp(clientIp),
        path,
        msg: 'IP allowlist denied',
      },
      'IP allowlist denied',
    );
  }
}
