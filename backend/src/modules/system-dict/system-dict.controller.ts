import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SystemDictService } from './system-dict.service';
import {
  CreateSystemDictDataDto,
  UpdateSystemDictDataDto,
  QuerySystemDictDataDto,
} from './dto/system-dict-data.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Public } from '../../common/decorators/public.decorator';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';

@ApiTags('数据字典')
@Controller('system/dict')
export class SystemDictController {
  constructor(private readonly systemDictService: SystemDictService) {}

  @Public()
  @Get('data/type/:dictType')
  @ApiOperation({ summary: '按字典类型获取启用中的字典项' })
  optionsByType(@Param('dictType') dictType: string) {
    if (!dictType?.trim()) {
      throw new BadRequestException('字典类型不能为空');
    }
    return this.systemDictService.optionsByType(dictType);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: '新增字典项' })
  @RequirePermissions('SystemDict')
  create(@Body() dto: CreateSystemDictDataDto) {
    return this.systemDictService.create(dto);
  }

  @Public()
  @Get('data/list')
  @ApiOperation({ summary: '获取字典项列表' })
  findAll(@Query() queryDto: QuerySystemDictDataDto) {
    const pagination = new PaginationDto();
    pagination.page = queryDto.page ?? 1;
    pagination.pageSize = queryDto.pageSize ?? 10;
    return this.systemDictService.findAll(pagination, queryDto);
  }

  @Get('data/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取字典项详情' })
  @RequirePermissions('SystemDict')
  findOne(@Param('id') id: string) {
    if (!/^\d+$/.test(id)) throw new BadRequestException('无效的字典项 ID');
    return this.systemDictService.findOne(+id);
  }

  @Patch('data/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新字典项' })
  @RequirePermissions('SystemDict')
  update(@Param('id') id: string, @Body() dto: UpdateSystemDictDataDto) {
    if (!/^\d+$/.test(id)) throw new BadRequestException('无效的字典项 ID');
    return this.systemDictService.update(+id, dto);
  }

  @Delete('data/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除字典项' })
  @RequirePermissions('SystemDict')
  remove(@Param('id') id: string) {
    if (!/^\d+$/.test(id)) throw new BadRequestException('无效的字典项 ID');
    return this.systemDictService.remove(+id);
  }
}
