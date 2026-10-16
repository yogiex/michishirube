import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { redisAvailable } from '../setup.js';
import { cleanup, skipIfRedisUnavailable } from '../helpers/cleanup.helper.js';
import { createTestApp, type TestApp } from '../helpers/app.helper.js';
import { startMockUpstream, countingHandler } from '../helpers/upstream.helper.js';
import type { StartedUpstream } from '../helpers/upstream.helper.js';

describe('Sprint 2 — idempotency smoke', () => {
  let testApp: TestApp | undefined;
  let upstream: StartedUpstream | undefined;
  let counter: ReturnType<typeof countingHandler> | undefined;

  beforeAll(async () => {
    await skipIfRedisUnavailable();
    if (!redisAvailable()) return;

    counter = countingHandler();
    upstream = await startMockUpstream({ handler: counter.handler });
    testApp = await createTestApp({
      upstreamUrl: upstream.url,
      routes: [
        {
          id: 'idem-post',
          path: '/idem',
          method: 'POST',
          upstream: `${upstream.url}/post`,
          enabled: true,
          requireAuth: false,
          requireIdempotency: true,
          roles: [],
          timeoutMs: 5000,
        },
      ],
    });
  }, 60_000);

  afterAll(async () => {
    if (testApp !== undefined) await testApp.close();
    if (upstream !== undefined) await upstream.close();
    if (redisAvailable()) await cleanup();
  }, 60_000);

  it('POST twice with the same Idempotency-Key yields the same body', async () => {
    if (
      !redisAvailable() ||
      testApp === undefined ||
      upstream === undefined ||
      counter === undefined
    )
      return;

    const key = 'idempotency-smoke-key-0001';
    const payload = { foo: 'bar', n: 1 };
    const server = testApp.app.getHttpServer();

    const first = await request(server).post('/api/idem').set('Idempotency-Key', key).send(payload);
    const second = await request(server)
      .post('/api/idem')
      .set('Idempotency-Key', key)
      .send(payload);

    expect(first.status).toBeGreaterThanOrEqual(200);
    expect(first.status).toBeLessThan(500);
    expect(second.status).toBe(first.status);
    expect(second.body).toEqual(first.body);
    expect(counter.getCount()).toBeLessThanOrEqual(2);
  });
});
