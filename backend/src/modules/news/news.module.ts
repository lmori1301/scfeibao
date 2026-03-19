import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager'; // 1. 导入缓存模块
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { News } from '../../database/entities/news.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([News]),
    CacheModule.register(), // 2. 注册缓存模块，使其在当前模块可用
  ],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}