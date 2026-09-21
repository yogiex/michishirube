export interface Mapper<TDomain, TDto> {
  toDto(domain: TDomain): TDto;
  toDomain(dto: TDto): TDomain;
}

export interface OneWayMapper<TFrom, TTo> {
  map(from: TFrom): TTo;
}
