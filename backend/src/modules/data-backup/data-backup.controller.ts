import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { DataBackupService } from './data-backup.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('admin/data-backup')
@UseGuards(JwtAuthGuard)
@RequirePermissions('DataBackup')
export class DataBackupController {
  constructor(private readonly dataBackupService: DataBackupService) {}

  @Get('overview')
  async overview() {
    return this.dataBackupService.overview()
  }

  @Post('run')
  async run(
    @Body() payload: { triggerBy?: string },
    @CurrentUser() user: { username?: string } | null,
  ) {
    return this.dataBackupService.run(payload?.triggerBy || user?.username || 'admin')
  }
}
