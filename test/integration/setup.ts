import { connect } from 'node:net';

let available = false;

export function redisAvailable(): boolean {
  return available;
}

async function checkRedis(): Promise<boolean> {
  const host = process.env.REDIS_HOST ?? 'localhost';
  const port = Number(process.env.REDIS_PORT ?? 6379);

  return new Promise<boolean>((resolve) => {
    const socket = connect({ host, port });
    const finish = (result: boolean): void => {
      socket.destroy();
      resolve(result);
    };

    socket.setTimeout(1_000);
    socket.once('connect', () => finish(true));
    socket.once('error', () => finish(false));
    socket.once('timeout', () => finish(false));
  });
}

beforeAll(async () => {
  try {
    available = await checkRedis();
  } catch {
    available = false;
  }

  process.stdout.write(
    `Integration Redis ${available ? 'tersedia' : 'tidak tersedia'}; suite yang memerlukan Redis akan dilewati\n`,
  );
}, 30_000);

afterAll(() => {
  available = false;
}, 10_000);
