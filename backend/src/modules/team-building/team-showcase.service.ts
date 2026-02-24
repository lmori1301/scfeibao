import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TeamShowcase } from './entities/team-showcase.entity'

@Injectable()
export class TeamShowcaseService {
  constructor(
    @InjectRepository(TeamShowcase)
    private teamShowcaseRepository: Repository<TeamShowcase>,
  ) {}

  async getList(page: number = 1, pageSize: number = 10) {
    const [items, total] = await this.teamShowcaseRepository.findAndCount({
      order: { sort: 'ASC' },
      skip: (page - 1) * pageSize,
      take: pageSize
    })
    return { items, total, page, pageSize }
  }

  async getOne(id: number) {
    return this.teamShowcaseRepository.findOne({ where: { id } })
  }

  async create(data: any) {
    const showcase = this.teamShowcaseRepository.create(data)
    return this.teamShowcaseRepository.save(showcase)
  }

  async update(id: number, data: any) {
    await this.teamShowcaseRepository.update(id, data)
    return this.getOne(id)
  }

  async delete(id: number) {
    await this.teamShowcaseRepository.delete(id)
    return { success: true }
  }
}
