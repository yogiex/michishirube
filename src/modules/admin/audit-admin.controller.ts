import { Controller, Get, Logger, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ListAuditUseCase } from '@/core/audit/application/list-audit.usecase.js';
import { RateLimit, Roles, Scopes } from '@/shared/decorators/index.js';
import { ZodValidationPipe } from '@/shared/pipes/index.js';
import { ListAuditDtoSchema, type ListAuditDto } from './dto/audit.dto.js';

@Controller('admin/audit')
@ApiTags('admin', 'audit')
@ApiBearerAuth()
@Roles('admin')
@Scopes('admin:*')
export class AuditAdminController {
  private readonly logger = new Logger(AuditAdminController.name);

  constructor(private readonly listAudit: ListAuditUseCase) {}

  @Get()
  @RateLimit({ ip: { limit: 30, windowSec: 60 } })
  async list(@Query(new ZodValidationPipe(ListAuditDtoSchema)) dto: ListAuditDto) {
    return this.listAudit.execute(dto);
  }
}
