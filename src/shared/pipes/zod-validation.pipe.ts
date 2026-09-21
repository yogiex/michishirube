import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import type { ZodSchema, ZodError } from 'zod';
import { ValidationFailedError } from '@/shared/errors/index.js';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: unknown, _metadata: ArgumentMetadata): unknown {
    const result = this.schema.safeParse(value);
    if (result.success) return result.data;

    const error = result.error as ZodError;
    throw new ValidationFailedError('Input tidak valid', {
      fieldErrors: error.issues.map((i) => ({
        field: i.path.join('.') || '_root',
        code: i.code,
        message: i.message,
      })),
    });
  }
}
