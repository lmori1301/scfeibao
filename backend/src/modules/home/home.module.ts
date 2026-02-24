import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HomeController } from './home.controller'
import { HomeService } from './home.service'
import { VideosController } from './videos.controller'
import { VideosService } from './videos.service'
import { Banner } from './entities/banner.entity'
import { Video } from './entities/video.entity'
import { News } from '../../database/entities/news.entity'
import { RescueCase } from '../team-building/entities/rescue-case.entity'
import { TeamShowcase } from '../team-building/entities/team-showcase.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Banner, Video, News, RescueCase, TeamShowcase])],
  controllers: [HomeController, VideosController],
  providers: [HomeService, VideosService],
})
export class HomeModule {}
