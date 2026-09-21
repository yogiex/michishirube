import { NextFunction, Request, Response } from 'express';
import { RequestIdMiddleware, REQUEST_ID_HEADER } from '../request-id.middleware.js';

function makeReq(overrides: Partial<Request> = {}): Request {
  return { headers: {}, ...overrides } as Request;
}

function makeRes(): Response & { headers: Record<string, string> } {
  const headers: Record<string, string> = {};
  const res = {
    headers,
    setHeader(k: string, v: string) {
      headers[k] = v;
      return this;
    },
  };
  return res as unknown as Response & { headers: Record<string, string> };
}

describe('RequestIdMiddleware', () => {
  let middleware: RequestIdMiddleware;

  beforeEach(() => {
    middleware = new RequestIdMiddleware();
  });

  it('generates a request id when header is absent', () => {
    const req = makeReq();
    const res = makeRes();
    let nextCalled = false;

    middleware.use(req, res, (() => {
      nextCalled = true;
    }) as NextFunction);

    expect(req.id).toBeDefined();
    expect(req.requestId).toBe(req.id);
    expect(res.headers[REQUEST_ID_HEADER]).toBe(req.id);
    expect(nextCalled).toBe(true);
  });

  it('reuses the incoming X-Request-ID', () => {
    const req = makeReq({ headers: { 'x-request-id': 'trace-abc' } });
    const res = makeRes();

    middleware.use(req, res, (() => {}) as NextFunction);

    expect(req.id).toBe('trace-abc');
    expect(res.headers[REQUEST_ID_HEADER]).toBe('trace-abc');
  });
});