import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { News } from '../../database/entities/news.entity';
import { CreateNewsDto, UpdateNewsDto, QueryNewsDto } from './dto/news.dto';
import { PaginationDto, PaginatedResponseDto } from '../../common/dto/pagination.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async create(createNewsDto: CreateNewsDto): Promise<News> {
    const news = this.newsRepository.create(createNewsDto);
    return await this.newsRepository.save(news);
  }

  async findAll(
    paginationDto: PaginationDto,
    queryDto: QueryNewsDto,
  ): Promise<PaginatedResponseDto<News>> {
    const { page, pageSize } = paginationDto;
    const { category, status, keyword } = queryDto;

    const where: any = {};
    if (category) where.category = category;
    if (status !== undefined) where.status = status;
    if (keyword) {
      where.title = Like(`%${keyword}%`);
    }

    const [items, total] = await this.newsRepository.findAndCount({
      where,
      order: { sort: 'DESC', createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return new PaginatedResponseDto(items, total, page, pageSize);
  }

  async findOne(id: number): Promise<News> {
    const news = await this.newsRepository.findOne({ where: { id } });
    if (!news) {
      throw new NotFoundException('新闻不存在');
    }

    news.viewCount += 1;
    await this.newsRepository.save(news);

    return news;
  }

  async update(id: number, updateNewsDto: UpdateNewsDto): Promise<News> {
    const news = await this.findOne(id);
    Object.assign(news, updateNewsDto);
    return await this.newsRepository.save(news);
  }

  async remove(id: number): Promise<void> {
    const news = await this.findOne(id);
    await this.newsRepository.softRemove(news);
  }

  async getCategories() {
    return [
      { id: 1, name: '动态要闻', code: 'news' },
      { id: 2, name: '党建专栏', code: 'party' },
      { id: 3, name: '队伍建设', code: 'team' },
      { id: 4, name: '救援行动', code: 'action' }
    ];
  }

  async batchDelete(ids: number[]): Promise<void> {
    await this.newsRepository.softDelete(ids);
  }

  async batchUpdateStatus(ids: number[], status: number): Promise<void> {
    await this.newsRepository.update(ids, { status });
  }
}
