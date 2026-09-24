import { describe, expect, it } from 'vitest';
import { ProblemDetailsSchema, isProblemDetail } from './problem-detail';

const validProblem = {
  type: 'https://michishirube.dev/problems/validation-failed',
  title: 'Validation failed',
  status: 400,
  code: 'GW_VALIDATION_FAILED',
  detail: 'Request validation failed',
  instance: '/admin/routes',
  requestId: 'req-123',
  tenantId: 'tenant-1',
  timestamp: '2026-09-24T12:00:00.000Z',
  retryable: false,
  retryAfter: 30,
  errors: [
    {
      field: 'path',
      code: 'invalid_string',
      message: 'Path is required',
    },
  ],
  traceId: 'trace-123',
} as const;

describe('ProblemDetailsSchema', () => {
  it('accepts a complete gateway problem response', () => {
    expect(ProblemDetailsSchema.safeParse(validProblem).success).toBe(true);
    expect(isProblemDetail(validProblem)).toBe(true);
    expect(isProblemDetail({ type: 'https://example.com/problems/test' })).toBe(false);
  });

  it('accepts the required fields with optional metadata omitted', () => {
    const {
      detail: _detail,
      tenantId: _tenantId,
      retryAfter: _retryAfter,
      errors: _errors,
      traceId: _traceId,
      ...requiredProblem
    } = validProblem;

    expect(ProblemDetailsSchema.safeParse(requiredProblem).success).toBe(true);
  });

  it('rejects invalid status and timestamp values', () => {
    const result = ProblemDetailsSchema.safeParse({
      ...validProblem,
      status: 99,
      timestamp: 'not-a-date',
    });

    expect(result.success).toBe(false);
  });

  it('rejects malformed field errors', () => {
    const result = ProblemDetailsSchema.safeParse({
      ...validProblem,
      errors: [{ field: 'path', code: 'invalid_string' }],
    });

    expect(result.success).toBe(false);
  });
});
