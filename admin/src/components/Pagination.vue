<script setup lang="ts">
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

const handleSizeChange = (size: number) => {
  emit('change', 1, size)
}

const handleCurrentChange = (page: number) => {
  emit('change', page, props.pageSize)
}
</script>

<template>
  <div v-if="total > 0" class="admin-pagination">
    <el-pagination
      :current-page="page"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :total="total"
      background
      layout="total, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
