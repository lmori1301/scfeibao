import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from '../settings/setting.entity';
import { OperationLogService } from '../operation-log/operation-log.service';

export type NavigationItem = {
  id: number
  name: string
  path: string
  source: string
  visible: boolean
  sort: number
}

const DEFAULT_NAV_ITEMS: NavigationItem[] = [
  { id: 1, name: '首页', path: '/', source: 'src/components/common/AppHeader.vue', visible: true, sort: 1 },
  { id: 2, name: '概况信息', path: '/overview-info', source: 'src/components/common/AppHeader.vue', visible: true, sort: 2 },
  { id: 3, name: '党建专栏', path: '/party-building', source: 'src/components/common/AppHeader.vue', visible: true, sort: 3 },
  { id: 4, name: '动态要闻', path: '/dynamic-news', source: 'src/components/common/AppHeader.vue', visible: true, sort: 4 },
  { id: 5, name: '队伍建设', path: '/team-building', source: 'src/components/common/AppHeader.vue', visible: true, sort: 5 },
  { id: 6, name: '信息公开', path: '/info-public', source: 'src/components/common/AppHeader.vue', visible: true, sort: 6 },
  { id: 7, name: '政策法规', path: '/policy-regulations', source: 'src/components/common/AppHeader.vue', visible: true, sort: 7 },
  { id: 8, name: '查询系统', path: '/query-system', source: 'src/components/common/AppHeader.vue', visible: true, sort: 8 },
]

@Injectable()
export class NavigationService {
  private static readonly STORAGE_KEY = 'admin_navigation_items'

  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
    private readonly operationLogService: OperationLogService,
  ) {}

  private async loadItems() {
    const setting = await this.settingRepository.findOne({
      where: { key: NavigationService.STORAGE_KEY },
    })
    if (!setting) {
      await this.settingRepository.save(
        this.settingRepository.create({
          key: NavigationService.STORAGE_KEY,
          value: JSON.stringify(DEFAULT_NAV_ITEMS),
          description: '后台导航设置',
          type: 'json',
        }),
      )
      return [...DEFAULT_NAV_ITEMS]
    }

    try {
      const parsed = JSON.parse(setting.value)
      return Array.isArray(parsed) ? (parsed as NavigationItem[]) : [...DEFAULT_NAV_ITEMS]
    } catch {
      return [...DEFAULT_NAV_ITEMS]
    }
  }

  private async saveItems(items: NavigationItem[]) {
    const setting = await this.settingRepository.findOne({
      where: { key: NavigationService.STORAGE_KEY },
    })
    if (setting) {
      setting.value = JSON.stringify(items)
      setting.type = 'json'
      setting.description = '后台导航设置'
      await this.settingRepository.save(setting)
      return
    }

    await this.settingRepository.save(
      this.settingRepository.create({
        key: NavigationService.STORAGE_KEY,
        value: JSON.stringify(items),
        description: '后台导航设置',
        type: 'json',
      }),
    )
  }

  async list() {
    const items = await this.loadItems()
    return [...items].sort((a, b) => a.sort - b.sort)
  }

  async listPublic() {
    const items = await this.list()
    return items.filter((item) => item.visible)
  }

  async update(
    id: number,
    payload: Partial<Pick<NavigationItem, 'visible' | 'sort'>>,
    actor = 'system',
  ) {
    const items = await this.loadItems()
    const next = items.map((item) =>
      item.id === id
        ? {
            ...item,
            ...(typeof payload.visible === 'boolean' ? { visible: payload.visible } : {}),
            ...(typeof payload.sort === 'number' ? { sort: payload.sort } : {}),
          }
        : item,
    )
    await this.saveItems(next)
    const updated = next.find((item) => item.id === id) ?? null
    if (updated) {
      await this.operationLogService.record({
        username: actor,
        action: `更新导航：${updated.name}`,
        module: '导航设置',
        ip: '127.0.0.1',
      })
    }
    return [...next].sort((a, b) => a.sort - b.sort).find((item) => item.id === id) ?? null
  }
}
