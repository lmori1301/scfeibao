const test = require('node:test')
const assert = require('node:assert/strict')

test('smoke cleanup only targets confirmed local smoke titles', async () => {
  const { isSmokeNewsRow, smokeCleanupQuery } = await import('./restore-dynamic-news-data.mjs')

  assert.equal(isSmokeNewsRow({ title: '本地Smoke新闻', summary: '本地Smoke新闻摘要' }), true)
  assert.equal(isSmokeNewsRow({ title: '正式新闻', content: '本地 smoke 测试新闻内容' }), false)
  assert.equal(isSmokeNewsRow({ title: '四川飞豹救援授旗授牌仪式', summary: '授旗授牌仪式顺利举行' }), false)

  assert.deepEqual(smokeCleanupQuery(), {
    sql: 'DELETE FROM `news` WHERE `title` IN (?)',
    params: ['本地Smoke新闻'],
  })
})
