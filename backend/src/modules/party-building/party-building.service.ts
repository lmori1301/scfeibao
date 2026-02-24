import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PartyWork } from './entities/party-work.entity'
import { PartyMember } from './entities/party-member.entity'

@Injectable()
export class PartyBuildingService {
  constructor(
    @InjectRepository(PartyWork)
    private partyWorkRepository: Repository<PartyWork>,
    @InjectRepository(PartyMember)
    private partyMemberRepository: Repository<PartyMember>,
  ) {}

  async getList(page: number = 1, pageSize: number = 10) {
    const [items, total] = await this.partyWorkRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize
    })
    return { items, total, page, pageSize }
  }

  async getOne(id: number) {
    const work = await this.partyWorkRepository.findOne({ where: { id } })
    if (work) {
      work.viewCount += 1
      await this.partyWorkRepository.save(work)
    }
    return work
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

  async getWorkList() {
    return this.partyWorkRepository.find({
      order: { createdAt: 'DESC' }
    })
  }

  async getWorkDetail(id: number) {
    const work = await this.partyWorkRepository.findOne({ where: { id } })
    if (work) {
      work.viewCount += 1
      await this.partyWorkRepository.save(work)
    }
    return work
  }

  async getMembers() {
    return this.partyMemberRepository.find({
      order: { sort: 'ASC' }
    })
  }
}
