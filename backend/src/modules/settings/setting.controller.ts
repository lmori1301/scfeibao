import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { SettingService } from './setting.service';
import { UpdateSettingDto } from './setting.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('admin/settings')
@UseGuards(JwtAuthGuard)
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
  update(@Param('key') key: string, @Body() dto: UpdateSettingDto) {
    return this.settingService.update(key, dto);
  }

  @Put('batch/update')
  batchUpdate(@Body() settings: Record<string, string>) {
    return this.settingService.batchUpdate(settings);
  }
}
