import type { Result } from './result.type.js';

export type Option<T> = { readonly some: true; readonly value: T } | { readonly some: false };

export function some<T>(value: T): Option<T> {
  return { some: true, value };
}

export function none<T = never>(): Option<T> {
  return { some: false };
}

export function isSome<T>(o: Option<T>): o is { readonly some: true; readonly value: T } {
  return o.some;
}

export function isNone<T>(o: Option<T>): o is { readonly some: false } {
  return !o.some;
}

export function getOrElse<T>(o: Option<T>, fallback: T): T {
  return o.some ? o.value : fallback;
}

export function mapOption<T, U>(o: Option<T>, fn: (v: T) => U): Option<U> {
  return o.some ? some(fn(o.value)) : none();
}

export function flatMapOption<T, U>(o: Option<T>, fn: (v: T) => Option<U>): Option<U> {
  return o.some ? fn(o.value) : none();
}

export function fromNullable<T>(value: T | null | undefined): Option<T> {
  return value === null || value === undefined ? none() : some(value);
}

export function toResult<T, E>(o: Option<T>, onNone: () => E): Result<T, E> {
  return o.some ? { ok: true, value: o.value } : { ok: false, error: onNone() };
}
