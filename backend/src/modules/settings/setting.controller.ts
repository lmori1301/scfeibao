import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { SettingService } from './setting.service';
import { UpdateSettingDto } from './setting.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('admin/settings')
@UseGuards(JwtAuthGuard)
@RequirePermissions('SiteConfig')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get()
  findAll() {
    return this.settingService.findAll();
  }

  @Get(':key')
  findByKey(@Param('key') key: string) {
    return this.settingService.findByKey(key);
  }

  @Put(':key')
  update(@Param('key') key: string, @Body() dto: UpdateSettingDto, @CurrentUser() user: { username?: string } | null) {
    return this.settingService.update(key, dto, user?.username || 'system');
  }

  @Put('batch/update')
  batchUpdate(@Body() settings: Record<string, string>, @CurrentUser() user: { username?: string } | null) {
    return this.settingService.batchUpdate(settings, user?.username || 'system');
  }
}
