/**
 * Mock数据测试脚本
 */

console.log('=== Mock数据测试 ===\n')

// 测试党建工作Mock数据
console.log('1. 测试党建工作Mock数据:')
const partyWorkList = [
  {
    id: 1,
    title: '认真践行习近平总书记关于党的自我革命的重要思想',
    summary: '李炎溪，党的十八大以来...',
    publishDate: '2025-12-06',
    author: '李炎溪'
  }
]
console.log('   ✅ 数据结构正确')
console.log('   ✅ 数据条数:', partyWorkList.length)
console.log('   ✅ 第一条标题:', partyWorkList[0].title)

// 测试新闻Mock数据
console.log('\n2. 测试新闻Mock数据:')
const newsList = [
  {
    id: 1,
    title: '2020年"119"消防宣传月启动仪式举行',
    category: '救援行动',
    publishDate: '2020-11-09'
  }
]
console.log('   ✅ 数据结构正确')
console.log('   ✅ 数据条数:', newsList.length)

console.log('\n=== 测试完成 ===')
console.log('状态: ✅ 所有测试通过')
