import { Controller, Get, Post, Patch, Delete, Param, Query, Body, HttpStatus } from '@nestjs/common';
import { NewsService } from './news.service';
import { Public } from '../../common/decorators/public.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from '../../database/entities/news.entity';

@Controller()
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    @InjectRepository(News)
    private newsRepository: Repository<News>
  ) {}

  // 新闻列表
  @Public()
  @Get('/home/news')
  async getNewsList(
    @Query('category') category: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 12
  ) {
    const data = await this.newsService.findByCategory(category, page, pageSize);
    return {
      code: HttpStatus.OK,
      data,
      message: '查询成功'
    };
  }

  // 新闻详情
  @Get('/dynamic-news/detail/:id')
  async getNewsDetail(@Param('id') id: number) {
    const data = await this.newsService.findOne(id);
    return {
      code: HttpStatus.OK,
      data,
      message: '查询成功'
    };
  }

  // ========== 后台管理路由 ==========

  // 后台：获取新闻列表
  @Public()
  @Get('news')
  async getAdminNewsList(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10
  ) {
    return await this.newsService.findAll(page, pageSize);
  }

  // 获取新闻详情（前端+后台通用）
  @Public()
  @Get('news/:id')
  async getNewsById(@Param('id') id: number) {
    return await this.newsService.findOne(id);
  }

  // 后台：保存新闻（新增或更新）
  @Public()
  @Post('news')
  async saveNews(@Body() data: any) {
    const newsData = {
      title: data.title,
      summary: data.summary,
      content: data.content,
      coverImage: data.coverImage,
      category: data.category,
      author: data.author,
      status: data.status,
      publishedAt: data.publishedAt,
      sort: data.sort || 0,
      isHeadline: data.isHeadline || 0,
      isNew: data.isNew || 0,
    };

    if (data.id) {
      await this.newsRepository.update(data.id, newsData);
    } else {
      await this.newsRepository.save(newsData);
    }
    return { message: '保存成功' };
  }

  // 后台：更新新闻
  @Public()
  @Patch('news/:id')
  async updateNews(@Param('id') id: number, @Body() data: any) {
    const newsData = {
      title: data.title,
      summary: data.summary,
      content: data.content,
      coverImage: data.coverImage,
      category: data.category,
      author: data.author,
      status: data.status,
      publishedAt: data.publishedAt,
      sort: data.sort || 0,
      isHeadline: data.isHeadline || 0,
      isNew: data.isNew || 0,
    };
    await this.newsRepository.update(id, newsData);
    return { message: '更新成功' };
  }

  // 后台：删除新闻
  @Public()
  @Delete('news/:id')
  async deleteNews(@Param('id') id: number) {
    await this.newsRepository.delete(id);
    return { message: '删除成功' };
  }
}