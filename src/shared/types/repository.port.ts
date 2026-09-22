import type { Option } from './option.type.js';

export interface RepositoryPort<TEntity, TId = string> {
  findById(id: TId): Promise<Option<TEntity>>;
  save(entity: TEntity): Promise<void>;
  delete(id: TId): Promise<void>;
  exists(id: TId): Promise<boolean>;
}

export interface ReadOnlyRepositoryPort<TEntity, TId = string> {
  findById(id: TId): Promise<Option<TEntity>>;
  findAll(): Promise<readonly TEntity[]>;
  exists(id: TId): Promise<boolean>;
}
