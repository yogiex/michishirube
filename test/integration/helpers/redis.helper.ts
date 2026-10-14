import { Redis } from 'ioredis';
import type { Redis as RedisClient } from 'ioredis';

let client: RedisClient | undefined;
let availabilityPromise: Promise<boolean> | undefined;

function getPrefix(): string {
  return `${process.env.REDIS_KEY_PREFIX ?? 'gw'}:`;
}

function parseJson(raw: string): unknown {
  const parsed: unknown = JSON.parse(raw);
  return parsed;
}

export function getTestRedis(): RedisClient {
  client ??= new Redis({
    host: process.env.REDIS_HOST ?? 'localhost',
    port: Number(process.env.REDIS_PORT ?? 6379),
    password: process.env.REDIS_PASSWORD || undefined,
    db: Number(process.env.REDIS_DB ?? 0),
    maxRetriesPerRequest: 2,
    connectTimeout: 1_000,
    lazyConnect: true,
    enableOfflineQueue: false,
  });

  return client;
}

export async function isTestRedisAvailable(): Promise<boolean> {
  availabilityPromise ??= getTestRedis()
    .ping()
    .then(() => true)
    .catch(() => false);
  return availabilityPromise;
}

export async function flushTestRedis(): Promise<void> {
  const redis = getTestRedis();
  const pattern = `${getPrefix()}*`;
  let cursor = '0';

  do {
    const [nextCursor, keys] = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
    cursor = nextCursor;
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } while (cursor !== '0');
}

export async function closeTestRedis(): Promise<void> {
  availabilityPromise = undefined;
  if (client === undefined) return;
  const activeClient = client;
  client = undefined;
  await activeClient.quit();
}

export async function countKeys(pattern: string): Promise<number> {
  const redis = getTestRedis();
  const fullPattern = `${getPrefix()}${pattern}`;
  let cursor = '0';
  let count = 0;

  do {
    const [nextCursor, keys] = await redis.scan(cursor, 'MATCH', fullPattern, 'COUNT', 100);
    cursor = nextCursor;
    count += keys.length;
  } while (cursor !== '0');

  return count;
}

export async function getJson(key: string): Promise<unknown> {
  const raw = await getTestRedis().get(`${getPrefix()}${key}`);
  return raw === null ? null : parseJson(raw);
}

export async function deleteKeys(keys: readonly string[]): Promise<void> {
  if (keys.length === 0) return;
  await getTestRedis().del(...keys.map((key) => `${getPrefix()}${key}`));
}
