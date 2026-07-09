import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { News } from '../../database/entities/news.entity'
import { Policy } from '../policies/entities/policy.entity'
import { RescueCase } from '../team-building/entities/rescue-case.entity'
import { TeamShowcase } from '../team-building/entities/team-showcase.entity'
import { PartyWork } from '../party-building/entities/party-work.entity'
import { PartyMember } from '../party-building/entities/party-member.entity'
import { Leadership } from '../overview-info/entities/leadership.entity'
import { PublicInfo } from '../info-public/entities/public-info.entity'
import { SearchController } from './search.controller'
import { SearchService } from './search.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      News,
      Policy,
      RescueCase,
      TeamShowcase,
      PartyWork,
      PartyMember,
      Leadership,
      PublicInfo,
    ]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
