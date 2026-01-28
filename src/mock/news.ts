/**
 * Mock数据 - 新闻相关
 */
import type { NewsItem } from '@/types/news'

// 新闻Mock数据
export const mockNewsList: NewsItem[] = [
  {
    id: 1,
    title: '2020年"119"消防宣传月启动仪式举行，"飞系"集结亮相！',
    summary: '11月9日，2020年"119"消防宣传月启动仪式暨成都"飞系"消防救援专业队伍技能汇报演练在成都市成都市消防救援支队培训基地隆重举行，开启了我省消防主题宣传系列活动，掀起全民消防、全民参与的新浪潮…',
    content: '11月9日，2020年"119"消防宣传月启动仪式暨成都"飞系"消防救援专业队伍技能汇报演练在成都市成都市消防救援支队培训基地隆重举行...',
    coverImage: '',
    publishDate: '2020-11-09',
    author: '成都市消防救援支队',
    category: '救援行动',
    tags: ['消防宣传月', '飞系', '技能演练'],
    views: 1256
  },
  {
    id: 2,
    title: '"应急使命·2025"演习总结会在京召开',
    summary: '10月31日，"应急使命·2025"演习总结会召开，此次演习由国家防灾减灾救灾委员会、国务院安全生产委员会主办，应急管理部、工业和信息化部、中央广电总台、黑龙江省人民政府联合承办。',
    content: '10月31日，"应急使命·2025"演习总结会召开，此次演习由国家防灾减灾救灾委员会、国务院安全生产委员会主办...',
    publishDate: '2025-10-31',
    author: '应急管理部',
    category: '救援行动',
    tags: ['应急使命', '演习', '总结会'],
    views: 2341
  },
  {
    id: 3,
    title: '建设高质量综合性消防救援队伍',
    summary: '会议指出，要全面贯彻党的二十大精神，坚持人民至上、生命至上，坚持安全第一、预防为主，坚持问题导向、系统思维，全面提高防灾减灾救灾和处置突发公共事件能力...',
    content: '会议指出，要全面贯彻党的二十大精神，坚持人民至上、生命至上，坚持安全第一、预防为主...',
    publishDate: '2025-10-28',
    author: '应急管理部',
    category: '政策解读',
    tags: ['队伍建设', '综合性', '高质量'],
    views: 1876
  },
  {
    id: 4,
    title: '应急管理部召开"智慧应急"建设现场推进会',
    summary: '会议强调，要加快推进"智慧应急"建设，运用大数据、人工智能、物联网等新技术，提升应急管理现代化水平...',
    content: '会议强调，要加快推进"智慧应急"建设，运用大数据、人工智能、物联网等新技术，提升应急管理现代化水平...',
    publishDate: '2025-10-25',
    author: '应急管理部',
    category: '政策解读',
    tags: ['智慧应急', '信息化', '新技术'],
    views: 1543
  },
  {
    id: 5,
    title: '四川消防面向全省招募消防志愿者',
    summary: '为加强全省消防志愿服务队伍建设，提高全民消防安全素质，四川省消防救援总队决定面向全省公开招募消防志愿者...',
    content: '为加强全省消防志愿服务队伍建设，提高全民消防安全素质，四川省消防救援总队决定面向全省公开招募消防志愿者...',
    publishDate: '2025-10-20',
    author: '四川省消防救援总队',
    category: '各地动态',
    tags: ['志愿者', '招募', '四川'],
    views: 3212
  },
  {
    id: 6,
    title: '消防主题公园开园啦！四川省暨成都市119消防主题公园正式开园',
    summary: '11月9日，四川省暨成都市119消防主题公园正式开园。这是全省首个以消防宣传为主题的城市公园，集知识性、趣味性、互动性于一体...',
    content: '11月9日，四川省暨成都市119消防主题公园正式开园。这是全省首个以消防宣传为主题的城市公园...',
    publishDate: '2020-11-09',
    author: '成都市消防救援支队',
    category: '各地动态',
    tags: ['消防主题公园', '开园', '成都'],
    views: 4532
  }
]

// 获取Mock新闻列表
export function getMockNewsList(page: number = 1, pageSize: number = 10, category?: string) {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  
  let filteredList = mockNewsList
  if (category) {
    filteredList = mockNewsList.filter(item => item.category === category)
  }
  
  const list = filteredList.slice(start, end)

  return {
    code: 200,
    message: 'success',
    data: {
      list,
      total: filteredList.length,
      page,
      pageSize
    }
  }
}

// 获取Mock新闻详情
export function getMockNewsDetail(id: string | number) {
  const item = mockNewsList.find(item => item.id === Number(id))

  if (!item) {
    return {
      code: 404,
      message: '数据不存在',
      data: null
    }
  }

  return {
    code: 200,
    message: 'success',
    data: item
  }
}
