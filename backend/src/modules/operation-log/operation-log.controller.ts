import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { OperationLogService } from './operation-log.service';

@Controller('admin/operation-logs')
@UseGuards(JwtAuthGuard)
@RequirePermissions('OperationLog')
export class OperationLogController {
  constructor(private readonly operationLogService: OperationLogService) {}

  @Get()
  async list(@Query() query: { username?: string; action?: string; page?: number; pageSize?: number }) {
    return this.operationLogService.list(query)
  }

  @Get('export')
  async export(@Query() query: { username?: string; action?: string }) {
    return this.operationLogService.export(query)
  }
}
