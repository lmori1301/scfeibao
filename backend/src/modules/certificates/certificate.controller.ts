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
import { CertificateService } from './certificate.service';
import {
  CreateCertificateDto,
  UpdateCertificateDto,
  QueryCertificateDto,
} from './dto/certificate.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('证书查询')
@Controller('certificates')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建证书' })
  create(@Body() createCertificateDto: CreateCertificateDto) {
    return this.certificateService.create(createCertificateDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '获取证书列表' })
  findAll(@Query() queryDto: QueryCertificateDto) {
    return this.certificateService.findAll(queryDto, queryDto);
  }

  @Public()
  @Get('search')
  @ApiOperation({ summary: '搜索证书' })
  search(@Query('certificateNumber') certificateNumber: string) {
    return this.certificateService.searchByCertificateNumber(certificateNumber);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: '获取证书详情' })
  findOne(@Param('id') id: string) {
    return this.certificateService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新证书' })
  update(
    @Param('id') id: string,
    @Body() updateCertificateDto: UpdateCertificateDto,
  ) {
    return this.certificateService.update(+id, updateCertificateDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除证书' })
  remove(@Param('id') id: string) {
    return this.certificateService.remove(+id);
  }

  @Post('batch/delete')
  @ApiBearerAuth()
  @ApiOperation({ summary: '批量删除证书' })
  batchDelete(@Body() body: { ids: number[] }) {
    return this.certificateService.batchDelete(body.ids);
  }

  @Post('batch/status')
  @ApiBearerAuth()
  @ApiOperation({ summary: '批量更新状态' })
  batchUpdateStatus(@Body() body: { ids: number[]; status: number }) {
    return this.certificateService.batchUpdateStatus(body.ids, body.status);
  }
}
