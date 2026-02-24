import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AdminUser } from './admin-user.entity';
import { CreateAdminUserDto, UpdateAdminUserDto, UpdatePasswordDto, UpdateStatusDto } from './admin-user.dto';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(AdminUser)
    private adminUserRepository: Repository<AdminUser>,
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

  async create(dto: CreateAdminUserDto) {
    const exists = await this.adminUserRepository.findOne({ where: { username: dto.username } });
    if (exists) throw new BadRequestException('用户名已存在');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.adminUserRepository.create({ ...dto, password: hashedPassword });
    await this.adminUserRepository.save(user);
    return this.sanitizeUser(user);
  }

  async update(id: number, dto: UpdateAdminUserDto) {
    const user = await this.adminUserRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('管理员不存在');

    Object.assign(user, dto);
    await this.adminUserRepository.save(user);
    return this.sanitizeUser(user);
  }

  async remove(id: number) {
    const user = await this.adminUserRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('管理员不存在');
    await this.adminUserRepository.remove(user);
    return { message: '删除成功' };
  }

  async updatePassword(id: number, dto: UpdatePasswordDto) {
    const user = await this.adminUserRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('管理员不存在');

    const isMatch = await bcrypt.compare(dto.oldPassword, user.password);
    if (!isMatch) throw new BadRequestException('原密码错误');

    user.password = await bcrypt.hash(dto.newPassword, 10);
    await this.adminUserRepository.save(user);
    return { message: '密码修改成功' };
  }

  async updateStatus(id: number, dto: UpdateStatusDto) {
    const user = await this.adminUserRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('管理员不存在');

    user.status = dto.status;
    await this.adminUserRepository.save(user);
    return this.sanitizeUser(user);
  }

  private sanitizeUser(user: AdminUser) {
    const { password, ...result } = user;
    return result;
  }
}
