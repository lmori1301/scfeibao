const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

async function createAdmin() {
  const password = await bcrypt.hash('admin123', 10);

  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3308,
    user: 'scfeibao',
    password: process.env.DB_PASSWORD,
    database: 'scfeibao'
  });

  await connection.execute(
    `INSERT INTO users (username, password, realName, role, status)
     VALUES (?, ?, ?, ?, ?)`,
    ['testuser', password, '测试用户', 'admin', 1]
  );

  console.log('测试账号创建成功');
  console.log('用户名: testuser');
  console.log('密码: admin123');

  await connection.end();
}

createAdmin().catch(console.error);
