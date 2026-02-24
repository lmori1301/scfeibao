import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Video } from './entities/video.entity'

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
  ) {}

  async getList(page: number = 1, pageSize: number = 10) {
    const [items, total] = await this.videoRepository.findAndCount({
      order: { sort: 'ASC', createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize
    })
    return { items, total, page, pageSize }
  }

  async getOne(id: number) {
    return this.videoRepository.findOne({ where: { id } })
  }

  async create(data: any) {
    const video = this.videoRepository.create(data)
    return this.videoRepository.save(video)
  }

  async update(id: number, data: any) {
    await this.videoRepository.update(id, data)
    return this.getOne(id)
  }

  async delete(id: number) {
    await this.videoRepository.delete(id)
    return { success: true }
  }
}
