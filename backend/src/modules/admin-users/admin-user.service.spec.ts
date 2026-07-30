import assert from 'node:assert/strict';
import test from 'node:test';
import { BadRequestException } from '@nestjs/common';
import { AdminUserService } from './admin-user.service';

function createService(repository: Record<string, unknown>, role: unknown = null) {
  return new AdminUserService(
    repository as never,
    { findByName: async () => role } as never,
    { record: async () => undefined } as never,
  );
}

test('开发环境不再自动创建固定密码管理员', () => {
  assert.equal(
    typeof (AdminUserService.prototype as { onModuleInit?: unknown })
      .onModuleInit,
    'undefined',
  );
});

test('创建账号必须分配真实存在且启用的角色', async () => {
  const service = createService({ findOne: async () => null });

  await assert.rejects(
    service.create({
      username: 'operator',
      password: 'StrongPassword123!',
      name: '操作员',
      role: 'editor',
    }),
    BadRequestException,
  );
});

test('管理员重置密码使用数据库原子递增令牌版本', async () => {
  const user = {
    id: 1,
    username: 'operator',
    password: 'old-hash',
    tokenVersion: 3,
    mustChangePassword: false,
  };
  let updatePayload: Record<string, unknown> | undefined;
  const repository = {
    findOne: async () => user,
    update: async (_criteria: unknown, payload: Record<string, unknown>) => {
      updatePayload = payload;
      user.tokenVersion += 1;
      user.mustChangePassword = true;
      return { affected: 1 };
    },
  };

  await createService(repository).resetPassword(
    1,
    { newPassword: 'AnotherPassword123!' },
  );

  assert.equal(typeof updatePayload?.tokenVersion, 'function');
  assert.equal(user.tokenVersion, 4);
});

test('禁用账号时原子递增令牌版本', async () => {
  const user = {
    id: 1,
    username: 'operator',
    password: 'hash',
    status: 'active',
    tokenVersion: 7,
  };
  let updatePayload: Record<string, unknown> | undefined;
  const repository = {
    findOne: async () => user,
    update: async (_criteria: unknown, payload: Record<string, unknown>) => {
      updatePayload = payload;
      user.status = String(payload.status);
      user.tokenVersion += 1;
      return { affected: 1 };
    },
  };

  await createService(repository).updateStatus(1, { status: 'disabled' });

  assert.equal(typeof updatePayload?.tokenVersion, 'function');
  assert.equal(user.tokenVersion, 8);
});
