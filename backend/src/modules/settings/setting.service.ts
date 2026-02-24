import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './setting.entity';
import { UpdateSettingDto } from './setting.dto';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting)
    private settingRepository: Repository<Setting>,
  ) {}

  async findAll() {
    return await this.settingRepository.find();
  }

  async findByKey(key: string) {
    const setting = await this.settingRepository.findOne({ where: { key } });
    if (!setting) throw new NotFoundException('设置不存在');
    return setting;
  }

  async update(key: string, dto: UpdateSettingDto) {
    const setting = await this.settingRepository.findOne({ where: { key } });
    if (!setting) throw new NotFoundException('设置不存在');

    Object.assign(setting, dto);
    return await this.settingRepository.save(setting);
  }

  async batchUpdate(settings: Record<string, string>) {
    const results = [];
    for (const [key, value] of Object.entries(settings)) {
      const setting = await this.settingRepository.findOne({ where: { key } });
      if (setting) {
        setting.value = value;
        results.push(await this.settingRepository.save(setting));
      }
    }
    return results;
  }
}
