import { Controller, Get } from '@nestjs/common'
import { TeamBuildingService } from './team-building.service'
import { Public } from '../../common/decorators/public.decorator'

@Public()
@Controller('team')
export class TeamBuildingController {
  constructor(private readonly teamBuildingService: TeamBuildingService) {}

  @Get('about')
  getAbout() {
    return this.teamBuildingService.getAbout()
  }

  @Get('cases')
  getCases() {
    return this.teamBuildingService.getCases()
  }

  @Get('showcase')
  getShowcase() {
    return this.teamBuildingService.getShowcase()
  }
}
