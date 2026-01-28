/**
 * Mock数据 - 政策法规相关
 */
import type { LawItem, RegulationItem, StandardItem } from '@/types/policy'

// 法律法规Mock数据
export const mockLawsList: LawItem[] = [
  {
    id: 1,
    title: '中华人民共和国突发事件应对法',
    number: '主席令第六十九号',
    publishDate: '2024-09-01',
    effectiveDate: '2024-12-01',
    issuingBody: '全国人民代表大会常务委员会',
    content: '《中华人民共和国突发事件应对法》已由中华人民共和国第十四届全国人民代表大会常务委员会第十一次会议于2024年6月28日修订通过，现予公布，自2024年12月1日起施行...',
    category: '法律'
  },
  {
    id: 2,
    title: '中华人民共和国消防法',
    number: '主席令第二十九号',
    publishDate: '2021-04-29',
    effectiveDate: '2021-04-29',
    issuingBody: '全国人民代表大会常务委员会',
    content: '《中华人民共和国消防法》已由中华人民共和国第十三届全国人民代表大会常务委员会第二十八次会议于2021年4月29日修订通过，现予公布，自公布之日起施行...',
    category: '法律'
  },
  {
    id: 3,
    title: '中华人民共和国安全生产法',
    number: '主席令第八十八号',
    publishDate: '2020-06-05',
    effectiveDate: '2020-06-05',
    issuingBody: '全国人民代表大会常务委员会',
    content: '《中华人民共和国安全生产法》已由中华人民共和国第十三届全国人民代表大会常务委员会第二十九次会议于2020年6月5日修订通过，现予公布，自公布之日起施行...',
    category: '法律'
  },
  {
    id: 4,
    title: '中华人民共和国防震减灾法',
    number: '主席令第七号',
    publishDate: '2008-12-27',
    effectiveDate: '2009-05-01',
    issuingBody: '全国人民代表大会常务委员会',
    content: '《中华人民共和国防震减灾法》已由中华人民共和国第十一届全国人民代表大会常务委员会第六次会议于2008年12月27日通过，现予公布，自2009年5月1日起施行...',
    category: '法律'
  }
]

// 部门规章Mock数据
export const mockRegulationsList: RegulationItem[] = [
  {
    id: 1,
    title: '消防救援队伍管理规定',
    number: '应急管理部令第5号',
    publishDate: '2024-03-01',
    effectiveDate: '2024-05-01',
    department: '应急管理部',
    content: '《消防救援队伍管理规定》已经2024年2月15日应急管理部第5次部务会议审议通过，现予公布，自2024年5月1日起施行。本规定旨在规范消防救援队伍的建设和管理，提高应急救援能力...',
    category: '队伍建设'
  },
  {
    id: 2,
    title: '应急救援装备配备标准',
    number: '应急管理部令第6号',
    publishDate: '2024-01-15',
    effectiveDate: '2024-03-01',
    department: '应急管理部',
    content: '《应急救援装备配备标准》已经2023年12月20日应急管理部第4次部务会议审议通过，现予公布，自2024年3月1日起施行。本标准明确了各类应急救援队伍的装备配备要求...',
    category: '装备标准'
  },
  {
    id: 3,
    title: '火灾事故调查规定',
    number: '应急管理部令第7号',
    publishDate: '2023-11-01',
    effectiveDate: '2024-01-01',
    department: '应急管理部',
    content: '《火灾事故调查规定》已经2023年10月15日应急管理部第3次部务会议审议通过，现予公布，自2024年1月1日起施行。本规定规范了火灾事故的调查程序和方法...',
    category: '事故调查'
  },
  {
    id: 4,
    title: '应急值班管理规定',
    number: '应急管理部令第8号',
    publishDate: '2023-09-01',
    effectiveDate: '2023-11-01',
    department: '应急管理部',
    content: '《应急值班管理规定》已经2023年8月15日应急管理部第2次部务会议审议通过，现予公布，自2023年11月1日起施行。本规定旨在加强应急值班管理，确保信息畅通...',
    category: '值班制度'
  }
]

// 行业标准Mock数据
export const mockStandardsList: StandardItem[] = [
  {
    id: 1,
    title: '消防救援人员培训标准',
    code: 'GB/T 43200-2024',
    publishDate: '2024-05-01',
    effectiveDate: '2024-08-01',
    status: '现行',
    content: '本标准规定了消防救援人员培训的基本要求、培训内容、培训方法和考核标准。适用于各级消防救援队伍的人员培训工作...',
    category: '人员培训'
  },
  {
    id: 2,
    title: '应急救援装备配备规范',
    code: 'GB/T 43201-2024',
    publishDate: '2024-04-01',
    effectiveDate: '2024-07-01',
    status: '现行',
    content: '本规范规定了应急救援队伍装备配备的种类、数量、技术要求和维护管理。适用于各级应急救援队伍的装备配备工作...',
    category: '装备配备'
  },
  {
    id: 3,
    title: '消防站建设标准',
    code: 'GB/T 43202-2023',
    publishDate: '2023-06-01',
    effectiveDate: '2023-10-01',
    status: '现行',
    content: '本标准规定了消防站的选址、布局、建筑面积、设施配置等建设要求。适用于新建、改建和扩建的消防站建设...',
    category: '站房建设'
  },
  {
    id: 4,
    title: '应急救援预案编制指南',
    code: 'GB/T 43203-2023',
    publishDate: '2023-03-01',
    effectiveDate: '2023-06-01',
    status: '现行',
    content: '本指南提供了应急救援预案编制的基本原则、主要内容、编制程序和格式要求。适用于各级各类应急救援预案的编制工作...',
    category: '预案编制'
  },
  {
    id: 5,
    title: '消防员个人防护装备配备标准',
    code: 'XF/T 43204-2022',
    publishDate: '2022-12-01',
    effectiveDate: '2023-03-01',
    status: '现行',
    content: '本标准规定了消防员个人防护装备的种类、性能要求、配备数量和管理维护。适用于各级消防救援队伍...',
    category: '防护装备'
  },
  {
    id: 6,
    title: '应急救援通信保障规范',
    code: 'YJ/T 43205-2022',
    publishDate: '2022-10-01',
    effectiveDate: '2023-01-01',
    status: '现行',
    content: '本规范规定了应急救援通信保障的组织、设备、技术和人员要求。适用于应急救援行动中的通信保障工作...',
    category: '通信保障'
  }
]

// Mock API函数 - 法律法规
export function getMockLawsList(page: number = 1, pageSize: number = 10) {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const list = mockLawsList.slice(start, end)

  return {
    code: 200,
    message: 'success',
    data: {
      list,
      total: mockLawsList.length,
      page,
      pageSize
    }
  }
}

export function getMockLawDetail(id: string | number) {
  const item = mockLawsList.find(item => item.id === Number(id))
  if (!item) {
    return { code: 404, message: '数据不存在', data: null }
  }
  return { code: 200, message: 'success', data: item }
}

// Mock API函数 - 部门规章
export function getMockRegulationsList(page: number = 1, pageSize: number = 10) {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const list = mockRegulationsList.slice(start, end)

  return {
    code: 200,
    message: 'success',
    data: {
      list,
      total: mockRegulationsList.length,
      page,
      pageSize
    }
  }
}

export function getMockRegulationDetail(id: string | number) {
  const item = mockRegulationsList.find(item => item.id === Number(id))
  if (!item) {
    return { code: 404, message: '数据不存在', data: null }
  }
  return { code: 200, message: 'success', data: item }
}

// Mock API函数 - 行业标准
export function getMockStandardsList(page: number = 1, pageSize: number = 10) {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const list = mockStandardsList.slice(start, end)

  return {
    code: 200,
    message: 'success',
    data: {
      list,
      total: mockStandardsList.length,
      page,
      pageSize
    }
  }
}

export function getMockStandardDetail(id: string | number) {
  const item = mockStandardsList.find(item => item.id === Number(id))
  if (!item) {
    return { code: 404, message: '数据不存在', data: null }
  }
  return { code: 200, message: 'success', data: item }
}
