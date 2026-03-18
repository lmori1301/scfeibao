import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { PersonnelService } from './personnel.service';
import {
  CreatePersonnelDto,
  UpdatePersonnelDto,
  QueryPersonnelDto,
} from './dto/personnel.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Public } from '../../common/decorators/public.decorator';
import * as QRCode from 'qrcode';

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

  @Public()
  @Get(':id/qrcode')
  @ApiOperation({ summary: '生成人员二维码' })
  async generateQRCode(@Param('id') id: string, @Res() res: Response) {
    try {
      // 生成前端个人信息页面的URL
      const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const personnelUrl = `${baseUrl}/personnel/${id}`;

      // 生成二维码
      const qrCodeDataUrl = await QRCode.toDataURL(personnelUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      // 返回二维码图片的base64数据
      res.json({
        code: 200,
        data: {
          qrcode: qrCodeDataUrl,
          url: personnelUrl
        },
        message: '生成成功'
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: '生成二维码失败',
        error: error.message
      });
    }
  }
}
