import { api, ApiError, type ApiResult, type RequestOptions } from '../client';
import type { MetricsQuery } from '../query-keys';
import { MetricsSnapshotSchema, type MetricsSnapshot } from '../schemas/metrics';

export type { MetricsSnapshot, MetricPoint } from '../schemas/metrics';

function malformedMetricsError(cause: unknown): ApiError {
  return new ApiError(
    500,
    'GW_FRONTEND_MALFORMED_RESPONSE',
    'Endpoint metrics tidak valid',
    undefined,
    undefined,
    {
      cause: cause instanceof Error ? cause : undefined,
    },
  );
}

export function getMetrics(
  query: MetricsQuery = {},
  options?: RequestOptions,
): Promise<ApiResult<MetricsSnapshot>> {
  return executeGetMetrics(query, options);
}

async function executeGetMetrics(
  query: MetricsQuery,
  options?: RequestOptions,
): Promise<ApiResult<MetricsSnapshot>> {
  const result = await api.get<unknown>('/admin/metrics', {
    ...options,
    query: query as Readonly<Record<string, string | number | boolean | undefined>>,
  });
  if (!result || !result.ok)
    return result ?? { ok: false, error: malformedMetricsError('API request failed') };
  const parsed = MetricsSnapshotSchema.safeParse(result.data);
  if (!parsed.success) return { ok: false, error: malformedMetricsError(parsed.error) };
  return { ok: true, data: parsed.data };
}
