export interface Codec<T> {
  encode(value: T): string;
  decode(raw: string): T;
}

export function jsonCodec<T>(validate: (v: unknown) => T): Codec<T> {
  return {
    encode: (v) => JSON.stringify(v),
    decode: (raw) => validate(JSON.parse(raw) as unknown),
  };
}
