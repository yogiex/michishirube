import { z } from 'zod';
import { api, ApiError, type ApiResult, type RequestOptions } from '../client';
import { OverviewSchema, type Overview } from '../schemas/overview';

export type { Overview } from '../schemas/overview';

function malformedOverviewError(cause: unknown): ApiError {
  return new ApiError(
    500,
    'GW_FRONTEND_MALFORMED_RESPONSE',
    'Endpoint overview tidak valid',
    undefined,
    undefined,
    {
      cause: cause instanceof Error ? cause : undefined,
    },
  );
}

export function getOverview(options?: RequestOptions): Promise<ApiResult<Overview>> {
  return executeGetOverview(options);
}

async function executeGetOverview(options?: RequestOptions): Promise<ApiResult<Overview>> {
  const result = await api.get<unknown>('/admin/overview', options);
  if (!result || !result.ok)
    return result ?? { ok: false, error: malformedOverviewError('API request failed') };
  const parsed = OverviewSchema.safeParse(result.data);
  if (!parsed.success) {
    return { ok: false, error: malformedOverviewError(parsed.error) };
  }
  return { ok: true, data: parsed.data };
}
