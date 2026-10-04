import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import type { Request } from 'express';
import { TeamDutyService } from './team-duty.service';
import {
  CreateTeamDutyDto,
  CreateTeamDutyBatchDto,
  UpdateTeamDutyDto,
  QueryTeamDutyDto,
} from './dto/team-duty.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Public } from '../../common/decorators/public.decorator';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';

@ApiTags('队伍值班')
@Controller('team-duty')
export class TeamDutyController {
  constructor(private readonly teamDutyService: TeamDutyService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: '新增队伍值班记录' })
  @RequirePermissions('TeamDuty')
  create(@Body() dto: CreateTeamDutyDto, @Req() request: Request) {
    return this.teamDutyService.create(dto, pickCreateBy(request));
  }

  @Post('batch')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '批量新增队伍值班（附件解析后的多行一次性提交）',
  })
  @RequirePermissions('TeamDuty')
  createBatch(@Body() dto: CreateTeamDutyBatchDto, @Req() request: Request) {
    return this.teamDutyService.createBatch(dto, pickCreateBy(request));
  }

  @Post('preview')
  @ApiBearerAuth()
  @ApiOperation({ summary: '解析结果预览（不入库）' })
  @RequirePermissions('TeamDuty')
  preview(@Body() dto: CreateTeamDutyBatchDto) {
    return this.teamDutyService.buildPreview(dto.teamName, dto.dutyYear, dto.items);
  }

  @Public()
  @Get('years')
  @ApiOperation({ summary: '获取值班年份下拉选项' })
  listYears() {
    return this.teamDutyService.listYears();
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '获取队伍值班列表' })
  findAll(@Query() queryDto: QueryTeamDutyDto) {
    const pagination = new PaginationDto();
    pagination.page = queryDto.page ?? 1;
    pagination.pageSize = queryDto.pageSize ?? 10;
    return this.teamDutyService.findAll(pagination, queryDto);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: '获取队伍值班详情' })
  findOne(@Param('id') id: string) {
    if (!/^\d+$/.test(id)) {
      throw new BadRequestException('无效的值班记录 ID');
    }
    return this.teamDutyService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新队伍值班记录' })
  @RequirePermissions('TeamDuty')
  update(@Param('id') id: string, @Body() dto: UpdateTeamDutyDto) {
    if (!/^\d+$/.test(id)) {
      throw new BadRequestException('无效的值班记录 ID');
    }
    return this.teamDutyService.update(+id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除队伍值班记录（逻辑删除）' })
  @RequirePermissions('TeamDuty')
  remove(@Param('id') id: string) {
    if (!/^\d+$/.test(id)) {
      throw new BadRequestException('无效的值班记录 ID');
    }
    return this.teamDutyService.remove(+id);
  }

  @Post('batch/delete')
  @ApiBearerAuth()
  @ApiOperation({ summary: '批量删除队伍值班记录（逻辑删除）' })
  @RequirePermissions('TeamDuty')
  batchDelete(@Body() body: { ids?: number[] }) {
    const ids = (body?.ids ?? []).filter((id) => Number.isFinite(id));
    return this.teamDutyService.removeMany(ids);
  }
}

function pickCreateBy(request: Request): string | undefined {
  const user = request.user as { username?: string } | undefined;
  const username = String(user?.username ?? '').trim();
  return username || undefined;
}
