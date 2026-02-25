import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HomeController } from './home.controller'
import { HomeService } from './home.service'
import { VideosController } from './videos.controller'
import { VideosService } from './videos.service'
import { FriendLinksController } from './friend-links.controller'
import { FriendLinksService } from './friend-links.service'
import { Banner } from './entities/banner.entity'
import { Video } from './entities/video.entity'
import { FriendLink } from './entities/friend-link.entity'
import { News } from '../../database/entities/news.entity'
import { RescueCase } from '../team-building/entities/rescue-case.entity'
import { TeamShowcase } from '../team-building/entities/team-showcase.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Banner, Video, FriendLink, News, RescueCase, TeamShowcase])],
  controllers: [HomeController, VideosController, FriendLinksController],
  providers: [HomeService, VideosService, FriendLinksService],
})
export class HomeModule {}
