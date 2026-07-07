import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LocationService } from './location.service';
import {
  CreateLocationDto,
  ResolveLocationCoordinateDto,
  UpdateLocationDto,
  QueryLocationDto,
} from './dto/location.dto';
import { Public } from '../../common/decorators/public.decorator';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';

@ApiTags('地理位置')
@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建地理位置' })
  @RequirePermissions('Location')
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Post('resolve-coordinate')
  @ApiBearerAuth()
  @ApiOperation({ summary: '按地址解析高德GCJ02坐标' })
  @RequirePermissions('Location')
  resolveCoordinate(@Body() dto: ResolveLocationCoordinateDto) {
    return this.locationService.resolveCoordinate(dto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '获取地理位置列表' })
  findAll(@Query() queryDto: QueryLocationDto) {
    return this.locationService.findAll(queryDto);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: '获取地理位置详情' })
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新地理位置' })
  @RequirePermissions('Location')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.update(+id, updateLocationDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除地理位置' })
  @RequirePermissions('Location')
  remove(@Param('id') id: string) {
    return this.locationService.remove(+id);
  }

  @Post('batch/delete')
  @ApiBearerAuth()
  @ApiOperation({ summary: '批量删除地理位置' })
  @RequirePermissions('Location')
  batchDelete(@Body() body: { ids: number[] }) {
    return this.locationService.batchDelete(body.ids);
  }

  @Post('batch/status')
  @ApiBearerAuth()
  @ApiOperation({ summary: '批量更新状态' })
  @RequirePermissions('Location')
  batchUpdateStatus(@Body() body: { ids: number[]; status: number }) {
    return this.locationService.batchUpdateStatus(body.ids, body.status);
  }
}
