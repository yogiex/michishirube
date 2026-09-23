import { describe, it, expect } from 'vitest';
import { sanitizeRequestHeaders, sanitizeResponseHeaders } from '../header-sanitizer.js';

describe('sanitizeRequestHeaders', () => {
  it('membuang hop-by-hop', () => {
    const result = sanitizeRequestHeaders({
      connection: 'keep-alive',
      'transfer-encoding': 'chunked',
      'content-type': 'application/json',
    });
    expect(result).toEqual({ 'content-type': 'application/json' });
  });

  it('membuang internal header', () => {
    const result = sanitizeRequestHeaders({
      host: 'internal',
      authorization: 'Bearer x',
      cookie: 'a=b',
      'x-forwarded-for': '10.0.0.1',
      'x-real-ip': '10.0.0.1',
      'content-type': 'application/json',
    });
    expect(result).toEqual({ 'content-type': 'application/json' });
  });

  it('menerapkan overrides', () => {
    const result = sanitizeRequestHeaders(
      { 'content-type': 'application/json' },
      { 'x-request-id': 'req-1', 'x-tenant-id': 'acme' },
    );
    expect(result['x-request-id']).toBe('req-1');
    expect(result['x-tenant-id']).toBe('acme');
  });

  it('menolak header value dengan CRLF (header injection)', () => {
    const result = sanitizeRequestHeaders({
      'x-evil': 'value\r\nX-Injected: evil',
      'content-type': 'application/json',
    });
    expect(result['x-evil']).toBeUndefined();
    expect(result['content-type']).toBe('application/json');
  });

  it('menolak header name invalid', () => {
    const result = sanitizeRequestHeaders({
      'invalid name': 'x',
      'content-type': 'application/json',
    });
    expect(result['invalid name']).toBeUndefined();
    expect(result['content-type']).toBe('application/json');
  });

  it('menolak value terlalu panjang', () => {
    const result = sanitizeRequestHeaders({
      'x-long': 'a'.repeat(10000),
      'content-type': 'application/json',
    });
    expect(result['x-long']).toBeUndefined();
  });

  it('handle array value', () => {
    const result = sanitizeRequestHeaders({
      'accept-language': ['en', 'id'],
    });
    expect(result['accept-language']).toBe('en, id');
  });
});

describe('sanitizeResponseHeaders', () => {
  it('membuang hop-by-hop', () => {
    const result = sanitizeResponseHeaders({
      connection: 'close',
      'transfer-encoding': 'chunked',
      'content-type': 'application/json',
    });
    expect(result).toEqual({ 'content-type': 'application/json' });
  });

  it('membuang header internal yang membocorkan info', () => {
    const result = sanitizeResponseHeaders({
      server: 'nginx/1.24',
      'x-powered-by': 'Express',
      'content-type': 'application/json',
    });
    expect(result).toEqual({ 'content-type': 'application/json' });
  });

  it('membuang header yang dikelola gateway sendiri', () => {
    const result = sanitizeResponseHeaders({
      'set-cookie': 'a=b',
      'strict-transport-security': 'max-age=1',
      'content-security-policy': "default-src 'self'",
      'x-frame-options': 'DENY',
    });
    expect(result).toEqual({});
  });
});
