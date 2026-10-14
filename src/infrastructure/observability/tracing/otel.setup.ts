import { node as otelNode, tracing, resources } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';

export interface TracingSetupOptions {
  readonly enabled?: boolean;
  readonly serviceName?: string;
  readonly serviceVersion?: string;
  readonly endpoint?: string;
  readonly headers?: Record<string, string>;
  readonly httpInstrumentation?: boolean;
}

const DEFAULT_SERVICE_NAME = 'api-gateway';
const DEFAULT_SERVICE_VERSION = '0.1.0';

function readBool(value: string | undefined): boolean | undefined {
  if (value === undefined) return undefined;
  const normalized = value.trim().toLowerCase();
  if (normalized === 'true' || normalized === '1') return true;
  if (normalized === 'false' || normalized === '0') return false;
  return undefined;
}

function resolveServiceName(options: TracingSetupOptions): string {
  const candidate =
    options.serviceName?.trim() ||
    process.env.OTEL_SERVICE_NAME?.trim() ||
    process.env.SERVICE_NAME?.trim();
  return candidate && candidate.length > 0 ? candidate : DEFAULT_SERVICE_NAME;
}

function resolveEndpoint(options: TracingSetupOptions): string {
  const candidate =
    options.endpoint?.trim() ||
    process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT?.trim() ||
    process.env.OTEL_EXPORTER_OTLP_ENDPOINT?.trim();
  return candidate ?? '';
}

function normalizeOtlpEndpoint(raw: string): string {
  const trimmed = raw.trim().replace(/\/+$/, '');
  if (trimmed.length === 0) return trimmed;
  return trimmed.endsWith('/v1/traces') ? trimmed : `${trimmed}/v1/traces`;
}

export function setupTracing(
  options: TracingSetupOptions = {},
): otelNode.NodeTracerProvider | null {
  const enabled = options.enabled ?? readBool(process.env.OTEL_ENABLED) ?? true;
  if (!enabled) return null;

  const serviceName = resolveServiceName(options);
  const endpoint = resolveEndpoint(options);

  const resource = resources.resourceFromAttributes({
    'service.name': serviceName,
    'service.version':
      options.serviceVersion?.trim() ||
      process.env.SERVICE_VERSION?.trim() ||
      DEFAULT_SERVICE_VERSION,
  });

  const exporter =
    endpoint.length > 0
      ? new OTLPTraceExporter({
          url: normalizeOtlpEndpoint(endpoint),
          headers: options.headers,
        })
      : new tracing.ConsoleSpanExporter();

  const provider = new otelNode.NodeTracerProvider({
    resource,
    spanProcessors: [new tracing.SimpleSpanProcessor(exporter)],
  });

  if (options.httpInstrumentation ?? true) {
    const instrumentation = new HttpInstrumentation();
    try {
      instrumentation.setTracerProvider(provider);
    } catch {
      // Instrumentation is optional for the basic setup.
    }
  }

  provider.register();

  return provider;
}

export const initTracing = setupTracing;
export const initOtel = setupTracing;
export const registerTracing = setupTracing;
export const registerOtel = setupTracing;
export const startTracing = setupTracing;
