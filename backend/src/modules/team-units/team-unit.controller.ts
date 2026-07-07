import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import {
  CreateTeamUnitDto,
  QueryTeamUnitDto,
  UpdateTeamUnitDto,
} from './dto/team-unit.dto';
import { TeamUnitService } from './team-unit.service';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';

@ApiTags('队伍字典')
@Controller('team-units')
export class TeamUnitController {
  constructor(private readonly teamUnitService: TeamUnitService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: '新增队伍字典' })
  @RequirePermissions('TeamUnits')
  create(@Body() dto: CreateTeamUnitDto) {
    return this.teamUnitService.create(dto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '获取队伍字典列表' })
  findAll(@Query() queryDto: QueryTeamUnitDto) {
    return this.teamUnitService.findAll(queryDto);
  }

  @Public()
  @Get('options')
  @ApiOperation({ summary: '获取启用中的队伍下拉选项' })
  findOptions(@Query('status') status?: string) {
    return this.teamUnitService.findOptions(
      status === undefined ? 1 : Number(status),
    );
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取队伍字典详情' })
  @RequirePermissions('TeamUnits')
  findOne(@Param('id') id: string) {
    return this.teamUnitService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新队伍字典' })
  @RequirePermissions('TeamUnits')
  update(@Param('id') id: string, @Body() dto: UpdateTeamUnitDto) {
    return this.teamUnitService.update(+id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除队伍字典' })
  @RequirePermissions('TeamUnits')
  remove(@Param('id') id: string) {
    return this.teamUnitService.remove(+id);
  }
}
