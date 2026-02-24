import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
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
    return await this.vehicleRepository.save(vehicle);
  }

  async findAll(
    paginationDto: PaginationDto,
    queryDto: QueryVehicleDto,
  ): Promise<PaginatedResponseDto<Vehicle>> {
    const { page, pageSize } = paginationDto;
    const { vehicleType, team, status, keyword } = queryDto;

    const where: any = {};
    if (vehicleType) where.vehicleType = vehicleType;
    if (team) where.team = team;
    if (status !== undefined) where.status = status;
    if (keyword) {
      where.plateNumber = Like(`%${keyword}%`);
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
    return await this.vehicleRepository.save(vehicle);
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
