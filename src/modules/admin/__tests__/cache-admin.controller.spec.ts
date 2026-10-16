import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { InvalidateCacheUseCase } from '@/core/cache/application/invalidate-cache.usecase.js';
import { createPrincipal } from '@/core/auth/domain/principal.entity.js';
import { CacheAdminController } from '../cache-admin.controller.js';
import { InvalidateCacheDtoSchema } from '../dto/cache.dto.js';

function makeRequest(): { readonly user: ReturnType<typeof createPrincipal> } {
  return {
    user: createPrincipal({
      userId: 'admin-user',
      tenantId: 'tenant-1',
      roles: ['admin'],
      scopes: ['admin:*'],
      expiresAt: new Date('2030-01-01T00:00:00.000Z'),
    }),
  };
}

describe('CacheAdminController', () => {
  let execute: ReturnType<typeof vi.fn>;
  let controller: CacheAdminController;
  let log: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    vi.restoreAllMocks();
    execute = vi.fn().mockResolvedValue(0);
    const moduleRef = await Test.createTestingModule({
      controllers: [CacheAdminController],
      providers: [{ provide: InvalidateCacheUseCase, useValue: { execute } }],
    }).compile();
    controller = moduleRef.get(CacheAdminController);
    log = vi.spyOn(Logger.prototype, 'log').mockImplementation(() => undefined);
  });

  it('menginvalidasi berdasarkan key dan mencatat audit', async () => {
    execute.mockResolvedValue(5);

    const result = await controller.invalidateCache({ key: 'cache:orders:1' }, makeRequest());

    expect(result).toEqual({
      ok: true,
      invalidated: 5,
      target: 'cache:orders:1',
      invalidationType: 'key',
    });
    expect(execute).toHaveBeenCalledWith({ key: 'cache:orders:1' });
    expect(log).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'cache.invalidate', actor: 'admin-user', invalidated: 5 }),
      'Cache invalidated by admin',
    );
  });

  it('menginvalidasi berdasarkan tenant', async () => {
    execute.mockResolvedValue(3);

    const result = await controller.invalidateCache({ tenantId: 'tenant-1' }, makeRequest());

    expect(result.invalidated).toBe(3);
    expect(result.target).toBe('tenant-1');
    expect(result.invalidationType).toBe('tenant');
  });

  it('menginvalidasi berdasarkan pattern', async () => {
    execute.mockResolvedValue(2);

    const result = await controller.invalidateCache({ pattern: 'cache:tenant-1:*' }, makeRequest());

    expect(result.invalidated).toBe(2);
    expect(result.target).toBe('cache:tenant-1:*');
    expect(result.invalidationType).toBe('pattern');
  });

  it('meneruskan error dari use case', async () => {
    execute.mockRejectedValue(new Error('boom'));

    await expect(
      controller.invalidateCache({ key: 'cache:orders:1' }, makeRequest()),
    ).rejects.toThrow('boom');
    expect(log).not.toHaveBeenCalled();
  });
});

describe('InvalidateCacheDtoSchema', () => {
  it('menolak target kosong', () => {
    expect(InvalidateCacheDtoSchema.safeParse({}).success).toBe(false);
  });

  it('menolak pattern dengan karakter terlarang', () => {
    expect(InvalidateCacheDtoSchema.safeParse({ pattern: 'cache:/tenant' }).success).toBe(false);
  });

  it.each([{ key: 'cache:orders:1' }, { tenantId: 'tenant-1' }, { pattern: 'cache:tenant-1:*' }])(
    'menerima shape valid',
    (input) => {
      expect(InvalidateCacheDtoSchema.safeParse(input).success).toBe(true);
    },
  );
});
