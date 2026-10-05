<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  total: number
  page: number
  pageSize: number
  pageSizes?: number[]
}>(), {
  pageSizes: () => [10]
})

const emit = defineEmits<{
  change: [page: number, pageSize: number]
}>()

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

const handleSizeChange = (size: number) => {
  emit('change', 1, size)
}

const handleCurrentChange = (page: number) => {
  emit('change', page, props.pageSize)
}
</script>

<template>
  <div v-if="total > 0" class="admin-pagination">
    <span class="admin-pagination__total">共 {{ total }} 条 · 第 {{ page }} / {{ totalPages }} 页</span>
    <el-pagination
      :current-page="page"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :total="total"
      background
      layout="sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
