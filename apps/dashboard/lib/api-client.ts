const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:7300';

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

class ApiClient {
  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  private async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { skipAuth, ...init } = options;
    const headers = new Headers(init.headers);

    headers.set('Content-Type', 'application/json');

    if (!skipAuth) {
      const token = this.getToken();
      if (token) headers.set('Authorization', `Bearer ${token}`);
    }

    const res = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers,
      credentials: 'include',
    });

    if (!res.ok) {
      let error: { code?: string; detail?: string; title?: string } = {};
      try {
        error = await res.json();
      } catch {
        /* ignore */
      }
      throw new ApiError(
        res.status,
        error.code ?? 'UNKNOWN',
        error.detail ?? error.title ?? res.statusText,
      );
    }

    if (res.status === 204) return undefined as T;
    return res.json() as Promise<T>;
  }

  get<T>(path: string, options?: RequestOptions) {
    return this.request<T>(path, { ...options, method: 'GET' });
  }

  post<T>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  patch<T>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  delete<T>(path: string, options?: RequestOptions) {
    return this.request<T>(path, { ...options, method: 'DELETE' });
  }
}

export const api = new ApiClient();
