export const CIRCUIT_BREAKER = Symbol('CIRCUIT_BREAKER');
export const CIRCUIT_STORE_TIMEOUT = Symbol('CIRCUIT_STORE_TIMEOUT');
export const CIRCUIT_STORE_TIMEOUT_MS = 50;

export function withCircuitStoreTimeout<T>(operation: Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timeout = setTimeout(() => reject(CIRCUIT_STORE_TIMEOUT), CIRCUIT_STORE_TIMEOUT_MS);

    operation.then(resolve, reject).finally(() => clearTimeout(timeout));
  });
}
