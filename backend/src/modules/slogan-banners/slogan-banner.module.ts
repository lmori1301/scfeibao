import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SloganBannerController } from './slogan-banner.controller'
import { SloganBannerService } from './slogan-banner.service'
import { SloganBanner } from './entities/slogan-banner.entity'

@Module({
  imports: [TypeOrmModule.forFeature([SloganBanner])],
  controllers: [SloganBannerController],
  providers: [SloganBannerService],
})
export class SloganBannerModule {}
