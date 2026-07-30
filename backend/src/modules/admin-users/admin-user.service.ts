import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AdminUser } from './admin-user.entity';
import { CreateAdminUserDto, UpdateAdminUserDto, UpdatePasswordDto, ResetPasswordDto, UpdateStatusDto } from './admin-user.dto';
import { RoleService } from '../roles/role.service';
import { OperationLogService } from '../operation-log/operation-log.service';
import { assertStrongPassword } from '../../common/security/password-policy';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(AdminUser)
    private adminUserRepository: Repository<AdminUser>,
    private roleService: RoleService,
    private operationLogService: OperationLogService,
  ) {}

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

    assertStrongPassword(dto.password, dto.username);
    const hashedPassword = await bcrypt.hash(dto.password, 12);
    const user = this.adminUserRepository.create({
      ...dto,
      password: hashedPassword,
      mustChangePassword: true,
    });
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

    await this.adminUserRepository.update({ id }, dto);
    Object.assign(user, dto);
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

    assertStrongPassword(dto.newPassword, user.username);
    const password = await bcrypt.hash(dto.newPassword, 12);
    const result = await this.adminUserRepository.update(
      { id, password: user.password },
      {
        password,
        mustChangePassword: false,
        tokenVersion: () => '`tokenVersion` + 1',
      },
    );
    if (!result.affected) {
      throw new BadRequestException('密码已被其他操作修改，请重新登录后再试');
    }
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

    assertStrongPassword(dto.newPassword, user.username);
    const password = await bcrypt.hash(dto.newPassword, 12);
    await this.adminUserRepository.update(
      { id },
      {
        password,
        mustChangePassword: true,
        tokenVersion: () => '`tokenVersion` + 1',
      },
    );
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

    await this.adminUserRepository.update(
      { id },
      {
        status: dto.status,
        tokenVersion: () => '`tokenVersion` + 1',
      },
    );
    const updatedUser = await this.adminUserRepository.findOne({ where: { id } });
    if (!updatedUser) throw new NotFoundException('管理员不存在');
    await this.operationLogService.record({
      username: actor,
      action: `${dto.status === 'active' ? '启用' : '禁用'}后台用户：${updatedUser.username}`,
      module: '用户管理',
      ip: '127.0.0.1',
    })
    return this.sanitizeUser(updatedUser);
  }

  private sanitizeUser(user: AdminUser) {
    const { password, ...result } = user;
    return result;
  }

  private async ensureRoleAssignable(role?: string) {
    const name = role?.trim();
    if (!name) throw new BadRequestException('必须分配角色');
    if (name === 'admin') return;

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
