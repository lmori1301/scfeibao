import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from '../../database/entities/news.entity';
// 如需Redis缓存，先安装：npm install cache-manager cache-manager-redis-store
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache // 注入缓存
  ) {}

  // 新闻详情查询（核心优化）
  async findOne(id: number) {
    try {
      // 1. 先查缓存（缓存key：news:detail:123）
      const cacheKey = `news:detail:${id}`;
      const cachedNews = await this.cacheManager.get(cacheKey);
      if (cachedNews) {
        return cachedNews; // 缓存命中，直接返回
      }

      // 2. 缓存未命中，查数据库（只查需要的字段，避免冗余）
      const news = await this.newsRepository
        .createQueryBuilder('news')
        .select([
          'news.id',
          'news.title',
          'news.content',
          'news.publishedAt',
          'news.category',
          'news.createdAt'
        ])
        .where('news.id = :id', { id })
        .getOne();

      if (!news) {
        throw new NotFoundException(`新闻ID ${id} 不存在`);
      }

      // 3. 存入缓存（有效期1小时，避免缓存过期）
      await this.cacheManager.set(cacheKey, news, 3600);

      return news;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // 找不到新闻，抛404
      }
      // 其他错误，抛500并记录日志
      throw new InternalServerErrorException(`查询新闻详情失败：${error.message}`);
    }
  }

  // 新闻列表查询（同步优化）
  async findByCategory(category: string, page = 1, pageSize = 12) {
    try {
      const [list, total] = await this.newsRepository.findAndCount({
        where: { category },
        select: ['id', 'title', 'summary', 'content', 'coverImage', 'publishedAt', 'createdAt', 'isNew', 'isHeadline'], // 添加 isNew 和 isHeadline 字段
        order: { createdAt: 'DESC' },
        skip: (page - 1) * pageSize,
        take: pageSize, // 强制分页，避免一次性查全部
      });
      return { list, total };
    } catch (error) {
      throw new InternalServerErrorException(`查询${category}新闻失败：${error.message}`);
    }
  }

  // 后台管理：获取所有新闻列表
  async findAll(page = 1, pageSize = 10) {
    try {
      const [items, total] = await this.newsRepository.findAndCount({
        select: ['id', 'title', 'summary', 'content', 'coverImage', 'category', 'author', 'status', 'publishedAt', 'createdAt', 'isHeadline', 'isNew', 'sort'],
        order: { createdAt: 'DESC' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
      return { items, total };
    } catch (error) {
      throw new InternalServerErrorException(`查询新闻列表失败：${error.message}`);
    }
  }
}