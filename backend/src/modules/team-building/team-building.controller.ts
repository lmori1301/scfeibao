import { Controller, Get, Query } from '@nestjs/common'
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
  getCases(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('keyword') keyword?: string,
  ) {
    return this.teamBuildingService.getCases(page, pageSize, keyword)
  }

  @Get('showcase')
  getShowcase() {
    return this.teamBuildingService.getShowcase()
  }
}
