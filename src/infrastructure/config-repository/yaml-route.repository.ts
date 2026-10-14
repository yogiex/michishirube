import { Injectable, Logger, type OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { parse } from 'yaml';
import { z } from 'zod';
import { InternalConfigError } from '@/shared/errors/index.js';
import type { RouteRepositoryPort } from '@/core/routing/domain/route.repository.port.js';
import { RouteMethodSchema, type Route } from '@/core/routing/domain/route.entity.js';
import { matchPath } from '@/core/routing/domain/path-matcher.js';

export const DEFAULT_ROUTES_FILE = './config/routes.yaml';

const RouteSchema = z.object({
  id: z
    .string()
    .min(1)
    .max(64)
    .regex(/^[a-zA-Z0-9_-]+$/),
  path: z.string().min(1).max(512).startsWith('/'),
  method: RouteMethodSchema,
  upstream: z
    .string()
    .url()
    .refine((u) => u.startsWith('http://') || u.startsWith('https://'), 'harus http/https'),
  enabled: z.boolean(),
  disabledReason: z.string().max(256).optional(),
  requireAuth: z.boolean(),
  requireIdempotency: z.boolean(),
  roles: z.array(z.string().max(64)).max(32),
  rateLimit: z
    .object({
      limit: z.number().int().positive(),
      windowSec: z.number().int().positive(),
    })
    .optional(),
  timeoutMs: z.number().int().min(100).max(60_000),
  tenantId: z.string().max(128).optional(),
  tenantIds: z.array(z.string().max(128)).max(100).optional(),
  tenants: z.array(z.string().max(128)).max(100).optional(),
  allowedTenants: z.array(z.string().max(128)).max(100).optional(),
});

const RoutesFileSchema = z.object({
  routes: z.array(RouteSchema),
});

type RouteRaw = z.infer<typeof RouteSchema>;

@Injectable()
export class YamlRouteRepository implements RouteRepositoryPort, OnModuleInit {
  private readonly logger = new Logger(YamlRouteRepository.name);
  private routes: readonly Route[] = [];

  constructor(private readonly config: ConfigService) {}

  async onModuleInit(): Promise<void> {
    await this.reload();
  }

  async findAll(tenantId?: string): Promise<readonly Route[]> {
    const filtered =
      tenantId === undefined
        ? this.routes
        : this.routes.filter((route) => this.allowsTenant(route, tenantId));
    return filtered;
  }

  async findByPath(path: string, tenantId?: string): Promise<readonly Route[]> {
    const source =
      tenantId === undefined
        ? this.routes
        : this.routes.filter((route) => this.allowsTenant(route, tenantId));
    return source.filter((route) => matchPath(route.path, path).matched);
  }

  async findByTenant(tenantId: string): Promise<readonly Route[]> {
    return this.findAll(tenantId);
  }

  private allowsTenant(route: Route, tenantId: string): boolean {
    const allowed =
      route.tenantId !== undefined
        ? [route.tenantId]
        : (route.tenantIds ?? route.tenants ?? route.allowedTenants ?? []);
    if (allowed.length === 0) return true;
    return allowed.includes(tenantId);
  }

  async reload(): Promise<void> {
    const filePath = this.config.get<string>('routes.filePath') ?? DEFAULT_ROUTES_FILE;
    const abs = resolve(process.cwd(), filePath);

    const raw = await this.readSource(abs, filePath);
    const parsed = this.parseYaml(raw, abs);
    const validated = RoutesFileSchema.safeParse(parsed);
    if (!validated.success) {
      throw new InternalConfigError('Skema routes.yaml tidak valid', {
        fieldErrors: validated.error.issues.map((i) => ({
          field: i.path.join('.'),
          code: i.code,
          message: i.message,
        })),
      });
    }

    const routes = this.index(validated.data.routes);
    this.routes = routes;
    this.logger.log({ count: routes.length, filePath }, 'Routes loaded');
  }

  private async readSource(abs: string, filePath: string): Promise<string> {
    try {
      return await readFile(abs, 'utf8');
    } catch (cause) {
      throw new InternalConfigError('File routes tidak bisa dibaca', {
        meta: { filePath },
        cause,
      });
    }
  }

  private parseYaml(raw: string, abs: string): unknown {
    try {
      return parse(raw) as unknown;
    } catch (cause) {
      throw new InternalConfigError('YAML routes tidak valid', {
        meta: { filePath: abs },
        cause,
      });
    }
  }

  private index(rows: readonly RouteRaw[]): readonly Route[] {
    const seen = new Set<string>();
    const routes: Route[] = [];

    for (const row of rows) {
      if (seen.has(row.id)) {
        throw new InternalConfigError(`Route id duplikat: ${row.id}`);
      }
      seen.add(row.id);
      routes.push(this.toEntity(row));
    }

    return routes;
  }

  private toEntity(raw: RouteRaw): Route {
    return {
      id: raw.id,
      path: raw.path,
      method: raw.method,
      upstream: raw.upstream,
      enabled: raw.enabled,
      disabledReason: raw.disabledReason,
      requireAuth: raw.requireAuth,
      requireIdempotency: raw.requireIdempotency,
      roles: raw.roles,
      rateLimit: raw.rateLimit,
      timeoutMs: raw.timeoutMs,
      createdAt: new Date().toISOString(),
      tenantId: raw.tenantId,
      tenantIds: raw.tenantIds,
      tenants: raw.tenants,
      allowedTenants: raw.allowedTenants,
    };
  }
}
