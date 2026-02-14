/**
 * 证书查询模拟数据
 */
import type { CertificateDetail } from '@/types/query'

// 模拟证书数据库
const mockCertificates: CertificateDetail[] = [
  {
    id: 1,
    serialNo: '001',
    certificateNo: 'SC20251209001',
    certificateType: '应急指挥专家',
    name: '张伟',
    workUnit: '四川飞豹救援',
    issueDate: '2023-03-15',
    expiryDate: '2028-03-14',
    status: '有效',
    idCard: '510100198801011234',
    phone: '13800138001',
    department: '指挥中心',
    position: '总队长',
    photo: ''
  },
  {
    id: 2,
    serialNo: '002',
    certificateNo: 'SC20251209002',
    certificateType: '绳索救援技术员',
    name: '李明',
    workUnit: '四川飞豹救援',
    issueDate: '2023-04-20',
    expiryDate: '2026-04-19',
    status: '有效',
    idCard: '510100198802021234',
    phone: '13800138002',
    department: '特勤大队',
    position: '技术员',
    photo: ''
  },
  {
    id: 3,
    serialNo: '003',
    certificateNo: 'SC20251209003',
    certificateType: '潜水救援教练',
    name: '王强',
    workUnit: '四川飞豹救援',
    issueDate: '2022-11-05',
    expiryDate: '2025-11-04',
    status: '有效',
    idCard: '510100198803031234',
    phone: '13800138003',
    department: '水域救援队',
    position: '教练',
    photo: ''
  },
  {
    id: 4,
    serialNo: '004',
    certificateNo: 'SC20251209004',
    certificateType: '城市搜救技术员',
    name: '刘洋',
    workUnit: '四川飞豹救援',
    issueDate: '2023-05-10',
    expiryDate: '2028-05-09',
    status: '有效',
    idCard: '510100198804041234',
    phone: '13800138004',
    department: '搜救大队',
    position: '技术员',
    photo: ''
  },
  {
    id: 5,
    serialNo: '005',
    certificateNo: 'SC20251209005',
    certificateType: '山地救援教练',
    name: '陈杰',
    workUnit: '四川飞豹救援',
    issueDate: '2023-02-15',
    expiryDate: '2026-02-14',
    status: '有效',
    idCard: '510100198805051234',
    phone: '13800138005',
    department: '山地救援队',
    position: '教练',
    photo: ''
  },
  {
    id: 6,
    serialNo: '006',
    certificateNo: 'SC20251209006',
    certificateType: '急救医疗专家',
    name: '赵敏',
    workUnit: '四川飞豹救援',
    issueDate: '2022-12-10',
    expiryDate: '2025-12-09',
    status: '有效',
    idCard: '510100198806061234',
    phone: '13800138006',
    department: '医疗救护队',
    position: '专家',
    photo: ''
  },
  {
    id: 7,
    serialNo: '007',
    certificateNo: 'SC20251209007',
    certificateType: '高级急救师',
    name: '孙丽',
    workUnit: '四川飞豹救援',
    issueDate: '2021-10-20',
    expiryDate: '2024-10-19',
    status: '有效',
    idCard: '510100198807071234',
    phone: '13800138007',
    department: '医疗救护队',
    position: '急救师',
    photo: ''
  },
  {
    id: 8,
    serialNo: '008',
    certificateNo: 'SC20251209008',
    certificateType: '水域救援技术员',
    name: '周涛',
    workUnit: '四川飞豹救援',
    issueDate: '2023-01-15',
    expiryDate: '2026-01-14',
    status: '过期',
    idCard: '510100198808081234',
    phone: '13800138008',
    department: '水域救援队',
    position: '技术员',
    photo: ''
  },
  {
    id: 9,
    serialNo: '009',
    certificateNo: 'SC20251209009',
    certificateType: '无人机操作师',
    name: '吴鹏',
    workUnit: '四川飞豹救援',
    issueDate: '2022-09-20',
    expiryDate: '2025-09-19',
    status: '过期',
    idCard: '510100198809091234',
    phone: '13800138009',
    department: '航空救援队',
    position: '操作师',
    photo: ''
  },
  {
    id: 10,
    serialNo: '010',
    certificateNo: 'SC20251209010',
    certificateType: '装备管理工程师',
    name: '郑浩',
    workUnit: '四川飞豹救援',
    issueDate: '2023-06-05',
    expiryDate: '2028-06-04',
    status: '过期',
    idCard: '510100198810101234',
    phone: '13800138010',
    department: '后勤装备处',
    position: '工程师',
    photo: ''
  }
]

export interface QueryResult {
  status: 'success' | 'not_found'
  msg: string
  data?: CertificateDetail[]
}

/**
 * 模拟证书查询
 */
export function queryCertificateMock(
  certificateNo?: string,
  name?: string,
  idCard?: string
): QueryResult {
  let results = mockCertificates

  // 按证书编号查询
  if (certificateNo) {
    results = results.filter(cert =>
      cert.certificateNo.toLowerCase().includes(certificateNo.toLowerCase())
    )
  }

  // 按姓名查询
  if (name) {
    results = results.filter(cert => cert.name.includes(name))
  }

  // 按身份证号查询
  if (idCard) {
    results = results.filter(cert => cert.idCard.includes(idCard))
  }

  if (results.length === 0) {
    return {
      status: 'not_found',
      msg: '未找到匹配的证书信息'
    }
  }

  return {
    status: 'success',
    msg: '查询成功',
    data: results
  }
}
