import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { Public } from '../../common/decorators/public.decorator';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { CreateNewsDto, QueryNewsDto, UpdateNewsDto } from './dto/news.dto';

@ApiTags('新闻')
@Controller()
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Public()
  @ApiOperation({ summary: '前台新闻列表' })
  @Get('/home/news')
  async getNewsList(@Query() query: QueryNewsDto) {
    return this.newsService.findPublicList(query);
  }

  @Public()
  @ApiOperation({ summary: '前台新闻详情' })
  @Get('/dynamic-news/detail/:id')
  async getNewsDetail(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '后台新闻列表' })
  @Get('news')
  @RequirePermissions('News')
  async getAdminNewsList(@Query() query: QueryNewsDto) {
    return this.newsService.findAll(query);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '后台新闻详情' })
  @Get('news/:id')
  @RequirePermissions('News')
  async getNewsById(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '新增新闻' })
  @Post('news')
  @RequirePermissions('News')
  async createNews(@Body() dto: CreateNewsDto) {
    return this.newsService.create(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '更新新闻' })
  @Patch('news/:id')
  @RequirePermissions('News')
  async updateNews(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNewsDto,
  ) {
    return this.newsService.update(id, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '删除新闻' })
  @Delete('news/:id')
  @RequirePermissions('News')
  async deleteNews(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.remove(id);
  }
}
