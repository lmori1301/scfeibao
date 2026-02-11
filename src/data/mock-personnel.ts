/**
 * 人员查询模拟数据
 */
import type { PersonnelInfo } from '@/types/query'

// 模拟人员数据库
const mockPersonnel: PersonnelInfo[] = [
  {
    id: 1,
    serialNo: 'P2023001',
    name: '谢春明',
    idCard: '510104198811201234',
    phone: '13800138000',
    workUnit: '四川飞豹救援',
    department: '指挥中心',
    position: '总队长',
    entryDate: '2019-01-15',
    email: 'xiechunming@feibao.com',
    taskCount: 120,
    trainingHours: 500,
    status: '在职',
    photo: ''
  },
  {
    id: 2,
    serialNo: 'P2023002',
    name: '蒲凯',
    idCard: '510104197508151234',
    phone: '13800138001',
    workUnit: '四川飞豹救援',
    department: '作战训练处',
    position: '副总队长',
    entryDate: '2019-03-20',
    email: 'pukai@feibao.com',
    taskCount: 98,
    trainingHours: 450,
    status: '在职',
    photo: ''
  },
  {
    id: 3,
    serialNo: 'P2023003',
    name: '余芝森',
    idCard: '510104198005101234',
    phone: '13800138002',
    workUnit: '四川飞豹救援',
    department: '作战训练处',
    position: '处长',
    entryDate: '2019-06-10',
    email: 'yuzhisen@feibao.com',
    taskCount: 85,
    trainingHours: 420,
    status: '在职',
    photo: ''
  }
]

export interface QueryResult {
  status: 'success' | 'not_found'
  msg: string
  data?: PersonnelInfo[]
}

/**
 * 模拟人员查询
 */
export function queryPersonnelMock(
  name?: string,
  idCard?: string
): QueryResult {
  let results = mockPersonnel

  // 按姓名查询
  if (name) {
    results = results.filter(person => person.name.includes(name))
  }

  // 按身份证号查询
  if (idCard) {
    results = results.filter(person => person.idCard.includes(idCard))
  }

  if (results.length === 0) {
    return {
      status: 'not_found',
      msg: '未找到匹配的人员信息'
    }
  }

  return {
    status: 'success',
    msg: '查询成功',
    data: results
  }
}
