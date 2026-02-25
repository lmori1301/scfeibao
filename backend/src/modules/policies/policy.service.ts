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

  async getCategories() {
    // 查询数据库中所有不重复的分类
    const result = await this.policyRepository
      .createQueryBuilder('policy')
      .select('DISTINCT policy.category', 'category')
      .where('policy.category IS NOT NULL')
      .andWhere('policy.category != :empty', { empty: '' })
      .getRawMany()

    return result.map(item => item.category)
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
    try {
      console.log('接收到的数据:', JSON.stringify(data, null, 2))

      // 处理 category 字段：如果是数组，取第一个元素
      if (Array.isArray(data.category)) {
        data.category = data.category[0]
      }

      // 处理日期字段：将ISO日期时间字符串转换为日期格式
      if (data.effectiveDate) {
        data.effectiveDate = data.effectiveDate.split('T')[0]
      }
      if (data.expiryDate) {
        data.expiryDate = data.expiryDate.split('T')[0]
      }

      // 处理空字符串，转换为 null
      Object.keys(data).forEach(key => {
        if (data[key] === '') {
          data[key] = null
        }
      })

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

      console.log('映射后的数据:', JSON.stringify(mappedData, null, 2))

      const policy = this.policyRepository.create(mappedData)
      const result = await this.policyRepository.save(policy)

      console.log('保存成功，ID:', (result as any).id || result)
      return result
    } catch (error) {
      console.error('创建政策失败:', error)
      console.error('错误详情:', error.message)
      console.error('错误堆栈:', error.stack)
      throw new Error(`创建政策失败: ${error.message}`)
    }
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
