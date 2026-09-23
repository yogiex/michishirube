import type { Route } from './route.entity.js';

export const ROUTE_REPOSITORY = Symbol('ROUTE_REPOSITORY');

export interface RouteRepositoryPort {
  findAll(): Promise<readonly Route[]>;
  reload(): Promise<void>;
}
