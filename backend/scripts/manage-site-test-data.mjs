import { pathToFileURL } from 'node:url'
import mysql from 'mysql2/promise'

export const TEST_MARKER = '[测试数据]'
export const TEST_BATCH = 'site-test-data-20260807'

const marked = (value) => `${TEST_MARKER}${value}`
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
  '/uploads/images/1772091958573-811889524.png',
  '/uploads/images/1772093166116-43957493.png',
  '/uploads/images/1772095241976-46189070.png',
  '/uploads/images/1772094941093-372031621.png',
  '/uploads/images/1772094725466-330988384.png',
  '/uploads/images/1772095408220-815651717.png',
]
const video = '/uploads/videos/1771997109315-841584175.mp4'

export const testDataSets = [
  {
    table: 'appointments',
    columns: ['title', 'docNumber', 'publishDate', 'effectiveDate', 'department', 'attachment', 'attachmentName'],
    cleanup: { column: 'docNumber', value: `${TEST_MARKER}%` },
    rows: [
      [marked('关于张伟等同志职务任免的通知'), marked('川飞救任〔2024〕1号'), '2024-01-20', '2024-01-20', '综合办公室', null, '人事任免公告.pdf'],
      [marked('关于调整应急救援专业组负责人的通知'), marked('川飞救任〔2024〕2号'), '2024-03-01', '2024-03-01', '人事部', null, '专业组负责人调整通知.pdf'],
    ],
  },
  {
    table: 'banners',
    columns: ['title', 'imageUrl', 'link', 'sort', 'isActive'],
    cleanup: { column: 'title', value: `${TEST_MARKER}%` },
    rows: [
      [marked('四川飞豹救援授旗授牌仪式'), imagePool[0], '/dynamic-news', 901, 1],
      [marked('全省消防救援队伍建设工作会议'), imagePool[1], '/dynamic-news', 902, 1],
      [marked('省级先进集体表彰大会'), imagePool[2], '/dynamic-news', 903, 1],
    ],
  },
  {
    table: 'certificates',
    columns: ['certificateNumber', 'certificateName', 'holderName', 'holderIdCard', 'issuingAuthority', 'issueDate', 'expiryDate', 'certificateType', 'photoUrl', 'remark', 'status'],
    cleanup: { column: 'certificateNumber', value: `${TEST_MARKER}%` },
    rows: [
      [marked('SC-XF-2023-001'), '消防救援队伍资质证书', '四川飞豹救援', null, '四川省应急管理厅', '2023-01-15', '2028-01-14', '资质证书', imagePool[0], '具备综合性应急救援能力', 1],
      [marked('SC-YJ-2023-002'), '应急救援队伍备案证明', '四川飞豹救援', null, '四川省应急管理厅', '2023-02-20', '2028-02-19', '备案证明', imagePool[1], '已在省应急管理厅备案', 1],
      [marked('SC-TS-2024-005'), '特种设备操作证', '张伟', '510100198501011234', '四川省市场监督管理局', '2024-01-10', '2028-01-09', '操作证', imagePool[2], '起重机械操作资格', 1],
    ],
  },
  {
    table: 'friend_links',
    columns: ['name', 'url', 'logo', 'sort', 'isActive'],
    cleanup: { column: 'name', value: `${TEST_MARKER}%` },
    rows: [
      [marked('四川省应急管理厅'), 'https://yjt.sc.gov.cn/', '', 901, 1],
      [marked('中华人民共和国应急管理部'), 'https://www.mem.gov.cn/', '', 902, 1],
      [marked('四川省人民政府'), 'https://www.sc.gov.cn/', '', 903, 1],
      [marked('中国政府网'), 'https://www.gov.cn/', '', 904, 1],
    ],
  },
  {
    table: 'leadership',
    columns: ['name', 'position', 'gender', 'nation', 'birth', 'education', 'political', 'duty', 'experience', 'actions', 'photo', 'sort'],
    cleanup: { column: 'name', value: `${TEST_MARKER}%` },
    rows: [
      [marked('领导成员01'), '领导班子成员', '', '', '', '', '', '请在后台维护真实姓名、职务、简介和分管工作。', 0, 0, '/leader-photos/member-01.png', 901],
      [marked('领导成员02'), '领导班子成员', '', '', '', '', '', '请在后台维护真实姓名、职务、简介和分管工作。', 0, 0, '/leader-photos/member-02.png', 902],
      [marked('领导成员03'), '领导班子成员', '', '', '', '', '', '请在后台维护真实姓名、职务、简介和分管工作。', 0, 0, '/leader-photos/member-03.png', 903],
      [marked('领导成员04'), '领导班子成员', '', '', '', '', '', '请在后台维护真实姓名、职务、简介和分管工作。', 0, 0, '/leader-photos/member-04.png', 904],
    ],
  },
  {
    table: 'locations',
    columns: ['name', 'pointName', 'address', 'phone', 'longitude', 'latitude', 'zoom', 'sort', 'status'],
    cleanup: { column: 'name', value: `${TEST_MARKER}%` },
    rows: [
      [marked('总队'), '四川飞豹救援指挥中心', '四川省成都市温江区S8(成名高速)', '028-87659119', 103.849650, 30.686520, 16, 901, 1],
      [marked('特勤大队'), '四川飞豹救援特勤大队', '四川省成都市武侯区四川飞豹救援特勤大队', '028-87659120', 104.043720, 30.641960, 16, 902, 1],
      [marked('训练与战勤保障大队'), '四川飞豹救援训练与战勤保障大队', '四川省成都市双流区四川飞豹救援训练与战勤保障大队', '028-87659121', 103.923710, 30.574470, 16, 903, 1],
      [marked('峨眉山直属大队'), '四川飞豹救援峨眉山直属大队', '四川省乐山市峨眉山市四川飞豹救援峨眉山直属大队', '028-87659123', 103.484230, 29.601190, 16, 904, 1],
      [marked('南充支队'), '四川飞豹救援南充支队', '四川省南充市顺庆区四川飞豹救援南充支队', '028-87659126', 106.110560, 30.837680, 16, 905, 1],
    ],
  },
  {
    table: 'news',
    columns: ['title', 'summary', 'content', 'coverImage', 'category', 'author', 'status', 'published_at', 'sort', 'isHeadline', 'isNew'],
    cleanup: { column: 'title', value: `${TEST_MARKER}%` },
    rows: [
      [marked('四川飞豹救援授旗授牌仪式'), '授旗授牌仪式顺利举行', '四川飞豹救援举行授旗授牌仪式，进一步凝聚救援力量。', imagePool[0], '动态要闻', '新闻宣传处', 1, '2025-01-20 09:00:00', 901, 1, 1],
      [marked('全省消防救援队伍建设工作会议召开'), '部署下一阶段重点任务', '会议总结队伍建设工作成效，部署下一阶段重点任务。', imagePool[1], '动态要闻', '新闻宣传处', 1, '2025-01-19 09:00:00', 902, 1, 0],
      [marked('成都支队开展冬季应急救援综合演练'), '全面检验队伍应急响应能力', '成都支队组织队员开展冬季应急救援综合演练。', imagePool[3], '各地动态', '新闻宣传处', 1, '2025-01-18 09:00:00', 903, 0, 1],
      [marked('乐山支队深入社区开展消防安全宣传'), '提高群众自防自救能力', '乐山支队深入社区开展消防安全知识宣传活动。', imagePool[4], '各地动态', '新闻宣传处', 1, '2025-01-17 09:00:00', 904, 0, 0],
      [marked('崇州支队完成年度装备升级改造'), '提升装备现代化水平', '崇州支队完成年度装备升级改造任务。', imagePool[5], '各地动态', '新闻宣传处', 1, '2025-01-16 09:00:00', 905, 0, 0],
      [marked('双流支队与机场开展联合演练'), '强化空地协同配合', '双流支队与机场开展联合应急演练。', imagePool[6], '各地动态', '新闻宣传处', 1, '2025-01-15 09:00:00', 906, 0, 0],
    ],
  },
  {
    table: 'party_building',
    columns: ['title', 'summary', 'content', 'coverImage', 'category', 'viewCount', 'status', 'publishedAt', 'sort'],
    cleanup: { column: 'title', value: `${TEST_MARKER}%` },
    rows: [
      [marked('深入学习贯彻习近平新时代中国特色社会主义思想'), '党支部组织学习活动', '党支部组织全体党员开展集中学习，不断提高政治站位。', imagePool[7], '党建动态', 0, 1, '2025-01-12 09:00:00', 901],
      [marked('开展“不忘初心、牢记使命”主题党日活动'), '主题党日活动', '党支部组织开展主题党日活动，重温入党誓词。', imagePool[8], '党建动态', 0, 1, '2025-01-10 09:00:00', 902],
    ],
  },
  {
    table: 'party_members',
    columns: ['name', 'position', 'avatar', 'description', 'sort'],
    cleanup: { column: 'name', value: `${TEST_MARKER}%` },
    rows: [
      [marked('张伟'), '党支部书记', '/leader-photos/zhang-wei.png', '中共党员，现任四川飞豹救援党支部书记、队长。', 901],
      [marked('李明'), '组织委员', '/leader-photos/li-ming.png', '中共党员，负责党支部组织建设工作。', 902],
      [marked('王强'), '宣传委员', '/leader-photos/wang-qiang.png', '中共党员，负责党支部宣传工作。', 903],
    ],
  },
  {
    table: 'party_works',
    columns: ['title', 'type', 'content', 'coverImage', 'summary', 'publishDate', 'status', 'viewCount'],
    cleanup: { column: 'title', value: `${TEST_MARKER}%` },
    rows: [
      [marked('认真践行关于党的自我革命的重要思想'), '党建工作', '党支部组织开展专题学习，持续加强自身建设。', imagePool[7], '持续加强党组织自身建设。', '2025-01-12 09:00:00', '已发布', 0],
      [marked('以学铸魂，站稳人民立场'), '党员学习', '坚持学思用贯通、知信行统一，筑牢信仰之基。', imagePool[8], '坚持以学铸魂，站稳人民立场。', '2025-01-10 09:00:00', '已发布', 0],
      [marked('优秀党员先进事迹'), '党员先锋', '党员骨干在救援任务中冲锋在前，发挥先锋模范作用。', imagePool[9], '发挥党员先锋模范作用。', '2025-01-08 09:00:00', '已发布', 0],
    ],
  },
  {
    table: 'personnel',
    columns: ['personnelCode', 'name', 'idCard', 'gender', 'birthDate', 'phone', 'email', 'team', 'position', 'joinDate', 'photoUrl', 'skills', 'remark', 'taskCount', 'trainingHours', 'status', 'auditStatus'],
    cleanup: { column: 'personnelCode', value: `${TEST_MARKER}%` },
    rows: [
      [marked('RY-001'), marked('张伟'), '510100198501019911', '男', '1985-01-01', '13800139001', 'test-zhangwei@example.com', '成都支队', '队长', '2020-01-15', '/leader-photos/zhang-wei.png', '综合救援、指挥协调', '历史种子测试数据', 32, 120, 1, 1],
      [marked('RY-002'), marked('李明'), '510100198702029912', '男', '1987-02-02', '13800139002', 'test-liming@example.com', '成都支队', '副队长', '2020-03-20', '/leader-photos/li-ming.png', '地震救援、技术指导', '历史种子测试数据', 28, 108, 1, 1],
      [marked('RY-003'), marked('王强'), '510100199003039913', '男', '1990-03-03', '13800139003', 'test-wangqiang@example.com', '乐山支队', '中队长', '2021-05-10', '/leader-photos/wang-qiang.png', '水域救援、潜水作业', '历史种子测试数据', 21, 96, 1, 1],
    ],
  },
  {
    table: 'personnel_appointments',
    columns: ['name', 'position', 'type', 'appointmentDate'],
    cleanup: { column: 'name', value: `${TEST_MARKER}%` },
    rows: [
      [marked('张伟'), '队长', '任命', '2024-01-20 00:00:00'],
      [marked('李明'), '副队长', '任命', '2024-01-20 00:00:00'],
    ],
  },
  {
    table: 'policies',
    columns: ['title', 'category', 'summary', 'content', 'issuingAuthority', 'documentNumber', 'fileUrl', 'attachmentUrl', 'attachmentName', 'publishDate', 'publishedAt', 'viewCount', 'status', 'sort'],
    cleanup: { column: 'title', value: `${TEST_MARKER}%` },
    rows: [
      [marked('中华人民共和国消防法'), '法律法规', '为了预防火灾和减少火灾危害，加强应急救援工作。', '消防工作贯彻预防为主、防消结合的方针。', '全国人民代表大会常务委员会', '主席令第81号', null, null, null, '2021-04-29 00:00:00', '2021-04-29 00:00:00', 0, 1, 901],
      [marked('应急救援队伍管理办法'), '部门规章', '为规范应急救援队伍建设和管理，提高应急救援能力。', '本办法适用于各类应急救援队伍的建设、管理和救援活动。', '应急管理部', '应急管理部令第5号', null, null, null, '2022-06-01 00:00:00', '2022-06-01 00:00:00', 0, 1, 902],
    ],
  },
  {
    table: 'public_info',
    columns: ['title', 'content', 'category', 'publishDate', 'attachmentUrl', 'viewCount'],
    cleanup: { column: 'title', value: `${TEST_MARKER}%` },
    rows: [
      [marked('2024年度工作计划'), '2024年度工作计划，包括队伍建设、装备采购、训练演练等安排。', '工作计划', '2024-01-01 00:00:00', null, 0],
      [marked('2023年度工作总结'), '全面回顾年度工作成效和经验。', '工作总结', '2024-01-15 00:00:00', null, 0],
      [marked('财务预算公开'), '年度财务预算公开，包括收入预算和支出预算。', '财务信息', '2024-02-01 00:00:00', null, 0],
    ],
  },
  {
    table: 'rescue_cases',
    columns: ['title', 'content', 'coverImage', 'location', 'rescueDate'],
    cleanup: { column: 'title', value: `${TEST_MARKER}%` },
    rows: [
      [marked('成功处置高速公路多车连环相撞事故'), '救援队接警后迅速出动，及时救出被困人员。', imagePool[10], '成都绕城高速', '2025-01-15 00:00:00'],
      [marked('山地救援队成功转移被困登山者'), '山地救援队克服复杂地形，安全转移被困登山者。', imagePool[11], '四姑娘山', '2025-01-10 00:00:00'],
      [marked('水域救援队成功救起落水群众'), '水域救援队快速响应，成功救起落水群众。', imagePool[12], '岷江河段', '2025-01-05 00:00:00'],
      [marked('地震救援队紧急驰援灾区'), '救援队第一时间赶赴灾区开展搜救工作。', imagePool[13], '雅安市', '2024-12-28 00:00:00'],
    ],
  },
  {
    table: 'team_building',
    columns: ['title', 'summary', 'content', 'coverImage', 'category', 'viewCount', 'status', 'publishedAt', 'sort'],
    cleanup: { column: 'title', value: `${TEST_MARKER}%` },
    rows: [
      [marked('开展绳索救援专业训练'), '提升复杂环境救援能力', '队伍组织开展绳索救援专业训练。', imagePool[14], '训练演练', 0, 1, '2025-01-12 09:00:00', 901],
      [marked('开展水域救援联合演练'), '强化水域协同救援能力', '队伍组织开展水域救援联合演练。', imagePool[15], '训练演练', 0, 1, '2025-01-10 09:00:00', 902],
    ],
  },
  {
    table: 'team_intro',
    columns: ['title', 'content', 'sort'],
    cleanup: { column: 'title', value: `${TEST_MARKER}%` },
    rows: [
      [marked('四川飞豹救援队伍简介'), '四川飞豹救援围绕综合应急救援、专业训练、装备保障和社会服务持续提升能力。', 901],
      [marked('训练与装备建设'), '队伍建立专业化训练体系，配备救援车辆、通信装备和医疗急救器材。', 902],
    ],
  },
  {
    table: 'team_showcase',
    columns: ['title', 'type', 'imageUrl', 'description', 'sort', 'status'],
    cleanup: { column: 'title', value: `${TEST_MARKER}%` },
    rows: [
      [marked('训练场景1'), '训练场景', imagePool[10], '队员进行绳索救援训练', 901, '显示'],
      [marked('训练场景2'), '训练场景', imagePool[11], '队员进行高空救援训练', 902, '显示'],
      [marked('训练场景3'), '训练场景', imagePool[12], '队员进行水域救援训练', 903, '显示'],
      [marked('实战场景1'), '实战场景', imagePool[13], '队员参与实战救援', 904, '显示'],
      [marked('实战场景2'), '实战场景', imagePool[14], '队员转移被困群众', 905, '显示'],
      [marked('实战场景3'), '实战场景', imagePool[15], '队员开展搜救工作', 906, '显示'],
    ],
  },
  {
    table: 'team_units',
    columns: ['name', 'pointName', 'sort', 'status'],
    cleanup: { column: 'name', value: `${TEST_MARKER}%` },
    rows: [
      [marked('总队'), '四川飞豹救援指挥中心', 901, 1],
      [marked('特勤大队'), '四川飞豹救援特勤大队', 902, 1],
      [marked('训练与战勤保障大队'), '四川飞豹救援训练与战勤保障大队', 903, 1],
      [marked('峨眉山直属大队'), '四川飞豹救援峨眉山直属大队', 904, 1],
      [marked('南充支队'), '四川飞豹救援南充支队', 905, 1],
    ],
  },
  {
    table: 'vehicles',
    columns: ['plateNumber', 'vehicleNo', 'vehicleType', 'brandModel', 'color', 'purchaseDate', 'team', 'responsiblePerson', 'phone', 'configuration', 'photoUrl', 'remark', 'status'],
    cleanup: { column: 'vehicleNo', value: `${TEST_MARKER}%` },
    rows: [
      ['川A·T0001', marked('CL-001'), '抢险救援消防车', 'MAN TGM 18.340', '红色', '2021-06-01', '成都支队', '张伟', '13800139001', '综合抢险救援装备', imagePool[0], '历史种子测试数据', 1],
      ['川A·T0002', marked('CL-002'), '水罐消防车', '五十铃FVR', '红色', '2021-07-15', '成都支队', '李明', '13800139002', '水域和消防救援装备', imagePool[1], '历史种子测试数据', 1],
      ['川A·T0003', marked('CL-003'), '登高平台消防车', '中联重科ZLJ5320', '红色', '2022-03-20', '乐山支队', '王强', '13800139003', '高空救援装备', imagePool[2], '历史种子测试数据', 1],
    ],
  },
  {
    table: 'videos',
    columns: ['title', 'videoUrl', 'coverUrl', 'sort', 'isTop'],
    cleanup: { column: 'title', value: `${TEST_MARKER}%` },
    rows: [
      [marked('四川飞豹救援宣传片'), video, imagePool[0], 901, 1],
      [marked('地震救援实战演练'), video, imagePool[1], 902, 0],
    ],
  },
]

const connectionConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3308),
  user: process.env.DB_USERNAME || 'scfeibao',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'scfeibao',
}

const registryTable = '_site_test_data_registry'

function quoteIdentifier(value) {
  if (!/^[A-Za-z0-9_]+$/.test(value)) {
    throw new Error(`非法数据库标识符：${value}`)
  }
  return `\`${value}\``
}

async function ensureRegistryTable(connection) {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS ${quoteIdentifier(registryTable)} (
      id bigint unsigned NOT NULL AUTO_INCREMENT,
      batch_key varchar(100) NOT NULL,
      table_name varchar(100) NOT NULL,
      record_id bigint unsigned NOT NULL,
      created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY uk_batch_record (batch_key, table_name, record_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `)
}

export function shouldCreateRegistryTable(command) {
  return command === 'seed' || command === 'clean'
}

async function registryTableExists(connection) {
  const [[row]] = await connection.query(
    'SELECT COUNT(*) AS total FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?',
    [registryTable],
  )
  return Number(row.total || 0) > 0
}

async function assertSchema(connection) {
  const [tables] = await connection.query(
    'SELECT TABLE_NAME AS tableName FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE()',
  )
  const existingTables = new Set(tables.map((item) => item.tableName))
  const missingTables = testDataSets
    .map((item) => item.table)
    .filter((table) => !existingTables.has(table))
  if (missingTables.length > 0) {
    throw new Error(`缺少业务表：${missingTables.join(', ')}`)
  }

  for (const dataSet of testDataSets) {
    const [columns] = await connection.query(
      'SELECT COLUMN_NAME AS columnName FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?',
      [dataSet.table],
    )
    const existingColumns = new Set(columns.map((item) => item.columnName))
    const missingColumns = dataSet.columns.filter((column) => !existingColumns.has(column))
    if (missingColumns.length > 0) {
      throw new Error(`${dataSet.table} 缺少字段：${missingColumns.join(', ')}`)
    }
  }
}

export function assertMutationTarget(command, target, env = process.env) {
  if (command === 'status') return

  const actualTarget = `${target.host}:${target.port}/${target.database}`
  const confirmedTarget = String(env.SITE_TEST_DATA_CONFIRM_TARGET || '').trim()
  if (!confirmedTarget) {
    throw new Error(
      `执行 ${command} 前必须设置 SITE_TEST_DATA_CONFIRM_TARGET=${actualTarget}`,
    )
  }
  if (confirmedTarget !== actualTarget) {
    throw new Error(`确认目标不一致：当前连接目标为 ${actualTarget}`)
  }
  if (command === 'clean') {
    const expectedAction = `clean:${TEST_BATCH}`
    const confirmedAction = String(env.SITE_TEST_DATA_CONFIRM_ACTION || '').trim()
    if (confirmedAction !== expectedAction) {
      throw new Error(`执行 clean 前必须设置 SITE_TEST_DATA_CONFIRM_ACTION=${expectedAction}`)
    }
  }
}

export function assertExistingRecordOwned(table, recordId, owned) {
  if (!owned) {
    throw new Error(`${table} 记录 ${recordId} 与测试标识冲突，拒绝接管未登记数据`)
  }
}

export function assertTrackedRowsStillMarked(table, rows) {
  const changedRows = rows.filter((row) => !String(row.cleanupValue || '').startsWith(TEST_MARKER))
  if (changedRows.length > 0) {
    const ids = changedRows.map((row) => row.id).join(', ')
    throw new Error(`${table} 已登记测试数据的测试标识已被修改：${ids}`)
  }
}

export function buildCleanupSql(dataSet) {
  const table = quoteIdentifier(dataSet.table)
  const cleanupColumn = quoteIdentifier(dataSet.cleanup.column)
  return `DELETE FROM ${table}
    WHERE id IN (
      SELECT record_id FROM ${quoteIdentifier(registryTable)}
      WHERE batch_key = ? AND table_name = ?
    )
    AND ${cleanupColumn} LIKE ?`
}

async function seed(connection) {
  const results = []
  for (const dataSet of testDataSets) {
    let inserted = 0
    let reused = 0
    const table = quoteIdentifier(dataSet.table)
    const cleanupColumn = quoteIdentifier(dataSet.cleanup.column)
    const columns = dataSet.columns.map(quoteIdentifier).join(', ')
    const updateSet = dataSet.columns
      .map((column) => `${quoteIdentifier(column)} = ?`)
      .join(', ')
    const placeholders = dataSet.columns.map(() => '?').join(', ')
    const cleanupIndex = dataSet.columns.indexOf(dataSet.cleanup.column)

    const [trackedRows] = await connection.query(
      `SELECT business_row.id, business_row.${cleanupColumn} AS cleanupValue
       FROM ${quoteIdentifier(registryTable)} AS registry
       INNER JOIN ${table} AS business_row ON business_row.id = registry.record_id
       WHERE registry.batch_key = ? AND registry.table_name = ?`,
      [TEST_BATCH, dataSet.table],
    )
    assertTrackedRowsStillMarked(dataSet.table, trackedRows)

    for (const row of dataSet.rows) {
      const cleanupValue = row[cleanupIndex]
      const [existingRows] = await connection.query(
        `SELECT id FROM ${table} WHERE ${cleanupColumn} = ? LIMIT 1`,
        [cleanupValue],
      )

      let recordId
      if (existingRows.length > 0) {
        recordId = existingRows[0].id
        const [[registryRow]] = await connection.query(
          `SELECT COUNT(*) AS total FROM ${quoteIdentifier(registryTable)}
           WHERE batch_key = ? AND table_name = ? AND record_id = ?`,
          [TEST_BATCH, dataSet.table, recordId],
        )
        assertExistingRecordOwned(
          dataSet.table,
          recordId,
          Number(registryRow.total || 0) > 0,
        )
        await connection.query(
          `UPDATE ${table} SET ${updateSet} WHERE id = ?`,
          [...row, recordId],
        )
        reused += 1
      } else {
        const [insertResult] = await connection.query(
          `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`,
          row,
        )
        recordId = insertResult.insertId
        inserted += 1
      }

      await connection.query(
        `INSERT IGNORE INTO ${quoteIdentifier(registryTable)} (batch_key, table_name, record_id) VALUES (?, ?, ?)`,
        [TEST_BATCH, dataSet.table, recordId],
      )
    }

    results.push({ table: dataSet.table, inserted, reused, expected: dataSet.rows.length })
  }
  return results
}

async function clean(connection) {
  const results = []
  for (const dataSet of [...testDataSets].reverse()) {
    const table = quoteIdentifier(dataSet.table)
    const [deleteResult] = await connection.query(
      buildCleanupSql(dataSet),
      [TEST_BATCH, dataSet.table, dataSet.cleanup.value],
    )

    await connection.query(
      `DELETE registry FROM ${quoteIdentifier(registryTable)} AS registry
       LEFT JOIN ${table} AS business_row ON business_row.id = registry.record_id
       WHERE registry.batch_key = ?
         AND registry.table_name = ?
         AND business_row.id IS NULL`,
      [TEST_BATCH, dataSet.table],
    )
    const [[remainingRow]] = await connection.query(
      `SELECT COUNT(*) AS total FROM ${quoteIdentifier(registryTable)}
       WHERE batch_key = ? AND table_name = ?`,
      [TEST_BATCH, dataSet.table],
    )
    results.push({
      table: dataSet.table,
      deleted: deleteResult.affectedRows,
      skippedModified: Number(remainingRow.total || 0),
    })
  }
  return results
}

async function status(connection, registryAvailable) {
  const results = []
  for (const dataSet of testDataSets) {
    const table = quoteIdentifier(dataSet.table)
    const cleanupColumn = quoteIdentifier(dataSet.cleanup.column)
    const [[row]] = await connection.query(
      `SELECT COUNT(*) AS total FROM ${table} WHERE ${cleanupColumn} LIKE ?`,
      [dataSet.cleanup.value],
    )
    const [[trackedRow]] = registryAvailable
      ? await connection.query(
        `SELECT COUNT(*) AS total FROM ${quoteIdentifier(registryTable)}
         WHERE batch_key = ? AND table_name = ?`,
        [TEST_BATCH, dataSet.table],
      )
      : [[{ total: 0 }]]
    results.push({
      table: dataSet.table,
      total: Number(row.total || 0),
      tracked: Number(trackedRow.total || 0),
      expected: dataSet.rows.length,
    })
  }
  return results
}

export async function run(command) {
  if (!['seed', 'clean', 'status'].includes(command)) {
    throw new Error('用法：node scripts/manage-site-test-data.mjs <seed|clean|status>')
  }

  assertMutationTarget(command, connectionConfig)
  const connection = await mysql.createConnection(connectionConfig)
  let transactionStarted = false
  try {
    if (shouldCreateRegistryTable(command)) {
      await ensureRegistryTable(connection)
    }
    const registryAvailable = shouldCreateRegistryTable(command)
      ? true
      : await registryTableExists(connection)
    await assertSchema(connection)
    await connection.beginTransaction()
    transactionStarted = true
    const results = command === 'seed'
      ? await seed(connection)
      : command === 'clean'
        ? await clean(connection)
        : await status(connection, registryAvailable)
    await connection.commit()
    transactionStarted = false
    return results
  } catch (error) {
    if (transactionStarted) {
      await connection.rollback()
      transactionStarted = false
    }
    throw error
  } finally {
    await connection.end()
  }
}

const isDirectRun = process.argv[1]
  && import.meta.url === pathToFileURL(process.argv[1]).href

if (isDirectRun) {
  run(process.argv[2] || 'status')
    .then((results) => console.table(results))
    .catch((error) => {
      console.error(error.message)
      process.exitCode = 1
    })
}
