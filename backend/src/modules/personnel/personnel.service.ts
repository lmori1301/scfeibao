import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Personnel } from '../../database/entities/personnel.entity';
import {
  CreatePersonnelDto,
  UpdatePersonnelDto,
  QueryPersonnelDto,
} from './dto/personnel.dto';
import {
  PaginationDto,
  PaginatedResponseDto,
} from '../../common/dto/pagination.dto';
import {
  ImportResult,
  parseExcelRows,
  toOptionalDate,
  toOptionalNumber,
  toOptionalString,
  toStatusNumber,
} from '../../common/utils/excel-import';

@Injectable()
export class PersonnelService {
  constructor(
    @InjectRepository(Personnel)
    private personnelRepository: Repository<Personnel>,
  ) {}

  async create(createPersonnelDto: CreatePersonnelDto): Promise<Personnel> {
    const personnel = this.personnelRepository.create(createPersonnelDto);
    return await this.personnelRepository.save(personnel);
  }

  async findAll(
    paginationDto: PaginationDto,
    queryDto: QueryPersonnelDto,
  ): Promise<PaginatedResponseDto<Personnel>> {
    const { page, pageSize } = paginationDto;
    const { id, team, status, keyword, personnelCode } = queryDto;

    const where: any = {};
    if (id !== undefined) where.id = id;
    if (team) where.team = team;
    if (status !== undefined) where.status = status;
    if (personnelCode) where.personnelCode = Like(`%${personnelCode}%`);
    if (keyword) {
      where.name = Like(`%${keyword}%`);
    }

    const [items, total] = await this.personnelRepository.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return new PaginatedResponseDto(items, total, page, pageSize);
  }

  async searchByIdCard(idCard: string): Promise<Personnel> {
    const personnel = await this.personnelRepository.findOne({
      where: { idCard },
    });
    if (!personnel) {
      throw new NotFoundException('人员不存在');
    }
    return personnel;
  }

  async findOne(id: number): Promise<Personnel> {
    const personnel = await this.personnelRepository.findOne({
      where: { id },
    });
    if (!personnel) {
      throw new NotFoundException('人员不存在');
    }
    return personnel;
  }

  async update(
    id: number,
    updatePersonnelDto: UpdatePersonnelDto,
  ): Promise<Personnel> {
    const personnel = await this.findOne(id);
    Object.assign(personnel, updatePersonnelDto);
    return await this.personnelRepository.save(personnel);
  }

  async remove(id: number): Promise<void> {
    const personnel = await this.findOne(id);
    await this.personnelRepository.softRemove(personnel);
  }

  async batchDelete(ids: number[]): Promise<void> {
    await this.personnelRepository.softDelete(ids);
  }

  async batchUpdateStatus(ids: number[], status: number): Promise<void> {
    await this.personnelRepository.update(ids, { status });
  }

  async importFromExcel(buffer: Buffer): Promise<ImportResult> {
    const parsed = await parseExcelRows<Personnel>(buffer, [
      { field: 'personnelCode', headers: ['人员编号', 'personnelCode'], transform: toOptionalString },
      { field: 'name', headers: ['姓名', 'name'], required: true },
      { field: 'idCard', headers: ['身份证号', 'idCard'], required: true },
      { field: 'phone', headers: ['联系电话', '手机号码', 'phone'], transform: toOptionalString },
      { field: 'email', headers: ['电子邮箱', '邮箱', 'email'], transform: toOptionalString },
      { field: 'team', headers: ['所属部门', '所属队伍', 'team'], transform: toOptionalString },
      { field: 'workUnit', headers: ['工作单位', 'workUnit'], transform: toOptionalString },
      { field: 'position', headers: ['职务', '职位', 'position'], transform: toOptionalString },
      { field: 'joinDate', headers: ['入职日期', '入队日期', 'joinDate'], transform: toOptionalDate },
      { field: 'photoUrl', headers: ['人员照片', '照片', 'photoUrl'], transform: toOptionalString },
      { field: 'taskCount', headers: ['出勤次数', 'taskCount'], transform: toOptionalNumber },
      { field: 'trainingHours', headers: ['培训时长', '培训时长(小时)', 'trainingHours'], transform: toOptionalNumber },
      { field: 'auditStatus', headers: ['审核状态', 'auditStatus'], transform: this.toAuditStatus },
      { field: 'status', headers: ['在职状态', '人员状态', '状态', 'status'], transform: (value) => toStatusNumber(value, ['在职', '已通过']) },
      { field: 'remark', headers: ['备注', 'remark'], transform: toOptionalString },
    ]);

    const result: ImportResult = {
      total: parsed.rows.length,
      created: 0,
      updated: 0,
      failed: parsed.errors.length,
      errors: parsed.errors,
    };

    for (const item of parsed.rows) {
      try {
        const data = item.data;
        if (data.status === undefined) data.status = 1;
        if (data.auditStatus === undefined) data.auditStatus = 1;

        const existing = await this.personnelRepository.findOne({
          where: { idCard: String(data.idCard) },
          withDeleted: true,
        });

        if (existing) {
          Object.assign(existing, data);
          await this.personnelRepository.save(existing);
          result.updated += 1;
        } else {
          await this.personnelRepository.save(this.personnelRepository.create(data));
          result.created += 1;
        }
      } catch (error) {
        result.failed += 1;
        result.errors.push({
          row: item.rowNumber,
          message: error instanceof Error ? error.message : '导入失败',
        });
      }
    }

    return result;
  }

  private toAuditStatus(value: string) {
    const text = String(value || '').trim();
    if (!text) return undefined;
    if (text === '待审核' || text === '0') return 0;
    if (text === '已拒绝' || text === '拒绝' || text === '2') return 2;
    return 1;
  }
}
