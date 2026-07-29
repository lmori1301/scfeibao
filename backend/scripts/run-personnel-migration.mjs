/**
 * 为 personnel 表补齐与实体一致的列（可重复执行，已存在则跳过）。
 * 用法：在 backend 目录执行  npm run db:migrate:personnel
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
  const port = Number(env.DB_PORT || 3308)
  const user = env.DB_USERNAME || 'scfeibao'
  const password = env.DB_PASSWORD ?? ''
  const database = env.DB_DATABASE
  if (!database) {
    console.error('缺少 DB_DATABASE，请检查 backend/.env')
    process.exit(1)
  }

  const conn = await mysql.createConnection({ host, port, user, password, database, multipleStatements: true })

  const table = 'personnel'
  const alters = [
    {
      col: 'personnelCode',
      sql: 'ADD COLUMN `personnelCode` varchar(32) NULL COMMENT \'人员业务编号\' AFTER `id`',
    },
    {
      col: 'email',
      sql: 'ADD COLUMN `email` varchar(100) NULL COMMENT \'电子邮箱\' AFTER `phone`',
    },
    {
      col: 'workUnit',
      sql: 'ADD COLUMN `workUnit` varchar(100) NULL COMMENT \'工作单位\' AFTER `team`',
    },
    {
      col: 'taskCount',
      sql: 'ADD COLUMN `taskCount` int NOT NULL DEFAULT 0 COMMENT \'出勤次数\' AFTER `remark`',
    },
    {
      col: 'trainingHours',
      sql: 'ADD COLUMN `trainingHours` int NOT NULL DEFAULT 0 COMMENT \'培训时长(小时)\' AFTER `taskCount`',
    },
    {
      col: 'auditStatus',
      sql: 'ADD COLUMN `auditStatus` tinyint NOT NULL DEFAULT 1 COMMENT \'审核状态 0待审核 1已通过 2已拒绝\' AFTER `status`',
    },
  ]

  try {
    for (const { col, sql } of alters) {
      if (await columnExists(conn, table, col)) {
        console.log(`跳过: ${col} 已存在`)
        continue
      }
      await conn.query(`ALTER TABLE \`${table}\` ${sql}`)
      console.log(`已添加列: ${col}`)
    }
    console.log('personnel 表迁移完成。请重启后端服务。')
  } finally {
    await conn.end()
  }
}

main().catch((e) => {
  console.error(e.message || e)
  process.exit(1)
})
