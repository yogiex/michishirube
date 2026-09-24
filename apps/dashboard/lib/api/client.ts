import { resolveApiBaseUrl } from './config';
import { isProblemDetail, type ProblemDetails } from './problem-detail';

export {
  ProblemDetailsSchema,
  isProblemDetail,
  type ProblemDetail,
  type ProblemDetails,
} from './problem-detail';

const DEFAULT_TIMEOUT_MS = 10_000;
export const MAX_TIMEOUT_MS = 30_000;

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  readonly body?: unknown;
  readonly token?: string | null;
  readonly timeoutMs?: number;
  readonly query?: Readonly<Record<string, string | number | boolean | undefined>>;
}

export interface ApiClientOptions {
  readonly baseUrl?: string;
  readonly defaultTimeoutMs?: number;
  readonly fetcher?: typeof fetch;
  readonly getToken?: () => string | null;
}

export type ApiResult<T> =
  { readonly ok: true; readonly data: T } | { readonly ok: false; readonly error: ApiError };

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
    readonly problem?: ProblemDetails,
    readonly retryAfterSeconds?: number,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = 'ApiError';
  }
}

function boundedTimeout(timeoutMs: number): number {
  if (!Number.isFinite(timeoutMs)) return DEFAULT_TIMEOUT_MS;
  return Math.min(MAX_TIMEOUT_MS, Math.max(1, Math.trunc(timeoutMs)));
}

function buildUrl(baseUrl: string, path: string, query: RequestOptions['query']): string {
  const normalizedBase = baseUrl.replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(`${normalizedBase}${normalizedPath}`);

  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  return url.toString();
}

async function parseProblem(response: Response): Promise<ProblemDetails | undefined> {
  if (!response.headers.get('content-type')?.includes('application/problem+json')) return undefined;

  try {
    const payload: unknown = await response.json();
    return isProblemDetail(payload) ? payload : undefined;
  } catch {
    return undefined;
  }
}

function parseRetryAfter(
  response: Response,
  problem: ProblemDetails | undefined,
): number | undefined {
  const header = response.headers.get('retry-after');
  if (header === null) return problem?.retryAfter;

  const seconds = Number(header);
  if (Number.isFinite(seconds) && seconds >= 0) return seconds;

  const date = Date.parse(header);
  if (Number.isNaN(date)) return problem?.retryAfter;
  return Math.max(0, Math.ceil((date - Date.now()) / 1000));
}

async function parseResponse<T>(response: Response, method: string | undefined): Promise<T> {
  if (response.status === 204 || response.status === 205 || method?.toUpperCase() === 'HEAD') {
    return undefined as T;
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json') && !contentType.includes('+json')) {
    return (await response.text()) as T;
  }

  return (await response.json()) as T;
}

function toError(error: unknown, timedOut: boolean, timeoutMs: number): ApiError {
  if (error instanceof ApiError) return error;
  if (timedOut) {
    return new ApiError(
      408,
      'REQUEST_TIMEOUT',
      `API request timed out after ${timeoutMs}ms`,
      undefined,
      undefined,
      {
        cause: error,
      },
    );
  }
  return new ApiError(0, 'NETWORK_ERROR', 'Unable to reach the API', undefined, undefined, {
    cause: error,
  });
}

export function createApiClient(options: ApiClientOptions = {}) {
  const baseUrl = resolveApiBaseUrl(options.baseUrl ?? process.env.NEXT_PUBLIC_API_URL);
  const defaultTimeoutMs = boundedTimeout(options.defaultTimeoutMs ?? DEFAULT_TIMEOUT_MS);
  const fetcher = options.fetcher ?? fetch;
  const getToken = options.getToken ?? ((): null => null);

  async function request<T>(
    path: string,
    requestOptions: RequestOptions = {},
  ): Promise<ApiResult<T>> {
    const { body, token, timeoutMs = defaultTimeoutMs, query, signal, ...init } = requestOptions;
    const timeout = boundedTimeout(timeoutMs);
    const headers = new Headers(init.headers);
    const controller = new AbortController();
    let timedOut = false;

    try {
      if (signal?.aborted) throw new ApiError(0, 'REQUEST_ABORTED', 'API request was aborted');
      const accessToken = token === undefined ? getToken() : token;
      if (body !== undefined && !(body instanceof FormData))
        headers.set('Content-Type', 'application/json');
      if (accessToken !== null) headers.set('Authorization', `Bearer ${accessToken}`);

      const abortFromCaller = (): void => controller.abort();
      signal?.addEventListener('abort', abortFromCaller, { once: true });
      const timer = setTimeout(() => {
        timedOut = true;
        controller.abort();
      }, timeout);

      try {
        const response = await fetcher(buildUrl(baseUrl, path, query), {
          ...init,
          headers,
          signal: controller.signal,
          credentials: 'include',
          body:
            body === undefined ? undefined : body instanceof FormData ? body : JSON.stringify(body),
        });

        if (!response.ok) {
          const problem = await parseProblem(response);
          throw new ApiError(
            response.status,
            problem?.code ?? 'UNKNOWN_ERROR',
            problem?.detail ?? problem?.title ?? response.statusText ?? 'API request failed',
            problem,
            parseRetryAfter(response, problem),
          );
        }

        return { ok: true, data: await parseResponse<T>(response, init.method) };
      } finally {
        clearTimeout(timer);
        signal?.removeEventListener('abort', abortFromCaller);
      }
    } catch (error) {
      return { ok: false, error: toError(error, timedOut, timeout) };
    }
  }

  return {
    request,
    get: <T>(path: string, requestOptions?: RequestOptions): Promise<ApiResult<T>> =>
      request<T>(path, { ...requestOptions, method: 'GET' }),
    post: <T>(
      path: string,
      body?: unknown,
      requestOptions?: RequestOptions,
    ): Promise<ApiResult<T>> => request<T>(path, { ...requestOptions, method: 'POST', body }),
    put: <T>(
      path: string,
      body?: unknown,
      requestOptions?: RequestOptions,
    ): Promise<ApiResult<T>> => request<T>(path, { ...requestOptions, method: 'PUT', body }),
    patch: <T>(
      path: string,
      body?: unknown,
      requestOptions?: RequestOptions,
    ): Promise<ApiResult<T>> => request<T>(path, { ...requestOptions, method: 'PATCH', body }),
    delete: <T>(path: string, requestOptions?: RequestOptions): Promise<ApiResult<T>> =>
      request<T>(path, { ...requestOptions, method: 'DELETE' }),
  };
}

export const api = createApiClient();
