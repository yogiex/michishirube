import { getCurrentSuite } from 'vitest/suite';
import { closeTestRedis, flushTestRedis, isTestRedisAvailable } from './redis.helper.js';

export async function cleanup(): Promise<void> {
  await flushTestRedis();
  await closeTestRedis();
}

export async function waitUntil(
  predicate: () => boolean | Promise<boolean>,
  timeoutMs = 5_000,
  intervalMs = 50,
): Promise<void> {
  const startedAt = Date.now();
  while (!(await predicate())) {
    if (Date.now() - startedAt >= timeoutMs) {
      throw new Error(`Kondisi tidak terpenuhi dalam ${timeoutMs} ms`);
    }
    await new Promise<void>((resolve) => setTimeout(resolve, intervalMs));
  }
}

export async function skipIfRedisUnavailable(): Promise<void> {
  if (await isTestRedisAvailable()) return;

  const suite = getCurrentSuite();
  suite.options = { ...suite.options, skip: true };
}
