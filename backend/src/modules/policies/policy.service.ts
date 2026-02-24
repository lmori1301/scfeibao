import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Policy } from './entities/policy.entity'

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>,
  ) {}

  async getList(page: number = 1, pageSize: number = 10) {
    const [items, total] = await this.policyRepository.findAndCount({
      order: { publishDate: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize
    })
    return { items, total, page, pageSize }
  }

  async getOne(id: number) {
    return this.policyRepository.findOne({ where: { id } })
  }

  async create(data: any) {
    const policy = this.policyRepository.create(data)
    return this.policyRepository.save(policy)
  }

  async update(id: number, data: any) {
    await this.policyRepository.update(id, data)
    return this.getOne(id)
  }

  async delete(id: number) {
    await this.policyRepository.delete(id)
    return { success: true }
  }
}
