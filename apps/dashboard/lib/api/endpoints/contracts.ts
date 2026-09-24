export interface PaginatedResponse<T> {
  readonly items: readonly T[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
  readonly hasNext: boolean;
  readonly hasPrev: boolean;
}

export type ServiceStatus = 'healthy' | 'degraded' | 'down';

export interface ServiceHealth {
  readonly name: string;
  readonly status: ServiceStatus;
  readonly latencyMs: number;
  readonly endpoint: string;
}
