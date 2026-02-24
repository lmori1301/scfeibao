import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Leadership } from './entities/leadership.entity'

@Injectable()
export class LeadershipService {
  constructor(
    @InjectRepository(Leadership)
    private leadershipRepository: Repository<Leadership>,
  ) {}

  async getList(page: number = 1, pageSize: number = 10) {
    const [items, total] = await this.leadershipRepository.findAndCount({
      order: { sort: 'ASC', createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize
    })
    return { items, total, page, pageSize }
  }

  async getOne(id: number) {
    return this.leadershipRepository.findOne({ where: { id } })
  }

  async create(data: any) {
    const leadership = this.leadershipRepository.create(data)
    return this.leadershipRepository.save(leadership)
  }

  async update(id: number, data: any) {
    await this.leadershipRepository.update(id, data)
    return this.getOne(id)
  }

  async delete(id: number) {
    await this.leadershipRepository.delete(id)
    return { success: true }
  }
}
