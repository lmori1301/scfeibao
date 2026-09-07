const assert = require('node:assert/strict')
const test = require('node:test')

const REQUIRED_TABLES = [
  'appointments',
  'banners',
  'certificates',
  'friend_links',
  'leadership',
  'locations',
  'news',
  'party_building',
  'party_members',
  'party_works',
  'personnel',
  'personnel_appointments',
  'policies',
  'public_info',
  'rescue_cases',
  'team_building',
  'team_intro',
  'team_showcase',
  'team_units',
  'vehicles',
  'videos',
]

test('测试数据集覆盖官网展示与后台维护模块', async () => {
  const { testDataSets } = await import('./manage-site-test-data.mjs')
  const tables = testDataSets.map((item) => item.table).sort()

  assert.deepEqual(tables, REQUIRED_TABLES)
  assert.ok(testDataSets.every((item) => item.rows.length > 0))
})

test('每个数据集都使用明确测试标识并提供精准清理规则', async () => {
  const { TEST_MARKER, testDataSets } = await import('./manage-site-test-data.mjs')

  for (const dataSet of testDataSets) {
    assert.ok(dataSet.cleanup, `${dataSet.table} 缺少清理规则`)
    assert.ok(
      dataSet.cleanup.value.includes(TEST_MARKER),
      `${dataSet.table} 清理值未包含测试标识`,
    )

    const cleanupColumnIndex = dataSet.columns.indexOf(dataSet.cleanup.column)
    assert.notEqual(cleanupColumnIndex, -1, `${dataSet.table} 清理字段不在插入列中`)
    assert.ok(
      dataSet.rows.every((row) => String(row[cleanupColumnIndex]).includes(TEST_MARKER)),
      `${dataSet.table} 存在无法被清理规则识别的数据`,
    )
  }
})

test('查询系统唯一编号使用独立测试前缀', async () => {
  const { TEST_MARKER, testDataSets } = await import('./manage-site-test-data.mjs')
  const expectedColumns = {
    certificates: 'certificateNumber',
    personnel: 'personnelCode',
    vehicles: 'vehicleNo',
  }

  for (const [table, column] of Object.entries(expectedColumns)) {
    const dataSet = testDataSets.find((item) => item.table === table)
    const columnIndex = dataSet.columns.indexOf(column)

    assert.notEqual(columnIndex, -1, `${table} 缺少 ${column}`)
    assert.ok(
      dataSet.rows.every((row) => String(row[columnIndex]).includes(TEST_MARKER)),
      `${table}.${column} 未使用独立测试前缀`,
    )
  }
})

test('官网展示测试数据使用历史附件资源', async () => {
  const { testDataSets } = await import('./manage-site-test-data.mjs')
  const imageColumns = {
    banners: 'imageUrl',
    certificates: 'photoUrl',
    news: 'coverImage',
    party_building: 'coverImage',
    party_works: 'coverImage',
    rescue_cases: 'coverImage',
    team_building: 'coverImage',
    team_showcase: 'imageUrl',
    vehicles: 'photoUrl',
    videos: 'coverUrl',
  }

  for (const [table, column] of Object.entries(imageColumns)) {
    const dataSet = testDataSets.find((item) => item.table === table)
    const columnIndex = dataSet.columns.indexOf(column)
    assert.notEqual(columnIndex, -1, `${table} 缺少 ${column}`)
    assert.ok(
      dataSet.rows.every((row) => String(row[columnIndex]).startsWith('/uploads/')),
      `${table}.${column} 未使用历史上传资源`,
    )
  }

  const friendLinks = testDataSets.find((item) => item.table === 'friend_links')
  const logoIndex = friendLinks.columns.indexOf('logo')
  assert.ok(friendLinks.rows.every((row) => row[logoIndex] === ''))
})

test('灌入和清理必须确认完整数据库目标', async () => {
  const { TEST_BATCH, assertMutationTarget } = await import('./manage-site-test-data.mjs')
  const target = {
    host: '127.0.0.1',
    port: 3308,
    database: 'scfeibao',
  }

  assert.throws(
    () => assertMutationTarget('clean', target, {}),
    /SITE_TEST_DATA_CONFIRM_TARGET/,
  )
  assert.throws(
    () => assertMutationTarget('seed', target, {
      SITE_TEST_DATA_CONFIRM_TARGET: '127.0.0.1:3306/scfeibao',
    }),
    /目标不一致/,
  )
  assert.doesNotThrow(() => assertMutationTarget('seed', target, {
    SITE_TEST_DATA_CONFIRM_TARGET: '127.0.0.1:3308/scfeibao',
  }))
  assert.throws(
    () => assertMutationTarget('clean', target, {
      SITE_TEST_DATA_CONFIRM_TARGET: '127.0.0.1:3308/scfeibao',
    }),
    /SITE_TEST_DATA_CONFIRM_ACTION/,
  )
  assert.doesNotThrow(() => assertMutationTarget('clean', target, {
    SITE_TEST_DATA_CONFIRM_TARGET: '127.0.0.1:3308/scfeibao',
    SITE_TEST_DATA_CONFIRM_ACTION: `clean:${TEST_BATCH}`,
  }))
  assert.doesNotThrow(() => assertMutationTarget('status', target, {}))
})

test('status 不应创建登记表', async () => {
  const { shouldCreateRegistryTable } = await import('./manage-site-test-data.mjs')

  assert.equal(shouldCreateRegistryTable('status'), false)
  assert.equal(shouldCreateRegistryTable('seed'), true)
  assert.equal(shouldCreateRegistryTable('clean'), true)
})

test('清理必须同时匹配登记 ID 和测试标识', async () => {
  const { buildCleanupSql, testDataSets } = await import('./manage-site-test-data.mjs')
  const sql = buildCleanupSql(testDataSets[0])

  assert.match(sql, /id IN/i)
  assert.match(sql, /\sAND\s/i)
  assert.doesNotMatch(sql, /\sOR\s/i)
})

test('同标识但未登记的数据不得被接管', async () => {
  const { assertExistingRecordOwned } = await import('./manage-site-test-data.mjs')

  assert.throws(
    () => assertExistingRecordOwned('news', 42, false),
    /标识冲突/,
  )
  assert.doesNotThrow(() => assertExistingRecordOwned('news', 42, true))
})

test('已登记数据的测试标识被修改后不得继续 seed', async () => {
  const { assertTrackedRowsStillMarked } = await import('./manage-site-test-data.mjs')

  assert.throws(
    () => assertTrackedRowsStillMarked('news', [{ id: 42, cleanupValue: '正式新闻标题' }]),
    /测试标识已被修改/,
  )
  assert.throws(
    () => assertTrackedRowsStillMarked('news', [{ id: 43, cleanupValue: '正式新闻[测试数据]' }]),
    /测试标识已被修改/,
  )
  assert.doesNotThrow(() => assertTrackedRowsStillMarked('news', [
    { id: 44, cleanupValue: '[测试数据]新闻标题' },
  ]))
})
