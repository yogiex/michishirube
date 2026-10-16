import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';

export interface MockUpstreamOptions {
  readonly port?: number;
  readonly handler: (req: IncomingMessage, res: ServerResponse) => void | Promise<void>;
}

export interface StartedUpstream {
  readonly url: string;
  readonly port: number;
  close: () => Promise<void>;
}

type Handler = (req: IncomingMessage, res: ServerResponse) => void | Promise<void>;

export async function startMockUpstream(opts: MockUpstreamOptions): Promise<StartedUpstream> {
  const server = createServer((req, res) => {
    void (async (): Promise<void> => {
      try {
        await opts.handler(req, res);
      } catch {
        if (!res.writableEnded) {
          res.writeHead(500);
          res.end();
        }
      }
    })();
  });
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(opts.port ?? 0, '127.0.0.1', () => resolve());
  });
  const address = server.address();
  if (address === null || typeof address === 'string') {
    throw new Error('Mock upstream did not bind to a TCP port');
  }
  const port = address.port;
  return {
    url: `http://127.0.0.1:${port}`,
    port,
    close: () =>
      new Promise<void>((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      }),
  };
}

export function jsonResponse(data: unknown, status = 200): Handler {
  return (_req, res) => {
    if (res.writableEnded) return;
    res.writeHead(status, { 'content-type': 'application/json' });
    res.end(JSON.stringify(data));
  };
}

export function countingHandler(): { handler: Handler; getCount: () => number; reset: () => void } {
  let count = 0;
  return {
    handler: (_req, res) => {
      count += 1;
      jsonResponse({ ok: true, count })(_req, res);
    },
    getCount: () => count,
    reset: () => {
      count = 0;
    },
  };
}

export function failThenSucceed(
  failCount: number,
  failStatus = 503,
): { handler: Handler; getCount: () => number; reset: () => void } {
  let count = 0;
  return {
    handler: (req, res) => {
      count += 1;
      if (count <= failCount) {
        jsonResponse({ ok: false, count }, failStatus)(req, res);
        return;
      }
      jsonResponse({ ok: true, count })(req, res);
    },
    getCount: () => count,
    reset: () => {
      count = 0;
    },
  };
}

export function slowHandler(delayMs: number): Handler {
  return async (_req, res) => {
    await new Promise<void>((resolve) => setTimeout(resolve, delayMs));
    jsonResponse({ ok: true, delayed: true })(_req, res);
  };
}

export function mutableHandler(initial: Handler): {
  handler: Handler;
  setHandler: (next: Handler) => void;
  getCount: () => number;
  reset: () => void;
} {
  let handler = initial;
  let count = 0;
  return {
    handler: async (req, res) => {
      count += 1;
      await handler(req, res);
    },
    setHandler: (next) => {
      handler = next;
    },
    getCount: () => count,
    reset: () => {
      count = 0;
    },
  };
}

export function alwaysFailHandler(status: number): {
  handler: Handler;
  getCount: () => number;
  reset: () => void;
} {
  let count = 0;
  return {
    handler: (req, res) => {
      count += 1;
      jsonResponse({ ok: false, count }, status)(req, res);
    },
    getCount: () => count,
    reset: () => {
      count = 0;
    },
  };
}
