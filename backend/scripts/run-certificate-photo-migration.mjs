/**
 * 为 certificates 表添加 photoUrl 列（可重复执行）。
 * 用法：cd backend && npm run db:migrate:certificate-photo
 */
import { readFileSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import mysql from 'mysql2/promise'

const __dirname = dirname(fileURLToPath(import.meta.url))

function loadEnv() {
  const envPath = join(__dirname, '..', '.env')
  const env = { ...process.env }
  if (!existsSync(envPath)) return env
  const raw = readFileSync(envPath, 'utf8')
  for (const line of raw.split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const eq = t.indexOf('=')
    if (eq === -1) continue
    const key = t.slice(0, eq).trim()
    let val = t.slice(eq + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    env[key] = val
  }
  return env
}

async function columnExists(conn, table, columnName) {
  const [rows] = await conn.query(
    `SELECT COUNT(*) AS c FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    [table, columnName]
  )
  return Number(rows[0].c) > 0
}

async function main() {
  const env = loadEnv()
  const host = env.DB_HOST || 'localhost'
  const port = Number(env.DB_PORT || 3306)
  const user = env.DB_USERNAME || 'root'
  const password = env.DB_PASSWORD ?? ''
  const database = env.DB_DATABASE
  if (!database) {
    console.error('缺少 DB_DATABASE，请检查 backend/.env')
    process.exit(1)
  }

  const conn = await mysql.createConnection({ host, port, user, password, database })
  try {
    if (await columnExists(conn, 'certificates', 'photoUrl')) {
      console.log('跳过: photoUrl 已存在')
    } else {
      await conn.query(
        "ALTER TABLE `certificates` ADD COLUMN `photoUrl` varchar(255) NULL COMMENT '证书照片URL' AFTER `certificateType`"
      )
      console.log('已添加列: photoUrl')
    }
    console.log('certificates 表迁移完成。请重启后端服务。')
  } finally {
    await conn.end()
  }
}

main().catch((e) => {
  console.error(e.message || e)
  process.exit(1)
})
