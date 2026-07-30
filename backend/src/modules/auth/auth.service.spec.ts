import assert from 'node:assert/strict';
import test from 'node:test';
import { ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

test('未显式开启公开注册时拒绝创建账号', async () => {
  const originalValue = process.env.ALLOW_PUBLIC_REGISTRATION;
  delete process.env.ALLOW_PUBLIC_REGISTRATION;

  const repository = {
    findOne: async () => {
      throw new Error('关闭注册时不应访问数据库');
    },
  };
  const service = new AuthService(
    repository as never,
    {} as never,
    {} as never,
    {} as never,
    { get: () => undefined } as never,
  );

  try {
    await assert.rejects(
      service.register({
        username: 'attacker',
        password: 'StrongPassword123!',
        realName: '未授权用户',
      }),
      ForbiddenException,
    );
  } finally {
    if (originalValue === undefined) {
      delete process.env.ALLOW_PUBLIC_REGISTRATION;
    } else {
      process.env.ALLOW_PUBLIC_REGISTRATION = originalValue;
    }
  }
});

test('显式开启公开注册时新账号仍需管理员启用', async () => {
  let createdUser: Record<string, unknown> | undefined;
  const repository = {
    findOne: async () => null,
    create: (user: Record<string, unknown>) => {
      createdUser = user;
      return user;
    },
    save: async (user: Record<string, unknown>) => user,
  };
  const service = new AuthService(
    repository as never,
    {} as never,
    {} as never,
    {} as never,
    { get: () => 'true' } as never,
  );

  await service.register({
    username: 'pending-user',
    password: 'StrongPassword123!',
    realName: '待审核用户',
  });

  assert.equal(createdUser?.status, 'disabled');
  assert.equal(createdUser?.role, 'viewer');
});

test('显式开启公开注册时仍拒绝弱密码', async () => {
  const repository = { findOne: async () => null };
  const service = new AuthService(
    repository as never,
    {} as never,
    {} as never,
    {} as never,
    { get: () => 'true' } as never,
  );

  await assert.rejects(
    service.register({
      username: 'pending-user',
      password: '123456',
      realName: '待审核用户',
    }),
    /新密码必须/,
  );
});

test('修改密码以旧哈希为条件原子递增令牌版本', async () => {
  const oldHash = await bcrypt.hash('CurrentPassword123!', 4);
  const user = {
    id: 1,
    username: 'admin',
    name: '管理员',
    role: 'admin',
    status: 'active',
    password: oldHash,
    tokenVersion: 5,
    mustChangePassword: true,
  };
  let updateCriteria: Record<string, unknown> | undefined;
  let updatePayload: Record<string, unknown> | undefined;
  const repository = {
    findOne: async () => user,
    update: async (
      criteria: Record<string, unknown>,
      payload: Record<string, unknown>,
    ) => {
      updateCriteria = criteria;
      updatePayload = payload;
      user.tokenVersion += 1;
      user.mustChangePassword = false;
      return { affected: 1 };
    },
  };
  const signed: Record<string, unknown>[] = [];
  const service = new AuthService(
    repository as never,
    { sign: (payload: Record<string, unknown>) => (signed.push(payload), 'token') } as never,
    {} as never,
    { record: async () => undefined } as never,
    { get: () => undefined } as never,
  );

  await service.changePassword(1, {
    oldPassword: 'CurrentPassword123!',
    newPassword: 'NewStrongPassword123!',
  });

  assert.equal(updateCriteria?.password, oldHash);
  assert.equal(updateCriteria?.tokenVersion, 5);
  assert.equal(typeof updatePayload?.tokenVersion, 'function');
  assert.equal(signed[0]?.tokenVersion, 6);
});

test('登录阶段拒绝已禁用的非管理员角色', async () => {
  const passwordHash = await bcrypt.hash('CurrentPassword123!', 4);
  const service = new AuthService(
    {
      findOne: async () => ({
        id: 1,
        username: 'auditor',
        name: '审核员',
        password: passwordHash,
        role: 'auditor',
        status: 'active',
        tokenVersion: 0,
        mustChangePassword: false,
      }),
      update: async () => ({ affected: 1 }),
    } as never,
    { sign: () => 'token' } as never,
    { findByName: async () => ({ status: 'disabled', permissions: [] }) } as never,
    { record: async () => undefined } as never,
    { get: () => undefined } as never,
  );

  await assert.rejects(
    service.login({ username: 'auditor', password: 'CurrentPassword123!' }),
    /账号角色不存在或已被禁用/,
  );
});
