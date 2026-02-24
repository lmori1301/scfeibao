import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TeamBuildingController } from './team-building.controller'
import { TeamBuildingService } from './team-building.service'
import { RescueCasesController } from './rescue-cases.controller'
import { RescueCasesService } from './rescue-cases.service'
import { TeamShowcaseController } from './team-showcase.controller'
import { TeamShowcaseService } from './team-showcase.service'
import { TeamIntroController } from './team-intro.controller'
import { TeamIntroService } from './team-intro.service'
import { RescueCase } from './entities/rescue-case.entity'
import { TeamShowcase } from './entities/team-showcase.entity'
import { TeamIntro } from './entities/team-intro.entity'

@Module({
  imports: [TypeOrmModule.forFeature([RescueCase, TeamShowcase, TeamIntro])],
  controllers: [TeamBuildingController, RescueCasesController, TeamShowcaseController, TeamIntroController],
  providers: [TeamBuildingService, RescueCasesService, TeamShowcaseService, TeamIntroService],
})
export class TeamBuildingModule {}
