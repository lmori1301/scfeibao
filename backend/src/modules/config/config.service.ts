import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebsiteConfig } from './entities/config.entity';
import { UpdateConfigDto } from './dto/update-config.dto';
import { OperationLogService } from '../operation-log/operation-log.service';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(WebsiteConfig)
    private configRepository: Repository<WebsiteConfig>,
    private operationLogService: OperationLogService,
  ) {}

  async getAllConfig() {
    const configs = await this.configRepository.find();
    const result = {};
    configs.forEach(config => {
      result[config.key] = config.value;
    });
    return result;
  }

  async getConfigByKey(key: string) {
    return await this.configRepository.findOne({ where: { key } });
  }

  async updateConfig(updateConfigDto: UpdateConfigDto, actor = 'system') {
    const { key, value, description } = updateConfigDto;
    let config = await this.configRepository.findOne({ where: { key } });

    if (config) {
      config.value = value;
      if (description !== undefined) {
        config.description = description;
      }
    } else {
      config = this.configRepository.create({ key, value, description });
    }

    const saved = await this.configRepository.save(config);
    await this.operationLogService.record({
      username: actor,
      action: `更新网站配置：${saved.key}`,
      module: '网站配置',
      ip: '127.0.0.1',
    })
    return saved;
  }
}
