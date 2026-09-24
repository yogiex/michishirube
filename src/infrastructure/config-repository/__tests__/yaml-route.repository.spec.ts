import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { ConfigService } from '@nestjs/config';
import { YamlRouteRepository } from '../yaml-route.repository.js';
import { InternalConfigError } from '@/shared/errors/index.js';

const VALID = `
routes:
  - id: r_orders_list
    path: /api/v1/orders
    method: GET
    upstream: https://jsonplaceholder.typicode.com/posts
    enabled: true
    requireAuth: false
    requireIdempotency: false
    roles: []
    rateLimit:
      limit: 100
      windowSec: 60
    timeoutMs: 5000
  - id: r_legacy_wildcard
    path: /api/v1/legacy/*
    method: ALL
    upstream: https://jsonplaceholder.typicode.com
    enabled: false
    requireAuth: false
    requireIdempotency: false
    roles: []
    timeoutMs: 5000
`;

async function expectConfigError(promise: Promise<unknown>): Promise<InternalConfigError> {
  try {
    await promise;
  } catch (cause) {
    expect(cause).toBeInstanceOf(InternalConfigError);
    if (cause instanceof InternalConfigError) return cause;
  }
  throw new Error('Expected InternalConfigError, tidak ada error dilempar');
}

describe('YamlRouteRepository', () => {
  let dir: string;
  let file: string;

  beforeEach(async () => {
    dir = await mkdtemp(join(tmpdir(), 'routes-'));
    file = join(dir, 'routes.yaml');
  });

  afterEach(async () => {
    await rm(dir, { recursive: true, force: true });
  });

  function makeRepo(path: string | undefined): YamlRouteRepository {
    const cfg: Pick<ConfigService, 'get'> = {
      get: ((key: string) =>
        key === 'routes.filePath' ? path : undefined) as ConfigService['get'],
    };
    return new YamlRouteRepository(cfg as ConfigService);
  }

  it('load routes valid via onModuleInit', async () => {
    await writeFile(file, VALID);
    const repo = makeRepo(file);
    await repo.onModuleInit();

    const routes = await repo.findAll();
    expect(routes).toHaveLength(2);
    expect(routes[0]?.id).toBe('r_orders_list');
    expect(routes[0]?.method).toBe('GET');
  });

  it('map entity: rateLimit disalin, createdAt ISO sekarang', async () => {
    await writeFile(file, VALID);
    const before = Date.now();
    const repo = makeRepo(file);
    await repo.reload();

    const routes = await repo.findAll();
    const first = routes[0];
    expect(first).toBeDefined();
    if (first === undefined) throw new Error('routes kosong');
    expect(first.rateLimit).toEqual({ limit: 100, windowSec: 60 });
    expect(first.enabled).toBe(true);
    expect(first.roles).toEqual([]);
    expect(first.timeoutMs).toBe(5000);
    expect(routes[1]?.rateLimit).toBeUndefined();
    expect(routes[1]?.enabled).toBe(false);

    const createdAt = Date.parse(first.createdAt);
    expect(Number.isNaN(createdAt)).toBe(false);
    expect(createdAt).toBeGreaterThanOrEqual(before - 1000);
  });

  it('pakai default path jika config kosong (baca config/routes.yaml asli)', async () => {
    const repo = makeRepo(undefined);
    await expect(repo.reload()).resolves.toBeUndefined();
    const routes = await repo.findAll();
    expect(routes.length).toBeGreaterThanOrEqual(4);
    expect(routes.map((r) => r.id)).toContain('r_orders_list');
    expect(routes.map((r) => r.id)).toContain('r_legacy_wildcard');
  });

  it('throw jika file tidak ada', async () => {
    const err = await expectConfigError(makeRepo(join(dir, 'nope.yaml')).reload());
    expect(err.message).toMatch(/tidak bisa dibaca/);
  });

  it('throw jika YAML invalid', async () => {
    await writeFile(file, 'routes: [invalid');
    await expect(makeRepo(file).reload()).rejects.toThrow(InternalConfigError);
  });

  it('throw jika skema invalid (method salah) + fieldErrors terisi', async () => {
    await writeFile(file, VALID.replace('method: GET', 'method: FETCH'));
    const err = await expectConfigError(makeRepo(file).reload());
    expect(err.fieldErrors.length).toBeGreaterThan(0);
    expect(err.fieldErrors.some((fe) => fe.field.includes('method'))).toBe(true);
  });

  it('throw jika upstream bukan http/https', async () => {
    await writeFile(
      file,
      VALID.replace('https://jsonplaceholder.typicode.com/posts', 'ftp://example.com/x'),
    );
    await expect(makeRepo(file).reload()).rejects.toThrow(InternalConfigError);
  });

  it('throw jika id duplikat', async () => {
    await writeFile(
      file,
      `
routes:
  - { id: r_dup, path: /a, method: GET, upstream: "https://a.example.com", enabled: true, requireAuth: false, requireIdempotency: false, roles: [], timeoutMs: 5000 }
  - { id: r_dup, path: /b, method: GET, upstream: "https://b.example.com", enabled: true, requireAuth: false, requireIdempotency: false, roles: [], timeoutMs: 5000 }
`,
    );
    await expect(makeRepo(file).reload()).rejects.toThrow(/duplikat/);
  });

  it('reload gagal tidak merusak state lama', async () => {
    await writeFile(file, VALID);
    const repo = makeRepo(file);
    await repo.reload();
    expect(await repo.findAll()).toHaveLength(2);

    await writeFile(file, 'routes: [broken');
    await expect(repo.reload()).rejects.toThrow(InternalConfigError);
    expect(await repo.findAll()).toHaveLength(2);
  });

  it('findAll mengembalikan snapshot readonly (array stabil antar reload)', async () => {
    await writeFile(file, VALID);
    const repo = makeRepo(file);
    await repo.reload();
    const first = await repo.findAll();
    const second = await repo.findAll();
    expect(second).toEqual(first);
  });
});
