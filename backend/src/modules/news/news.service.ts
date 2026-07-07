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
      const pageSize = query.pageSize ?? 12;
      const where: Record<string, unknown> = {
        status: 1,
      };
      if (query.category) {
        where.category = query.category;
      }
      if (query.keyword) {
        where.title = ILike(`%${query.keyword}%`);
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
      const pageSize = query.pageSize ?? 10;
      const where: Record<string, unknown> = {};
      if (query.category) {
        where.category = query.category;
      }
      if (typeof query.status === 'number') {
        where.status = query.status;
      }
      if (query.keyword) {
        where.title = ILike(`%${query.keyword}%`);
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
        publishedAt: dto.publishedAt ? new Date(dto.publishedAt) : null,
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
        publishedAt:
          dto.publishedAt === undefined
            ? entity.publishedAt
            : dto.publishedAt
              ? new Date(dto.publishedAt)
              : null,
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

  private async clearDetailCache(id: number) {
    await this.cacheManager.del(`news:detail:${id}`);
  }
}
