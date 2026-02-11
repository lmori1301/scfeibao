/**
 * 车辆查询模拟数据
 */
import type { VehicleInfo } from '@/types/query'

// 模拟车辆数据库
const mockVehicles: VehicleInfo[] = [
  {
    id: 1,
    unit: '四川飞豹救援',
    vehicleNo: 'V2023001',
    vehicleType: '消防车',
    plateNumber: '川A12345',
    manufacturer: '中国重汽 HOWO',
    engineNo: 'WD615.69',
    vin: 'LZYTBM2W8JA123456',
    color: '红色',
    equipDate: '2023-01-15',
    issueDate: '2023-02-01',
    expiryDate: '2028-01-31',
    inspectionDate: '2025-01-31',
    photo: ''
  },
  {
    id: 2,
    unit: '四川飞豹救援',
    vehicleNo: 'V2023002',
    vehicleType: '救护车',
    plateNumber: '川A67890',
    manufacturer: '福特全顺',
    engineNo: 'DURATORQ',
    vin: 'LVSHFFAB8JE234567',
    color: '白色',
    equipDate: '2023-03-20',
    issueDate: '2023-04-01',
    expiryDate: '2028-03-31',
    inspectionDate: '2025-03-31',
    photo: ''
  },
  {
    id: 3,
    unit: '四川飞豹救援',
    vehicleNo: 'V2023003',
    vehicleType: '指挥车',
    plateNumber: '川A11111',
    manufacturer: '奔驰 Sprinter',
    engineNo: 'OM651',
    vin: 'WDB9066331N345678',
    color: '黑色',
    equipDate: '2023-05-10',
    issueDate: '2023-06-01',
    expiryDate: '2028-05-31',
    inspectionDate: '2025-05-31',
    photo: ''
  }
]

export interface QueryResult {
  status: 'success' | 'not_found'
  msg: string
  data?: VehicleInfo[]
}

/**
 * 模拟车辆查询
 */
export function queryVehicleMock(
  plateNumber?: string,
  vehicleType?: string
): QueryResult {
  let results = mockVehicles

  // 按车牌号查询
  if (plateNumber) {
    results = results.filter(vehicle =>
      vehicle.plateNumber.toLowerCase().includes(plateNumber.toLowerCase())
    )
  }

  // 按车辆类型查询
  if (vehicleType) {
    results = results.filter(vehicle => vehicle.vehicleType.includes(vehicleType))
  }

  if (results.length === 0) {
    return {
      status: 'not_found',
      msg: '未找到匹配的车辆信息'
    }
  }

  return {
    status: 'success',
    msg: '查询成功',
    data: results
  }
}
