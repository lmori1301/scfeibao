import mysql from 'mysql2/promise'

const connectionConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3308),
  user: process.env.DB_USERNAME || 'scfeibao',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'scfeibao',
}

const leadershipRows = [
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

async function shouldReplace(connection) {
  const [[countRow]] = await connection.query('SELECT COUNT(*) AS total FROM `leadership`')
  const total = Number(countRow.total || 0)
  if (total === 0) return true
  if (total > 1) {
    const [rows] = await connection.query('SELECT `name`, `photo` FROM `leadership` ORDER BY `sort` ASC, `id` ASC LIMIT ?', [leadershipRows.length])
    const missingPhotoCount = rows.filter((row) => !String(row?.photo || '').trim()).length
    const hasDemoName = rows.some((row) => row?.name === '张三')
    return total !== leadershipRows.length || missingPhotoCount > 0 || hasDemoName
  }

  const [[row]] = await connection.query('SELECT `name`, `photo` FROM `leadership` LIMIT 1')
  return row?.name === '张三' || /^https?:\/\/(?:cdn\.)?example\.com\//i.test(String(row?.photo || ''))
}

async function main() {
  const connection = await mysql.createConnection(connectionConfig)
  await connection.beginTransaction()

  try {
    const replace = await shouldReplace(connection)
    if (!replace) {
      const [[countRow]] = await connection.query('SELECT COUNT(*) AS total FROM `leadership`')
      await connection.commit()
      console.table([{ table: 'leadership', action: 'skip', count: Number(countRow.total || 0) }])
      return
    }

    await connection.query('DELETE FROM `leadership`')
    await connection.query(
      'INSERT INTO `leadership` (`name`, `position`, `gender`, `nation`, `birth`, `education`, `political`, `duty`, `experience`, `actions`, `photo`, `sort`) VALUES ?',
      [leadershipRows],
    )

    await connection.commit()
    console.table([{ table: 'leadership', action: 'restore', count: leadershipRows.length }])
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
