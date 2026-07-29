import mysql from 'mysql2/promise'

const connectionConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3308),
  user: process.env.DB_USERNAME || 'scfeibao',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'scfeibao'
}

const now = new Date()

async function columnExists(connection, table, column) {
  const [rows] = await connection.query(
    `
      SELECT COUNT(*) AS count
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = ?
        AND COLUMN_NAME = ?
    `,
    [table, column]
  )
  return Number(rows[0]?.count || 0) > 0
}

async function ensureColumn(connection, table, column, ddl) {
  if (!(await columnExists(connection, table, column))) {
    await connection.query(`ALTER TABLE \`${table}\` ADD COLUMN ${ddl}`)
  }
}

async function ensureSchema(connection) {
  await ensureColumn(connection, 'news', 'isHeadline', '`isHeadline` tinyint NOT NULL DEFAULT 0 COMMENT \'是否为头条：1-是，0-否\'')
  await ensureColumn(connection, 'news', 'isNew', '`isNew` tinyint NOT NULL DEFAULT 0 COMMENT \'是否显示NEW标签：1-是，0-否\'')

  await ensureColumn(connection, 'team_showcase', 'type', '`type` varchar(255) NULL')
  await ensureColumn(connection, 'team_showcase', 'status', '`status` varchar(255) NOT NULL DEFAULT \'显示\'')
  await ensureColumn(connection, 'team_showcase', 'createdAt', '`createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)')
  await ensureColumn(connection, 'team_showcase', 'updatedAt', '`updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)')

  await ensureColumn(connection, 'videos', 'isTop', '`isTop` tinyint NOT NULL DEFAULT 0')
  await ensureColumn(connection, 'videos', 'updatedAt', '`updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)')
}

async function replaceIfTooFew(connection, table, minRows, rows, insertSql) {
  const [[{ total }]] = await connection.query(`SELECT COUNT(*) AS total FROM \`${table}\``)
  if (Number(total) >= minRows) return false
  await connection.query(`DELETE FROM \`${table}\``)
  await connection.query(insertSql, [rows])
  return true
}

async function main() {
  const connection = await mysql.createConnection(connectionConfig)
  await connection.beginTransaction()

  try {
    await ensureSchema(connection)

    await replaceIfTooFew(
      connection,
      'banners',
      3,
      [
        ['四川飞豹救援授旗授牌仪式', '/uploads/images/1771914205341-880638838.png', '/dynamic-news/detail/1', 1, 1, now],
        ['全省消防救援队伍建设工作会议', '/uploads/images/1771913966377-18243769.png', '/dynamic-news/detail/2', 2, 1, now],
        ['省级先进集体表彰大会', '/uploads/images/1771912035621-395150975.png', '/dynamic-news/detail/3', 3, 1, now]
      ],
      'INSERT INTO `banners` (`title`, `imageUrl`, `link`, `sort`, `isActive`, `createdAt`) VALUES ?'
    )

    await replaceIfTooFew(
      connection,
      'news',
      10,
      [
        ['四川飞豹救援授旗授牌仪式', '授旗授牌仪式顺利举行', '为深入贯彻习近平总书记授旗训词精神，按照应急管理部和省委省政府的工作要求，四川飞豹救援举行授旗授牌仪式。', '/uploads/images/1772012670176-263678027.jpg', '动态要闻', '新闻宣传处', 1, now, 1, 1, 1, now, now],
        ['全省消防救援队伍建设工作会议召开', '部署下一阶段重点任务', '会议总结了全省消防救援队伍建设工作成效，部署下一阶段重点任务，强调持续提升队伍专业化、职业化水平。', '/uploads/images/1771929358760-480792560.jpg', '动态要闻', '新闻宣传处', 1, now, 2, 1, 0, now, now],
        ['四川飞豹救援获省级先进集体荣誉', '展现队伍使命担当', '四川飞豹救援凭借出色的救援业绩和专业能力，被授予省级先进集体荣誉称号。', '/uploads/images/1772011890986-64178342.png', '动态要闻', '新闻宣传处', 1, now, 3, 1, 0, now, now],
        ['成都支队开展冬季应急救援综合演练', '全面检验队伍应急响应能力', '成都支队组织全体队员开展冬季应急救援综合演练，模拟多种灾害场景，全面检验队伍应急响应能力和协同作战水平。', '/uploads/images/1772012797680-610333930.jpg', '各地动态', '新闻宣传处', 1, now, 4, 0, 0, now, now],
        ['乐山支队深入社区开展消防安全宣传', '提高群众自防自救能力', '乐山支队深入辖区社区、学校、企业开展消防安全知识宣传活动，普及消防安全常识，提高群众自防自救能力。', '/uploads/images/1772012347900-787110831.jpg', '各地动态', '新闻宣传处', 1, now, 5, 0, 0, now, now],
        ['崇州支队完成年度装备升级改造', '提升装备现代化水平', '崇州支队顺利完成年度装备升级改造任务，新增多套先进救援装备，进一步提升队伍装备现代化水平。', '/uploads/images/1772017360639-169151121.jpg', '各地动态', '新闻宣传处', 1, now, 6, 0, 0, now, now],
        ['双流支队与机场开展联合演练', '强化空地协同配合', '双流支队与成都双流国际机场开展联合应急演练，模拟航空器事故救援，强化空地协同配合能力。', '/uploads/images/1772017018183-188723664.png', '各地动态', '新闻宣传处', 1, now, 7, 0, 0, now, now],
        ['四川飞豹救援开展冬季大练兵活动', '全面提升队伍实战能力', '四川飞豹救援组织开展冬季大练兵活动，全面提升队伍实战能力和应急响应水平。', '/uploads/images/1772017280639-476314576.png', '动态要闻', '新闻宣传处', 1, now, 8, 0, 0, now, now],
        ['四川飞豹救援参加全国应急救援技能竞赛', '展现专业救援能力', '四川飞豹救援代表队参加全国应急救援技能竞赛，在多个项目中取得优异成绩。', '/uploads/images/1772093657671-998030690.png', '动态要闻', '新闻宣传处', 1, now, 9, 0, 0, now, now],
        ['四川飞豹救援开展社区应急演练', '提高群众应急意识', '四川飞豹救援深入社区开展应急演练活动，向居民普及应急知识，提高群众的应急意识和自救互救能力。', '/uploads/images/1772109592087-215156322.png', '动态要闻', '新闻宣传处', 1, now, 10, 0, 0, now, now]
      ],
      'INSERT INTO `news` (`title`, `summary`, `content`, `coverImage`, `category`, `author`, `status`, `publishedAt`, `sort`, `isHeadline`, `isNew`, `created_at`, `updated_at`) VALUES ?'
    )

    await replaceIfTooFew(
      connection,
      'rescue_cases',
      4,
      [
        ['成功处置高速公路多车连环相撞事故', '四川飞豹救援接警后迅速出动，成功处置一起高速公路多车连环相撞事故，及时救出被困人员。', '/uploads/images/1772011837512-801241663.jpg', '成都绕城高速', '2025-01-15', now],
        ['山地救援队成功转移被困登山者', '山地救援队接到求助后立即出发，克服恶劣天气和复杂地形，成功将被困登山者安全转移下山。', '/uploads/images/1772011851171-736832018.png', '四姑娘山', '2025-01-10', now],
        ['水域救援队成功救起落水群众', '水域救援队接到报警后快速响应，利用专业救援装备和技术，成功将落水群众救起并送医救治。', '/uploads/images/1772011879395-934330508.png', '岷江河段', '2025-01-05', now],
        ['地震救援队紧急驰援灾区', '地震发生后，救援队第一时间赶赴灾区，开展搜救工作，成功救出多名被困群众。', '/uploads/images/1772012863659-6702179.png', '雅安市', '2024-12-28', now]
      ],
      'INSERT INTO `rescue_cases` (`title`, `content`, `coverImage`, `location`, `rescueDate`, `createdAt`) VALUES ?'
    )

    await replaceIfTooFew(
      connection,
      'team_showcase',
      8,
      [
        ['训练场景1', '训练场景', '/uploads/images/1772091958573-811889524.png', '队员进行绳索救援训练', 1, '显示', now, now],
        ['训练场景2', '训练场景', '/uploads/images/1772093166116-43957493.png', '队员进行高空救援训练', 2, '显示', now, now],
        ['训练场景3', '训练场景', '/uploads/images/1772093657671-998030690.png', '队员进行水域救援训练', 3, '显示', now, now],
        ['训练场景4', '训练场景', '/uploads/images/1772094560465-393963285.png', '队员进行地震救援训练', 4, '显示', now, now],
        ['实战场景1', '实战场景', '/uploads/images/1772094725466-330988384.png', '队员参与实战救援', 5, '显示', now, now],
        ['实战场景2', '实战场景', '/uploads/images/1772094941093-372031621.png', '队员转移被困群众', 6, '显示', now, now],
        ['实战场景3', '实战场景', '/uploads/images/1772095241976-46189070.png', '队员开展搜救工作', 7, '显示', now, now],
        ['实战场景4', '实战场景', '/uploads/images/1772095408220-815651717.png', '队员进行医疗救护', 8, '显示', now, now]
      ],
      'INSERT INTO `team_showcase` (`title`, `type`, `imageUrl`, `description`, `sort`, `status`, `createdAt`, `updatedAt`) VALUES ?'
    )

    await replaceIfTooFew(
      connection,
      'friend_links',
      12,
      [
        ['四川省应急管理厅', 'https://yjt.sc.gov.cn/', '', 1, 1, now, now],
        ['中华人民共和国应急管理部', 'https://www.mem.gov.cn/', '', 2, 1, now, now],
        ['中国消防救援', 'https://www.119.gov.cn/', '', 3, 1, now, now],
        ['四川省消防救援总队', 'https://sc.119.gov.cn/', '', 4, 1, now, now],
        ['四川省人民政府', 'https://www.sc.gov.cn/', '', 5, 1, now, now],
        ['中国政府网', 'https://www.gov.cn/', '', 6, 1, now, now],
        ['四川省气象局', 'https://sc.cma.gov.cn/', '', 7, 1, now, now],
        ['四川省地震局', 'https://www.scdzj.gov.cn/', '', 8, 1, now, now],
        ['四川省水利厅', 'https://slt.sc.gov.cn/', '', 9, 1, now, now],
        ['四川省交通运输厅', 'https://jtt.sc.gov.cn/', '', 10, 1, now, now],
        ['四川省卫生健康委员会', 'https://wsjkw.sc.gov.cn/', '', 11, 1, now, now],
        ['四川省红十字会', 'https://www.scredcross.org.cn/', '', 12, 1, now, now]
      ],
      'INSERT INTO `friend_links` (`name`, `url`, `logo`, `sort`, `isActive`, `createdAt`, `updatedAt`) VALUES ?'
    )

    await replaceIfTooFew(
      connection,
      'videos',
      1,
      [
        ['四川飞豹救援宣传片', '/uploads/videos/1771997109315-841584175.mp4', '/uploads/images/1771914205341-880638838.png', 1, 1, now, now]
      ],
      'INSERT INTO `videos` (`title`, `videoUrl`, `coverUrl`, `sort`, `isTop`, `createdAt`, `updatedAt`) VALUES ?'
    )

    await connection.commit()
    console.log('homepage data restored')
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
