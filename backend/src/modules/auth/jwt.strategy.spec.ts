import assert from 'node:assert/strict';
import test from 'node:test';
import { UnauthorizedException } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';

function createStrategy(user: Record<string, unknown>, role: unknown) {
  return new (JwtStrategy as any)(
    { get: () => 'test-secret' },
    { findOne: async () => user },
    { findByName: async () => role },
  ) as JwtStrategy;
}

test('JWT 验证使用数据库中的当前角色权限', async () => {
  const strategy = createStrategy(
    {
      id: 1,
      username: 'custom-user',
      role: 'auditor',
      status: 'active',
      mustChangePassword: false,
      tokenVersion: 0,
    },
    { status: 'active', permissions: ['audit:read'] },
  );

  const result = await strategy.validate({
    sub: 1,
    username: 'custom-user',
    permissions: ['admin:user:write'],
    tokenVersion: 0,
  });

  assert.deepEqual(result.permissions, ['audit:read']);
});

test('JWT 验证拒绝密码变更前的旧会话版本', async () => {
  const strategy = createStrategy(
    {
      id: 1,
      username: 'admin',
      role: 'admin',
      status: 'active',
      mustChangePassword: false,
      tokenVersion: 2,
    },
    null,
  );

  await assert.rejects(
    strategy.validate({ sub: 1, username: 'admin', tokenVersion: 1 }),
    UnauthorizedException,
  );
});

test('JWT 验证拒绝不含令牌版本的旧格式会话', async () => {
  const strategy = createStrategy(
    {
      id: 1,
      username: 'admin',
      role: 'admin',
      status: 'active',
      mustChangePassword: false,
      tokenVersion: 0,
    },
    null,
  );

  await assert.rejects(
    strategy.validate({ sub: 1, username: 'admin' }),
    UnauthorizedException,
  );
});
