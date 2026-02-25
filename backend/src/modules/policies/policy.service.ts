import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Policy } from './entities/policy.entity'

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>,
  ) {}

  async getList(page: number = 1, pageSize: number = 10, filters?: any) {
    const where: any = {}

    // 支持按分类筛选
    if (filters?.category) {
      where.category = filters.category
    }

    // 支持按标题搜索
    if (filters?.title) {
      where.title = filters.title
    }

    const [items, total] = await this.policyRepository.findAndCount({
      where,
      order: { publishedAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize
    })

    // 映射字段名以匹配前端
    const mappedItems = items.map(item => ({
      ...item,
      docNumber: item.documentNumber,
      department: item.issuingAuthority,
      publishDate: item.publishedAt,
      attachment: item.attachmentUrl,
      attachmentName: item.attachmentName
    }))

    return { items: mappedItems, total, page, pageSize }
  }

  async getOne(id: number) {
    const item = await this.policyRepository.findOne({ where: { id } })
    if (!item) return null

    // 映射字段名以匹配前端
    return {
      ...item,
      docNumber: item.documentNumber,
      department: item.issuingAuthority,
      publishDate: item.publishedAt,
      attachment: item.attachmentUrl,
      attachmentName: item.attachmentName
    }
  }

  async create(data: any) {
    // 移除前端字段名，只保留数据库字段名
    const { docNumber, department, publishDate, attachment, attachmentName, ...rest } = data

    const mappedData = {
      ...rest,
      ...(docNumber !== undefined && { documentNumber: docNumber }),
      ...(department !== undefined && { issuingAuthority: department }),
      ...(publishDate !== undefined && { publishedAt: publishDate }),
      ...(attachment !== undefined && { attachmentUrl: attachment }),
      ...(attachmentName !== undefined && { attachmentName })
    }

    const policy = this.policyRepository.create(mappedData)
    return this.policyRepository.save(policy)
  }

  async update(id: number, data: any) {
    // 移除前端字段名，只保留数据库字段名
    const { docNumber, department, publishDate, attachment, attachmentName, ...rest } = data

    const mappedData = {
      ...rest,
      ...(docNumber !== undefined && { documentNumber: docNumber }),
      ...(department !== undefined && { issuingAuthority: department }),
      ...(publishDate !== undefined && { publishedAt: publishDate }),
      ...(attachment !== undefined && { attachmentUrl: attachment }),
      ...(attachmentName !== undefined && { attachmentName })
    }

    await this.policyRepository.update(id, mappedData)
    return this.getOne(id)
  }

  async delete(id: number) {
    await this.policyRepository.delete(id)
    return { success: true }
  }
}
