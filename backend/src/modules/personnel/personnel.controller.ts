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

function pickPersonnelMobileOrigin(fallbackPortalOrigin: string): string {
  const candidates = [
    (process.env.PERSONNEL_QRCODE_PUBLIC_URL || '').trim(),
    (process.env.BACKEND_PUBLIC_URL || '').trim(),
  ].filter(Boolean);

  for (const raw of candidates) {
    const base = raw.replace(/\/+$/, '');
    if (isSafeHttpOrigin(base)) return base;
  }

  return fallbackPortalOrigin.replace(/:5173$/, ':3003');
}

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(value: unknown): string {
  if (!value) return '—';
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) return '—';
  return date.toISOString().slice(0, 10);
}

function auditStatusLabel(value: unknown): string {
  const n = Number(value);
  if (n === 0) return '待审核';
  if (n === 1) return '已通过';
  if (n === 2) return '已拒绝';
  return '—';
}

function parseFirstPhotoUrl(value: unknown): string {
  const raw = String(value ?? '').trim();
  if (!raw) return '';
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return String(parsed[0] ?? '').trim();
    }
  } catch {
    // 兼容历史的逗号分隔或单 URL 字符串。
  }
  return raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)[0] || '';
}

function renderMobilePersonnelHtml(personnel: Record<string, any>): string {
  const item = (label: string, value: unknown) => `
    <div class="info-row">
      <dt>${escapeHtml(label)}</dt>
      <dd>${escapeHtml(value || '—')}</dd>
    </div>`;

  const status = Number(personnel.status) === 1 ? '在职' : '离职';
  const photoUrl = parseFirstPhotoUrl(personnel.photoUrl);
  const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="format-detection" content="telephone=no" />
  <title>${escapeHtml(personnel.name || '人员详情')} - 四川飞豹救援</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      background: #eef2f8;
      color: #1f2f46;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    .page { padding: 16px 12px 28px; }
    .card {
      max-width: 720px;
      margin: 0 auto;
      overflow: hidden;
      border: 1px solid #e4eaf4;
      border-radius: 14px;
      background: #fff;
      box-shadow: 0 10px 32px rgba(31, 57, 106, 0.08);
    }
    .head {
      padding: 18px;
      text-align: center;
      color: #1f2f46;
      background: #f7fbff;
    }
    .avatar {
      width: 100%;
      aspect-ratio: 4 / 3;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border: none;
      border-radius: 0;
      background: #edf3fb;
      color: #8b98ad;
      font-size: 14px;
    }
    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .body { padding: 18px 14px 8px; }
    h2 { margin: 0 0 12px; font-size: 16px; }
    dl { margin: 0; border: 1px solid #e8edf5; border-bottom: 0; border-radius: 10px; overflow: hidden; }
    .info-row { display: flex; min-height: 44px; border-bottom: 1px solid #e8edf5; background: #fff; }
    dt {
      width: 104px;
      flex: 0 0 104px;
      padding: 12px 10px;
      background: #f7f9fd;
      color: #5a6a85;
      font-size: 13px;
      line-height: 20px;
    }
    dd {
      margin: 0;
      flex: 1;
      padding: 12px 10px;
      color: #24364f;
      font-size: 14px;
      line-height: 20px;
      word-break: break-word;
    }
    .block { margin-top: 16px; padding-top: 14px; border-top: 1px solid #eef3fb; }
    .block-title { margin: 0 0 8px; font-size: 15px; }
    .text { color: #4a5568; font-size: 14px; line-height: 1.75; white-space: pre-wrap; }
    .foot { padding: 16px; text-align: center; color: #8a96aa; font-size: 12px; background: #f8fafc; }
  </style>
</head>
<body>
  <main class="page">
    <article class="card">
      <header class="head">
        <div class="avatar">${photoUrl ? `<img src="${escapeHtml(photoUrl)}" alt="人员照片" />` : '人员照片预览'}</div>
      </header>
      <section class="body">
        <h2>人员信息</h2>
        <dl>
          ${item('人员编号', personnel.personnelCode || personnel.id)}
          ${item('姓名', personnel.name)}
          ${item('身份证号', personnel.idCard)}
          ${item('性别', personnel.gender)}
          ${item('出生日期', formatDate(personnel.birthDate))}
          ${item('联系电话', personnel.phone)}
          ${item('电子邮箱', personnel.email)}
          ${item('工作单位', personnel.workUnit)}
          ${item('所属队伍', personnel.team)}
          ${item('职务', personnel.position)}
          ${item('入队日期', formatDate(personnel.joinDate))}
          ${item('出勤次数', personnel.taskCount != null ? `${personnel.taskCount} 次` : '—')}
          ${item('培训时长', personnel.trainingHours != null ? `${personnel.trainingHours} 小时` : '—')}
          ${item('在职状态', status)}
          ${item('审核状态', auditStatusLabel(personnel.auditStatus))}
        </dl>
        ${personnel.remark ? `<div class="block"><h3 class="block-title">备注</h3><div class="text">${escapeHtml(personnel.remark)}</div></div>` : ''}
      </section>
      <footer class="foot">四川飞豹救援<br />更新时间：${escapeHtml(formatDate(personnel.updatedAt))}</footer>
    </article>
  </main>
</body>
</html>`;

  return html;
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
  @Get(':id/mobile')
  @ApiOperation({ summary: '人员二维码手机详情页' })
  async mobileDetail(@Param('id') id: string, @Res() res: Response) {
    const personnel = await this.personnelService.findOne(+id);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.send(renderMobilePersonnelHtml(personnel as unknown as Record<string, any>));
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
      const mobileBaseUrl = pickPersonnelMobileOrigin(baseUrl);
      const personnelUrl = `${mobileBaseUrl}/api/personnel/${id}/mobile`;

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
