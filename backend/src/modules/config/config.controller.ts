import { Controller, Get, Post, Body } from '@nestjs/common';
import { ConfigService } from './config.service';
import { UpdateConfigDto } from './dto/update-config.dto';
import { Public } from '../../common/decorators/public.decorator';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  @Public()
  async getAllConfig() {
    return await this.configService.getAllConfig();
  }

  @Post()
  @RequirePermissions('SiteConfig')
  async updateConfig(@Body() updateConfigDto: UpdateConfigDto, @CurrentUser() user: { username?: string } | null) {
    return await this.configService.updateConfig(updateConfigDto, user?.username || 'system');
  }
}
