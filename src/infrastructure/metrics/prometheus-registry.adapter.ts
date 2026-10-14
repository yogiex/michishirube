import { Injectable, Logger, type OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CardinalityLimiter,
  normalizePath,
  sanitizeLabel,
} from '@/core/metrics/domain/metric-label.vo.js';
import type {
  BulkheadMetricInput,
  CacheMetricInput,
  CircuitMetricInput,
  CircuitTransitionMetricInput,
  HttpMetricInput,
  IdempotencyMetricInput,
  MetricsRegistryPort,
  RateLimitMetricInput,
  RetryMetricInput,
} from '@/core/metrics/domain/metrics-registry.port.js';
import type { AppConfig } from '@/config/configuration.js';
import { collectDefaultMetrics, Counter, Gauge, Histogram, Registry } from 'prom-client';
import {
  HTTP_DURATION_BUCKETS_SEC,
  MAX_UNIQUE_LABEL_VALUES,
  METRIC_NAMES,
} from './metrics.constants.js';

let defaultMetricsCollected = false;

@Injectable()
export class PrometheusRegistryAdapter implements MetricsRegistryPort, OnModuleInit {
  private readonly logger = new Logger(PrometheusRegistryAdapter.name);
  private readonly registry = new Registry();
  private readonly routeLimiter = new CardinalityLimiter(MAX_UNIQUE_LABEL_VALUES);
  private readonly upstreamLimiter = new CardinalityLimiter(MAX_UNIQUE_LABEL_VALUES);
  private readonly httpRequestsTotal: Counter<'method' | 'route' | 'status' | 'tenant'>;
  private readonly httpRequestDuration: Histogram<'method' | 'route' | 'status'>;
  private readonly httpRequestsInFlight: Gauge<'method'>;
  private readonly circuitState: Gauge<'upstream'>;
  private readonly circuitTransitionsTotal: Counter<'upstream' | 'from' | 'to'>;
  private readonly bulkheadAcquired: Counter<'upstream'>;
  private readonly bulkheadQueued: Counter<'upstream'>;
  private readonly bulkheadRejected: Counter<'upstream'>;
  private readonly bulkheadActive: Gauge<'upstream'>;
  private readonly cacheRequests: Counter<'result' | 'route'>;
  private readonly idempotencyRequests: Counter<'result' | 'route'>;
  private readonly retryAttempts: Counter<'upstream' | 'result'>;
  private readonly rateLimitRequests: Counter<'dimension' | 'result'>;

  constructor(private readonly config: ConfigService<AppConfig, true>) {
    const service = this.config.get<string>('app.name', { infer: true }) ?? 'api-gateway';
    this.registry.setDefaultLabels({ service });
    this.httpRequestsTotal = new Counter({
      name: METRIC_NAMES.HTTP_REQUESTS_TOTAL,
      help: 'Total HTTP requests',
      labelNames: ['method', 'route', 'status', 'tenant'],
      registers: [this.registry],
    });
    this.httpRequestDuration = new Histogram({
      name: METRIC_NAMES.HTTP_REQUEST_DURATION,
      help: 'HTTP request duration in seconds',
      labelNames: ['method', 'route', 'status'],
      buckets: [...HTTP_DURATION_BUCKETS_SEC],
      registers: [this.registry],
    });
    this.httpRequestsInFlight = new Gauge({
      name: METRIC_NAMES.HTTP_REQUESTS_IN_FLIGHT,
      help: 'HTTP requests currently in flight',
      labelNames: ['method'],
      registers: [this.registry],
    });
    this.circuitState = new Gauge({
      name: METRIC_NAMES.CIRCUIT_STATE,
      help: 'Circuit breaker state',
      labelNames: ['upstream'],
      registers: [this.registry],
    });
    this.circuitTransitionsTotal = new Counter({
      name: METRIC_NAMES.CIRCUIT_TRANSITIONS_TOTAL,
      help: 'Total circuit breaker transitions',
      labelNames: ['upstream', 'from', 'to'],
      registers: [this.registry],
    });
    this.bulkheadAcquired = new Counter({
      name: METRIC_NAMES.BULKHEAD_ACQUIRED,
      help: 'Total bulkhead slots acquired',
      labelNames: ['upstream'],
      registers: [this.registry],
    });
    this.bulkheadQueued = new Counter({
      name: METRIC_NAMES.BULKHEAD_QUEUED,
      help: 'Total bulkhead operations queued',
      labelNames: ['upstream'],
      registers: [this.registry],
    });
    this.bulkheadRejected = new Counter({
      name: METRIC_NAMES.BULKHEAD_REJECTED,
      help: 'Total bulkhead operations rejected',
      labelNames: ['upstream'],
      registers: [this.registry],
    });
    this.bulkheadActive = new Gauge({
      name: METRIC_NAMES.BULKHEAD_ACTIVE,
      help: 'Active bulkhead slots',
      labelNames: ['upstream'],
      registers: [this.registry],
    });
    this.cacheRequests = new Counter({
      name: METRIC_NAMES.CACHE_REQUESTS,
      help: 'Total cache requests',
      labelNames: ['result', 'route'],
      registers: [this.registry],
    });
    this.idempotencyRequests = new Counter({
      name: METRIC_NAMES.IDEMPOTENCY_REQUESTS,
      help: 'Total idempotency requests',
      labelNames: ['result', 'route'],
      registers: [this.registry],
    });
    this.retryAttempts = new Counter({
      name: METRIC_NAMES.RETRY_ATTEMPTS,
      help: 'Total retry attempts',
      labelNames: ['upstream', 'result'],
      registers: [this.registry],
    });
    this.rateLimitRequests = new Counter({
      name: METRIC_NAMES.RATE_LIMIT_REQUESTS,
      help: 'Total rate limit requests',
      labelNames: ['dimension', 'result'],
      registers: [this.registry],
    });
  }

  onModuleInit(): void {
    if (defaultMetricsCollected) return;
    collectDefaultMetrics({ register: this.registry, prefix: 'gateway_nodejs_' });
    defaultMetricsCollected = true;
    this.logger.log('Prometheus default metrics collected');
  }

  recordHttp(input: HttpMetricInput): void {
    const route = this.routeLimiter.check(normalizePath(input.route));
    const status = String(input.status);
    this.httpRequestsTotal.inc({
      method: input.method,
      route,
      status,
      tenant: input.tenantHash,
    });
    this.httpRequestDuration.observe(
      { method: input.method, route, status },
      input.durationMs / 1000,
    );
  }

  recordCircuit(input: CircuitMetricInput): void {
    const upstream = this.upstreamLabel(input.upstream);
    let value: 0 | 1 | 2;
    switch (input.state) {
      case 'closed':
        value = 0;
        break;
      case 'half_open':
        value = 1;
        break;
      case 'open':
        value = 2;
        break;
    }
    this.circuitState.set({ upstream }, value);
  }

  recordCircuitTransition(input: CircuitTransitionMetricInput): void {
    this.circuitTransitionsTotal.inc({
      upstream: this.upstreamLabel(input.upstream),
      from: input.from,
      to: input.to,
    });
  }

  recordBulkhead(input: BulkheadMetricInput): void {
    const upstream = this.upstreamLabel(input.upstream);
    switch (input.result) {
      case 'acquired':
        this.bulkheadAcquired.inc({ upstream });
        this.bulkheadActive.inc({ upstream });
        break;
      case 'queued':
        this.bulkheadQueued.inc({ upstream });
        break;
      case 'rejected':
      case 'timeout':
        this.bulkheadRejected.inc({ upstream });
        break;
    }
  }

  recordBulkheadRelease(upstream: string): void {
    this.bulkheadActive.dec({ upstream: this.upstreamLabel(upstream) });
  }

  recordCache(input: CacheMetricInput): void {
    this.cacheRequests.inc({ result: input.result, route: this.routeLabel(input.route) });
  }

  recordIdempotency(input: IdempotencyMetricInput): void {
    this.idempotencyRequests.inc({
      result: input.result,
      route: this.routeLabel(input.route),
    });
  }

  recordRetry(input: RetryMetricInput): void {
    this.retryAttempts.inc({
      upstream: this.upstreamLabel(input.upstream),
      result: input.result,
    });
  }

  recordRateLimit(input: RateLimitMetricInput): void {
    this.rateLimitRequests.inc({ dimension: input.dimension, result: input.result });
  }

  render(): Promise<string> {
    return this.registry.metrics();
  }

  contentType(): string {
    return this.registry.contentType;
  }

  reset(): void {
    this.registry.resetMetrics();
    this.routeLimiter.reset();
    this.upstreamLimiter.reset();
  }

  private routeLabel(route: string): string {
    return this.routeLimiter.check(normalizePath(route));
  }

  private upstreamLabel(upstream: string): string {
    return this.upstreamLimiter.check(sanitizeLabel(upstream));
  }
}
