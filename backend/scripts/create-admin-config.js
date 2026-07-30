function requireValue(env, key, label) {
  const value = String(env[key] || '').trim();
  if (!value) throw new Error(`缺少${label}`);
  return value;
}

function validateAdminPassword(password, username) {
  const byteLength = Buffer.byteLength(password, 'utf8');
  const isStrong =
    byteLength >= 12 &&
    byteLength <= 72 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password) &&
    !password.toLowerCase().includes(username.toLowerCase());

  if (!isStrong) {
    throw new Error(
      '管理员密码必须为 12-72 字节，包含大小写字母、数字和特殊字符，且不得包含用户名',
    );
  }
}

function readAdminConfig(env = process.env) {
  const username = requireValue(env, 'ADMIN_USERNAME', '管理员用户名');
  const password = requireValue(env, 'ADMIN_PASSWORD', '管理员密码');
  const databasePassword = requireValue(env, 'DB_PASSWORD', '数据库密码');
  validateAdminPassword(password, username);

  return {
    admin: {
      username,
      password,
      name: String(env.ADMIN_NAME || '').trim() || '系统管理员',
    },
    database: {
      host: String(env.DB_HOST || '').trim() || 'mysql',
      port: Number(env.DB_PORT || 3306),
      user: String(env.DB_USERNAME || '').trim() || 'scfeibao',
      password: databasePassword,
      database: String(env.DB_DATABASE || '').trim() || 'scfeibao',
    },
  };
}

module.exports = { readAdminConfig, validateAdminPassword };
