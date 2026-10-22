import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * 「可选登录」守卫。
 *
 * 与全局 JwtAuthGuard 的区别：
 * - 带有效 token → 走 JwtStrategy 校验，把管理员信息挂到 request.user 上；
 * - 无 token / token 无效 / 账号被禁用 → 不抛 401，直接按匿名访客放行（request.user = null）。
 *
 * 用于既要对外开放、又要区分后台管理员的接口。典型场景：人员台账查询，
 * 后台带 token 可见全部人员，前台/扫码匿名访问只可见「审核已通过」的人员。
 */
@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  // 默认实现会在 !user 时抛 UnauthorizedException，这里改为降级成匿名访客
  handleRequest<TUser = any>(_err: any, user: any): TUser {
    return (user || null) as TUser;
  }
}
