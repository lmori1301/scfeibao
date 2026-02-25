import { Controller, Get, Post, Body } from '@nestjs/common';
import { ConfigService } from './config.service';
import { UpdateConfigDto } from './dto/update-config.dto';
import { Public } from '../../common/decorators/public.decorator';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  @Public()
  async getAllConfig() {
    return await this.configService.getAllConfig();
  }

  @Post()
  @Public()
  async updateConfig(@Body() updateConfigDto: UpdateConfigDto) {
    return await this.configService.updateConfig(updateConfigDto);
  }
}
