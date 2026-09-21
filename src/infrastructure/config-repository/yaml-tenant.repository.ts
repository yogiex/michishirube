import { Injectable, Logger, type OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { parse } from 'yaml';
import { z } from 'zod';
import { none, some, type Option } from '@/shared/types/index.js';
import { InternalConfigError } from '@/shared/errors/index.js';
import type { TenantRepositoryPort } from '@/core/tenant/domain/tenant.repository.port.js';
import {
  createTenantId,
  isValidTenantId,
  tenantIdToString,
  type TenantId,
} from '@/core/tenant/domain/tenant-id.vo.js';
import { TENANT_STATUSES, TENANT_TIERS, type Tenant } from '@/core/tenant/domain/tenant.entity.js';

export const DEFAULT_TENANTS_FILE = './config/tenants.yaml';

const TenantSchema = z.object({
  id: z.string().refine(isValidTenantId, 'id harus slug valid'),
  slug: z.string().refine(isValidTenantId, 'slug harus slug valid'),
  name: z.string().min(1).max(200),
  status: z.enum(TENANT_STATUSES),
  tier: z.enum(TENANT_TIERS),
});

const TenantsFileSchema = z.object({
  tenants: z.array(TenantSchema),
});

type TenantRaw = z.infer<typeof TenantSchema>;

@Injectable()
export class YamlTenantRepository implements TenantRepositoryPort, OnModuleInit {
  private readonly logger = new Logger(YamlTenantRepository.name);
  private byId = new Map<string, Tenant>();
  private bySlug = new Map<string, Tenant>();

  constructor(private readonly config: ConfigService) {}

  async onModuleInit(): Promise<void> {
    await this.reload();
  }

  async reload(): Promise<void> {
    const filePath = this.config.get<string>('tenants.filePath') ?? DEFAULT_TENANTS_FILE;
    const abs = resolve(process.cwd(), filePath);

    const raw = await this.readSource(abs);
    const parsed = this.parseYaml(raw, abs);
    const validated = TenantsFileSchema.safeParse(parsed);
    if (!validated.success) {
      throw new InternalConfigError('Skema tenants.yaml tidak valid', {
        fieldErrors: validated.error.issues.map((i) => ({
          field: i.path.join('.'),
          code: i.code,
          message: i.message,
        })),
      });
    }

    const { byId, bySlug } = this.index(validated.data.tenants);
    this.byId = byId;
    this.bySlug = bySlug;
    this.logger.log({ count: byId.size, filePath }, 'Tenants loaded');
  }

  async findById(id: TenantId): Promise<Option<Tenant>> {
    const found = this.byId.get(tenantIdToString(id));
    return found ? some(found) : none();
  }

  async findBySlug(slug: string): Promise<Option<Tenant>> {
    const found = this.bySlug.get(slug);
    return found ? some(found) : none();
  }

  private async readSource(abs: string): Promise<string> {
    try {
      return await readFile(abs, 'utf8');
    } catch (cause) {
      throw new InternalConfigError('File tenants tidak bisa dibaca', {
        meta: { filePath: abs },
        cause,
      });
    }
  }

  private parseYaml(raw: string, abs: string): unknown {
    try {
      return parse(raw) as unknown;
    } catch (cause) {
      throw new InternalConfigError('YAML tenants tidak valid', {
        meta: { filePath: abs },
        cause,
      });
    }
  }

  private index(rows: readonly TenantRaw[]): {
    byId: Map<string, Tenant>;
    bySlug: Map<string, Tenant>;
  } {
    const byId = new Map<string, Tenant>();
    const bySlug = new Map<string, Tenant>();

    for (const row of rows) {
      const entity = this.toEntity(row);
      if (byId.has(row.id)) {
        throw new InternalConfigError(`Tenant id duplikat: ${row.id}`);
      }
      if (bySlug.has(entity.slug)) {
        throw new InternalConfigError(`Tenant slug duplikat: ${entity.slug}`);
      }
      byId.set(row.id, entity);
      bySlug.set(entity.slug, entity);
    }

    return { byId, bySlug };
  }

  private toEntity(raw: TenantRaw): Tenant {
    const now = new Date();
    return {
      id: createTenantId(raw.id),
      slug: raw.slug,
      name: raw.name,
      status: raw.status,
      tier: raw.tier,
      createdAt: now,
      updatedAt: now,
    };
  }
}
