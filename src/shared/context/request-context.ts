import { AsyncLocalStorage } from 'node:async_hooks';

export interface RequestContext {
  readonly requestId: string;
  readonly tenantId?: string;
  readonly userId?: string;
  readonly startedAt: number;
}

interface MutableRequestContext {
  requestId: string;
  tenantId?: string;
  userId?: string;
  startedAt: number;
}

const storage = new AsyncLocalStorage<MutableRequestContext>();

export const RequestContextHolder = {
  run<T>(context: RequestContext, fn: () => T): T {
    return storage.run({ ...context }, fn);
  },

  get(): RequestContext | undefined {
    return storage.getStore();
  },

  getOrThrow(): RequestContext {
    const ctx = storage.getStore();
    if (!ctx) {
      throw new Error('RequestContext tidak tersedia');
    }
    return ctx;
  },

  getTenantId(): string | undefined {
    return storage.getStore()?.tenantId;
  },

  getRequestId(): string | undefined {
    return storage.getStore()?.requestId;
  },

  setTenantId(tenantId: string): void {
    const ctx = storage.getStore();
    if (ctx) ctx.tenantId = tenantId;
  },

  setUserId(userId: string): void {
    const ctx = storage.getStore();
    if (ctx) ctx.userId = userId;
  },
} as const;
