export interface BaseEntity<TId = string> {
  readonly id: TId;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface AggregateRoot<TId = string> extends BaseEntity<TId> {
  readonly version: number;
}

export interface EntitySnapshot<TId = string> {
  readonly id: TId;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export function toSnapshot<TId>(entity: BaseEntity<TId>): EntitySnapshot<TId> {
  return {
    id: entity.id,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
  };
}
