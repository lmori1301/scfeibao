import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RescueCase } from './entities/rescue-case.entity'

@Injectable()
export class RescueCasesService {
  constructor(
    @InjectRepository(RescueCase)
    private rescueCaseRepository: Repository<RescueCase>,
  ) {}

  async getList(page: number = 1, pageSize: number = 10) {
    const [items, total] = await this.rescueCaseRepository.findAndCount({
      order: { rescueDate: 'DESC', createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize
    })
    return { items, total, page, pageSize }
  }

  async getOne(id: number) {
    return this.rescueCaseRepository.findOne({ where: { id } })
  }

  async create(data: any) {
    const rescueCase = this.rescueCaseRepository.create(data)
    return this.rescueCaseRepository.save(rescueCase)
  }

  async update(id: number, data: any) {
    await this.rescueCaseRepository.update(id, data)
    return this.getOne(id)
  }

  async delete(id: number) {
    await this.rescueCaseRepository.delete(id)
    return { success: true }
  }
}
