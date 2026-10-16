import type { Route } from './route.entity.js';

export const ROUTE_REPOSITORY = Symbol('ROUTE_REPOSITORY');

export interface RouteRepositoryPort {
  findAll(tenantId?: string): Promise<readonly Route[]>;
  findByPath?(path: string, tenantId?: string): Promise<readonly Route[]>;
  findByTenant?(tenantId: string): Promise<readonly Route[]>;
  reload(): Promise<void>;
}
