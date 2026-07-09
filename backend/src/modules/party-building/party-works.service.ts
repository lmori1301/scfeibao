import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
import { PartyWork } from './entities/party-work.entity'

@Injectable()
export class PartyWorksService {
  constructor(
    @InjectRepository(PartyWork)
    private partyWorkRepository: Repository<PartyWork>,
  ) {}

  async getList(page: number = 1, pageSize: number = 10, keyword?: string, type?: string) {
    const where: any = {}
    if (keyword) {
      where.title = Like(`%${keyword}%`)
    }
    if (type) {
      where.type = type
    }

    const [items, total] = await this.partyWorkRepository.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize
    })
    return { list: items, total, page, pageSize }
  }

  async getOne(id: number) {
    return this.partyWorkRepository.findOne({ where: { id } })
  }

  async create(data: any) {
    const work = this.partyWorkRepository.create(data)
    return this.partyWorkRepository.save(work)
  }

  async update(id: number, data: any) {
    await this.partyWorkRepository.update(id, data)
    return this.getOne(id)
  }

  async delete(id: number) {
    await this.partyWorkRepository.delete(id)
    return { success: true }
  }
}
