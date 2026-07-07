/**
 * 将 certificates、personnel 的 photoUrl 从 varchar 改为 text（可重复执行）。
 * 用法：cd backend && npm run db:migrate:photo-url-text
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

async function getColumnType(conn, table, column) {
  const [rows] = await conn.query(
    `SELECT DATA_TYPE FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    [table, column]
  )
  return rows.length ? String(rows[0].DATA_TYPE).toLowerCase() : null
}

async function main() {
  const env = loadEnv()
  const host = env.DB_HOST || 'localhost'
  const port = Number(env.DB_PORT || 3306)
  const user = env.DB_USERNAME || 'root'
  const password = env.DB_PASSWORD ?? ''
  const database = env.DB_DATABASE
  if (!database) {
    console.error('缺少 DB_DATABASE')
    process.exit(1)
  }

  const conn = await mysql.createConnection({ host, port, user, password, database })
  try {
    const alters = [
      {
        table: 'certificates',
        sql:
          "ALTER TABLE `certificates` MODIFY COLUMN `photoUrl` text NULL COMMENT '证书照片：JSON 数组 URL 或单张 URL 兼容'",
      },
      {
        table: 'personnel',
        sql:
          "ALTER TABLE `personnel` MODIFY COLUMN `photoUrl` text NULL COMMENT '人员照片：JSON 数组 URL 或单张 URL 兼容'",
      },
    ]
    for (const { table, sql } of alters) {
      const dt = await getColumnType(conn, table, 'photoUrl')
      if (!dt) {
        console.log(`跳过 ${table}: 无 photoUrl 列`)
        continue
      }
      if (dt === 'text' || dt === 'mediumtext' || dt === 'longtext') {
        console.log(`跳过 ${table}.photoUrl: 已是 ${dt}`)
        continue
      }
      await conn.query(sql)
      console.log(`已修改 ${table}.photoUrl -> text`)
    }
    console.log('完成。请重启后端。')
  } finally {
    await conn.end()
  }
}

main().catch((e) => {
  console.error(e.message || e)
  process.exit(1)
})
