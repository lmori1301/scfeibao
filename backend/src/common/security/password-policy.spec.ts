import assert from 'node:assert/strict';
import test from 'node:test';
import { BadRequestException } from '@nestjs/common';
import { assertStrongPassword } from './password-policy';

test('拒绝不符合复杂度要求的新密码', () => {
  assert.throws(() => assertStrongPassword('123456'), BadRequestException);
});

test('接受 12-72 字节内的强密码', () => {
  assert.doesNotThrow(() => assertStrongPassword('StrongPassword123!'));
});

test('拒绝首尾包含空白的密码', () => {
  assert.throws(
    () => assertStrongPassword(' StrongPassword123!'),
    BadRequestException,
  );
});
