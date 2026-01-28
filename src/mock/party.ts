/**
 * Mock数据 - 党建相关
 * 用于开发和测试
 */
import type { PartyWorkItem } from '@/types/party'

// 党建工作Mock数据
export const mockPartyWorkList: PartyWorkItem[] = [
  {
    id: 1,
    title: '认真践行习近平总书记关于党的自我革命的重要思想',
    summary: '李炎溪，党的十八大以来，习近平总书记站在事关党的长期执政、国家长治久安、人民幸福安康的战略高度...',
    content: '李炎溪，党的十八大以来，习近平总书记站在事关党的长期执政、国家长治久安、人民幸福安康的战略高度，提出一系列具有开创性意义的新理念新思想新战略，形成习近平总书记关于党的自我革命的重要思想。',
    publishDate: '2025-12-06',
    author: '李炎溪',
    category: '党的建设'
  },
  {
    id: 2,
    title: '协同推进科学立法、严格执法、公正司法、全民守法',
    summary: '沈春耀，法治是治国理政的基本方式。党的二十届四中全会提出，全面依法治国是国家治理的一场深刻革命...',
    content: '沈春耀，法治是治国理政的基本方式。党的二十届四中全会提出，全面依法治国是国家治理的一场深刻革命，必须坚持厉行法治，推进科学立法、严格执法、公正司法、全民守法。',
    publishDate: '2025-12-06',
    author: '沈春耀',
    category: '法治建设'
  },
  {
    id: 3,
    title: '习近平总书记深刻阐释新时代新征程就业工作的新定位、新使命',
    summary: '"就业是家事，更是国事。"11月1日出版的第21期《求是》杂志刊发习近平总书记重要文章...',
    content: '"就业是家事，更是国事。"11月1日出版的第21期《求是》杂志刊发习近平总书记重要文章《促进高质量充分就业》，深刻阐释了新时代新征程就业工作的新定位、新使命。',
    publishDate: '2025-12-05',
    author: '编辑部',
    category: '就业工作'
  },
  {
    id: 4,
    title: '以学铸魂，站稳人民立场',
    summary: '"以学铸魂，就是要做好学习贯彻新时代中国特色社会主义思想的深化、内化、转化工作，从思想上正本清源、固本培元...',
    content: '"以学铸魂，就是要做好学习贯彻新时代中国特色社会主义思想的深化、内化、转化工作，从思想上正本清源、固本培元，筑牢信仰之基、补足精神之钙、把稳思想之舵。" ——习近平',
    publishDate: '2025-12-04',
    author: '张三',
    category: '主题教育'
  }
]

// 获取Mock党建工作列表
export function getMockPartyWorkList(page: number = 1, pageSize: number = 10) {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const list = mockPartyWorkList.slice(start, end)

  return {
    code: 200,
    message: 'success',
    data: {
      list,
      total: mockPartyWorkList.length,
      page,
      pageSize
    }
  }
}

// 获取Mock党建工作详情
export function getMockPartyWorkDetail(id: string | number) {
  const item = mockPartyWorkList.find(item => item.id === Number(id))

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
