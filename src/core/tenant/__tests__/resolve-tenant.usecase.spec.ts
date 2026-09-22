import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { ResolveTenantUseCase } from '../application/resolve-tenant.usecase.js';
import { createTenantId } from '../domain/tenant-id.vo.js';
import type { TenantRepositoryPort } from '../domain/tenant.repository.port.js';
import type { Tenant } from '../domain/tenant.entity.js';
import { none, some } from '@/shared/types/index.js';
import {
  TenantInactiveError,
  TenantMismatchError,
  TenantMissingError,
  TenantSuspendedError,
  TenantUnknownError,
} from '@/shared/errors/index.js';

function makeTenant(over: Partial<Tenant> = {}): Tenant {
  const now = new Date();
  return {
    id: createTenantId('acme'),
    slug: 'acme',
    name: 'Acme',
    status: 'active',
    tier: 'pro',
    createdAt: now,
    updatedAt: now,
    ...over,
  };
}

type MockedRepo = {
  [K in keyof TenantRepositoryPort]: Mock<TenantRepositoryPort[K]>;
};

function makeRepo(): MockedRepo {
  return {
    findById: vi.fn<TenantRepositoryPort['findById']>(),
    findBySlug: vi.fn<TenantRepositoryPort['findBySlug']>(),
    reload: vi.fn<TenantRepositoryPort['reload']>(),
  };
}

describe('ResolveTenantUseCase', () => {
  let repo: MockedRepo;
  let uc: ResolveTenantUseCase;

  beforeEach(() => {
    repo = makeRepo();
    uc = new ResolveTenantUseCase(repo);
  });

  it('throw TenantMissingError jika tidak ada sumber', async () => {
    await expect(uc.execute({})).rejects.toThrow(TenantMissingError);
    await expect(uc.execute({ jwtTenantId: '', headerTenantId: '' })).rejects.toThrow(
      TenantMissingError,
    );
  });

  it('resolve dari JWT (prioritas tertinggi)', async () => {
    repo.findById.mockResolvedValue(some(makeTenant()));
    const out = await uc.execute({
      jwtTenantId: 'acme',
      subdomain: 'other',
      headerTenantId: 'acme',
    });
    expect(out.source).toBe('jwt');
    expect(out.tenant.slug).toBe('acme');
    expect(repo.findBySlug).not.toHaveBeenCalled();
  });

  it('resolve dari subdomain jika JWT kosong', async () => {
    repo.findBySlug.mockResolvedValue(some(makeTenant()));
    const out = await uc.execute({ subdomain: 'ACME', headerTenantId: 'beta' });
    expect(out.source).toBe('subdomain');
    expect(repo.findBySlug).toHaveBeenCalledWith('acme');
  });

  it('resolve dari header jika JWT & subdomain kosong', async () => {
    repo.findById.mockResolvedValue(some(makeTenant()));
    const out = await uc.execute({ headerTenantId: 'acme' });
    expect(out.source).toBe('header');
  });

  it('throw TenantMismatchError jika JWT != header dan tidak menyentuh repo', async () => {
    await expect(uc.execute({ jwtTenantId: 'acme', headerTenantId: 'beta' })).rejects.toThrow(
      TenantMismatchError,
    );
    expect(repo.findById).not.toHaveBeenCalled();
    expect(repo.findBySlug).not.toHaveBeenCalled();
  });

  it('throw TenantUnknownError jika subdomain tidak terdaftar', async () => {
    repo.findBySlug.mockResolvedValue(none());
    await expect(uc.execute({ subdomain: 'unknown' })).rejects.toThrow(TenantUnknownError);
  });

  it('throw TenantUnknownError jika id tidak terdaftar', async () => {
    repo.findById.mockResolvedValue(none());
    await expect(uc.execute({ headerTenantId: 'ghost' })).rejects.toThrow(TenantUnknownError);
  });

  it('throw TenantUnknownError jika id invalid tanpa menyentuh repo', async () => {
    for (const bad of ['!', "' OR 1=1--", '../x', 'A'.repeat(100)]) {
      await expect(uc.execute({ headerTenantId: bad })).rejects.toThrow(TenantUnknownError);
    }
    expect(repo.findById).not.toHaveBeenCalled();
  });

  it('error tidak membocorkan raw id ke pesan', async () => {
    const raw = "evil'--";
    const err = await uc.execute({ headerTenantId: raw }).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(TenantUnknownError);
    expect((err as Error).message).not.toContain(raw);
  });

  it('throw TenantSuspendedError jika status suspended', async () => {
    repo.findById.mockResolvedValue(some(makeTenant({ status: 'suspended' })));
    await expect(uc.execute({ jwtTenantId: 'acme' })).rejects.toThrow(TenantSuspendedError);
  });

  it('throw TenantInactiveError jika status inactive', async () => {
    repo.findById.mockResolvedValue(some(makeTenant({ status: 'inactive' })));
    await expect(uc.execute({ jwtTenantId: 'acme' })).rejects.toThrow(TenantInactiveError);
  });
});
