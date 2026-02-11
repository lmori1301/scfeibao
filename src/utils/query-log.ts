/**
 * 查询日志记录工具
 */

export interface QueryLogParams {
  conditions: Record<string, any>
  result: 'success' | 'not_found' | 'error'
  resultCount: number
  errorMsg?: string
}

/**
 * 记录证书查询日志
 */
export function logCertificateQuery(params: QueryLogParams): void {
  const timestamp = new Date().toISOString()
  const logEntry = {
    timestamp,
    type: 'certificate_query',
    ...params
  }

  // 开发环境输出到控制台
  if (import.meta.env.DEV) {
    console.log('[证书查询日志]', logEntry)
  }

  // 生产环境可以发送到服务器
  // TODO: 实现服务器端日志记录
}

/**
 * 记录人员查询日志
 */
export function logPersonnelQuery(params: QueryLogParams): void {
  const timestamp = new Date().toISOString()
  const logEntry = {
    timestamp,
    type: 'personnel_query',
    ...params
  }

  if (import.meta.env.DEV) {
    console.log('[人员查询日志]', logEntry)
  }
}

/**
 * 记录车辆查询日志
 */
export function logVehicleQuery(params: QueryLogParams): void {
  const timestamp = new Date().toISOString()
  const logEntry = {
    timestamp,
    type: 'vehicle_query',
    ...params
  }

  if (import.meta.env.DEV) {
    console.log('[车辆查询日志]', logEntry)
  }
}
