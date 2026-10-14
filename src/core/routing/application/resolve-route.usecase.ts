import { Inject, Injectable, Logger } from '@nestjs/common';
import { RouteNotFoundError, RouteDisabledError } from '@/shared/errors/index.js';
import { matchPath, type PathMatchResult } from '../domain/path-matcher.js';
import { ROUTE_REPOSITORY, type RouteRepositoryPort } from '../domain/route.repository.port.js';
import type { Route } from '../domain/route.entity.js';

export interface ResolveRouteInput {
  readonly path: string;
  readonly method: string;
  readonly tenantId?: string;
  readonly tenant?: string;
}

export interface ResolvedRoute {
  readonly route: Route;
  readonly params: Readonly<Record<string, string>>;
  readonly wildcard?: string;
}

function scoreRoute(route: Route): number {
  const segs = route.path.split('/').filter(Boolean);
  let score = segs.length * 100;
  for (const s of segs) {
    if (s === '*') score -= 1000;
    else if (s.startsWith(':')) score -= 10;
    else score += 5;
  }
  if (route.method !== 'ALL') score += 50;
  return score;
}

@Injectable()
export class ResolveRouteUseCase {
  private readonly logger = new Logger(ResolveRouteUseCase.name);

  constructor(@Inject(ROUTE_REPOSITORY) private readonly routes: RouteRepositoryPort) {}

  private allowsTenant(route: Route, tenantId: string | undefined): boolean {
    if (!tenantId) return true;
    const allowed: readonly string[] =
      route.tenantId !== undefined
        ? [route.tenantId]
        : (route.tenantIds ?? route.tenants ?? route.allowedTenants ?? []);
    if (allowed.length === 0) return true;
    return allowed.includes(tenantId);
  }

  async execute(input: ResolveRouteInput): Promise<ResolvedRoute> {
    const method = input.method.toUpperCase();
    const tenantId = input.tenantId ?? input.tenant;

    let source: readonly Route[];
    if (typeof this.routes.findByPath === 'function') {
      source = await this.routes.findByPath(input.path, tenantId);
    } else {
      source = await this.routes.findAll(tenantId);
    }

    const candidates: Array<{ route: Route; match: PathMatchResult }> = [];

    for (const route of source) {
      if (!this.allowsTenant(route, tenantId)) continue;
      if (route.method !== 'ALL' && route.method !== method) continue;
      const match = matchPath(route.path, input.path);
      if (!match.matched) continue;
      candidates.push({ route, match });
    }

    if (candidates.length === 0) {
      throw new RouteNotFoundError(`Route tidak ditemukan: ${method} ${input.path}`, {
        meta: { method, path: input.path },
      });
    }

    candidates.sort((a, b) => scoreRoute(b.route) - scoreRoute(a.route));
    const [best] = candidates;
    if (best === undefined) {
      throw new RouteNotFoundError(`Route tidak ditemukan: ${method} ${input.path}`, {
        meta: { method, path: input.path },
      });
    }

    if (!best.route.enabled) {
      const reason = best.route.disabledReason ?? 'unknown';
      throw new RouteDisabledError(`Route "${best.route.id}" dinonaktifkan`, {
        detail: reason,
        meta: { routeId: best.route.id, reason },
      });
    }

    this.logger.debug(
      { routeId: best.route.id, path: input.path, method, candidates: candidates.length },
      'Route resolved',
    );

    return { route: best.route, params: best.match.params, wildcard: best.match.wildcard };
  }
}
