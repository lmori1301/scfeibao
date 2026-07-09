import mysql from 'mysql2/promise'

const connectionConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3308),
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'feibao_rescue'
}

const teamUnits = [
  ['总队', '四川飞豹救援指挥中心', 1, 1],
  ['特勤大队', '四川飞豹救援特勤大队', 2, 1],
  ['训练与战勤保障大队', '四川飞豹救援训练与战勤保障大队', 3, 1],
  ['应急通信与车辆勤务大队', '四川飞豹救援应急通信与车辆勤务大队', 4, 1],
  ['峨眉山直属大队', '四川飞豹救援峨眉山直属大队', 5, 1],
  ['搜救犬大队', '四川飞豹救援搜救犬大队', 6, 1],
  ['崇州支队', '四川飞豹救援崇州支队', 7, 1],
  ['南充支队', '四川飞豹救援南充支队', 8, 1],
  ['天府支队', '四川飞豹救援天府支队', 9, 1],
  ['雅安支队', '四川飞豹救援雅安支队', 10, 1],
  ['德阳支队', '四川飞豹救援德阳支队', 11, 1],
  ['达州支队', '四川飞豹救援达州支队', 12, 1],
  ['双流大队', '四川飞豹救援双流大队', 13, 1],
  ['青白江大队', '四川飞豹救援青白江大队', 14, 1],
  ['龙泉驿大队', '四川飞豹救援龙泉驿大队', 15, 1],
  ['南部大队', '四川飞豹救援南部大队', 16, 1],
  ['营山大队', '四川飞豹救援营山大队', 17, 1]
]

const locations = [
  ['总队', '四川飞豹救援指挥中心', '四川省成都市温江区S8(成名高速)', '028-87659119', 103.849650, 30.686520, 16, 1, 1],
  ['特勤大队', '四川飞豹救援特勤大队', '四川省成都市武侯区四川飞豹救援特勤大队', '028-87659120', 104.043720, 30.641960, 16, 2, 1],
  ['训练与战勤保障大队', '四川飞豹救援训练与战勤保障大队', '四川省成都市双流区四川飞豹救援训练与战勤保障大队', '028-87659121', 103.923710, 30.574470, 16, 3, 1],
  ['应急通信与车辆勤务大队', '四川飞豹救援应急通信与车辆勤务大队', '四川省成都市龙泉驿区四川飞豹救援应急通信与车辆勤务大队', '028-87659122', 104.274620, 30.556580, 16, 4, 1],
  ['峨眉山直属大队', '四川飞豹救援峨眉山直属大队', '四川省乐山市峨眉山市四川飞豹救援峨眉山直属大队', '028-87659123', 103.484230, 29.601190, 16, 5, 1],
  ['搜救犬大队', '四川飞豹救援搜救犬大队', '四川省成都市新都区四川飞豹救援搜救犬大队', '028-87659124', 104.158170, 30.823440, 16, 6, 1],
  ['崇州支队', '四川飞豹救援崇州支队', '四川省成都市崇州市四川飞豹救援崇州支队', '028-87659125', 103.673020, 30.630110, 16, 7, 1],
  ['南充支队', '四川飞豹救援南充支队', '四川省南充市顺庆区四川飞豹救援南充支队', '028-87659126', 106.110560, 30.837680, 16, 8, 1],
  ['天府支队', '四川飞豹救援天府支队', '成都市双流区宁安东路红豆家园', '028-87659127', 104.076510, 30.509720, 16, 9, 1],
  ['雅安支队', '四川飞豹救援雅安支队', '四川省雅安市雨城区四川飞豹救援雅安支队', '028-87659128', 103.042400, 30.010560, 16, 10, 1],
  ['德阳支队', '四川飞豹救援德阳支队', '四川省德阳市旌阳区四川飞豹救援德阳支队', '028-87659129', 104.398170, 31.127410, 16, 11, 1],
  ['达州支队', '四川飞豹救援达州支队', '四川省达州市通川区四川飞豹救援达州支队', '028-87659130', 107.467910, 31.209660, 16, 12, 1],
  ['双流大队', '四川飞豹救援双流大队', '四川省成都市双流区四川飞豹救援双流大队', '028-87659131', 103.923640, 30.574410, 16, 13, 1],
  ['青白江大队', '四川飞豹救援青白江大队', '四川省成都市青白江区四川飞豹救援青白江大队', '028-87659132', 104.251740, 30.878570, 16, 14, 1],
  ['龙泉驿大队', '四川飞豹救援龙泉驿大队', '四川省成都市龙泉驿区四川飞豹救援龙泉驿大队', '028-87659133', 104.274580, 30.556610, 16, 15, 1],
  ['南部大队', '四川飞豹救援南部大队', '四川省南充市南部县四川飞豹救援南部大队', '028-87659134', 106.061510, 31.349310, 16, 16, 1],
  ['营山大队', '四川飞豹救援营山大队', '四川省南充市营山县四川飞豹救援营山大队', '028-87659135', 106.565560, 31.077880, 16, 17, 1]
]

const leadership = [
  ['领导成员01', '领导班子成员', '', '', '', '', '', '请在后台维护真实姓名、职务、简介和分管工作。', 0, 0, '/leader-photos/member-01.png', 1],
  ['领导成员02', '领导班子成员', '', '', '', '', '', '请在后台维护真实姓名、职务、简介和分管工作。', 0, 0, '/leader-photos/member-02.png', 2],
  ['领导成员03', '领导班子成员', '', '', '', '', '', '请在后台维护真实姓名、职务、简介和分管工作。', 0, 0, '/leader-photos/member-03.png', 3],
  ['领导成员04', '领导班子成员', '', '', '', '', '', '请在后台维护真实姓名、职务、简介和分管工作。', 0, 0, '/leader-photos/member-04.png', 4],
  ['领导成员05', '领导班子成员', '', '', '', '', '', '请在后台维护真实姓名、职务、简介和分管工作。', 0, 0, '/leader-photos/member-05.png', 5],
  ['领导成员06', '领导班子成员', '', '', '', '', '', '请在后台维护真实姓名、职务、简介和分管工作。', 0, 0, '/leader-photos/member-06.png', 6],
  ['领导成员07', '领导班子成员', '', '', '', '', '', '请在后台维护真实姓名、职务、简介和分管工作。', 0, 0, '/leader-photos/member-07.png', 7],
  ['领导成员08', '领导班子成员', '', '', '', '', '', '请在后台维护真实姓名、职务、简介和分管工作。', 0, 0, '/leader-photos/member-08.png', 8],
  ['领导成员09', '领导班子成员', '', '', '', '', '', '请在后台维护真实姓名、职务、简介和分管工作。', 0, 0, '/leader-photos/member-09.png', 9],
  ['领导成员10', '领导班子成员', '', '', '', '', '', '请在后台维护真实姓名、职务、简介和分管工作。', 0, 0, '/leader-photos/member-10.png', 10],
  ['领导成员11', '领导班子成员', '', '', '', '', '', '请在后台维护真实姓名、职务、简介和分管工作。', 0, 0, '/leader-photos/member-11.png', 11],
  ['领导成员12', '领导班子成员', '', '', '', '', '', '请在后台维护真实姓名、职务、简介和分管工作。', 0, 0, '/leader-photos/member-12.png', 12],
]

async function tableCount(connection, table) {
  const [[row]] = await connection.query(`SELECT COUNT(*) AS total FROM \`${table}\``)
  return Number(row?.total || 0)
}

async function insertIfEmpty(connection, table, rows, insertSql) {
  const total = await tableCount(connection, table)
  if (total > 0) {
    return { table, inserted: false, count: total }
  }

  await connection.query(insertSql, [rows])
  return { table, inserted: true, count: rows.length }
}

async function main() {
  const connection = await mysql.createConnection(connectionConfig)
  await connection.beginTransaction()

  try {
    const results = []

    results.push(await insertIfEmpty(
      connection,
      'team_units',
      teamUnits,
      'INSERT INTO `team_units` (`name`, `pointName`, `sort`, `status`) VALUES ?'
    ))

    results.push(await insertIfEmpty(
      connection,
      'locations',
      locations,
      'INSERT INTO `locations` (`name`, `pointName`, `address`, `phone`, `longitude`, `latitude`, `zoom`, `sort`, `status`) VALUES ?'
    ))

    results.push(await insertIfEmpty(
      connection,
      'leadership',
      leadership,
      'INSERT INTO `leadership` (`name`, `position`, `gender`, `nation`, `birth`, `education`, `political`, `duty`, `experience`, `actions`, `photo`, `sort`) VALUES ?'
    ))

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
