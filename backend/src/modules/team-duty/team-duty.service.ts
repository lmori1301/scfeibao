import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { readSheet } from 'read-excel-file/node';
import type { SheetData } from 'read-excel-file/types/SheetData';
import { promises as fs } from 'fs';
import * as path from 'path';
import { TeamDuty } from '../../database/entities/team-duty.entity';
import {
  CreateTeamDutyDto,
  CreateTeamDutyBatchDto,
  UpdateTeamDutyDto,
  QueryTeamDutyDto,
  TeamDutyItemDto,
} from './dto/team-duty.dto';
import {
  PaginationDto,
  PaginatedResponseDto,
} from '../../common/dto/pagination.dto';
import {
  parseDutyRoster,
} from '../../common/utils/duty-roster-parser';

export type TeamDutyBatchResult = {
  total: number;
  created: number;
  failed: number;
  errors: Array<{ row: number; message: string }>;
  items: TeamDuty[];
};

/** 前台导入的入参 */
export type FrontendImportMeta = {
  teamName: string;
  dutyYear: string;
  submitterName?: string;
  submitterPhone?: string;
};

export type FrontendImportResult = {
  total: number;
  created: number;
  skipped: number;
  failed: number;
  errors: Array<{ row: number; message: string }>;
  attachUrl: string | null;
  attachName: string | null;
  message: string;
};

@Injectable()
export class TeamDutyService {
  private readonly logger = new Logger(TeamDutyService.name);

  constructor(
    @InjectRepository(TeamDuty)
    private readonly teamDutyRepository: Repository<TeamDuty>,
  ) {}

  /**
   * 前台公开导入：xlsx → 解析 → 判重 → 入库 → 保存原始附件。
   *
   * 解析复用 `common/utils/duty-roster-parser`（与后台 TeamDuty.vue 用的是同一套逻辑，
   * 且带单元测试），避免前后端维护两份解析规则。
   */
  async importFromXlsx(
    file: Express.Multer.File,
    meta: FrontendImportMeta,
  ): Promise<FrontendImportResult> {
    const errors: Array<{ row: number; message: string }> = [];

    // ---- 1. 读表 ----
    let matrix: SheetData;
    try {
      matrix = await readSheet(file.buffer, 1);
    } catch (error) {
      const raw = String((error as Error)?.message || error || '');
      this.logger.warn(`[TeamDuty] 前台导入解析失败：${raw}`);
      throw new BadRequestException(toFriendlyParseError(raw));
    }

    // ---- 2. 解析 ----
    const parsed = parseDutyRoster(matrix as unknown as unknown[][]);
    errors.push(...parsed.errors);

    if (parsed.rows.length === 0) {
      throw new BadRequestException(
        errors[0]?.message || '未从文件中解析到值班记录，请确认表格结构（首行需含时间/日期列）',
      );
    }

    // ---- 3. 保存原始附件（列表可查看/下载） ----
    const { attachUrl, attachName } = await this.saveImportAttachment(file);

    // ---- 4. 判重：同「队伍 + 年份 + 日期」已存在则跳过 ----
    const dates = parsed.rows.map((r) => r.dutyDate).filter(Boolean);
    const existing = await this.teamDutyRepository
      .createQueryBuilder('td')
      .select('td.dutyDate', 'dutyDate')
      .where('td.teamName = :teamName', { teamName: meta.teamName })
      .andWhere('td.dutyYear = :dutyYear', { dutyYear: meta.dutyYear })
      .andWhere('td.dutyDate IN (:...dates)', { dates })
      .getRawMany<{ dutyDate: string | Date | null }>();

    const existed = new Set(
      existing.map((row) =>
        row.dutyDate instanceof Date
          ? row.dutyDate.toISOString().slice(0, 10)
          : String(row.dutyDate || '').slice(0, 10),
      ),
    );

    // ---- 5. 组装待入库数据（文件内重复也跳过） ----
    const submitter = [meta.submitterName, meta.submitterPhone && `电话${meta.submitterPhone}`]
      .filter(Boolean)
      .join(' / ');
    const remarkPrefix = submitter ? `前台提交：${submitter}` : '前台提交';

    const toSave: TeamDuty[] = [];
    let skipped = 0;
    const seenInFile = new Set<string>();

    parsed.rows.forEach((row) => {
      if (!row.dutyCadreName?.trim() || !row.dutyStaff?.trim()) {
        errors.push({ row: row.rowNumber, message: '值班干部与值班员均不能为空' });
        return;
      }
      if (existed.has(row.dutyDate) || seenInFile.has(row.dutyDate)) {
        skipped += 1;
        return;
      }
      seenInFile.add(row.dutyDate);
      toSave.push(
        this.teamDutyRepository.create({
          teamName: meta.teamName,
          dutyYear: meta.dutyYear,
          dutyDate: toDateOrNull(row.dutyDate),
          dutyCadreName: row.dutyCadreName.trim(),
          dutyCadrePhone: row.dutyCadrePhone?.trim() || null,
          dutyStaff: row.dutyStaff.trim(),
          attachUrl,
          attachName,
          // 解析器不产出 remark（表结构里无备注列），统一记录提交来源便于追溯
          remark: remarkPrefix,
          createBy: meta.submitterName || '前台提交',
        }),
      );
    });

    // ---- 6. 入库 ----
    const saved = toSave.length ? await this.teamDutyRepository.save(toSave) : [];

    if (skipped > 0) {
      errors.push({
        row: 0,
        message: `有 ${skipped} 条记录因「${meta.teamName} ${meta.dutyYear}」下日期已存在被跳过`,
      });
    }

    const message = toSave.length
      ? `导入成功，新增 ${saved.length} 条${skipped ? `，跳过重复 ${skipped} 条` : ''}`
      : `未新增记录${skipped ? `，${skipped} 条均已存在` : ''}`;

    return {
      total: parsed.rows.length,
      created: saved.length,
      skipped,
      failed: errors.length,
      errors,
      attachUrl,
      attachName,
      message,
    };
  }

  /** 把上传的原始 xlsx 落到 uploads/files，返回可访问的 url 与原始文件名 */
  private async saveImportAttachment(
    file: Express.Multer.File,
  ): Promise<{ attachUrl: string | null; attachName: string | null }> {
    try {
      let originalName = file.originalname || 'duty-roster.xlsx';
      try {
        originalName = Buffer.from(originalName, 'latin1').toString('utf8');
      } catch {
        /* 保持原名 */
      }

      const dir = path.join(process.cwd(), 'uploads', 'files');
      await fs.mkdir(dir, { recursive: true });
      const unique = `${Date.now()}-${Math.round(Math.random() * 1E9)}.xlsx`;
      await fs.writeFile(path.join(dir, unique), file.buffer);

      return { attachUrl: `/uploads/files/${unique}`, attachName: originalName };
    } catch (error) {
      // 附件保存失败不阻断入库，但要让调用方知道附件没存上
      this.logger.error('[TeamDuty] 保存导入附件失败：', error);
      return { attachUrl: null, attachName: null };
    }
  }

  async create(
    dto: CreateTeamDutyDto,
    createBy?: string,
  ): Promise<TeamDuty> {
    const entity = this.teamDutyRepository.create({
      teamName: dto.teamName,
      dutyYear: dto.dutyYear,
      dutyDate: toDateOrNull(dto.dutyDate),
      dutyCadreName: dto.dutyCadreName || null,
      dutyCadrePhone: dto.dutyCadrePhone || null,
      dutyStaff: dto.dutyStaff || null,
      attachUrl: dto.attachUrl || null,
      attachName: dto.attachName || null,
      remark: dto.remark || null,
      createBy: createBy || null,
    });
    return this.teamDutyRepository.save(entity);
  }

  /**
   * 批量新增：一次提交附件解析出的全部值班行。
   * 幂等策略：同一「队伍 + 值班日期」已存在则更新该条（覆盖式导入），
   * 避免重复上传同一份值班表产生重复记录。
   */
  async createBatch(
    dto: CreateTeamDutyBatchDto,
    createBy?: string,
  ): Promise<TeamDutyBatchResult> {
    const errors: TeamDutyBatchResult['errors'] = [];
    const created: TeamDuty[] = [];

    dto.items.forEach((item, index) => {
      if (!item.dutyCadreName?.trim()) {
        errors.push({ row: index + 1, message: '值班干部不能为空' });
        return;
      }
      if (!item.dutyStaff?.trim()) {
        errors.push({ row: index + 1, message: '值班员不能为空' });
        return;
      }

      const entity = this.teamDutyRepository.create({
        teamName: dto.teamName,
        dutyYear: dto.dutyYear,
        dutyDate: toDateOrNull(item.dutyDate),
        dutyCadreName: item.dutyCadreName.trim(),
        dutyCadrePhone: item.dutyCadrePhone?.trim() || null,
        dutyStaff: item.dutyStaff.trim(),
        attachUrl: dto.attachUrl || null,
        attachName: dto.attachName || null,
        remark: item.remark || null,
        createBy: createBy || null,
      });
      created.push(entity);
    });

    if (created.length === 0) {
      return {
        total: dto.items.length,
        created: 0,
        failed: errors.length,
        errors,
        items: [],
      };
    }

    // 覆盖式导入：同「队伍 + 值班日期」已存在的记录改为更新
    const dates = created
      .map((entity) => toDateOnly(entity.dutyDate))
      .filter((date): date is string => !!date);

    if (dates.length > 0) {
      const existing = await this.teamDutyRepository
        .createQueryBuilder('td')
        .where('td.teamName = :teamName', { teamName: dto.teamName })
        .andWhere('td.dutyDate IN (:...dates)', { dates })
        .getMany();

      const existingByDate = new Map(
        existing.map((row) => [toDateOnly(row.dutyDate) ?? '', row]),
      );

      created.forEach((entity) => {
        const hit = existingByDate.get(toDateOnly(entity.dutyDate) ?? '');
        if (hit) {
          // 复用已存在实体，save 时执行 UPDATE
          hit.dutyYear = entity.dutyYear;
          hit.dutyCadreName = entity.dutyCadreName;
          hit.dutyCadrePhone = entity.dutyCadrePhone;
          hit.dutyStaff = entity.dutyStaff;
          if (entity.attachUrl) {
            hit.attachUrl = entity.attachUrl;
            hit.attachName = entity.attachName;
          }
          hit.remark = entity.remark;
          created[created.indexOf(entity)] = hit;
        }
      });
    }

    const saved = await this.teamDutyRepository.save(created);

    return {
      total: dto.items.length,
      created: saved.length,
      failed: errors.length,
      errors,
      items: saved,
    };
  }

  async findAll(
    paginationDto: PaginationDto,
    queryDto: QueryTeamDutyDto,
  ): Promise<PaginatedResponseDto<TeamDuty>> {
    const { page, pageSize } = paginationDto;
    const qb = this.teamDutyRepository.createQueryBuilder('td');

    if (queryDto.teamName) {
      qb.andWhere('td.teamName = :teamName', { teamName: queryDto.teamName });
    }
    if (queryDto.dutyYear) {
      qb.andWhere('td.dutyYear = :dutyYear', { dutyYear: queryDto.dutyYear });
    }
    if (queryDto.startDate) {
      qb.andWhere('td.dutyDate >= :startDate', {
        startDate: queryDto.startDate,
      });
    }
    if (queryDto.endDate) {
      qb.andWhere('td.dutyDate <= :endDate', { endDate: queryDto.endDate });
    }
    if (queryDto.keyword?.trim()) {
      const kw = `%${queryDto.keyword.trim()}%`;
      qb.andWhere(
        '(td.dutyCadreName LIKE :kw OR td.dutyCadrePhone LIKE :kw OR td.dutyStaff LIKE :kw)',
        { kw },
      );
    }

    qb.orderBy('td.dutyDate', 'ASC')
      .addOrderBy('td.id', 'ASC')
      .skip((Math.max(page, 1) - 1) * pageSize)
      .take(pageSize);

    const [items, total] = await qb.getManyAndCount();
    return new PaginatedResponseDto(items, total, page, pageSize);
  }

  async findOne(id: number): Promise<TeamDuty> {
    const entity = await this.teamDutyRepository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException('队伍值班记录不存在');
    }
    return entity;
  }

  async update(id: number, dto: UpdateTeamDutyDto): Promise<TeamDuty> {
    const entity = await this.findOne(id);

    if (dto.teamName !== undefined) entity.teamName = dto.teamName;
    if (dto.dutyYear !== undefined) entity.dutyYear = dto.dutyYear;
    if (dto.dutyDate !== undefined) entity.dutyDate = toDateOrNull(dto.dutyDate);
    if (dto.dutyCadreName !== undefined) {
      entity.dutyCadreName = dto.dutyCadreName || null;
    }
    if (dto.dutyCadrePhone !== undefined) {
      entity.dutyCadrePhone = dto.dutyCadrePhone || null;
    }
    if (dto.dutyStaff !== undefined) entity.dutyStaff = dto.dutyStaff || null;
    if (dto.attachUrl !== undefined) entity.attachUrl = dto.attachUrl || null;
    if (dto.attachName !== undefined) {
      entity.attachName = dto.attachName || null;
    }
    if (dto.remark !== undefined) entity.remark = dto.remark || null;

    return this.teamDutyRepository.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.teamDutyRepository.softRemove(entity);
  }

  async removeMany(ids: number[]): Promise<number> {
    if (!ids.length) return 0;
    const result = await this.teamDutyRepository.softDelete(ids);
    return result.affected ?? 0;
  }

  /** 值班可选年份：库中已有年份 + 当前年份 ± 2 年，供下拉兜底 */
  async listYears(): Promise<string[]> {
    const rows = await this.teamDutyRepository
      .createQueryBuilder('td')
      .select('DISTINCT td.dutyYear', 'dutyYear')
      .where('td.dutyYear IS NOT NULL')
      .andWhere("td.dutyYear <> ''")
      .orderBy('td.dutyYear', 'DESC')
      .getRawMany<{ dutyYear: string }>();

    const now = new Date().getFullYear();
    const base = new Set<string>(rows.map((row) => row.dutyYear));
    for (let offset = -2; offset <= 1; offset += 1) {
      base.add(String(now + offset));
    }
    return [...base].sort((a, b) => Number(b) - Number(a));
  }

  /** 供导入解析结果预览（不入库）使用 */
  buildPreview(
    teamName: string,
    dutyYear: string,
    items: TeamDutyItemDto[],
  ) {
    return items.map((item) => ({
      teamName,
      dutyYear,
      dutyDate: item.dutyDate ?? null,
      dutyCadreName: item.dutyCadreName ?? '',
      dutyCadrePhone: item.dutyCadrePhone ?? '',
      dutyStaff: item.dutyStaff ?? '',
    }));
  }
}

function toDateOrNull(value?: string): Date | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

/** Date → 'YYYY-MM-DD'（按本地时区，避免 UTC 偏移串日） */
function toDateOnly(value?: Date | null): string | null {
  if (!value) return null;
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** 把 Excel 库的英文异常归一化成面向用户的中文提示（与后台 TeamDuty.vue 同套规则） */
function toFriendlyParseError(rawMessage: string): string {
  const msg = String(rawMessage || '');
  if (/doesn't look like an? .?\.?xlsx/i.test(msg) || /invalid spreadsheet|zip/i.test(msg)) {
    return '文件不是有效的 .xlsx 文件（若为 .xls 或 CSV，请先另存为 .xlsx 格式）';
  }
  if (/password|encrypted/i.test(msg)) {
    return '文件已加密，请解除密码保护后再上传';
  }
  if (/not found|sheet/i.test(msg)) {
    return '未在文件中找到工作表，请确认文件内容完整';
  }
  if (!msg) return '文件解析失败，请上传 .xlsx 格式的值班表';
  return `文件解析失败：${msg}（请确认上传的是 .xlsx 格式值班表）`;
}
