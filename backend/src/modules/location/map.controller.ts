import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { LocationService } from './location.service';

@ApiTags('地图点位')
@Controller('map')
export class MapController {
  constructor(private readonly locationService: LocationService) {}

  @Public()
  @Get('team-list')
  @ApiOperation({ summary: '获取前台地图队伍点位列表' })
  getTeamMapList() {
    return this.locationService.getTeamMapList();
  }
}
