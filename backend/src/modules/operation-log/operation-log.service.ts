import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from '../settings/setting.entity';

export type OperationLogItem = {
  id: number
  username: string
  action: string
  module: string
  ip: string
  time: string
}

const DEFAULT_OPERATION_LOGS: OperationLogItem[] = [
  { id: 1, username: 'admin', action: '登录系统', module: '认证', ip: '127.0.0.1', time: '2026-04-24 10:30:00' },
  { id: 2, username: 'admin', action: '编辑新闻', module: '新闻管理', ip: '127.0.0.1', time: '2026-04-24 10:35:00' },
  { id: 3, username: 'admin', action: '更新网站配置', module: '网站配置', ip: '127.0.0.1', time: '2026-04-24 10:40:00' },
]

@Injectable()
export class OperationLogService {
  private static readonly STORAGE_KEY = 'admin_operation_logs'

  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {}

  private async loadItems() {
    const setting = await this.settingRepository.findOne({
      where: { key: OperationLogService.STORAGE_KEY },
    })
    if (!setting) {
      await this.settingRepository.save(
        this.settingRepository.create({
          key: OperationLogService.STORAGE_KEY,
          value: JSON.stringify(DEFAULT_OPERATION_LOGS),
          description: '后台操作日志',
          type: 'json',
        }),
      )
      return [...DEFAULT_OPERATION_LOGS]
    }

    try {
      const parsed = JSON.parse(setting.value)
      return Array.isArray(parsed) ? (parsed as OperationLogItem[]) : [...DEFAULT_OPERATION_LOGS]
    } catch {
      return [...DEFAULT_OPERATION_LOGS]
    }
  }

  private async saveItems(items: OperationLogItem[]) {
    const setting = await this.settingRepository.findOne({
      where: { key: OperationLogService.STORAGE_KEY },
    })
    if (setting) {
      setting.value = JSON.stringify(items)
      setting.type = 'json'
      setting.description = '后台操作日志'
      await this.settingRepository.save(setting)
      return
    }

    await this.settingRepository.save(
      this.settingRepository.create({
        key: OperationLogService.STORAGE_KEY,
        value: JSON.stringify(items),
        description: '后台操作日志',
        type: 'json',
      }),
    )
  }

  async list(query: { username?: string; action?: string; page?: number; pageSize?: number }) {
    const page = Number(query.page || 1)
    const pageSize = Number(query.pageSize || 20)
    const username = String(query.username || '').trim()
    const action = String(query.action || '').trim()
    const items = await this.loadItems()

    const filtered = items.filter((item) => {
      if (username && !item.username.includes(username)) return false
      if (action && !item.action.includes(action)) return false
      return true
    })

    const start = (page - 1) * pageSize
    return {
      list: filtered.slice(start, start + pageSize),
      total: filtered.length,
      page,
      pageSize,
    }
  }

  async export(query: { username?: string; action?: string }) {
    const items = await this.loadItems()
    const data = await this.list({ ...query, page: 1, pageSize: items.length || DEFAULT_OPERATION_LOGS.length })
    return data.list
  }

  async record(entry: Omit<OperationLogItem, 'id' | 'time'> & { time?: string }) {
    const items = await this.loadItems()
    const nextId = items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1
    const time = entry.time || new Date().toISOString().slice(0, 19).replace('T', ' ')
    const record: OperationLogItem = {
      id: nextId,
      username: entry.username,
      action: entry.action,
      module: entry.module,
      ip: entry.ip,
      time,
    }
    const next = [record, ...items].slice(0, 500)
    await this.saveItems(next)
    return record
  }
}
