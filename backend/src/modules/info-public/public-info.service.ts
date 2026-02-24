import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PublicInfo } from './entities/public-info.entity'

@Injectable()
export class PublicInfoService {
  constructor(
    @InjectRepository(PublicInfo)
    private publicInfoRepository: Repository<PublicInfo>,
  ) {}

  async getList(page: number = 1, pageSize: number = 10) {
    const [items, total] = await this.publicInfoRepository.findAndCount({
      order: { publishDate: 'DESC', createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize
    })
    return { items, total, page, pageSize }
  }

  async getOne(id: number) {
    return this.publicInfoRepository.findOne({ where: { id } })
  }

  async create(data: any) {
    const info = this.publicInfoRepository.create(data)
    return this.publicInfoRepository.save(info)
  }

  async update(id: number, data: any) {
    await this.publicInfoRepository.update(id, data)
    return this.getOne(id)
  }

  async delete(id: number) {
    await this.publicInfoRepository.delete(id)
    return { success: true }
  }
}
