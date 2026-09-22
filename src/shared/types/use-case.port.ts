import type { Result } from './result.type.js';

export interface UseCase<TInput, TOutput, TError = string> {
  execute(input: TInput): Promise<Result<TOutput, TError>>;
}

export interface SyncUseCase<TInput, TOutput, TError = string> {
  execute(input: TInput): Result<TOutput, TError>;
}
