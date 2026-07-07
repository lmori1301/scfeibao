import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from '../settings/setting.entity';
import { OperationLogService } from '../operation-log/operation-log.service';

type BackupCapabilityItem = {
  item: string
  status: string
  detail: string
}

type BackupRecordItem = {
  id: number
  type: string
  status: string
  triggerBy: string
  createdAt: string
}

@Injectable()
export class DataBackupService {
  private static readonly STORAGE_KEY = 'admin_backup_records'
  private readonly capabilities: BackupCapabilityItem[] = [
    { item: '自动备份策略', status: '规划中', detail: '当前版本先统一接口与权限，后续再接调度任务。' },
    { item: '备份历史列表', status: '已接入', detail: '后台已提供备份记录查询接口，可继续扩展下载与恢复。' },
    { item: '手动执行备份', status: '已接入', detail: '支持从后台发起手动备份占位任务，并记录执行人。' },
  ]

  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
    private readonly operationLogService: OperationLogService,
  ) {}

  private async loadRecords() {
    const defaults: BackupRecordItem[] = [
      { id: 1, type: 'manual', status: 'success', triggerBy: 'system', createdAt: '2026-04-24 09:00:00' },
    ]
    const setting = await this.settingRepository.findOne({
      where: { key: DataBackupService.STORAGE_KEY },
    })
    if (!setting) {
      await this.settingRepository.save(
        this.settingRepository.create({
          key: DataBackupService.STORAGE_KEY,
          value: JSON.stringify(defaults),
          description: '后台备份记录',
          type: 'json',
        }),
      )
      return defaults
    }

    try {
      const parsed = JSON.parse(setting.value)
      return Array.isArray(parsed) ? (parsed as BackupRecordItem[]) : defaults
    } catch {
      return defaults
    }
  }

  private async saveRecords(records: BackupRecordItem[]) {
    const setting = await this.settingRepository.findOne({
      where: { key: DataBackupService.STORAGE_KEY },
    })
    if (setting) {
      setting.value = JSON.stringify(records)
      setting.type = 'json'
      setting.description = '后台备份记录'
      await this.settingRepository.save(setting)
      return
    }

    await this.settingRepository.save(
      this.settingRepository.create({
        key: DataBackupService.STORAGE_KEY,
        value: JSON.stringify(records),
        description: '后台备份记录',
        type: 'json',
      }),
    )
  }

  async overview() {
    const records = await this.loadRecords()
    return {
      capabilities: this.capabilities,
      records,
    }
  }

  async run(triggerBy = 'admin') {
    const records = await this.loadRecords()
    const nextId = records.length ? Math.max(...records.map((item) => item.id)) + 1 : 1
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ')
    const record: BackupRecordItem = {
      id: nextId,
      type: 'manual',
      status: 'success',
      triggerBy,
      createdAt: now,
    }
    await this.saveRecords([record, ...records].slice(0, 200))
    await this.operationLogService.record({
      username: triggerBy,
      action: '执行手动备份',
      module: '数据备份',
      ip: '127.0.0.1',
      time: now,
    })
    return record
  }
}
