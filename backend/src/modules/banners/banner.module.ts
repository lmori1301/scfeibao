import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BannerController } from './banner.controller'
import { Banner } from '../home/entities/banner.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Banner])],
  controllers: [BannerController]
})
export class BannerModule {}
