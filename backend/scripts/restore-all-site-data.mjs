import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import mysql from 'mysql2/promise'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const backendRoot = path.resolve(__dirname, '..')

const connectionConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3308),
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'feibao_rescue',
}

const requiredTables = [
  'appointments',
  'banners',
  'info_public',
  'leadership',
  'locations',
  'party_building',
  'party_members',
  'party_works',
  'personnel_appointments',
  'policies',
  'public_info',
  'roles',
  'team_building',
  'team_intro',
  'team_units',
  'videos',
]

const partyBuildingRows = [
  [
    '深入学习贯彻习近平新时代中国特色社会主义思想',
    '党支部组织学习活动',
    '四川飞豹救援党支部组织全体党员深入学习贯彻习近平新时代中国特色社会主义思想，不断提高政治站位。',
    '/uploads/images/party/study-1.jpg',
    '党建动态',
    0,
    1,
    new Date(),
    1,
  ],
  [
    '开展"不忘初心、牢记使命"主题党日活动',
    '主题党日活动',
    '党支部组织开展主题党日活动，重温入党誓词，强化党员意识和责任担当。',
    '/uploads/images/party/activity-1.jpg',
    '党建动态',
    0,
    1,
    new Date(),
    2,
  ],
  [
    '党支部召开组织生活会',
    '组织生活会',
    '党支部召开组织生活会，开展批评与自我批评，不断提升党组织凝聚力和战斗力。',
    '/uploads/images/party/meeting-1.jpg',
    '组织建设',
    0,
    1,
    new Date(),
    3,
  ],
  [
    '优秀党员先进事迹报告会',
    '先进事迹报告',
    '举办优秀党员先进事迹报告会，发挥党员先锋模范作用，激励全体队员奋发进取。',
    '/uploads/images/party/model-1.jpg',
    '先进典型',
    0,
    1,
    new Date(),
    4,
  ],
]

const publicInfoRows = [
  ['2024年度工作计划', '2024年度四川飞豹救援工作计划，包括队伍建设、装备采购、训练演练等方面的安排。', '工作计划', '2024-01-01', '/uploads/files/info/work-plan-2024.pdf', 0],
  ['2023年度工作总结', '2023年度四川飞豹救援工作总结，全面回顾一年来的工作成效和经验教训。', '工作总结', '2024-01-15', '/uploads/files/info/work-summary-2023.pdf', 0],
  ['财务预算公开', '2024年度四川飞豹救援财务预算公开，包括收入预算、支出预算等详细信息。', '财务信息', '2024-02-01', '/uploads/files/info/budget-2024.pdf', 0],
  ['人事任免公告', '关于四川飞豹救援人事任免的公告，涉及干部任免、岗位调整等事项。', '人事信息', '2024-01-20', '/uploads/files/info/personnel-2024.pdf', 0],
]

const appointmentRows = [
  ['关于张伟等同志职务任免的通知', '川飞救任〔2024〕1号', '2024-01-20', '2024-01-20', '综合办公室', '/uploads/files/info/personnel-2024.pdf', '人事任免公告.pdf'],
  ['关于调整应急救援专业组负责人的通知', '川飞救任〔2024〕2号', '2024-03-01', '2024-03-01', '人事部', '/uploads/files/info/appointment-2024-02.pdf', '专业组负责人调整通知.pdf'],
  ['关于表彰年度先进个人的决定', '川飞救奖〔2024〕1号', '2024-04-10', '2024-04-10', '综合办公室', '/uploads/files/info/commendation-2024.pdf', '年度先进个人表彰决定.pdf'],
]

const personnelAppointmentRows = [
  ['张伟', '队长', '任命', '2024-01-20'],
  ['李明', '副队长', '任命', '2024-01-20'],
  ['王强', '副队长', '免职', '2024-01-20'],
]

const teamIntroRows = [
  [
    '四川飞豹救援队伍简介',
    '四川飞豹救援坚持人民至上、生命至上，围绕综合应急救援、专业训练、装备保障和社会服务持续提升队伍能力。队伍常态化开展山地、水域、高空、地震等专业训练，积极参与突发事件应急处置和安全宣传。',
    1,
  ],
  [
    '训练与装备建设',
    '队伍建立专业化训练体系，配备救援车辆、通信装备、绳索装备、水域救援装备和医疗急救器材，持续提升复杂环境下的快速响应和协同处置能力。',
    2,
  ],
]

const roleRows = [
  ['系统管理员', 'admin', '拥有后台全部管理权限', JSON.stringify([]), 'active'],
  ['内容编辑', 'editor', '可维护官网内容与基础数据', JSON.stringify([]), 'active'],
  ['只读查看', 'viewer', '可查看后台数据', JSON.stringify([]), 'active'],
]

const videoRows = [
  ['四川飞豹救援宣传片', '/uploads/videos/1771997109315-841584175.mp4', '/uploads/images/1771914205341-880638838.png', 1, 1],
  ['地震救援实战演练', '/uploads/videos/1771943217867-227094426.mp4', '/uploads/images/1772094941093-372031621.png', 2, 0],
  ['水域救援技能展示', '/uploads/videos/1771997072762-540894863.mp4', '/uploads/images/1772094725466-330988384.png', 3, 0],
  ['高空救援训练纪实', '/uploads/videos/1771988555917-983186400.mp4', '/uploads/images/1772094560465-393963285.png', 4, 0],
]

const settingRows = [
  ['admin_backup_records', JSON.stringify([{ id: 1, type: 'manual', status: 'success', triggerBy: 'system', createdAt: '2026-04-24 09:00:00' }]), '后台备份记录', 'json'],
]

async function tableExists(connection, table) {
  const [[row]] = await connection.query(
    'SELECT COUNT(*) AS total FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?',
    [table],
  )
  return Number(row.total || 0) > 0
}

async function tableCount(connection, table) {
  const [[row]] = await connection.query('SELECT COUNT(*) AS total FROM ??', [table])
  return Number(row.total || 0)
}

async function assertTables(connection) {
  const missing = []
  for (const table of requiredTables) {
    if (!(await tableExists(connection, table))) missing.push(table)
  }
  if (missing.length) {
    throw new Error(`缺少数据库表：${missing.join(', ')}`)
  }
}

async function splitSqlFile(relativePath) {
  const sql = await fs.readFile(path.join(backendRoot, relativePath), 'utf8')
  return sql
    .split(/;\s*(?:\r?\n|$)/)
    .map((statement) => statement.trim())
    .filter(Boolean)
}

async function runSqlFileIfEmpty(connection, table, relativePath) {
  const before = await tableCount(connection, table)
  if (before > 0) return { table, action: 'skip', count: before }

  for (const statement of await splitSqlFile(relativePath)) {
    await connection.query(statement)
  }
  return { table, action: 'restore', count: await tableCount(connection, table) }
}

async function insertRowsIfEmpty(connection, table, columns, rows) {
  const before = await tableCount(connection, table)
  if (before > 0) return { table, action: 'skip', count: before }

  await connection.query(`INSERT INTO ?? (${columns.map(() => '??').join(',')}) VALUES ?`, [
    table,
    ...columns,
    rows,
  ])
  return { table, action: 'restore', count: rows.length }
}

async function insertMissingByTitle(connection, table, columns, rows) {
  let inserted = 0
  for (const row of rows) {
    const [[existing]] = await connection.query('SELECT COUNT(*) AS total FROM ?? WHERE `title` = ?', [table, row[0]])
    if (Number(existing.total || 0) > 0) continue
    await connection.query(`INSERT INTO ?? (${columns.map(() => '??').join(',')}) VALUES (${columns.map(() => '?').join(',')})`, [
      table,
      ...columns,
      ...row,
    ])
    inserted += 1
  }
  return { table, action: inserted ? 'top-up' : 'skip', count: await tableCount(connection, table), inserted }
}

async function insertSettingsIfMissing(connection) {
  let inserted = 0
  for (const row of settingRows) {
    const [[existing]] = await connection.query('SELECT COUNT(*) AS total FROM `settings` WHERE `key` = ?', [row[0]])
    if (Number(existing.total || 0) > 0) continue
    await connection.query(
      'INSERT INTO `settings` (`key`, `value`, `description`, `type`) VALUES (?, ?, ?, ?)',
      row,
    )
    inserted += 1
  }
  return { table: 'settings', action: inserted ? 'top-up' : 'skip', count: await tableCount(connection, 'settings'), inserted }
}

async function main() {
  const connection = await mysql.createConnection(connectionConfig)
  await connection.beginTransaction()

  try {
    await assertTables(connection)

    const results = []
    results.push(await insertRowsIfEmpty(connection, 'party_building', ['title', 'summary', 'content', 'coverImage', 'category', 'viewCount', 'status', 'publishedAt', 'sort'], partyBuildingRows))
    results.push(await runSqlFileIfEmpty(connection, 'party_works', 'src/database/migrations/insert-party-works-data.sql'))
    results.push(await runSqlFileIfEmpty(connection, 'party_members', 'seed-party-members.sql'))
    results.push(await runSqlFileIfEmpty(connection, 'policies', 'seed-policies.sql'))
    results.push(await runSqlFileIfEmpty(connection, 'info_public', 'seed-info-public.sql'))
    results.push(await insertRowsIfEmpty(connection, 'public_info', ['title', 'content', 'category', 'publishDate', 'attachmentUrl', 'viewCount'], publicInfoRows))
    results.push(await runSqlFileIfEmpty(connection, 'team_building', 'seed-team-building.sql'))
    results.push(await insertRowsIfEmpty(connection, 'team_intro', ['title', 'content', 'sort'], teamIntroRows))
    results.push(await insertRowsIfEmpty(connection, 'appointments', ['title', 'docNumber', 'publishDate', 'effectiveDate', 'department', 'attachment', 'attachmentName'], appointmentRows))
    results.push(await insertRowsIfEmpty(connection, 'personnel_appointments', ['name', 'position', 'type', 'appointmentDate'], personnelAppointmentRows))
    results.push(await insertRowsIfEmpty(connection, 'roles', ['name', 'code', 'description', 'permissions', 'status'], roleRows))
    results.push(await insertMissingByTitle(connection, 'videos', ['title', 'videoUrl', 'coverUrl', 'sort', 'isTop'], videoRows))
    results.push(await insertSettingsIfMissing(connection))

    await connection.commit()
    console.table(results)
  } catch (error) {
    await connection.rollback()
    throw error
  } finally {
    await connection.end()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
