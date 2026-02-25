import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebsiteConfig } from './entities/config.entity';
import { UpdateConfigDto } from './dto/update-config.dto';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(WebsiteConfig)
    private configRepository: Repository<WebsiteConfig>,
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

  async updateConfig(updateConfigDto: UpdateConfigDto) {
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

    return await this.configRepository.save(config);
  }
}
