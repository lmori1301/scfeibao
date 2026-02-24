import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { CreateRoleDto, UpdateRoleDto, UpdateRoleStatusDto } from './role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async findAll(query: any) {
    const { page = 1, pageSize = 10, name, status } = query;
    const qb = this.roleRepository.createQueryBuilder('role');

    if (name) qb.andWhere('role.name LIKE :name', { name: `%${name}%` });
    if (status) qb.andWhere('role.status = :status', { status });

    qb.skip((page - 1) * pageSize).take(pageSize);
    const [list, total] = await qb.getManyAndCount();

    return { list, total, page, pageSize };
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) throw new NotFoundException('角色不存在');
    return role;
  }

  async create(dto: CreateRoleDto) {
    const existsByName = await this.roleRepository.findOne({ where: { name: dto.name } });
    if (existsByName) throw new BadRequestException('角色名称已存在');

    const existsByCode = await this.roleRepository.findOne({ where: { code: dto.code } });
    if (existsByCode) throw new BadRequestException('角色代码已存在');

    const role = this.roleRepository.create(dto);
    return await this.roleRepository.save(role);
  }

  async update(id: number, dto: UpdateRoleDto) {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) throw new NotFoundException('角色不存在');

    Object.assign(role, dto);
    return await this.roleRepository.save(role);
  }

  async remove(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) throw new NotFoundException('角色不存在');
    await this.roleRepository.remove(role);
    return { message: '删除成功' };
  }

  async updateStatus(id: number, dto: UpdateRoleStatusDto) {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) throw new NotFoundException('角色不存在');

    role.status = dto.status;
    return await this.roleRepository.save(role);
  }
}
