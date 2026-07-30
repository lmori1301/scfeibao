const assert = require('node:assert/strict');
const test = require('node:test');
const { readAdminConfig } = require('./create-admin-config');

test('管理员初始化缺少强密码时在连接数据库前失败', () => {
  assert.throws(
    () =>
      readAdminConfig({
        ADMIN_USERNAME: 'admin',
        ADMIN_PASSWORD: 'short',
        DB_PASSWORD: 'database-password',
      }),
    /管理员密码/,
  );
});

test('管理员初始化缺少数据库密码时在连接数据库前失败', () => {
  assert.throws(
    () =>
      readAdminConfig({
        ADMIN_USERNAME: 'admin',
        ADMIN_PASSWORD: 'StrongPassword123!',
      }),
    /数据库密码/,
  );
});
