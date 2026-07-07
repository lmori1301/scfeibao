/**
 * 分页组合式函数
 */
import { ref, computed } from 'vue'
import { PaginationConfig } from '@/utils/constants'

export function usePagination(initialPage = PaginationConfig.DEFAULT_PAGE, initialPageSize = PaginationConfig.DEFAULT_PAGE_SIZE) {
  const page = ref(initialPage)
  const pageSize = ref(initialPageSize)
  const total = ref(0)

  /**
   * 分页参数
   */
  const pageParams = computed(() => ({
    page: page.value,
    pageSize: pageSize.value
  }))

  /**
   * 总页数
   */
  const totalPages = computed(() => {
    return Math.ceil(total.value / pageSize.value)
  })

  /**
   * 设置总数
   */
  const setTotal = (value: number) => {
    total.value = value
  }

  /**
   * 切换页码
   */
  const changePage = (value: number) => {
    page.value = value
  }

  /**
   * 切换每页数量
   */
  const changePageSize = (value: number) => {
    pageSize.value = value
    page.value = 1 // 重置到第一页
  }

  /**
   * 重置分页
   */
  const reset = () => {
    page.value = initialPage
    pageSize.value = initialPageSize
    total.value = 0
  }

  return {
    page,
    pageSize,
    total,
    totalPages,
    pageParams,
    setTotal,
    changePage,
    changePageSize,
    reset
  }
}
