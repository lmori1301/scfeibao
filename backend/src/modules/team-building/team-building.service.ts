import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RescueCase } from './entities/rescue-case.entity'
import { TeamShowcase } from './entities/team-showcase.entity'

@Injectable()
export class TeamBuildingService {
  constructor(
    @InjectRepository(RescueCase)
    private rescueCaseRepository: Repository<RescueCase>,
    @InjectRepository(TeamShowcase)
    private teamShowcaseRepository: Repository<TeamShowcase>,
  ) {}

  async getAbout() {
    return {
      title: '四川飞豹救援队',
      content: '专业救援队伍介绍...',
      established: '2020-01-01'
    }
  }

  async getCases() {
    return this.rescueCaseRepository.find({
      order: { rescueDate: 'DESC' }
    })
  }

  async getShowcase() {
    return this.teamShowcaseRepository.find({
      order: { sort: 'ASC' }
    })
  }
}
