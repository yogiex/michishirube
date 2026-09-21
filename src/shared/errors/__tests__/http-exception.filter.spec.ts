import { HttpException, HttpStatus } from '@nestjs/common';
import { GlobalExceptionFilter } from '../http-exception.filter.js';
import { RateLimitExceededError } from '../gateway-error.js';
import { InternalError } from '../gateway-error.js';

function makeHost(req: any, res: any) {
  return {
    switchToHttp: () => ({
      getRequest: () => req,
      getResponse: () => res,
    }),
  } as any;
}

function makeRes() {
  const res: any = {
    _headers: {} as Record<string, string>,
    statusCode: 0,
    body: null,
    header(k: string, v: string) {
      this._headers[k] = v;
      return this;
    },
    getHeader(k: string) {
      return this._headers[k];
    },
    status(c: number) {
      this.statusCode = c;
      return this;
    },
    send(b: any) {
      this.body = b;
      return this;
    },
  };
  return res;
}

describe('GlobalExceptionFilter', () => {
  let filter: GlobalExceptionFilter;
  const OLD_ENV = process.env.NODE_ENV;

  beforeEach(() => {
    filter = new GlobalExceptionFilter();
    process.env.NODE_ENV = 'test';
  });

  afterAll(() => {
    process.env.NODE_ENV = OLD_ENV;
  });

  it('maps DomainError with correct status and code', () => {
    const req = { originalUrl: '/api/v1/orders', method: 'POST', requestId: 'req-1' };
    const res = makeRes();

    filter.catch(
      new RateLimitExceededError('Too many requests', { retryAfter: 30 }),
      makeHost(req, res),
    );

    expect(res.statusCode).toBe(429);
    expect(res.body.code).toBe('GW_RATE_LIMIT_EXCEEDED');
    expect(res.body.retryAfter).toBe(30);
    expect(res._headers['Retry-After']).toBe('30');
    expect(res.body.requestId).toBe('req-1');
  });

  it('maps HttpException 401 to AUTH_MISSING', () => {
    const req = { originalUrl: '/x', method: 'GET', requestId: 'r2' };
    const res = makeRes();

    filter.catch(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED), makeHost(req, res));

    expect(res.statusCode).toBe(401);
    expect(res.body.code).toBe('GW_AUTH_MISSING');
  });

  it('hides detail in production for 5xx', () => {
    process.env.NODE_ENV = 'production';
    const req = { originalUrl: '/x', method: 'GET', requestId: 'r3' };
    const res = makeRes();

    filter.catch(new InternalError('DB connection failed at 10.0.0.5'), makeHost(req, res));

    expect(res.statusCode).toBe(500);
    expect(res.body.code).toBe('GW_INTERNAL_ERROR');
    expect(res.body.detail).toBeUndefined();
  });

  it('handles unknown error as GW_INTERNAL_ERROR', () => {
    const req = { originalUrl: '/x', method: 'GET', requestId: 'r4' };
    const res = makeRes();

    filter.catch(new Error('boom'), makeHost(req, res));

    expect(res.statusCode).toBe(500);
    expect(res.body.code).toBe('GW_INTERNAL_ERROR');
  });

  it('includes tenantId and traceId when present', () => {
    const req = {
      originalUrl: '/x',
      method: 'GET',
      requestId: 'r5',
      tenantId: 't_123',
      headers: { traceparent: '00-abcdef1234567890abcdef1234567890-1122334455667788-01' },
    };
    const res = makeRes();

    filter.catch(new RateLimitExceededError('nope'), makeHost(req, res));

    expect(res.body.tenantId).toBe('t_123');
    expect(res.body.traceId).toBe('abcdef1234567890abcdef1234567890');
  });
});
