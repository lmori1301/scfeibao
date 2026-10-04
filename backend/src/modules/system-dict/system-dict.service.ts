import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemDictData } from '../../database/entities/system-dict-data.entity';
import {
  CreateSystemDictDataDto,
  UpdateSystemDictDataDto,
  QuerySystemDictDataDto,
} from './dto/system-dict-data.dto';
import {
  PaginationDto,
  PaginatedResponseDto,
} from '../../common/dto/pagination.dto';
import { TeamUnitService } from '../team-units/team-unit.service';
import { TeamDutyService } from '../team-duty/team-duty.service';

/** 走队伍字典（team_units）的类型，保持队伍名称单一事实源 */
const TEAM_NAME_DICT_TYPE = 'team_name';
/** 走值班库已有年份 + 当前年份兜底的类型 */
const DUTY_YEAR_DICT_TYPE = 'duty_year';

export type DictOption = {
  label: string;
  value: string;
  sort: number;
};

@Injectable()
export class SystemDictService {
  constructor(
    @InjectRepository(SystemDictData)
    private readonly dictRepository: Repository<SystemDictData>,
    private readonly teamUnitService: TeamUnitService,
    private readonly teamDutyService: TeamDutyService,
  ) {}

  /** `/system/dict/data/type/{dictType}`：返回启用中的字典项 */
  async optionsByType(dictType: string): Promise<DictOption[]> {
    const type = String(dictType || '').trim();

    if (type === TEAM_NAME_DICT_TYPE) {
      const units = await this.teamUnitService.findOptions(1);
      return units.map((unit: any) => ({
        label: unit.name,
        value: unit.name,
        sort: unit.sort ?? 0,
      }));
    }

    if (type === DUTY_YEAR_DICT_TYPE) {
      const years = await this.teamDutyService.listYears();
      return years.map((year, index) => ({
        label: `${year}年`,
        value: year,
        sort: index,
      }));
    }

    const rows = await this.dictRepository.find({
      where: { dictType: type, status: 1 },
      order: { sort: 'ASC', createdAt: 'ASC' },
    });

    return rows.map((row) => ({
      label: row.dictLabel,
      value: row.dictValue || row.dictLabel,
      sort: row.sort,
    }));
  }

  async findAll(
    paginationDto: PaginationDto,
    queryDto: QuerySystemDictDataDto,
  ): Promise<PaginatedResponseDto<SystemDictData>> {
    const { page, pageSize } = paginationDto;
    const where: Record<string, any> = {};
    if (queryDto.dictType) where.dictType = queryDto.dictType;
    if (queryDto.status !== undefined) where.status = queryDto.status;

    const [items, total] = await this.dictRepository.findAndCount({
      where,
      order: { sort: 'ASC', createdAt: 'ASC' },
      skip: (Math.max(page, 1) - 1) * pageSize,
      take: pageSize,
    });
    return new PaginatedResponseDto(items, total, page, pageSize);
  }

  async create(dto: CreateSystemDictDataDto): Promise<SystemDictData> {
    if (dto.dictType === TEAM_NAME_DICT_TYPE) {
      throw new BadRequestException(
        '队伍名称字典请在「队伍字典」页面维护，此处不可新增',
      );
    }
    const entity = this.dictRepository.create({
      dictType: dto.dictType,
      dictLabel: dto.dictLabel,
      dictValue: dto.dictValue || dto.dictLabel,
      sort: dto.sort ?? 0,
      status: dto.status ?? 1,
      remark: dto.remark || null,
    });
    return this.dictRepository.save(entity);
  }

  async findOne(id: number): Promise<SystemDictData> {
    const entity = await this.dictRepository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('字典项不存在');
    return entity;
  }

  async update(
    id: number,
    dto: UpdateSystemDictDataDto,
  ): Promise<SystemDictData> {
    const entity = await this.findOne(id);
    if (dto.dictLabel !== undefined) entity.dictLabel = dto.dictLabel;
    if (dto.dictValue !== undefined) {
      entity.dictValue = dto.dictValue || dto.dictLabel || entity.dictLabel;
    }
    if (dto.sort !== undefined) entity.sort = dto.sort;
    if (dto.status !== undefined) entity.status = dto.status;
    if (dto.remark !== undefined) entity.remark = dto.remark || null;
    return this.dictRepository.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.dictRepository.softRemove(entity);
  }
}
