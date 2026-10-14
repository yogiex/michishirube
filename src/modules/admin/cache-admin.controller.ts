import { Body, Controller, HttpCode, Logger, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InvalidateCacheUseCase } from '@/core/cache/application/invalidate-cache.usecase.js';
import type { Principal } from '@/core/auth/domain/principal.entity.js';
import { RateLimit, Roles, Scopes } from '@/shared/decorators/index.js';
import { ZodValidationPipe } from '@/shared/pipes/index.js';
import { InvalidateCacheDtoSchema, type InvalidateCacheDto } from './dto/cache.dto.js';

interface AdminRequest {
  readonly user?: Principal;
}

type InvalidationType = 'key' | 'tenant' | 'pattern';

interface InvalidationResult {
  readonly ok: true;
  readonly invalidated: number;
  readonly target: string;
  readonly invalidationType: InvalidationType;
}

function maskTarget(target: string): string {
  if (target.length <= 4) return '*'.repeat(target.length);
  return `${target.slice(0, 2)}${'*'.repeat(Math.min(target.length - 4, 8))}${target.slice(-2)}`;
}

@Controller('admin/cache')
@ApiTags('admin', 'cache')
@ApiBearerAuth()
@Roles('admin')
@Scopes('admin:*')
export class CacheAdminController {
  private readonly logger = new Logger(CacheAdminController.name);

  constructor(private readonly invalidate: InvalidateCacheUseCase) {}

  @Post('invalidate')
  @HttpCode(200)
  @RateLimit({ ip: { limit: 10, windowSec: 60 } })
  async invalidateCache(
    @Body(new ZodValidationPipe(InvalidateCacheDtoSchema)) dto: InvalidateCacheDto,
    @Req() req: AdminRequest,
  ): Promise<InvalidationResult> {
    const invalidated = await this.invalidate.execute(dto);
    const target = dto.key ?? dto.tenantId ?? dto.pattern ?? 'unknown';
    const invalidationType: InvalidationType = dto.key
      ? 'key'
      : dto.tenantId
        ? 'tenant'
        : 'pattern';
    const actor = req.user?.userId ?? 'unknown';
    this.logger.log(
      {
        actor,
        action: 'cache.invalidate',
        target: maskTarget(target),
        invalidated,
        invalidationType,
      },
      'Cache invalidated by admin',
    );
    return { ok: true, invalidated, target, invalidationType };
  }
}
