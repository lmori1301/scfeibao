import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TeamIntro } from './entities/team-intro.entity'

@Injectable()
export class TeamIntroService {
  constructor(
    @InjectRepository(TeamIntro)
    private teamIntroRepository: Repository<TeamIntro>,
  ) {}

  async getList(page: number = 1, pageSize: number = 10) {
    const [items, total] = await this.teamIntroRepository.findAndCount({
      order: { sort: 'ASC', updatedAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize
    })
    return { items, total, page, pageSize }
  }

  async getOne(id: number) {
    return this.teamIntroRepository.findOne({ where: { id } })
  }

  async create(data: any) {
    const intro = this.teamIntroRepository.create(data)
    return this.teamIntroRepository.save(intro)
  }

  async update(id: number, data: any) {
    await this.teamIntroRepository.update(id, data)
    return this.getOne(id)
  }

  async delete(id: number) {
    await this.teamIntroRepository.delete(id)
    return { success: true }
  }
}
