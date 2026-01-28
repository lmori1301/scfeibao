/**
 * 格式化工具函数
 */
import dayjs from 'dayjs'
import { DateFormat } from './constants'

/**
 * 格式化日期时间
 */
export function formatDatetime(date: string | Date | number, format: string = DateFormat.DATETIME): string {
  if (!date) return ''
  return dayjs(date).format(format)
}

/**
 * 格式化日期
 */
export function formatDate(date: string | Date | number): string {
  return formatDatetime(date, DateFormat.DATE)
}

/**
 * 格式化时间
 */
export function formatTime(date: string | Date | number): string {
  return formatDatetime(date, DateFormat.TIME)
}

/**
 * 相对时间（多久前）
 */
export function formatRelativeTime(date: string | Date | number): string {
  if (!date) return ''
  const now = dayjs()
  const target = dayjs(date)
  const diff = now.diff(target, 'second')

  if (diff < 60) {
    return '刚刚'
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)}分钟前`
  } else if (diff < 86400) {
    return `${Math.floor(diff / 3600)}小时前`
  } else if (diff < 2592000) {
    return `${Math.floor(diff / 86400)}天前`
  } else if (diff < 31536000) {
    return `${Math.floor(diff / 2592000)}个月前`
  } else {
    return `${Math.floor(diff / 31536000)}年前`
  }
}

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
}

/**
 * 格式化数字（千分位）
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 格式化手机号（隐藏中间4位）
 */
export function formatPhoneNumber(phone: string): string {
  if (!phone || phone.length !== 11) return phone
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 格式化身份证号（隐藏中间部分）
 */
export function formatIdCard(idCard: string): string {
  if (!idCard || idCard.length !== 18) return idCard
  return idCard.replace(/(\d{6})\d{8}(\d{4})/, '$1********$2')
}

/**
 * 截断文本
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}
