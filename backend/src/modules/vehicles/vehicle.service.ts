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
}
