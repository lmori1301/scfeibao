<script setup lang="ts">
import { computed } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const props = defineProps<{
  selectedIds: number[]
  onDelete?: () => void
  onStatusChange?: (status: string) => void
}>()

const emit = defineEmits<{
  delete: []
  statusChange: [status: string]
}>()

const hasSelection = computed(() => props.selectedIds.length > 0)

const handleBatchDelete = () => {
  if (!hasSelection.value) {
    ElMessage.warning('请先选择要删除的数据')
    return
  }

  ElMessageBox.confirm(
    `确定删除选中的 ${props.selectedIds.length} 条数据吗？`,
    '批量删除',
    { type: 'warning' }
  ).then(() => {
    emit('delete')
  })
}

const handleStatusChange = (status: string) => {
  if (!hasSelection.value) {
    ElMessage.warning('请先选择要修改的数据')
    return
  }

  emit('statusChange', status)
}
</script>

<template>
  <div class="batch-actions">
    <el-button
      type="danger"
      plain
      :disabled="!hasSelection"
      @click="handleBatchDelete"
    >
      <el-icon><Delete /></el-icon>
      批量删除
    </el-button>

    <slot name="extra" :has-selection="hasSelection" :count="selectedIds.length" />
  </div>
</template>

<style scoped lang="scss">
.batch-actions {
  display: flex;
  gap: 8px;
}
</style>
