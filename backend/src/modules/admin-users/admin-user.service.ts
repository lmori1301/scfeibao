import { Injectable, NotFoundException, BadRequestException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AdminUser } from './admin-user.entity';
import { CreateAdminUserDto, UpdateAdminUserDto, UpdatePasswordDto, ResetPasswordDto, UpdateStatusDto } from './admin-user.dto';
import { RoleService } from '../roles/role.service';
import { OperationLogService } from '../operation-log/operation-log.service';

/** 与旧版 users 表角色枚举一致，允许在未在「权限设置」建表前仍可使用 */
const LEGACY_ADMIN_ROLES = new Set(['admin', 'editor', 'viewer']);

@Injectable()
export class AdminUserService implements OnModuleInit {
  constructor(
    @InjectRepository(AdminUser)
    private adminUserRepository: Repository<AdminUser>,
    private roleService: RoleService,
    private operationLogService: OperationLogService,
  ) {}

  async onModuleInit() {
    if (process.env.NODE_ENV !== 'development') return;

    const count = await this.adminUserRepository.count();
    if (count > 0) return;

    const password = await bcrypt.hash('admin123', 10);
    const user = this.adminUserRepository.create({
      username: 'admin',
      password,
      name: '系统管理员',
      role: 'admin',
      status: 'active',
      mustChangePassword: false,
    });
    await this.adminUserRepository.save(user);
  }

  async findAll(query: any) {
    const { page = 1, pageSize = 10, username, role, status } = query;
    const qb = this.adminUserRepository.createQueryBuilder('user');

    if (username) qb.andWhere('user.username LIKE :username', { username: `%${username}%` });
    if (role) qb.andWhere('user.role = :role', { role });
    if (status) qb.andWhere('user.status = :status', { status });

    qb.skip((page - 1) * pageSize).take(pageSize);
    const [list, total] = await qb.getManyAndCount();

    return { list: list.map(u => this.sanitizeUser(u)), total, page, pageSize };
  }

  async findOne(id: number) {
    const user = await this.adminUserRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('管理员不存在');
    return this.sanitizeUser(user);
  }

  async create(dto: CreateAdminUserDto, actor = 'system') {
    const exists = await this.adminUserRepository.findOne({ where: { username: dto.username } });
    if (exists) throw new BadRequestException('用户名已存在');

    await this.ensureRoleAssignable(dto.role);

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.adminUserRepository.create({ ...dto, password: hashedPassword });
    await this.adminUserRepository.save(user);
    await this.operationLogService.record({
      username: actor,
      action: `创建后台用户：${user.username}`,
      module: '用户管理',
      ip: '127.0.0.1',
    })
    return this.sanitizeUser(user);
  }

  async update(id: number, dto: UpdateAdminUserDto, actor = 'system') {
    const user = await this.adminUserRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('管理员不存在');

    if (dto.role !== undefined) await this.ensureRoleAssignable(dto.role);

    Object.assign(user, dto);
    await this.adminUserRepository.save(user);
    await this.operationLogService.record({
      username: actor,
      action: `更新后台用户：${user.username}`,
      module: '用户管理',
      ip: '127.0.0.1',
    })
    return this.sanitizeUser(user);
  }

  async remove(id: number, actor = 'system') {
    const user = await this.adminUserRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('管理员不存在');
    const username = user.username;
    await this.adminUserRepository.remove(user);
    await this.operationLogService.record({
      username: actor,
      action: `删除后台用户：${username}`,
      module: '用户管理',
      ip: '127.0.0.1',
    })
    return { message: '删除成功' };
  }

  async updatePassword(id: number, dto: UpdatePasswordDto, actor = 'system') {
    const user = await this.adminUserRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('管理员不存在');

    const isMatch = await bcrypt.compare(dto.oldPassword, user.password);
    if (!isMatch) throw new BadRequestException('原密码错误');

    user.password = await bcrypt.hash(dto.newPassword, 10);
    user.mustChangePassword = false;
    await this.adminUserRepository.save(user);
    await this.operationLogService.record({
      username: actor,
      action: `修改后台用户密码：${user.username}`,
      module: '用户管理',
      ip: '127.0.0.1',
    })
    return { message: '密码修改成功' };
  }

  async resetPassword(id: number, dto: ResetPasswordDto, actor = 'system') {
    const user = await this.adminUserRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('管理员不存在');

    user.password = await bcrypt.hash(dto.newPassword.trim(), 10);
    user.mustChangePassword = false;
    await this.adminUserRepository.save(user);
    await this.operationLogService.record({
      username: actor,
      action: `重置后台用户密码：${user.username}`,
      module: '用户管理',
      ip: '127.0.0.1',
    })
    return { message: '密码重置成功' };
  }

  async updateStatus(id: number, dto: UpdateStatusDto, actor = 'system') {
    const user = await this.adminUserRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('管理员不存在');

    user.status = dto.status;
    await this.adminUserRepository.save(user);
    await this.operationLogService.record({
      username: actor,
      action: `${dto.status === 'active' ? '启用' : '禁用'}后台用户：${user.username}`,
      module: '用户管理',
      ip: '127.0.0.1',
    })
    return this.sanitizeUser(user);
  }

  private sanitizeUser(user: AdminUser) {
    const { password, ...result } = user;
    return result;
  }

  private async ensureRoleAssignable(role?: string) {
    const name = role?.trim();
    if (!name) return;
    if (LEGACY_ADMIN_ROLES.has(name)) return;

    const entity = await this.roleService.findByName(name);
    if (!entity) {
      throw new BadRequestException(
        `角色「${name}」不存在，请先在「权限设置」中创建该角色后再分配。`,
      );
    }
    if (entity.status !== 'active') {
      throw new BadRequestException(`角色「${name}」已禁用，无法分配给管理员。`);
    }
  }
}
