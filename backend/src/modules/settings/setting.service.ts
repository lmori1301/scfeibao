import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './setting.entity';
import { UpdateSettingDto } from './setting.dto';
import { OperationLogService } from '../operation-log/operation-log.service';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting)
    private settingRepository: Repository<Setting>,
    private operationLogService: OperationLogService,
  ) {}

  async findAll() {
    return await this.settingRepository.find();
  }

  async findByKey(key: string) {
    const setting = await this.settingRepository.findOne({ where: { key } });
    if (!setting) throw new NotFoundException('设置不存在');
    return setting;
  }

  async update(key: string, dto: UpdateSettingDto, actor = 'system') {
    const setting = await this.settingRepository.findOne({ where: { key } });
    if (!setting) throw new NotFoundException('设置不存在');

    Object.assign(setting, dto);
    const saved = await this.settingRepository.save(setting);
    await this.operationLogService.record({
      username: actor,
      action: `更新系统设置：${key}`,
      module: '网站配置',
      ip: '127.0.0.1',
    })
    return saved;
  }

  async batchUpdate(settings: Record<string, string>, actor = 'system') {
    const results = [];
    for (const [key, value] of Object.entries(settings)) {
      const setting = await this.settingRepository.findOne({ where: { key } });
      if (setting) {
        setting.value = value;
        results.push(await this.settingRepository.save(setting));
      }
    }
    if (results.length) {
      await this.operationLogService.record({
        username: actor,
        action: `批量更新系统设置（${results.length}项）`,
        module: '网站配置',
        ip: '127.0.0.1',
      })
    }
    return results;
  }
}
