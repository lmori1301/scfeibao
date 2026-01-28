/**
 * Mock数据 - 信息公开相关
 */
import type { PersonnelItem } from '@/types/info'

// 人事任免Mock数据
export const mockPersonnelList: PersonnelItem[] = [
  {
    id: 1,
    title: '关于张三同志任救援一队副队长的通知',
    type: '任命',
    name: '张三',
    position: '副队长',
    department: '救援一队',
    effectiveDate: '2025-01-15',
    content: '经队党委研究决定，任命张三同志为救援一队副队长，主持日常工作。该同志自2020年加入救援队以来，工作表现突出，多次参与重大救援行动，具有较强的组织协调能力和丰富的救援经验...'
  },
  {
    id: 2,
    title: '关于李四同志任训练科科长的通知',
    type: '任命',
    name: '李四',
    position: '科长',
    department: '训练科',
    effectiveDate: '2025-01-10',
    content: '经队党委研究决定，任命李四同志为训练科科长，负责全队日常训练工作。该同志具有丰富的训练管理经验，曾参与制定多项训练标准和规范，在技能培训方面有专长...'
  },
  {
    id: 3,
    title: '关于王五同志调任宣传科的通知',
    type: '调动',
    name: '王五',
    position: '副科长',
    department: '宣传科',
    effectiveDate: '2025-01-05',
    content: '经队党委研究决定，王五同志调任宣传科副科长。该同志在原岗位工作出色，具有较强的文字功底和宣传策划能力，适合从事宣传工作...'
  },
  {
    id: 4,
    title: '关于赵六同志免职的通知',
    type: '免职',
    name: '赵六',
    position: '后勤保障部主任',
    department: '后勤保障部',
    effectiveDate: '2024-12-20',
    content: '根据工作需要，经队党委研究决定，免去赵六同志后勤保障部主任职务。该同志另有任用...'
  },
  {
    id: 5,
    title: '关于孙七同志任团委书记的通知',
    type: '任命',
    name: '孙七',
    position: '团委书记',
    department: '团委',
    effectiveDate: '2024-12-15',
    content: '经队党委研究决定，并报上级团委批准，任命孙七同志为团委书记。该同志年轻有为，具有较强的工作热情和组织能力，适合从事青年工作...'
  },
  {
    id: 6,
    title: '关于周八同志任技术部副部长的通知',
    type: '任命',
    name: '周八',
    position: '副部长',
    department: '技术部',
    effectiveDate: '2024-12-10',
    content: '经队党委研究决定，任命周八同志为技术部副部长，负责技术研发和装备维护工作。该同志具有扎实的专业技术功底和丰富的实践经验...'
  }
]

// Mock API函数
export function getMockPersonnelList(page: number = 1, pageSize: number = 10, type?: string) {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  
  let list = mockPersonnelList
  if (type) {
    list = mockPersonnelList.filter(item => item.type === type)
  }
  
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

export function getMockPersonnelDetail(id: string | number) {
  const item = mockPersonnelList.find(item => item.id === Number(id))
  if (!item) {
    return { code: 404, message: '数据不存在', data: null }
  }
  return { code: 200, message: 'success', data: item }
}
