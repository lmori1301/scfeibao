import { MockMethod } from 'vite-plugin-mock'

// 党建工作Mock数据
const mockPartyWorkList = [
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

// 党员先锋Mock数据
const mockPartyMembers = [
  {
    id: 1,
    name: '李辉',
    position: '救援一队队长',
    joinDate: '2010-07',
    photo: '/src/assets/images/member1.jpg',
    achievements: '多次参与重大救援任务，荣获"优秀共产党员"称号',
    motto: '干一行、爱一行、精一行'
  },
  {
    id: 2,
    name: '张建设',
    position: '救援二队指导员',
    joinDate: '2012-08',
    photo: '/src/assets/images/member2.jpg',
    achievements: '在多次救援行动中冲锋在前，用实际行动践行党员的初心使命',
    motto: '村民舒心了，我们就开心'
  }
]

// 学习资料Mock数据
const mockStudyMaterials = [
  {
    id: 1,
    title: '习近平新时代中国特色社会主义思想学习纲要',
    type: '理论学习',
    publishDate: '2025-01-15',
    fileUrl: '/files/study1.pdf'
  },
  {
    id: 2,
    title: '党的二十大报告学习辅导百问',
    type: '政策解读',
    publishDate: '2025-01-10',
    fileUrl: '/files/study2.pdf'
  }
]

export default [
  // 获取党建工作列表
  {
    url: '/api/party/work-list',
    method: 'get',
    response: ({ query }: any) => {
      const page = Number(query.page) || 1
      const pageSize = Number(query.pageSize) || 10
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
  },
  // 获取党建工作详情
  {
    url: '/api/party/work/:id',
    method: 'get',
    response: ({ query }: any) => {
      const id = Number(query.id)
      const item = mockPartyWorkList.find(item => item.id === id)

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
  },
  // 获取党员先锋列表
  {
    url: '/api/party/members',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: mockPartyMembers
      }
    }
  },
  // 获取党员先锋详情
  {
    url: '/api/party/member/:id',
    method: 'get',
    response: ({ query }: any) => {
      const id = Number(query.id)
      const item = mockPartyMembers.find(item => item.id === id)

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
  },
  // 获取学习资料列表
  {
    url: '/api/party/study-materials',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: mockStudyMaterials
      }
    }
  }
] as MockMethod[]
