import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { ConfigService } from '@nestjs/config';
import { YamlTenantRepository } from '../yaml-tenant.repository.js';
import { createTenantId } from '@/core/tenant/domain/tenant-id.vo.js';
import { InternalConfigError } from '@/shared/errors/index.js';

const VALID = `
tenants:
  - id: t_001
    slug: acme
    name: Acme
    status: active
    tier: pro
`;

describe('YamlTenantRepository', () => {
  let dir: string;
  let file: string;

  beforeEach(async () => {
    dir = await mkdtemp(join(tmpdir(), 'tenants-'));
    file = join(dir, 'tenants.yaml');
  });

  afterEach(async () => {
    await rm(dir, { recursive: true, force: true });
  });

  function makeRepo(path: string | undefined): YamlTenantRepository {
    const cfg: Pick<ConfigService, 'get'> = {
      get: ((key: string) =>
        key === 'tenants.filePath' ? path : undefined) as ConfigService['get'],
    };
    return new YamlTenantRepository(cfg as ConfigService);
  }

  it('load tenants valid via onModuleInit', async () => {
    await writeFile(file, VALID);
    const repo = makeRepo(file);
    await repo.onModuleInit();

    const opt = await repo.findById(createTenantId('t_001'));
    expect(opt.some && opt.value.name).toBe('Acme');
  });

  it('findBySlug mengembalikan tenant', async () => {
    await writeFile(file, VALID);
    const repo = makeRepo(file);
    await repo.reload();
    const opt = await repo.findBySlug('acme');
    expect(opt.some && opt.value.slug).toBe('acme');
  });

  it('unknown -> none', async () => {
    await writeFile(file, 'tenants: []');
    const repo = makeRepo(file);
    await repo.reload();
    expect((await repo.findById(createTenantId('unknown'))).some).toBe(false);
    expect((await repo.findBySlug('unknown')).some).toBe(false);
  });

  it('pakai default path jika config kosong', async () => {
    const repo = makeRepo(undefined);
    await expect(repo.reload()).resolves.toBeUndefined();
    expect((await repo.findBySlug('acme')).some).toBe(true);
  });

  it('throw jika file tidak ada', async () => {
    await expect(makeRepo(join(dir, 'nope.yaml')).reload()).rejects.toThrow(InternalConfigError);
  });

  it('throw jika YAML invalid', async () => {
    await writeFile(file, 'tenants: [invalid');
    await expect(makeRepo(file).reload()).rejects.toThrow(InternalConfigError);
  });

  it('throw jika skema invalid (status, id berbahaya)', async () => {
    await writeFile(file, VALID.replace('active', 'INVALID_STATUS'));
    await expect(makeRepo(file).reload()).rejects.toThrow(InternalConfigError);

    await writeFile(file, VALID.replace('t_001', '"../etc"'));
    await expect(makeRepo(file).reload()).rejects.toThrow(InternalConfigError);
  });

  it('throw jika id duplikat', async () => {
    await writeFile(
      file,
      `
tenants:
  - { id: t_001, slug: acme, name: Acme, status: active, tier: pro }
  - { id: t_001, slug: beta, name: Beta, status: active, tier: pro }
`,
    );
    await expect(makeRepo(file).reload()).rejects.toThrow(/duplikat/);
  });

  it('throw jika slug duplikat', async () => {
    await writeFile(
      file,
      `
tenants:
  - { id: t_001, slug: acme, name: Acme, status: active, tier: pro }
  - { id: t_002, slug: acme, name: Beta, status: active, tier: pro }
`,
    );
    await expect(makeRepo(file).reload()).rejects.toThrow(/duplikat/);
  });

  it('reload gagal tidak merusak state lama', async () => {
    await writeFile(file, VALID);
    const repo = makeRepo(file);
    await repo.reload();
    await writeFile(file, 'tenants: [broken');
    await expect(repo.reload()).rejects.toThrow();
    expect((await repo.findBySlug('acme')).some).toBe(true);
  });
});
