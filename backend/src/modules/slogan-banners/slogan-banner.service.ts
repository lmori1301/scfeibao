import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SloganBanner } from './entities/slogan-banner.entity'
import { normalizeEmptyToNull } from '../../common/utils/normalize-empty'

/** 单次最多允许配置的标语横幅数量 */
const MAX_COUNT = 10

@Injectable()
export class SloganBannerService {
  constructor(
    @InjectRepository(SloganBanner)
    private sloganBannerRepository: Repository<SloganBanner>,
  ) {}

  /** 前台：仅返回启用中的，按 sort 升序 */
  async getActiveList() {
    const items = await this.sloganBannerRepository.find({
      where: { isActive: true },
      order: { sort: 'ASC', id: 'ASC' },
    })
    return items.map((item) => ({
      id: item.id,
      slogan: item.slogan,
      imageUrl: item.imageUrl,
      link: item.link,
      linkTarget: item.linkTarget,
    }))
  }

  /** 后台：分页列表，返回全部状态 */
  async getList(page = 1, pageSize = 10) {
    const [items, total] = await this.sloganBannerRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { sort: 'ASC', id: 'DESC' },
    })
    const mappedItems = items.map((item) => ({
      ...item,
      status: item.isActive ? '显示' : '隐藏',
    }))
    return { items: mappedItems, total }
  }

  async save(data: any) {
    if (!data.imageUrl) {
      throw new Error('横幅图片不能为空')
    }

    const isActive = data.status === undefined ? true : data.status === '显示' || data.status === true

    // 新增时校验上限
    if (!data.id) {
      const count = await this.sloganBannerRepository.count()
      if (count >= MAX_COUNT) {
        throw new Error(`最多只能配置 ${MAX_COUNT} 条标语横幅`)
      }
    }

    const payload = normalizeEmptyToNull({
      slogan: data.slogan ?? '',
      imageUrl: data.imageUrl,
      link: data.link ?? '',
      linkTarget: data.linkTarget === '_blank' ? '_blank' : '_self',
      sort: Number(data.sort) || 0,
      isActive,
    }) as Partial<SloganBanner>

    if (data.id) {
      const exists = await this.sloganBannerRepository.findOne({ where: { id: data.id } })
      if (!exists) throw new Error('记录不存在')
      await this.sloganBannerRepository.update(data.id, payload)
    } else {
      await this.sloganBannerRepository.save(this.sloganBannerRepository.create(payload))
    }
    return { message: '保存成功' }
  }

  async remove(id: number) {
    await this.sloganBannerRepository.delete(id)
    return { message: '删除成功' }
  }

  /** 批量设置状态 */
  async setStatus(ids: number[], isActive: boolean) {
    if (!Array.isArray(ids) || ids.length === 0) throw new Error('请选择要操作的记录')
    await this.sloganBannerRepository.update(ids as any, { isActive })
    return { message: isActive ? '已启用' : '已禁用' }
  }

  /** 批量删除 */
  async removeBatch(ids: number[]) {
    if (!Array.isArray(ids) || ids.length === 0) throw new Error('请选择要操作的记录')
    await this.sloganBannerRepository.delete(ids as any)
    return { message: '删除成功' }
  }
}
