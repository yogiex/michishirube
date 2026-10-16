import {
  CallHandler,
  type ExecutionContext,
  Inject,
  Injectable,
  type NestInterceptor,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs';
import {
  OVERVIEW_STATS,
  type OverviewStatsPort,
} from '@/core/overview/domain/overview-stats.port.js';

const SKIPPED_PREFIXES = ['/admin', '/health'];

interface HttpRequestLike {
  readonly url?: string;
}

@Injectable()
export class StatsInterceptor implements NestInterceptor {
  constructor(@Inject(OVERVIEW_STATS) private readonly stats: OverviewStatsPort) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') return next.handle();
    const request = context.switchToHttp().getRequest<HttpRequestLike>();
    if (isSkipped(request.url)) return next.handle();

    const startedAt = Date.now();
    return next.handle().pipe(
      tap({
        next: () => {
          void this.stats.recordRequest(Date.now() - startedAt, false);
        },
        error: () => {
          void this.stats.recordRequest(Date.now() - startedAt, true);
        },
      }),
    );
  }
}

function isSkipped(url: string | undefined): boolean {
  if (url === undefined) return false;
  return SKIPPED_PREFIXES.some((prefix) => url.startsWith(prefix));
}
