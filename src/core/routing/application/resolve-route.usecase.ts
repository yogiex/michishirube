import { Inject, Injectable, Logger } from '@nestjs/common';
import { RouteNotFoundError, RouteDisabledError } from '@/shared/errors/index.js';
import { matchPath, type PathMatchResult } from '../domain/path-matcher.js';
import { ROUTE_REPOSITORY, type RouteRepositoryPort } from '../domain/route.repository.port.js';
import type { Route } from '../domain/route.entity.js';

export interface ResolveRouteInput {
  readonly path: string;
  readonly method: string;
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

  async execute(input: ResolveRouteInput): Promise<ResolvedRoute> {
    const all = await this.routes.findAll();
    const method = input.method.toUpperCase();

    const candidates: Array<{ route: Route; match: PathMatchResult }> = [];

    for (const route of all) {
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
      throw new RouteDisabledError(`Route "${best.route.id}" dinonaktifkan`, {
        meta: { routeId: best.route.id },
      });
    }

    this.logger.debug(
      { routeId: best.route.id, path: input.path, method, candidates: candidates.length },
      'Route resolved',
    );

    return { route: best.route, params: best.match.params, wildcard: best.match.wildcard };
  }
}
