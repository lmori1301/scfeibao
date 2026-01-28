/**
 * Mock数据 - 队伍建设相关
 */
import type { CaseItem, ShowcaseItem } from '@/types/team'
import type { TeamInfo } from '@/types/team'

// 救援案例Mock数据
export const mockCasesList: CaseItem[] = [
  {
    id: 1,
    title: '四川绵阳"4·20"地震救援行动',
    description: '2025年4月20日，四川绵阳发生4.0级地震，四川飞豹救援队迅速响应，投入救援行动...',
    content: '2025年4月20日，四川绵阳发生4.0级地震，四川飞豹救援队迅速响应，投入救援行动。地震发生后，我队立即启动一级应急响应，调集50名救援人员、10台救援车辆，携带生命探测仪、破拆工具等装备赶赴灾区。经过48小时连续奋战，成功搜救被困群众3人，转移安置群众200余人...',
    rescueDate: '2025-04-20',
    location: '四川省绵阳市',
    images: [],
    participants: 50,
    status: '已完成'
  },
  {
    id: 2,
    title: '成都"7·15"洪涝灾害救援',
    description: '2025年7月15日，成都市遭遇特大暴雨，多个地区发生严重内涝，四川飞豹救援队紧急出动...',
    content: '2025年7月15日，成都市遭遇特大暴雨，多个地区发生严重内涝，四川飞豹救援队紧急出动。我队调集80名救援人员、15艘橡皮艇，分别在成华区、金牛区等内涝严重区域展开救援。共转移受困群众500余人，抢救财产价值约200万元...',
    rescueDate: '2025-07-15',
    location: '四川省成都市',
    images: [],
    participants: 80,
    status: '已完成'
  },
  {
    id: 3,
    title: '凉山州森林火灾扑救行动',
    description: '2025年3月，凉山州发生森林火灾，四川飞豹救援队参与扑救行动...',
    content: '2025年3月，凉山州发生森林火灾，四川飞豹救援队参与扑救行动。火灾发生后，我队立即调集30名森林消防员，携带风力灭火机、水枪等装备赶赴火场。经过5天4夜的连续奋战，成功扑灭森林火灾，保护了人民群众的生命财产安全...',
    rescueDate: '2025-03-10',
    location: '四川省凉山州',
    images: [],
    participants: 30,
    status: '已完成'
  }
]

// 队伍风采Mock数据
export const mockShowcaseList: ShowcaseItem[] = [
  {
    id: 1,
    title: '四川飞豹救援队训练风采展示',
    description: '展现救援队员日常训练的精彩瞬间，体现专业素养和过硬本领...',
    content: '展现救援队员日常训练的精彩瞬间，体现专业素养和过硬本领。四川飞豹救援队始终坚持以练为战，常态化开展体能训练、技能培训和实战演练，不断提升应急救援能力。队员们不畏艰险、刻苦训练的精神风貌，充分展示了新时代应急救援队伍的风采...',
    images: [],
    publishDate: '2025-10-15',
    category: '训练风采'
  },
  {
    id: 2,
    title: '先进事迹报告会风采展示',
    description: '记录救援队伍先进事迹报告会的精彩时刻，传承榜样力量...',
    content: '记录救援队伍先进事迹报告会的精彩时刻，传承榜样力量。为表彰先进、树立典型，四川飞豹救援队举办先进事迹报告会，邀请在救援行动中表现突出的队员分享他们的感人事迹。通过学习榜样，激励全体队员不忘初心、牢记使命，在应急救援工作中再立新功...',
    images: [],
    publishDate: '2025-09-20',
    category: '表彰奖励'
  },
  {
    id: 3,
    title: '社区消防安全宣传风采',
    description: '救援队员深入社区开展消防安全宣传活动，提升全民安全意识...',
    content: '救援队员深入社区开展消防安全宣传活动，提升全民安全意识。为进一步提高社区居民的消防安全意识和自防自救能力，四川飞豹救援队组织队员深入社区、学校、企业开展消防安全宣传活动。通过现场演示、发放宣传资料、互动问答等形式，向群众普及消防安全知识和逃生自救技能...',
    images: [],
    publishDate: '2025-08-05',
    category: '宣传活动'
  }
]

// 队伍信息Mock数据
export const mockTeamInfo: TeamInfo = {
  name: '四川飞豹救援队',
  establishedDate: '2015-06-01',
  description: '四川飞豹救援队成立于2015年6月，是一支专业化、规范化的应急救援队伍。现有队员200余人，各类救援车辆30余台，装备齐全、技术先进，具备应对各类灾害事故的救援能力。',
  mission: '保护人民生命财产安全，服务经济社会发展',
  vision: '打造国内一流的综合性应急救援队伍',
  values: ['生命至上', '科学救援', '团结协作', '精益求精', '无私奉献'],
  achievements: [
    '累计参与救援行动1000余次',
    '营救被困群众500余人',
    '转移安置群众10000余人',
    '挽回经济损失约5000万元',
    '获得省级以上表彰20余次'
  ]
}

// Mock API函数
export function getMockCasesList(page: number = 1, pageSize: number = 10) {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const list = mockCasesList.slice(start, end)

  return {
    code: 200,
    message: 'success',
    data: {
      list,
      total: mockCasesList.length,
      page,
      pageSize
    }
  }
}

export function getMockCaseDetail(id: string | number) {
  const item = mockCasesList.find(item => item.id === Number(id))
  if (!item) {
    return { code: 404, message: '数据不存在', data: null }
  }
  return { code: 200, message: 'success', data: item }
}

export function getMockShowcaseList(page: number = 1, pageSize: number = 10, category?: string) {
  let list = mockShowcaseList
  if (category) {
    list = mockShowcaseList.filter(item => item.category === category)
  }

  const start = (page - 1) * pageSize
  const end = start + pageSize
  const paginatedList = list.slice(start, end)

  return {
    code: 200,
    message: 'success',
    data: {
      list: paginatedList,
      total: list.length,
      page,
      pageSize
    }
  }
}

export function getMockShowcaseDetail(id: string | number) {
  const item = mockShowcaseList.find(item => item.id === Number(id))
  if (!item) {
    return { code: 404, message: '数据不存在', data: null }
  }
  return { code: 200, message: 'success', data: item }
}

export function getMockTeamInfo() {
  return {
    code: 200,
    message: 'success',
    data: mockTeamInfo
  }
}
