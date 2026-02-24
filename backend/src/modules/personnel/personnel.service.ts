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
    const { team, status, keyword } = queryDto;

    const where: any = {};
    if (team) where.team = team;
    if (status !== undefined) where.status = status;
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
}
