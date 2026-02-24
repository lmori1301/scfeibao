<script setup lang="ts">
const props = withDefaults(defineProps<{
  total: number
  page: number
  pageSize: number
  pageSizes?: number[]
}>(), {
  pageSizes: () => [10, 20, 50, 100]
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
  <el-pagination
    :current-page="page"
    :page-size="pageSize"
    :page-sizes="pageSizes"
    :total="total"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>
