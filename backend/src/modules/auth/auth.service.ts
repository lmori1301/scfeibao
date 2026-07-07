import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AdminUser } from '../admin-users/admin-user.entity';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { RoleService } from '../roles/role.service';
import { OperationLogService } from '../operation-log/operation-log.service';
import { ForceChangePasswordDto } from '../admin-users/admin-user.dto';

const LEGACY_ROLE_FULL_ACCESS = new Set(['admin', 'editor', 'viewer']);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminUser)
    private adminUserRepository: Repository<AdminUser>,
    private jwtService: JwtService,
    private roleService: RoleService,
    private operationLogService: OperationLogService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, password, realName } = registerDto;

    const existingUser = await this.adminUserRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new ConflictException('用户名已存在');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.adminUserRepository.create({
      username,
      password: hashedPassword,
      name: realName?.trim() || username,
      role: 'viewer',
      status: 'active',
    });

    await this.adminUserRepository.save(user);

    const { password: _, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.adminUserRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    if (user.status === 'disabled') {
      throw new UnauthorizedException('账号已被禁用');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    user.lastLoginTime = new Date();
    await this.adminUserRepository.save(user);
    await this.operationLogService.record({
      username: user.username,
      action: '登录系统',
      module: '认证',
      ip: '127.0.0.1',
    })

    const permissions = await this.resolvePermissions(user.role);

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      permissions,
    };
    const token = this.jwtService.sign(payload);

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        realName: user.name,
        name: user.name,
        role: user.role,
        permissions,
        mustChangePassword: Boolean(user.mustChangePassword),
      },
    };
  }

  async validateUser(id: number) {
    const user = await this.adminUserRepository.findOne({ where: { id } });
    if (!user || user.status === 'disabled') {
      return null;
    }
    const permissions = await this.resolvePermissions(user.role);
    const { password: _, ...result } = user;
    return {
      ...result,
      realName: user.name,
      permissions,
      mustChangePassword: Boolean(user.mustChangePassword),
    };
  }

  async changePassword(id: number, dto: ForceChangePasswordDto) {
    const user = await this.adminUserRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('账号不存在');
    }
    if (user.status === 'disabled') {
      throw new UnauthorizedException('账号已被禁用');
    }

    const oldPassword = String(dto.oldPassword || '').trim();
    const newPassword = String(dto.newPassword || '').trim();
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      throw new BadRequestException('当前密码错误');
    }

    if (oldPassword === newPassword) {
      throw new BadRequestException('新密码不能与当前密码相同');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.mustChangePassword = false;
    user.lastLoginTime = new Date();
    await this.adminUserRepository.save(user);
    await this.operationLogService.record({
      username: user.username,
      action: '首次登录修改密码',
      module: '认证',
      ip: '127.0.0.1',
    });

    const permissions = await this.resolvePermissions(user.role);
    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      permissions,
    };
    const token = this.jwtService.sign(payload);

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        realName: user.name,
        name: user.name,
        role: user.role,
        permissions,
        mustChangePassword: false,
      },
      message: '密码修改成功',
    };
  }

  private async resolvePermissions(roleName?: string) {
    const role = String(roleName || '').trim();
    if (!role) return [];
    if (LEGACY_ROLE_FULL_ACCESS.has(role)) return [];

    const entity = await this.roleService.findByName(role);
    return Array.isArray(entity?.permissions) ? entity.permissions : [];
  }
}
