import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamUnit } from '../../database/entities/team-unit.entity';
import {
  CreateTeamUnitDto,
  QueryTeamUnitDto,
  UpdateTeamUnitDto,
} from './dto/team-unit.dto';
import { PaginatedResponseDto } from '../../common/dto/pagination.dto';

@Injectable()
export class TeamUnitService {
  constructor(
    @InjectRepository(TeamUnit)
    private readonly teamUnitRepository: Repository<TeamUnit>,
  ) {}

  async create(dto: CreateTeamUnitDto) {
    const entity = this.teamUnitRepository.create({
      ...dto,
      sort: dto.sort ?? 0,
      status: dto.status ?? 1,
    });
    return this.teamUnitRepository.save(entity);
  }

  async findAll(queryDto: QueryTeamUnitDto) {
    const { page, pageSize, status } = queryDto;
    const where = status === undefined ? {} : { status };
    const [items, total] = await this.teamUnitRepository.findAndCount({
      where,
      order: { sort: 'ASC', createdAt: 'ASC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return new PaginatedResponseDto(items, total, page, pageSize);
  }

  async findOptions(status = 1) {
    return this.teamUnitRepository.find({
      where: { status },
      order: { sort: 'ASC', createdAt: 'ASC' },
    });
  }

  async findOne(id: number) {
    const entity = await this.teamUnitRepository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException('队伍字典不存在');
    }
    return entity;
  }

  async update(id: number, dto: UpdateTeamUnitDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.teamUnitRepository.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.teamUnitRepository.softRemove(entity);
  }
}
