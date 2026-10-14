import { Inject, Injectable, Logger } from '@nestjs/common';
import { METRICS_REGISTRY, type MetricsRegistryPort } from '../domain/metrics-registry.port.js';
import { normalizePath, sanitizeLabel } from '../domain/metric-label.vo.js';

export interface RecordHttpMetricInput {
  readonly method: string;
  readonly path: string;
  readonly status: number;
  readonly durationMs: number;
  readonly tenantHash: string;
  readonly upstream?: string;
}

@Injectable()
export class RecordHttpMetricUseCase {
  private readonly logger = new Logger(RecordHttpMetricUseCase.name);

  constructor(@Inject(METRICS_REGISTRY) private readonly registry: MetricsRegistryPort) {}

  execute(input: RecordHttpMetricInput): void {
    const durationMs = Number.isFinite(input.durationMs) ? Math.max(0, input.durationMs) : 0;
    try {
      this.registry.recordHttp({
        method: sanitizeLabel(input.method.toUpperCase(), 'UNKNOWN'),
        route: normalizePath(input.path),
        status: input.status,
        durationMs,
        tenantHash: sanitizeLabel(input.tenantHash, 'unknown'),
        upstream: input.upstream ? sanitizeLabel(input.upstream) : undefined,
      });
    } catch (cause: unknown) {
      this.logger.warn(
        'Gagal mencatat HTTP metric',
        cause instanceof Error ? cause.message : 'unknown error',
      );
    }
  }
}
