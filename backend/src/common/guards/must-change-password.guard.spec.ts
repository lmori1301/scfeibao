import assert from 'node:assert/strict';
import test from 'node:test';
import { ForbiddenException } from '@nestjs/common';
import { MustChangePasswordGuard } from './must-change-password.guard';
import { ALLOW_PASSWORD_CHANGE_PENDING_KEY } from '../decorators/allow-password-change-pending.decorator';

function createContext(mustChangePassword: boolean) {
  return {
    getHandler: () => function handler() {},
    getClass: () => class Controller {},
    switchToHttp: () => ({
      getRequest: () => ({ user: { mustChangePassword } }),
    }),
  };
}

test('待改密账号不得访问未放行的后台接口', () => {
  const reflector = { getAllAndOverride: () => false };
  const guard = new MustChangePasswordGuard(reflector as never);

  assert.throws(
    () => guard.canActivate(createContext(true) as never),
    ForbiddenException,
  );
});

test('待改密账号可访问显式放行的改密接口', () => {
  const reflector = {
    getAllAndOverride: (key: string) =>
      key === ALLOW_PASSWORD_CHANGE_PENDING_KEY,
  };
  const guard = new MustChangePasswordGuard(reflector as never);

  assert.equal(guard.canActivate(createContext(true) as never), true);
});
