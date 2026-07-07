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
import { VehicleService } from './vehicle.service';
import {
  CreateVehicleDto,
  UpdateVehicleDto,
  QueryVehicleDto,
} from './dto/vehicle.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Public } from '../../common/decorators/public.decorator';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';

@ApiTags('车辆查询')
@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建车辆' })
  @RequirePermissions('Vehicles')
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '获取车辆列表' })
  findAll(@Query() queryDto: QueryVehicleDto) {
    return this.vehicleService.findAll(queryDto, queryDto);
  }

  @Public()
  @Get('search')
  @ApiOperation({ summary: '搜索车辆' })
  search(@Query('plateNumber') plateNumber: string) {
    return this.vehicleService.searchByPlateNumber(plateNumber);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: '获取车辆详情' })
  findOne(@Param('id') id: string) {
    return this.vehicleService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新车辆' })
  @RequirePermissions('Vehicles')
  update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return this.vehicleService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除车辆' })
  @RequirePermissions('Vehicles')
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(+id);
  }

  @Post('batch/delete')
  @ApiBearerAuth()
  @ApiOperation({ summary: '批量删除车辆' })
  @RequirePermissions('Vehicles')
  batchDelete(@Body() body: { ids: number[] }) {
    return this.vehicleService.batchDelete(body.ids);
  }

  @Post('batch/status')
  @ApiBearerAuth()
  @ApiOperation({ summary: '批量更新状态' })
  @RequirePermissions('Vehicles')
  batchUpdateStatus(@Body() body: { ids: number[]; status: number }) {
    return this.vehicleService.batchUpdateStatus(body.ids, body.status);
  }
}
