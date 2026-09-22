declare const BRAND: unique symbol;

export type Brand<T, B extends string> = T & { readonly [BRAND]: B };

export function brand<B extends string, T = string>(value: T): Brand<T, B> {
  return value as Brand<T, B>;
}

export function brandValidated<B extends string, T = string>(
  value: T,
  validate: (v: T) => boolean,
  errorMessage = 'Invalid branded value',
): Brand<T, B> {
  if (!validate(value)) {
    throw new Error(errorMessage);
  }
  return value as Brand<T, B>;
}

export function unbrand<T, B extends string>(value: Brand<T, B>): T {
  return value;
}
