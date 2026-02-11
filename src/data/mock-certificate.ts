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
    name: '谢春明',
    workUnit: '四川飞豹救援',
    issueDate: '2023-03-15',
    expiryDate: '2028-03-14',
    status: '有效',
    idCard: '510104198811201234',
    phone: '13800138000',
    department: '指挥中心',
    position: '总队长',
    photo: ''
  },
  {
    id: 2,
    serialNo: '002',
    certificateNo: 'SC20251209002',
    certificateType: '高级救援员',
    name: '蒲凯',
    workUnit: '四川飞豹救援',
    issueDate: '2023-05-20',
    expiryDate: '2028-05-19',
    status: '有效',
    idCard: '510104197508151234',
    phone: '13800138001',
    department: '作战训练处',
    position: '副总队长',
    photo: ''
  },
  {
    id: 3,
    serialNo: '003',
    certificateNo: 'SC20251209003',
    certificateType: '救援技术专家',
    name: '余芝森',
    workUnit: '四川飞豹救援',
    issueDate: '2023-06-10',
    expiryDate: '2028-06-09',
    status: '有效',
    idCard: '510104198005101234',
    phone: '13800138002',
    department: '作战训练处',
    position: '处长',
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
