/**
 * Mock数据 - 党建相关
 */
import type { PartyWorkItem } from '@/types/party'
import type { TeamWorkItem } from '@/types/party'

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

// 团建工作Mock数据
export const mockTeamWorkList: TeamWorkItem[] = [
  {
    id: 1,
    title: '"我是党员，我在岗位" | 李辉："干一行、爱一行、精一行"',
    summary: '李辉，男，汉族，1985年7月出生，2010年7月加入中国共产党，现任救援一队队长...',
    content: '李辉，男，汉族，1985年7月出生，2010年7月加入中国共产党，现任救援一队队长。自入党以来，他始终牢记党员身份，在工作中发挥先锋模范作用，带领队员圆满完成各项救援任务。他的口头禅是："干一行、爱一行、精一行"...',
    publishDate: '2025-12-06',
    author: '党建专栏'
  },
  {
    id: 2,
    title: '"我是党员，我在岗位" | 张建设："村民舒心了，我们就开心"',
    summary: '张建设，男，汉族，1988年3月出生，2012年8月加入中国共产党，现任救援二队指导员...',
    content: '张建设，男，汉族，1988年3月出生，2012年8月加入中国共产党，现任救援二队指导员。他始终把人民群众的利益放在第一位，在多次救援行动中冲锋在前，用实际行动践行党员的初心使命。他说："村民舒心了，我们就开心"...',
    publishDate: '2025-12-06',
    author: '党建专栏'
  },
  {
    id: 3,
    title: '"我是党员，我在岗位" | 黄国东："帮农民端稳"金饭碗"，很有成就感！"',
    summary: '黄国东，男，汉族，1990年11月出生，2015年11月加入中国共产党，现任后勤保障部主任...',
    content: '黄国东，男，汉族，1990年11月出生，2015年11月加入中国共产党，现任后勤保障部主任。他始终牢记党的根本宗旨，全心全意为人民服务，在后勤保障工作中兢兢业业、任劳任怨。他说："帮农民端稳"金饭碗"，很有成就感！"...',
    publishDate: '2025-12-05',
    author: '党建专栏'
  },
  {
    id: 4,
    title: '"我是党员，我在岗位" | 陈蓉："确保各方平安，一切都值得"',
    summary: '陈蓉，女，汉族，1992年5月出生，2016年5月加入中国共产党，现任宣传科科长...',
    content: '陈蓉，女，汉族，1992年5月出生，2016年5月加入中国共产党，现任宣传科科长。她立足岗位实际，积极创新宣传方式，用群众喜闻乐见的形式宣传消防安全知识。她说："确保各方平安，一切都值得"...',
    publishDate: '2025-12-05',
    author: '党建专栏'
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

// 获取Mock团建工作列表
export function getMockTeamWorkList(page: number = 1, pageSize: number = 10) {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const list = mockTeamWorkList.slice(start, end)

  return {
    code: 200,
    message: 'success',
    data: {
      list,
      total: mockTeamWorkList.length,
      page,
      pageSize
    }
  }
}

// 获取Mock团建工作详情
export function getMockTeamWorkDetail(id: string | number) {
  const item = mockTeamWorkList.find(item => item.id === Number(id))

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
