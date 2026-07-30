const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const { readAdminConfig } = require('./scripts/create-admin-config');

async function createAdmin() {
  const config = readAdminConfig();
  const connection = await mysql.createConnection(config.database);

  try {
    const [lockRows] = await connection.query(
      "SELECT GET_LOCK('scfeibao_init_admin', 10) AS acquired",
    );
    if (lockRows[0]?.acquired !== 1) {
      throw new Error('无法获取管理员初始化锁');
    }

    await connection.beginTransaction();
    const [existingRows] = await connection.execute(
      "SELECT id FROM admin_users WHERE role = 'admin' LIMIT 1 FOR UPDATE",
    );
    if (existingRows.length > 0) {
      throw new Error('系统已存在管理员，拒绝覆盖现有账号');
    }

    const passwordHash = await bcrypt.hash(config.admin.password, 12);
    await connection.execute(
      `INSERT INTO admin_users
        (username, password, name, role, status, mustChangePassword)
       VALUES (?, ?, ?, 'admin', 'active', 1)`,
      [config.admin.username, passwordHash, config.admin.name],
    );
    await connection.commit();
    console.log('初始管理员创建成功，请立即登录并修改密码');
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    await connection.query("SELECT RELEASE_LOCK('scfeibao_init_admin')");
    await connection.end();
  }
}

createAdmin().catch((error) => {
  console.error(`初始管理员创建失败：${error.message}`);
  process.exitCode = 1;
});
