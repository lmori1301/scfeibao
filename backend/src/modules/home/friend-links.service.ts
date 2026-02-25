import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FriendLink } from './entities/friend-link.entity'

@Injectable()
export class FriendLinksService {
  constructor(
    @InjectRepository(FriendLink)
    private friendLinkRepository: Repository<FriendLink>,
  ) {}

  async getList(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize
    const [items, total] = await this.friendLinkRepository.findAndCount({
      order: { sort: 'ASC', createdAt: 'DESC' },
      skip,
      take: pageSize
    })
    return { items, total, page, pageSize }
  }

  async getOne(id: number) {
    return this.friendLinkRepository.findOne({ where: { id } })
  }

  async create(data: any) {
    const link = this.friendLinkRepository.create(data)
    return this.friendLinkRepository.save(link)
  }

  async update(id: number, data: any) {
    await this.friendLinkRepository.update(id, data)
    return this.getOne(id)
  }

  async delete(id: number) {
    await this.friendLinkRepository.delete(id)
    return { success: true }
  }

  async getActiveLinks() {
    return this.friendLinkRepository.find({
      where: { isActive: true },
      order: { sort: 'ASC', createdAt: 'DESC' }
    })
  }
}
