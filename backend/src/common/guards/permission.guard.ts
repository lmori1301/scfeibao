import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { REQUIRED_PERMISSIONS_KEY } from '../decorators/permissions.decorator';

const LEGACY_ROLE_FULL_ACCESS = new Set(['admin']);

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const requiredPermissions =
      this.reflector.getAllAndOverride<string[]>(REQUIRED_PERMISSIONS_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? [];

    if (!requiredPermissions.length) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user as
      | { role?: string; permissions?: string[] }
      | undefined;

    const role = String(user?.role || '').trim();
    if (LEGACY_ROLE_FULL_ACCESS.has(role)) return true;

    const granted = new Set(
      Array.isArray(user?.permissions) ? user.permissions : [],
    );
    const allowed = requiredPermissions.some((name) => granted.has(name));
    if (allowed) return true;

    throw new ForbiddenException('无权访问该功能');
  }
}
