import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AdminUser } from '../admin-users/admin-user.entity';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { RoleService } from '../roles/role.service';
import { OperationLogService } from '../operation-log/operation-log.service';
import { ForceChangePasswordDto } from '../admin-users/admin-user.dto';
import { assertStrongPassword } from '../../common/security/password-policy';

const LEGACY_ROLE_FULL_ACCESS = new Set(['admin']);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminUser)
    private adminUserRepository: Repository<AdminUser>,
    private jwtService: JwtService,
    private roleService: RoleService,
    private operationLogService: OperationLogService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const registrationEnabled =
      String(this.configService.get('ALLOW_PUBLIC_REGISTRATION') || '')
        .trim()
        .toLowerCase() === 'true';
    if (!registrationEnabled) {
      throw new ForbiddenException('公开注册未开启');
    }

    const { username, password, realName } = registerDto;

    const existingUser = await this.adminUserRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new ConflictException('用户名已存在');
    }

    assertStrongPassword(password, username);
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = this.adminUserRepository.create({
      username,
      password: hashedPassword,
      name: realName?.trim() || username,
      role: 'viewer',
      status: 'disabled',
    });

    await this.adminUserRepository.save(user);

    const { password: _, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const passwordByteLength = Buffer.byteLength(String(password || ''), 'utf8');
    if (passwordByteLength < 6 || passwordByteLength > 72) {
      throw new UnauthorizedException('用户名或密码错误');
    }

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
    await this.adminUserRepository.update(
      { id: user.id },
      { lastLoginTime: user.lastLoginTime },
    );
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
      mustChangePassword: Boolean(user.mustChangePassword),
      tokenVersion: user.tokenVersion || 0,
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

    const oldPassword = String(dto.oldPassword || '');
    const newPassword = String(dto.newPassword || '');
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      throw new BadRequestException('当前密码错误');
    }

    if (oldPassword === newPassword) {
      throw new BadRequestException('新密码不能与当前密码相同');
    }
    assertStrongPassword(newPassword, user.username);

    const password = await bcrypt.hash(newPassword, 12);
    const lastLoginTime = new Date();
    const currentTokenVersion = user.tokenVersion || 0;
    const nextTokenVersion = currentTokenVersion + 1;
    const updateResult = await this.adminUserRepository.update(
      { id, password: user.password, tokenVersion: currentTokenVersion },
      {
        password,
        mustChangePassword: false,
        lastLoginTime,
        tokenVersion: () => '`tokenVersion` + 1',
      },
    );
    if (!updateResult.affected) {
      throw new BadRequestException('密码已被其他操作修改，请重新登录后再试');
    }
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
      mustChangePassword: false,
      tokenVersion: nextTokenVersion,
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
    if (!entity || entity.status !== 'active') {
      throw new UnauthorizedException('账号角色不存在或已被禁用');
    }
    return Array.isArray(entity?.permissions) ? entity.permissions : [];
  }
}
