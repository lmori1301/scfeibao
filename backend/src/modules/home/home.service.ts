import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Banner } from './entities/banner.entity'
import { Video } from './entities/video.entity'
import { News } from '../../database/entities/news.entity'
import { RescueCase } from '../team-building/entities/rescue-case.entity'
import { TeamShowcase } from '../team-building/entities/team-showcase.entity'

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Banner)
    private bannerRepository: Repository<Banner>,
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
    @InjectRepository(News)
    private newsRepository: Repository<News>,
    @InjectRepository(RescueCase)
    private rescueCaseRepository: Repository<RescueCase>,
    @InjectRepository(TeamShowcase)
    private teamShowcaseRepository: Repository<TeamShowcase>,
  ) {}

  async getBanners() {
    const banners = await this.bannerRepository.find({
      where: { isActive: true },
      order: { sort: 'ASC' }
    })
    return banners.map(banner => ({
      ...banner,
      image: banner.imageUrl
    }))
  }

  async getVideos() {
    const videos = await this.videoRepository.find({
      order: { sort: 'ASC' }
    })
    return videos.map(video => ({
      id: video.id,
      title: video.title,
      url: video.videoUrl,
      cover: video.coverUrl,
      duration: 0 // 暂时返回0，后续可以添加视频时长字段
    }))
  }

  async getNews() {
    return this.newsRepository.find({
      where: { status: 1 },
      order: { createdAt: 'DESC' },
      take: 6
    })
  }

  async getDynamics() {
    const news = await this.newsRepository.find({
      where: { status: 1 },
      order: { createdAt: 'DESC' },
      take: 4
    })
    return news.map(item => ({
      id: item.id,
      region: item.category || '四川',
      title: item.title,
      publishDate: item.publishedAt || item.createdAt
    }))
  }

  async getActions() {
    const cases = await this.rescueCaseRepository.find({
      order: { rescueDate: 'DESC' },
      take: 4
    })
    return cases.map(item => ({
      id: item.id,
      title: item.title,
      location: item.location,
      rescueDate: item.rescueDate,
      summary: item.content || '',
      image: item.coverImage || ''
    }))
  }

  async getShowcase() {
    return this.teamShowcaseRepository.find({
      order: { sort: 'ASC' },
      take: 8
    })
  }

  async getLinks() {
    return []
  }
}
