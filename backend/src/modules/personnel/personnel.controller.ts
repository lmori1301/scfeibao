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
import { PersonnelService } from './personnel.service';
import {
  CreatePersonnelDto,
  UpdatePersonnelDto,
  QueryPersonnelDto,
} from './dto/personnel.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('人员查询')
@Controller('personnel')
export class PersonnelController {
  constructor(private readonly personnelService: PersonnelService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建人员' })
  create(@Body() createPersonnelDto: CreatePersonnelDto) {
    return this.personnelService.create(createPersonnelDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '获取人员列表' })
  findAll(@Query() queryDto: QueryPersonnelDto) {
    return this.personnelService.findAll(queryDto, queryDto);
  }

  @Public()
  @Get('search')
  @ApiOperation({ summary: '搜索人员' })
  search(@Query('idCard') idCard: string) {
    return this.personnelService.searchByIdCard(idCard);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: '获取人员详情' })
  findOne(@Param('id') id: string) {
    return this.personnelService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新人员' })
  update(
    @Param('id') id: string,
    @Body() updatePersonnelDto: UpdatePersonnelDto,
  ) {
    return this.personnelService.update(+id, updatePersonnelDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除人员' })
  remove(@Param('id') id: string) {
    return this.personnelService.remove(+id);
  }

  @Post('batch/delete')
  @ApiBearerAuth()
  @ApiOperation({ summary: '批量删除人员' })
  batchDelete(@Body() body: { ids: number[] }) {
    return this.personnelService.batchDelete(body.ids);
  }

  @Post('batch/status')
  @ApiBearerAuth()
  @ApiOperation({ summary: '批量更新状态' })
  batchUpdateStatus(@Body() body: { ids: number[]; status: number }) {
    return this.personnelService.batchUpdateStatus(body.ids, body.status);
  }
}
