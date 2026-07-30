import { BadRequestException } from '@nestjs/common';

export function assertStrongPassword(password: string, username = ''): void {
  const value = String(password || '');
  const byteLength = Buffer.byteLength(value, 'utf8');
  const normalizedUsername = String(username || '').trim().toLowerCase();
  const isStrong =
    value === value.trim() &&
    byteLength >= 12 &&
    byteLength <= 72 &&
    /[a-z]/.test(value) &&
    /[A-Z]/.test(value) &&
    /\d/.test(value) &&
    /[^A-Za-z0-9]/.test(value) &&
    (!normalizedUsername ||
      !value.toLowerCase().includes(normalizedUsername));

  if (!isStrong) {
    throw new BadRequestException(
      '新密码必须为 12-72 字节，包含大小写字母、数字和特殊字符，不得包含首尾空白或用户名',
    );
  }
}
