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
  Headers,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
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
import { RequirePermissions } from '../../common/decorators/permissions.decorator';

/** 二维码内嵌链接的门户根地址：禁止带 path/query，避免开放重定向 */
function pickPortalPublicOrigin(portalBase?: string, headerPortal?: string): string {
  const decoded = portalBase ? safeDecodeURIComponent(portalBase.trim()) : '';
  const candidates = [
    decoded,
    (headerPortal || '').trim(),
    (process.env.PORTAL_PUBLIC_URL || '').trim(),
    (process.env.FRONTEND_URL || '').trim(),
  ].filter(Boolean);
  for (const raw of candidates) {
    const base = raw.replace(/\/+$/, '');
    if (isSafeHttpOrigin(base)) return base;
  }
  return 'http://localhost:5173';
}

function safeDecodeURIComponent(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

function isSafeHttpOrigin(url: string): boolean {
  try {
    const u = new URL(url);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return false;
    if (u.search || u.hash) return false;
    if (u.pathname && u.pathname !== '/') return false;
    return true;
  } catch {
    return false;
  }
}

@ApiTags('人员查询')
@Controller('personnel')
export class PersonnelController {
  constructor(private readonly personnelService: PersonnelService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建人员' })
  @RequirePermissions('Personnel')
  create(@Body() createPersonnelDto: CreatePersonnelDto) {
    return this.personnelService.create(createPersonnelDto);
  }

  @Post('import')
  @ApiBearerAuth()
  @ApiOperation({ summary: '导入人员台账' })
  @RequirePermissions('Personnel')
  @UseInterceptors(FileInterceptor('file', {
    storage: memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
  }))
  import(@UploadedFile() file?: Express.Multer.File) {
    if (!file?.buffer) {
      throw new BadRequestException('请上传导入文件');
    }
    return this.personnelService.importFromExcel(file.buffer);
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
  @RequirePermissions('Personnel')
  update(
    @Param('id') id: string,
    @Body() updatePersonnelDto: UpdatePersonnelDto,
  ) {
    return this.personnelService.update(+id, updatePersonnelDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除人员' })
  @RequirePermissions('Personnel')
  remove(@Param('id') id: string) {
    return this.personnelService.remove(+id);
  }

  @Post('batch/delete')
  @ApiBearerAuth()
  @ApiOperation({ summary: '批量删除人员' })
  @RequirePermissions('Personnel')
  batchDelete(@Body() body: { ids: number[] }) {
    return this.personnelService.batchDelete(body.ids);
  }

  @Post('batch/status')
  @ApiBearerAuth()
  @ApiOperation({ summary: '批量更新状态' })
  @RequirePermissions('Personnel')
  batchUpdateStatus(@Body() body: { ids: number[]; status: number }) {
    return this.personnelService.batchUpdateStatus(body.ids, body.status);
  }

  @Public()
  @Get(':id/qrcode')
  @ApiOperation({ summary: '生成人员二维码' })
  async generateQRCode(
    @Param('id') id: string,
    @Query('portalBase') portalBase: string | undefined,
    @Headers('x-portal-public-url') headerPortal: string | undefined,
    @Res() res: Response,
  ) {
    try {
      const baseUrl = pickPortalPublicOrigin(portalBase, headerPortal);
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
