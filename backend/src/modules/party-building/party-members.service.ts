import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PartyMember } from './entities/party-member.entity'

@Injectable()
export class PartyMembersService {
  constructor(
    @InjectRepository(PartyMember)
    private partyMemberRepository: Repository<PartyMember>,
  ) {}

  async getList(page: number = 1, pageSize: number = 10) {
    const [items, total] = await this.partyMemberRepository.findAndCount({
      order: { sort: 'ASC' },
      skip: (page - 1) * pageSize,
      take: pageSize
    })
    return { items, total, page, pageSize }
  }

  async getOne(id: number) {
    return this.partyMemberRepository.findOne({ where: { id } })
  }

  async create(data: any) {
    const member = this.partyMemberRepository.create(data)
    return this.partyMemberRepository.save(member)
  }

  async update(id: number, data: any) {
    await this.partyMemberRepository.update(id, data)
    return this.getOne(id)
  }

  async delete(id: number) {
    await this.partyMemberRepository.delete(id)
    return { success: true }
  }
}
