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
    const skip = (page - 1) * pageSize

    // 使用原始SQL查询来确保获取isTop字段
    const query = `
      SELECT id, title, videoUrl, coverUrl, sort, isTop, createdAt, updatedAt
      FROM videos
      ORDER BY sort ASC, createdAt DESC
      LIMIT ? OFFSET ?
    `

    const countQuery = `SELECT COUNT(*) as total FROM videos`

    const items = await this.videoRepository.query(query, [pageSize, skip])
    const [{ total }] = await this.videoRepository.query(countQuery)

    console.log('=== SQL查询返回的原始数据 ===')
    console.log(JSON.stringify(items, null, 2))

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

  async toggleTop(id: number) {
    const video = await this.getOne(id)
    if (!video) {
      throw new Error('视频不存在')
    }

    // 如果当前视频已置顶，则取消置顶
    if (video.isTop) {
      await this.videoRepository.update(id, { isTop: false })
    } else {
      // 如果当前视频未置顶，先取消所有其他视频的置顶状态
      await this.videoRepository.update({ isTop: true }, { isTop: false })
      // 然后将当前视频设置为置顶
      await this.videoRepository.update(id, { isTop: true })
    }

    return this.getOne(id)
  }

  async getTopList() {
    const videos = await this.videoRepository.find({
      where: { isTop: true },
      order: { sort: 'ASC', createdAt: 'DESC' }
    })

    // Transform data to match frontend API expectations
    const items = videos.map(video => ({
      id: video.id,
      title: video.title,
      url: video.videoUrl,
      cover: video.coverUrl,
      duration: 0 // Placeholder, can be calculated if needed
    }))

    return { items, total: items.length }
  }
}
