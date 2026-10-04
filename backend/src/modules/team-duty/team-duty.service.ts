import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

export type TeamDutyBatchResult = {
  total: number;
  created: number;
  failed: number;
  errors: Array<{ row: number; message: string }>;
  items: TeamDuty[];
};

@Injectable()
export class TeamDutyService {
  constructor(
    @InjectRepository(TeamDuty)
    private readonly teamDutyRepository: Repository<TeamDuty>,
  ) {}

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
