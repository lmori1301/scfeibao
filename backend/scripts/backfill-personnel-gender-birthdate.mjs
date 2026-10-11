/**
 * 回填 personnel 表的「性别」「出生日期」——按身份证号推导。
 *
 * 背景：后台人员表单曾缺少这两个字段，导致手机端人员详情页显示「—」。
 * 规则：出生日期取身份证第 7-14 位(YYYYMMDD)；性别取第 17 位(奇男偶女)。
 * 特性：幂等（只补 NULL/空值，已有值不覆盖），可重复执行。
 * 用法：在 backend 目录执行  npm run db:migrate:personnel-gender-birthdate
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

const ID_CARD_VALID = "idCard REGEXP '^[0-9]{17}[0-9Xx]$'"
const BIRTH_DATE_EXPR =
  "STR_TO_DATE(CONCAT(SUBSTRING(idCard,7,4),'-',SUBSTRING(idCard,11,2),'-',SUBSTRING(idCard,13,2)), '%Y-%m-%d')"

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

  try {
    const [birthRes] = await conn.query(`
      UPDATE personnel
      SET birthDate = ${BIRTH_DATE_EXPR}
      WHERE deleted_at IS NULL
        AND birthDate IS NULL
        AND ${ID_CARD_VALID}
        AND ${BIRTH_DATE_EXPR} IS NOT NULL
    `)
    console.log(`出生日期回填: ${birthRes.affectedRows} 行`)

    const [genderRes] = await conn.query(`
      UPDATE personnel
      SET gender = IF(MOD(CAST(SUBSTRING(idCard,17,1) AS UNSIGNED), 2) = 1, '男', '女')
      WHERE deleted_at IS NULL
        AND (gender IS NULL OR gender = '')
        AND ${ID_CARD_VALID}
    `)
    console.log(`性别回填: ${genderRes.affectedRows} 行`)

    const [rows] = await conn.query(`
      SELECT COUNT(*) AS total,
             SUM(gender IS NULL OR gender = '') AS gender_empty,
             SUM(birthDate IS NULL) AS birth_empty
      FROM personnel WHERE deleted_at IS NULL
    `)
    const s = rows[0]
    console.log(`复核: 共 ${s.total} 人，性别缺失 ${s.gender_empty}，出生日期缺失 ${s.birth_empty}`)
  } finally {
    await conn.end()
  }
}

main().catch((e) => {
  console.error(e.message || e)
  process.exit(1)
})
