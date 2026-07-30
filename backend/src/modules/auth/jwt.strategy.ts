import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from '../admin-users/admin-user.entity';
import { RoleService } from '../roles/role.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(AdminUser)
    private adminUserRepository: Repository<AdminUser>,
    private roleService: RoleService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    if (!payload.sub || !payload.username) {
      throw new UnauthorizedException('无效的token');
    }
    const user = await this.adminUserRepository.findOne({
      where: { id: payload.sub },
    });
    if (!user || user.status === 'disabled') {
      throw new UnauthorizedException('账号不存在或已被禁用');
    }
    if (
      !Number.isInteger(payload.tokenVersion) ||
      (user.tokenVersion || 0) !== payload.tokenVersion
    ) {
      throw new UnauthorizedException('登录状态已失效，请重新登录');
    }

    let permissions: string[] = [];
    if (user.role !== 'admin') {
      const role = await this.roleService.findByName(user.role);
      if (!role || role.status !== 'active') {
        throw new UnauthorizedException('账号角色不存在或已被禁用');
      }
      permissions = Array.isArray(role.permissions) ? role.permissions : [];
    }

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      permissions,
      mustChangePassword: Boolean(user.mustChangePassword),
    };
  }
}
