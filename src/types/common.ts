/**
 * 通用类型定义
 */

/**
 * 分页参数
 */
export interface PageParams {
  page: number
  pageSize: number
}

/**
 * 分页响应
 */
export interface PageResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

/**
 * 通用响应
 */
export interface Response<T = any> {
  code: number
  message: string
  data: T
}

/**
 * 文件上传响应
 */
export interface UploadResponse {
  url: string
  filename: string
  size: number
}

/**
 * 选项数据
 */
export interface OptionItem {
  label: string
  value: string | number
  disabled?: boolean
  children?: OptionItem[]
}

/**
 * 菜单项
 */
export interface MenuItem {
  id: number | string
  title: string
  path: string
  icon?: string
  children?: MenuItem[]
}

/**
 * 面包屑项
 */
export interface BreadcrumbItem {
  title: string
  path?: string
}

/**
 * 图片信息
 */
export interface ImageInfo {
  url: string
  alt?: string
  title?: string
}

/**
 * 视频信息
 */
export interface VideoInfo {
  url: string
  cover?: string
  title?: string
  duration?: number
}
