import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { redisAvailable } from '../setup.js';
import { cleanup, skipIfRedisUnavailable } from '../helpers/cleanup.helper.js';
import { createTestApp, type TestApp } from '../helpers/app.helper.js';
import { startMockUpstream, alwaysFailHandler } from '../helpers/upstream.helper.js';
import type { StartedUpstream } from '../helpers/upstream.helper.js';

describe('Sprint 2 — resilience smoke', () => {
  let testApp: TestApp | undefined;
  let upstream: StartedUpstream | undefined;
  let failing: ReturnType<typeof alwaysFailHandler> | undefined;

  beforeAll(async () => {
    await skipIfRedisUnavailable();
    if (!redisAvailable()) return;

    failing = alwaysFailHandler(503);
    upstream = await startMockUpstream({ handler: failing.handler });
    testApp = await createTestApp({
      upstreamUrl: upstream.url,
      extraEnv: {
        CIRCUIT_BREAKER_FAILURE_THRESHOLD: '1',
        CIRCUIT_BREAKER_SUCCESS_THRESHOLD: '1',
        CIRCUIT_BREAKER_RESET_TIMEOUT_MS: '1000',
      },
      routes: [
        {
          id: 'fail-get',
          path: '/fail',
          method: 'GET',
          upstream: `${upstream.url}/fail`,
          enabled: true,
          requireAuth: false,
          requireIdempotency: false,
          roles: [],
          timeoutMs: 1000,
        },
      ],
    });
  }, 60_000);

  afterAll(async () => {
    if (testApp !== undefined) await testApp.close();
    if (upstream !== undefined) await upstream.close();
    if (redisAvailable()) await cleanup();
  }, 60_000);

  it('opens circuit quickly on upstream failure and exposes circuit metric', async () => {
    if (
      !redisAvailable() ||
      testApp === undefined ||
      upstream === undefined ||
      failing === undefined
    )
      return;

    const server = testApp.app.getHttpServer();

    let sawFailure = false;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const response = await request(server).get('/api/fail');
      if (response.status >= 500) {
        sawFailure = true;
        break;
      }
    }
    expect(sawFailure).toBe(true);

    const metrics = await request(server).get('/metrics');
    expect(metrics.status).toBe(200);
    expect(metrics.text).toMatch(/gateway_circuit/);
    expect(failing.getCount()).toBeGreaterThan(0);
  });
});
