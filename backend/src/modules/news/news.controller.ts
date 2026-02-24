import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { CreateNewsDto, UpdateNewsDto, QueryNewsDto } from './dto/news.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('新闻')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建新闻' })
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Public()
  @Get('categories')
  @ApiOperation({ summary: '获取新闻分类' })
  getCategories() {
    return this.newsService.getCategories();
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '获取新闻列表' })
  findAll(@Query() queryDto: QueryNewsDto) {
    return this.newsService.findAll(queryDto, queryDto);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: '获取新闻详情' })
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新新闻' })
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(+id, updateNewsDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除新闻' })
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }

  @Post('batch/delete')
  @ApiBearerAuth()
  @ApiOperation({ summary: '批量删除新闻' })
  batchDelete(@Body() body: { ids: number[] }) {
    return this.newsService.batchDelete(body.ids);
  }

  @Post('batch/status')
  @ApiBearerAuth()
  @ApiOperation({ summary: '批量更新状态' })
  batchUpdateStatus(@Body() body: { ids: number[]; status: number }) {
    return this.newsService.batchUpdateStatus(body.ids, body.status);
  }
}
