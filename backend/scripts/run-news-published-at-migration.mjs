import mysql from 'mysql2/promise'
import { fileURLToPath } from 'node:url'

const table = 'news'
const database = process.env.DB_DATABASE || 'scfeibao'

const connectionConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3308),
  user: process.env.DB_USERNAME || 'scfeibao',
  password: process.env.DB_PASSWORD || '',
  database,
}

async function columnExists(connection, column) {
  const [[row]] = await connection.query(
    `SELECT COUNT(*) AS total
       FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = ?
        AND COLUMN_NAME = ?`,
    [table, column],
  )
  return Number(row.total || 0) > 0
}

export async function migrateNewsPublishedAt(connection) {
  const hasPublishedAt = await columnExists(connection, 'publishedAt')
  const hasPublishedAtSnake = await columnExists(connection, 'published_at')

  if (!hasPublishedAtSnake) {
    if (hasPublishedAt) {
      await connection.query(
        "ALTER TABLE `news` ADD COLUMN `published_at` timestamp NULL DEFAULT NULL COMMENT '发布时间' AFTER `publishedAt`",
      )
    } else {
      await connection.query(
        "ALTER TABLE `news` ADD COLUMN `published_at` timestamp NULL DEFAULT NULL COMMENT '发布时间'",
      )
    }
  }

  if (hasPublishedAt) {
    await connection.query(
      'UPDATE `news` SET `published_at` = COALESCE(`publishedAt`, `created_at`, CURRENT_TIMESTAMP) WHERE `published_at` IS NULL OR `published_at` = 0',
    )
  } else {
    await connection.query(
      'UPDATE `news` SET `published_at` = COALESCE(`created_at`, CURRENT_TIMESTAMP) WHERE `published_at` IS NULL OR `published_at` = 0',
    )
  }

  await connection.query(
    "ALTER TABLE `news` MODIFY COLUMN `published_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '发布时间'",
  )
}

async function main() {
  const connection = await mysql.createConnection(connectionConfig)
  try {
    await migrateNewsPublishedAt(connection)
    console.log('news.published_at 迁移完成')
  } finally {
    await connection.end()
  }
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
