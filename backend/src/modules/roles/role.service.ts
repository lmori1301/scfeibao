import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { CreateRoleDto, UpdateRoleDto, UpdateRoleStatusDto } from './role.dto';
import { OperationLogService } from '../operation-log/operation-log.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private operationLogService: OperationLogService,
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

  /** 按展示名称查找（与用户管理中 `role` 字段一致） */
  async findByName(name: string): Promise<Role | null> {
    if (!name?.trim()) return null;
    return this.roleRepository.findOne({ where: { name: name.trim() } });
  }

  async create(dto: CreateRoleDto, actor = 'system') {
    const existsByName = await this.roleRepository.findOne({ where: { name: dto.name } });
    if (existsByName) throw new BadRequestException('角色名称已存在');

    const existsByCode = await this.roleRepository.findOne({ where: { code: dto.code } });
    if (existsByCode) throw new BadRequestException('角色代码已存在');

    const role = this.roleRepository.create({
      ...dto,
      status: dto.status ?? 'active',
    });
    const saved = await this.roleRepository.save(role);
    await this.operationLogService.record({
      username: actor,
      action: `创建角色：${saved.name}`,
      module: '权限设置',
      ip: '127.0.0.1',
    })
    return saved;
  }

  async update(id: number, dto: UpdateRoleDto, actor = 'system') {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) throw new NotFoundException('角色不存在');

    Object.assign(role, dto);
    const saved = await this.roleRepository.save(role);
    await this.operationLogService.record({
      username: actor,
      action: `更新角色：${saved.name}`,
      module: '权限设置',
      ip: '127.0.0.1',
    })
    return saved;
  }

  async remove(id: number, actor = 'system') {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) throw new NotFoundException('角色不存在');
    const name = role.name;
    await this.roleRepository.remove(role);
    await this.operationLogService.record({
      username: actor,
      action: `删除角色：${name}`,
      module: '权限设置',
      ip: '127.0.0.1',
    })
    return { message: '删除成功' };
  }

  async updateStatus(id: number, dto: UpdateRoleStatusDto, actor = 'system') {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) throw new NotFoundException('角色不存在');

    role.status = dto.status;
    const saved = await this.roleRepository.save(role);
    await this.operationLogService.record({
      username: actor,
      action: `${dto.status === 'active' ? '启用' : '禁用'}角色：${saved.name}`,
      module: '权限设置',
      ip: '127.0.0.1',
    })
    return saved;
  }
}
