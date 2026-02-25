import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PartyBuildingController } from './party-building.controller'
import { PartyBuildingService } from './party-building.service'
import { PartyMembersController } from './party-members.controller'
import { PartyMembersService } from './party-members.service'
import { PartyWorksController } from './party-works.controller'
import { PartyWorksService } from './party-works.service'
import { PartyController } from './party.controller'
import { PartyWork } from './entities/party-work.entity'
import { PartyMember } from './entities/party-member.entity'

@Module({
  imports: [TypeOrmModule.forFeature([PartyWork, PartyMember])],
  controllers: [PartyController, PartyBuildingController, PartyMembersController, PartyWorksController],
  providers: [PartyBuildingService, PartyMembersService, PartyWorksService],
})
export class PartyBuildingModule {}
