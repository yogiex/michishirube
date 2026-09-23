import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('undici', () => {
  const requestMock = vi.fn();
  const AgentMock = vi.fn();
  return { request: requestMock, Agent: AgentMock };
});

import { UndiciProxyAdapter } from '../undici-proxy.adapter.js';
import { request as undiciRequest } from 'undici';
import {
  UpstreamTimeoutError,
  UpstreamDnsFailedError,
  UpstreamConnectFailedError,
  UpstreamError,
} from '@/shared/errors/index.js';

const requestMock = vi.mocked(undiciRequest);

type UndiciResponse = Awaited<ReturnType<typeof undiciRequest>>;

async function* bodyGen(chunks: string[]) {
  for (const c of chunks) yield Buffer.from(c);
}

function okResponse(init: {
  readonly statusCode?: number;
  readonly headers: Record<string, string | string[] | undefined>;
  readonly body: AsyncIterable<Uint8Array>;
}): UndiciResponse {
  return {
    statusCode: init.statusCode ?? 200,
    headers: init.headers,
    body: init.body,
  } as UndiciResponse;
}

describe('UndiciProxyAdapter', () => {
  let adapter: UndiciProxyAdapter;

  beforeEach(() => {
    vi.clearAllMocks();
    adapter = new UndiciProxyAdapter();
  });

  it('forward success', async () => {
    requestMock.mockResolvedValue(
      okResponse({
        headers: { 'content-type': 'application/json' },
        body: bodyGen(['{"ok":true}']),
      }),
    );

    const res = await adapter.request({
      method: 'GET',
      url: 'http://upstream.test/api/v1/orders',
      headers: { accept: 'application/json' },
      timeoutMs: 100,
    });

    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toBe('application/json');
    expect(res.body.toString('utf8')).toBe('{"ok":true}');
  });

  it('gabungkan multi-chunk body', async () => {
    requestMock.mockResolvedValue(
      okResponse({
        headers: { 'content-type': 'text/plain' },
        body: bodyGen(['hello', ' ', 'world']),
      }),
    );

    const res = await adapter.request({
      method: 'GET',
      url: 'http://upstream.test/api/v1/orders',
      headers: {},
      timeoutMs: 100,
    });

    expect(res.body.toString('utf8')).toBe('hello world');
  });

  it('abort → UpstreamTimeoutError', async () => {
    requestMock.mockRejectedValue(Object.assign(new Error('aborted'), { name: 'AbortError' }));

    await expect(
      adapter.request({
        method: 'GET',
        url: 'http://upstream.test/slow',
        headers: {},
        timeoutMs: 100,
      }),
    ).rejects.toBeInstanceOf(UpstreamTimeoutError);
  });

  it('ENOTFOUND → UpstreamDnsFailedError', async () => {
    requestMock.mockRejectedValue(
      Object.assign(new Error('getaddrinfo ENOTFOUND'), { code: 'ENOTFOUND' }),
    );

    await expect(
      adapter.request({
        method: 'GET',
        url: 'http://unknown-host.test/api',
        headers: {},
        timeoutMs: 100,
      }),
    ).rejects.toBeInstanceOf(UpstreamDnsFailedError);
  });

  it('ECONNREFUSED → UpstreamConnectFailedError', async () => {
    requestMock.mockRejectedValue(
      Object.assign(new Error('connect ECONNREFUSED'), { code: 'ECONNREFUSED' }),
    );

    await expect(
      adapter.request({
        method: 'POST',
        url: 'http://upstream.test/api',
        headers: {},
        body: '{}',
        timeoutMs: 100,
      }),
    ).rejects.toBeInstanceOf(UpstreamConnectFailedError);
  });

  it('normalize header ke lowercase & gabung array', async () => {
    requestMock.mockResolvedValue(
      okResponse({
        headers: {
          'Content-Type': 'application/json',
          'X-Custom': 'v',
          'Set-Cookie': ['a=1', 'b=2'],
          'X-Undefined': undefined,
        },
        body: bodyGen([]),
      }),
    );

    const res = await adapter.request({
      method: 'GET',
      url: 'http://upstream.test/api',
      headers: {},
      timeoutMs: 100,
    });

    expect(res.headers).toEqual({
      'content-type': 'application/json',
      'x-custom': 'v',
      'set-cookie': 'a=1, b=2',
    });
    expect(Object.keys(res.headers).every((k) => k === k.toLowerCase())).toBe(true);
  });

  it('tolak body > 10MB → UpstreamError', async () => {
    async function* bigGen() {
      yield Buffer.alloc(10 * 1024 * 1024 + 1);
    }
    requestMock.mockResolvedValue(okResponse({ headers: {}, body: bigGen() }));

    const promise = adapter.request({
      method: 'GET',
      url: 'http://upstream.test/huge',
      headers: {},
      timeoutMs: 100,
    });

    await expect(promise).rejects.toBeInstanceOf(UpstreamError);
    await expect(promise).rejects.toThrow('melebihi batas 10 MB');
  });
});
