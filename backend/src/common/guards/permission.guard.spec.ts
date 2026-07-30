import assert from 'node:assert/strict';
import test from 'node:test';
import { ForbiddenException } from '@nestjs/common';
import { PermissionGuard } from './permission.guard';
import { REQUIRED_PERMISSIONS_KEY } from '../decorators/permissions.decorator';

test('viewer 不再被视为完整权限角色', () => {
  const reflector = {
    getAllAndOverride: (key: string) =>
      key === REQUIRED_PERMISSIONS_KEY ? ['admin:user:write'] : false,
  };
  const guard = new PermissionGuard(reflector as never);
  const context = {
    getHandler: () => function handler() {},
    getClass: () => class Controller {},
    switchToHttp: () => ({
      getRequest: () => ({ user: { role: 'viewer', permissions: [] } }),
    }),
  };

  assert.throws(() => guard.canActivate(context as never), ForbiddenException);
});

test('editor 无显式权限时不得操作管理员', () => {
  const reflector = {
    getAllAndOverride: (key: string) =>
      key === REQUIRED_PERMISSIONS_KEY ? ['AdminUsers'] : false,
  };
  const guard = new PermissionGuard(reflector as never);
  const context = {
    getHandler: () => function handler() {},
    getClass: () => class Controller {},
    switchToHttp: () => ({
      getRequest: () => ({ user: { role: 'editor', permissions: [] } }),
    }),
  };

  assert.throws(() => guard.canActivate(context as never), ForbiddenException);
});
