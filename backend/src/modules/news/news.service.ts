import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { News } from '../../database/entities/news.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import {
  CreateNewsDto,
  QueryNewsDto,
  UpdateNewsDto,
} from './dto/news.dto';
import { PaginatedResponseDto } from '../../common/dto/pagination.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findOne(id: number) {
    try {
      const cacheKey = `news:detail:${id}`;
      const cachedNews = await this.cacheManager.get<News>(cacheKey);
      if (cachedNews) {
        return cachedNews;
      }

      const news = await this.newsRepository.findOne({ where: { id } });

      if (!news) {
        throw new NotFoundException(`新闻ID ${id} 不存在`);
      }

      await this.cacheManager.set(cacheKey, news, 3600);
      return news;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`查询新闻详情失败：${error.message}`);
    }
  }

  async findPublicList(query: QueryNewsDto) {
    try {
      const page = query.page ?? 1;
      const pageSize = query.pageSize ?? query.limit ?? 12;
      const where: Record<string, unknown> = {
        status: 1,
      };
      if (query.category) {
        where.category = query.category;
      }
      const keyword = query.keyword || query.title;
      if (keyword) {
        where.title = ILike(`%${keyword}%`);
      }

      const [list, total] = await this.newsRepository.findAndCount({
        where,
        select: [
          'id',
          'title',
          'summary',
          'content',
          'coverImage',
          'publishedAt',
          'createdAt',
          'isNew',
          'isHeadline',
          'category',
        ],
        order: { publishedAt: 'DESC', createdAt: 'DESC' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      return new PaginatedResponseDto(list, total, page, pageSize);
    } catch (error) {
      throw new InternalServerErrorException(`查询新闻列表失败：${error.message}`);
    }
  }

  async findAll(query: QueryNewsDto) {
    try {
      const page = query.page ?? 1;
      const pageSize = query.pageSize ?? query.limit ?? 10;
      const where: Record<string, unknown> = {};
      if (query.category) {
        where.category = query.category;
      }
      if (typeof query.status === 'number') {
        where.status = query.status;
      }
      const keyword = query.keyword || query.title;
      if (keyword) {
        where.title = ILike(`%${keyword}%`);
      }

      const [items, total] = await this.newsRepository.findAndCount({
        where,
        order: { sort: 'DESC', publishedAt: 'DESC', createdAt: 'DESC' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      return new PaginatedResponseDto(items, total, page, pageSize);
    } catch (error) {
      throw new InternalServerErrorException(`查询新闻列表失败：${error.message}`);
    }
  }

  async create(dto: CreateNewsDto) {
    try {
      const entity = this.newsRepository.create({
        ...dto,
        publishedAt: this.parsePublishedAt(dto.publishedAt) ?? new Date(),
      });
      const created = await this.newsRepository.save(entity);
      await this.clearDetailCache(created.id);
      return created;
    } catch (error) {
      throw new InternalServerErrorException(`创建新闻失败：${error.message}`);
    }
  }

  async update(id: number, dto: UpdateNewsDto) {
    const entity = await this.newsRepository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`新闻ID ${id} 不存在`);
    }

    try {
      Object.assign(entity, {
        ...dto,
        publishedAt: this.parsePublishedAt(dto.publishedAt) ?? entity.publishedAt,
      });
      const updated = await this.newsRepository.save(entity);
      await this.clearDetailCache(id);
      return updated;
    } catch (error) {
      throw new InternalServerErrorException(`更新新闻失败：${error.message}`);
    }
  }

  async remove(id: number) {
    const entity = await this.newsRepository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`新闻ID ${id} 不存在`);
    }

    try {
      await this.newsRepository.remove(entity);
      await this.clearDetailCache(id);
      return { id };
    } catch (error) {
      throw new InternalServerErrorException(`删除新闻失败：${error.message}`);
    }
  }

  /**
   * 发布日期统一按「东八区当天零点」落库。
   * 后台提交的是纯日期（YYYY-MM-DD）；若直接 new Date('2026-10-20')，JS 会按 UTC 零点解析，
   * 在连接 timezone=+08:00 下写入 timestamp 会变成当日 08:00，任一环节再用 toISOString()
   * 截取日期就会少一天。这里显式补 +08:00 消除歧义；带时间的完整 ISO 串仍按原值解析。
   */
  private parsePublishedAt(value?: string): Date | undefined {
    if (!value) {
      return undefined;
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return new Date(`${value}T00:00:00+08:00`);
    }
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
  }

  private async clearDetailCache(id: number) {
    await this.cacheManager.del(`news:detail:${id}`);
  }
}
