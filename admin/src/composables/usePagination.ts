import { ref } from 'vue'

export function usePagination(fetchFn: Function) {
  const page = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  const loading = ref(false)
  const data = ref<any[]>([])

  const fetch = async (params = {}) => {
    loading.value = true
    try {
      const res = await fetchFn({ page: page.value, pageSize: pageSize.value, ...params })
      data.value = res.data.items || res.data
      total.value = res.data.total || data.value.length
    } finally {
      loading.value = false
    }
  }

  const handlePageChange = (newPage: number, newPageSize: number) => {
    page.value = newPage
    pageSize.value = newPageSize
    fetch()
  }

  return { page, pageSize, total, loading, data, fetch, handlePageChange }
}
