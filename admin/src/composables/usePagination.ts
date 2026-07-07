import { ref } from 'vue'

export function usePagination(fetchFn: Function) {
  const page = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  const loading = ref(false)
  const data = ref<any[]>([])
  const lastParams = ref<Record<string, any>>({})

  const fetch = async (params?: Record<string, any>) => {
    if (params !== undefined) {
      lastParams.value = { ...params }
    }
    loading.value = true
    try {
      const res = await fetchFn({ page: page.value, pageSize: pageSize.value, ...lastParams.value })
      data.value = res.data.items || res.data.list || res.data
      total.value = res.data.total || data.value.length

      const maxPage = Math.max(Math.ceil(total.value / pageSize.value), 1)
      if (page.value > maxPage) {
        page.value = maxPage
        if (maxPage > 0) {
          await fetch(lastParams.value)
        }
      }
    } catch {
      data.value = []
      total.value = 0
    } finally {
      loading.value = false
    }
  }

  const handlePageChange = (newPage: number, newPageSize: number) => {
    page.value = newPage
    pageSize.value = newPageSize
    fetch()
  }

  const resetAndFetch = (params = {}) => {
    page.value = 1
    return fetch(params)
  }

  return { page, pageSize, total, loading, data, fetch, handlePageChange, resetAndFetch }
}
