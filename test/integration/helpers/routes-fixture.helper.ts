import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { stringify } from 'yaml';

export interface RouteFixture {
  readonly id: string;
  readonly path: string;
  readonly method: string;
  readonly upstream: string;
  readonly enabled?: boolean;
  readonly requireAuth?: boolean;
  readonly requireIdempotency?: boolean;
  readonly roles?: readonly string[];
  readonly rateLimit?: { readonly limit: number; readonly windowSec: number };
  readonly timeoutMs?: number;
}

export interface TenantFixture {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly status: 'active' | 'suspended' | 'inactive';
  readonly tier: 'free' | 'pro' | 'enterprise';
}

async function createFixtureDir(): Promise<string> {
  return mkdtemp(join(tmpdir(), 'api-gateway-test-'));
}

export async function writeRoutesFixture(routes: readonly RouteFixture[]): Promise<string> {
  const dir = await createFixtureDir();
  const filePath = join(dir, 'routes.yaml');
  await writeFile(filePath, stringify({ routes }), 'utf8');
  return filePath;
}

export async function writeTenantsFixture(tenants: readonly TenantFixture[]): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), 'api-gateway-test-'));
  const filePath = join(dir, 'tenants.yaml');
  await writeFile(filePath, stringify({ tenants }), 'utf8');
  return filePath;
}

export async function removeFixtureDir(path: string): Promise<void> {
  try {
    await rm(path, { recursive: true, force: true });
  } catch {
    return;
  }
}

export async function withFixtures<T>(
  run: (paths: { routesFile: string; tenantsFile: string }) => Promise<T>,
  input: { routes: readonly RouteFixture[]; tenants: readonly TenantFixture[] },
): Promise<T> {
  const routesFile = await writeRoutesFixture(input.routes);
  const dir = routesFile.slice(0, routesFile.lastIndexOf('/'));
  const tenantsFile = join(dir, 'tenants.yaml');
  await mkdir(dir, { recursive: true });
  await writeFile(tenantsFile, stringify({ tenants: input.tenants }), 'utf8');
  try {
    return await run({ routesFile, tenantsFile });
  } finally {
    await removeFixtureDir(dir);
  }
}
