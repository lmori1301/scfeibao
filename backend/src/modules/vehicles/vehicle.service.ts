import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository, Like } from 'typeorm';
import { Vehicle } from '../../database/entities/vehicle.entity';
import {
  CreateVehicleDto,
  UpdateVehicleDto,
  QueryVehicleDto,
} from './dto/vehicle.dto';
import {
  PaginationDto,
  PaginatedResponseDto,
} from '../../common/dto/pagination.dto';
import {
  ImportResult,
  parseExcelRows,
  toOptionalDate,
  toOptionalString,
  toStatusNumber,
} from '../../common/utils/excel-import';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const vehicle = this.vehicleRepository.create(createVehicleDto);
    try {
      return await this.vehicleRepository.save(vehicle);
    } catch (e) {
      this.rethrowIfVehicleUniqueViolation(e);
    }
  }

  async findAll(
    paginationDto: PaginationDto,
    queryDto: QueryVehicleDto,
  ): Promise<PaginatedResponseDto<Vehicle>> {
    const { page, pageSize } = paginationDto;
    const { vehicleType, team, status, keyword, vehicleNo } = queryDto;

    const where: any = {};
    if (vehicleType) where.vehicleType = vehicleType;
    if (team) where.team = team;
    if (status !== undefined) where.status = status;
    if (keyword) {
      where.plateNumber = Like(`%${keyword}%`);
    }
    if (vehicleNo?.trim()) {
      where.vehicleNo = Like(`%${vehicleNo.trim()}%`);
    }

    const [items, total] = await this.vehicleRepository.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return new PaginatedResponseDto(items, total, page, pageSize);
  }

  async searchByPlateNumber(plateNumber: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { plateNumber },
    });
    if (!vehicle) {
      throw new NotFoundException('车辆不存在');
    }
    return vehicle;
  }

  async findOne(id: number): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id },
    });
    if (!vehicle) {
      throw new NotFoundException('车辆不存在');
    }
    return vehicle;
  }

  async update(
    id: number,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    const vehicle = await this.findOne(id);
    Object.assign(vehicle, updateVehicleDto);
    try {
      return await this.vehicleRepository.save(vehicle);
    } catch (e) {
      this.rethrowIfVehicleUniqueViolation(e);
    }
  }

  /** 车牌号 unique 等冲突时 MySQL 抛 ER_DUP_ENTRY，否则前端只看到 500 */
  private rethrowIfVehicleUniqueViolation(err: unknown): never {
    if (err instanceof QueryFailedError) {
      const d = err.driverError as { code?: string; errno?: number };
      if (d?.code === 'ER_DUP_ENTRY' || d?.errno === 1062) {
        throw new ConflictException(
          '该车牌号已被其他车辆使用，请改回或更换为未占用的号牌后保存',
        );
      }
    }
    throw err;
  }

  async remove(id: number): Promise<void> {
    const vehicle = await this.findOne(id);
    await this.vehicleRepository.softRemove(vehicle);
  }

  async batchDelete(ids: number[]): Promise<void> {
    await this.vehicleRepository.softDelete(ids);
  }

  async batchUpdateStatus(ids: number[], status: number): Promise<void> {
    await this.vehicleRepository.update(ids, { status });
  }

  async importFromExcel(buffer: Buffer): Promise<ImportResult> {
    const parsed = await parseExcelRows<Vehicle>(buffer, [
      { field: 'team', headers: ['车属单位', '所属队伍', '所属部门', 'team'], transform: toOptionalString },
      { field: 'vehicleNo', headers: ['车辆编号', 'vehicleNo'], transform: toOptionalString },
      { field: 'vehicleType', headers: ['车辆类型', 'vehicleType'], required: true },
      { field: 'plateNumber', headers: ['车辆号牌', '车牌号', 'plateNumber'], required: true },
      { field: 'brandModel', headers: ['厂牌型号', '品牌型号', 'brandModel'], transform: toOptionalString },
      { field: 'engineNumber', headers: ['发动机号', 'engineNumber'], transform: toOptionalString },
      { field: 'chassisNumber', headers: ['车架号码', '车架号', 'chassisNumber'], transform: toOptionalString },
      { field: 'color', headers: ['车体颜色', '车辆颜色', 'color'], transform: toOptionalString },
      { field: 'purchaseDate', headers: ['装备日期', '购置日期', 'purchaseDate'], transform: toOptionalDate },
      { field: 'issueDate', headers: ['发证日期', 'issueDate'], transform: toOptionalDate },
      { field: 'validityDate', headers: ['有效期限', '有效期至', 'validityDate'], transform: toOptionalDate },
      { field: 'status', headers: ['当前状态', '使用状态', '状态', 'status'], transform: (value) => toStatusNumber(value, ['正常', '可调度', '值勤中']) },
      { field: 'photoUrl', headers: ['车辆照片', '照片', 'photoUrl'], transform: toOptionalString },
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

        const existing = await this.vehicleRepository.findOne({
          where: { plateNumber: String(data.plateNumber) },
          withDeleted: true,
        });

        if (existing) {
          Object.assign(existing, data);
          await this.vehicleRepository.save(existing);
          result.updated += 1;
        } else {
          await this.vehicleRepository.save(this.vehicleRepository.create(data));
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
}
