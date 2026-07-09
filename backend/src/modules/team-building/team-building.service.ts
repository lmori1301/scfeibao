import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { RescueCase } from './entities/rescue-case.entity'
import { TeamShowcase } from './entities/team-showcase.entity'
import { TeamIntro } from './entities/team-intro.entity'

@Injectable()
export class TeamBuildingService {
  constructor(
    @InjectRepository(RescueCase)
    private rescueCaseRepository: Repository<RescueCase>,
    @InjectRepository(TeamShowcase)
    private teamShowcaseRepository: Repository<TeamShowcase>,
    @InjectRepository(TeamIntro)
    private teamIntroRepository: Repository<TeamIntro>,
  ) {}

  async getAbout() {
    const items = await this.teamIntroRepository.find({
      order: { sort: 'ASC', id: 'ASC' }
    })

    if (items.length) {
      const title = items[0].title || '四川飞豹救援队'
      const content = items
        .map((item) => item.content)
        .filter(Boolean)
        .join('\n\n')

      return {
        title,
        name: title,
        content,
        description: content,
        established: '2020-01-01',
        establishedDate: '2020-01-01',
        mission: '人民至上、生命至上',
        vision: '建设专业化、规范化、现代化救援队伍',
        values: ['快速响应', '科学救援', '协同处置'],
        achievements: []
      }
    }

    return null
  }

  async getCases(page: number = 1, pageSize: number = 10, keyword?: string) {
    const where = keyword ? { title: Like(`%${keyword}%`) } : {}
    const [list, total] = await this.rescueCaseRepository.findAndCount({
      where,
      order: { rescueDate: 'DESC', createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize
    })

    return { list, total, page, pageSize }
  }

  async getShowcase() {
    return this.teamShowcaseRepository.find({
      order: { sort: 'ASC' }
    })
  }
}
