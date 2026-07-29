import mysql from 'mysql2/promise'

const connectionConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3308),
  user: process.env.DB_USERNAME || 'scfeibao',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'scfeibao',
}

const now = new Date()

const imagePool = [
  '/uploads/images/1772012670176-263678027.jpg',
  '/uploads/images/1771929358760-480792560.jpg',
  '/uploads/images/1772011890986-64178342.png',
  '/uploads/images/1772012797680-610333930.jpg',
  '/uploads/images/1772012347900-787110831.jpg',
  '/uploads/images/1772017360639-169151121.jpg',
  '/uploads/images/1772017018183-188723664.png',
  '/uploads/images/1772017280639-476314576.png',
  '/uploads/images/1772093657671-998030690.png',
  '/uploads/images/1772109592087-215156322.png',
  '/uploads/images/1772093166116-43957493.png',
  '/uploads/images/1772095241976-46189070.png',
  '/uploads/images/1772094941093-372031621.png',
  '/uploads/images/1772094725466-330988384.png',
  '/uploads/images/1772094560465-393963285.png',
  '/uploads/images/1772095408220-815651717.png',
]

const rows = [
  ['动态要闻', '四川飞豹救援授旗授牌仪式', '授旗授牌仪式顺利举行', '为深入贯彻授旗训词精神，四川飞豹救援举行授旗授牌仪式，进一步凝聚队伍力量，明确使命任务。', imagePool[0], 100, 1, 1],
  ['动态要闻', '全省消防救援队伍建设工作会议召开', '部署下一阶段重点任务', '会议总结全省消防救援队伍建设成效，部署专业训练、装备保障和基层基础建设重点工作。', imagePool[1], 99, 1, 0],
  ['动态要闻', '四川飞豹救援获省级先进集体荣誉', '展现队伍使命担当', '四川飞豹救援凭借专业救援能力和连续作战表现，被授予省级先进集体荣誉称号。', imagePool[2], 98, 1, 0],
  ['动态要闻', '四川飞豹救援开展冬季大练兵活动', '全面提升队伍实战能力', '队伍围绕山地、水域、高空、地震等科目组织冬季大练兵，持续提升复杂环境下综合救援能力。', imagePool[7], 97, 0, 0],

  ['图文资讯', '授旗授牌现场直击', '以图文记录授旗授牌庄严时刻', '授旗授牌仪式现场庄重热烈，队员整齐列队、精神饱满，展现四川飞豹救援昂扬向上的精神风貌。', imagePool[0], 96, 0, 1],
  ['图文资讯', '综合救援训练剪影', '多科目训练锤炼实战能力', '队伍常态化开展综合救援训练，围绕协同指挥、快速集结、现场处置等环节持续打磨实战能力。', imagePool[10], 95, 0, 0],
  ['图文资讯', '装备保障能力展示', '专业装备支撑快速响应', '车辆、通信、绳索、水域、医疗等装备体系持续完善，为各类救援行动提供有力保障。', imagePool[11], 94, 0, 0],
  ['图文资讯', '应急宣传进基层', '提升群众安全意识', '队伍走进社区、学校和重点单位开展应急宣传，普及消防安全、避险逃生和自救互救知识。', imagePool[9], 93, 0, 0],

  ['各地动态', '成都支队开展冬季应急救援综合演练', '全面检验队伍应急响应能力', '成都支队组织开展冬季应急救援综合演练，模拟多灾种场景，检验队伍快速响应和协同作战水平。', imagePool[3], 80, 0, 0],
  ['各地动态', '乐山支队深入社区开展消防安全宣传', '提高群众自防自救能力', '乐山支队深入社区、学校、企业开展消防安全宣传，普及安全常识和应急处置方法。', imagePool[4], 79, 0, 0],
  ['各地动态', '崇州支队完成年度装备升级改造', '提升装备现代化水平', '崇州支队完成年度装备升级改造，新增多套专业救援装备，进一步提升现场处置能力。', imagePool[5], 78, 0, 0],
  ['各地动态', '双流支队与机场开展联合演练', '强化空地协同配合', '双流支队与机场单位联合开展应急演练，围绕航空器事故救援强化协同联动。', imagePool[6], 77, 0, 0],
  ['各地动态', '雅安支队开展山地搜救训练', '提升复杂地形搜救能力', '雅安支队围绕山地搜索、担架转运、通信保障等内容开展专项训练。', imagePool[12], 76, 0, 0],
  ['各地动态', '德阳支队开展消防安全夜查', '筑牢重点场所安全防线', '德阳支队联合相关单位开展重点场所消防安全夜查，督促整改隐患。', imagePool[13], 75, 0, 0],
  ['各地动态', '南充支队组织水域救援拉动', '检验水域救援响应机制', '南充支队组织水域救援拉动演练，检验队伍集结、装备投送和现场救援能力。', imagePool[14], 74, 0, 0],
  ['各地动态', '达州支队开展应急通信保障训练', '提升现场通信保障水平', '达州支队围绕断网、复杂地形等场景开展应急通信保障训练。', imagePool[15], 73, 0, 0],

  ['救援行动', '暴雨内涝救援行动顺利完成', '快速转移被困群众', '强降雨导致局部内涝后，四川飞豹救援迅速出动，协助转移被困群众并开展现场排险。', imagePool[12], 72, 0, 1],
  ['救援行动', '山地迷失人员搜救行动完成', '连夜搜索成功找到被困人员', '接到求助后，队伍组织山地搜救力量连夜搜索，成功找到迷失人员并安全转移。', imagePool[13], 71, 0, 0],
  ['救援行动', '高速事故救援处置及时有序', '协同处置道路交通事故', '队伍配合相关部门处置高速交通事故，开展警戒、破拆、转运等救援工作。', imagePool[14], 70, 0, 0],
  ['救援行动', '水域救援队成功救起落水群众', '专业处置赢得救援时间', '水域救援力量快速到场，利用专业装备成功救起落水群众并移交医护人员。', imagePool[15], 69, 0, 0],
  ['救援行动', '地震救援分队开展灾区支援', '携装驰援重点区域', '地震发生后，救援分队携带破拆、搜索、医疗等装备赶赴现场开展支援。', imagePool[8], 68, 0, 0],
  ['救援行动', '大型活动现场安全保障完成', '保障活动平稳有序', '队伍承担大型活动现场安全保障任务，做好应急值守、巡查和突发情况处置准备。', imagePool[9], 67, 0, 0],

  ['政策解读', '应急救援队伍建设政策解读', '加强社会救援力量规范化建设', '围绕社会救援力量建设要求，解读组织管理、训练演练、装备保障和联动响应等重点内容。', imagePool[1], 66, 0, 0],
  ['政策解读', '安全生产治本攻坚行动要点解读', '压实安全责任防范重大风险', '解读安全生产治本攻坚行动重点任务，推动隐患排查整治和风险防控落地见效。', imagePool[2], 65, 0, 0],
  ['政策解读', '消防安全集中除患攻坚政策解读', '聚焦重点场所和薄弱环节', '围绕消防安全集中除患攻坚行动，梳理重点场所检查、隐患整改和宣传培训要求。', imagePool[3], 64, 0, 0],
  ['政策解读', '基层应急能力建设工作解读', '提升基层先期处置能力', '从队伍、装备、预案、演练等方面解读基层应急能力建设路径。', imagePool[4], 63, 0, 0],
  ['政策解读', '防灾减灾救灾工作重点提示', '提高综合防灾减灾水平', '结合季节性风险特点，提示防灾减灾救灾重点工作和公众避险注意事项。', imagePool[5], 62, 0, 0],
  ['政策解读', '应急预案管理办法学习解读', '提升预案实用性和可操作性', '解读应急预案编制、演练、评估和修订要求，推动预案真正管用好用。', imagePool[6], 61, 0, 0],

  ['媒体播报', '媒体关注四川飞豹救援授旗授牌仪式', '多家媒体报道队伍建设成果', '多家媒体关注四川飞豹救援授旗授牌仪式，报道队伍专业化建设和社会服务成效。', imagePool[0], 60, 0, 1],
  ['媒体播报', '四川飞豹救援训练纪实获关注', '展示救援队伍日常训练', '媒体走进训练现场，记录队员开展绳索、水域、高空等专业科目训练的真实场景。', imagePool[10], 59, 0, 0],
  ['媒体播报', '应急宣传活动被地方媒体报道', '安全知识走进群众身边', '地方媒体报道四川飞豹救援开展应急宣传活动，推动安全知识进社区、进校园、进企业。', imagePool[11], 58, 0, 0],
  ['媒体播报', '救援行动快速响应获社会关注', '专业处置获得群众认可', '媒体报道四川飞豹救援在突发事件中的快速响应和专业处置表现。', imagePool[12], 57, 0, 0],
  ['媒体播报', '队伍风采专题报道发布', '展现新时代救援力量形象', '媒体发布队伍风采专题报道，集中展示救援队员训练、执勤、宣传和救援一线身影。', imagePool[13], 56, 0, 0],
  ['媒体播报', '联勤联动机制建设获报道', '提升跨区域协同救援能力', '媒体关注四川飞豹救援联勤联动机制建设，展示多部门协同处置能力。', imagePool[14], 55, 0, 0],
]

async function insertMissingByTitle(connection) {
  let inserted = 0
  for (const [category, title, summary, content, coverImage, sort, isHeadline, isNew] of rows) {
    const [[existing]] = await connection.query('SELECT COUNT(*) AS total FROM `news` WHERE `title` = ?', [title])
    if (Number(existing.total || 0) > 0) continue

    await connection.query(
      'INSERT INTO `news` (`title`, `summary`, `content`, `coverImage`, `category`, `author`, `status`, `publishedAt`, `sort`, `isHeadline`, `isNew`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?)',
      [title, summary, content, coverImage, category, '新闻宣传处', now, sort, isHeadline, isNew, now, now],
    )
    inserted += 1
  }
  return inserted
}

async function categorySummary(connection) {
  const [rows] = await connection.query(
    'SELECT `category`, COUNT(*) AS total FROM `news` WHERE `status` = 1 GROUP BY `category` ORDER BY `category` ASC',
  )
  return rows
}

async function main() {
  const connection = await mysql.createConnection(connectionConfig)
  await connection.beginTransaction()

  try {
    const inserted = await insertMissingByTitle(connection)
    const summary = await categorySummary(connection)
    await connection.commit()
    console.log(`dynamic news inserted: ${inserted}`)
    console.table(summary)
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
