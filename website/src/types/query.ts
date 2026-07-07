/**
 * 查询系统类型定义
 */

/**
 * 证书类型
 */
export enum CertificateType {
  RESCUE = 'rescue', // 救援员证
  DIVER = 'diver', // 潜水员证
  MEDICAL = 'medical', // 急救员证
  COMMAND = 'command', // 指挥员证
  OTHER = 'other' // 其他
}

/**
 * 证书查询参数
 */
export interface CertificateQueryParams {
  certificateNo?: string
  name?: string
  idCard?: string
  page?: number
  pageSize?: number
}

/**
 * 证书信息（列表项）
 */
export interface CertificateListItem {
  id: number
  serialNo: string // 序号
  certificateNo: string // 证书编号
  certificateType: string // 证书类型
  name: string // 姓名
  workUnit: string // 工作单位
  issueDate: string // 发证日期
  expiryDate: string // 有效期至
  status: string // 状态
}

/**
 * 证书详情
 */
export interface CertificateDetail extends CertificateListItem {
  idCard: string // 身份证号
  phone: string // 联系电话
  department: string // 所属部门
  position: string // 职务
  photo: string // 证书照片
}

/**
 * 内部人员查询参数
 */
export interface PersonnelQueryParams {
  name?: string
  idCard?: string
  /** 对应后端 personnelCode（人员业务编号） */
  personnelCode?: string
  page?: number
  pageSize?: number
}

/**
 * 内部人员信息
 */
export interface PersonnelInfo {
  id: number
  serialNo: string // 人员编号
  name: string // 姓名
  idCard: string // 身份证号
  phone: string // 联系电话
  workUnit: string // 工作单位
  department: string // 所属部门
  position: string // 职务
  entryDate: string // 入职日期
  email: string // 电子邮箱
  taskCount: number // 任务次数
  trainingHours: number // 培训时长
  status: string // 当前状态
  photo: string // 人员照片
}

/**
 * 应急车辆查询参数
 */
export interface VehicleQueryParams {
  plateNumber?: string
  vehicleType?: string
  /** 车辆编号，对应后端 vehicles 列表查询参数 vehicleNo */
  vehicleNumber?: string
  page?: number
  pageSize?: number
}

/**
 * 车辆信息
 */
export interface VehicleInfo {
  id: number
  unit: string // 所属单位
  vehicleNo: string // 车辆编号
  vehicleType: string // 车辆类型
  plateNumber: string // 车辆号牌
  manufacturer: string // 厂牌型号
  engineNo: string // 发动机号
  vin: string // 车架号码
  color: string // 车体颜色
  equipDate: string // 装备日期
  issueDate: string // 发证日期
  expiryDate: string // 有效期限
  inspectionDate: string // 检验有效期
  photo: string // 车辆照片
}
