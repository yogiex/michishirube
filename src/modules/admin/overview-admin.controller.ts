import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '@/shared/decorators/roles.decorator.js';
import { Scopes } from '@/shared/decorators/scopes.decorator.js';
import { RateLimit } from '@/shared/decorators/rate-limit.decorator.js';
import { GetOverviewUseCase } from '@/core/overview/application/get-overview.usecase.js';
import type { Overview } from '@/core/overview/domain/overview.entity.js';

@Controller('admin/overview')
@ApiTags('admin', 'overview')
@ApiBearerAuth()
@Roles('admin')
@Scopes('admin:*')
export class OverviewAdminController {
  constructor(private readonly getOverview: GetOverviewUseCase) {}

  @Get()
  @RateLimit({ ip: { limit: 60, windowSec: 60 } })
  async overview(): Promise<Overview> {
    return this.getOverview.execute();
  }
}
