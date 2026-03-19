<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import Pagination from '@/components/Pagination.vue'
import RichTextEditor from '@/components/RichTextEditor.vue'
import http from '@/utils/http'

const dialogVisible = ref(false)
const formRef = ref()
const formData = ref({ id: null, title: '', content: '', sort: 0 })

const { data, total, loading, page, pageSize, fetch, handlePageChange } = usePagination(
  (params) => http.get('/team-intro', { params })
)

const handleAdd = () => {
  formData.value = { id: null, title: '', content: '', sort: 0 }
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  formData.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确定删除吗？', '提示', { type: 'warning' }).then(async () => {
    try {
      await http.delete(`/team-intro/${row.id}`)
      ElMessage.success('删除成功')
      fetch()
    } catch (error) {
      ElMessage.error('删除失败')
    }
  })
}

const handleSave = async () => {
  try {
    if (formData.value.id) {
      await http.patch(`/team-intro/${formData.value.id}`, formData.value)
    } else {
      await http.post('/team-intro', formData.value)
    }
    ElMessage.success('保存成功')
    dialogVisible.value = false
    fetch()
  } catch (error) {
    ElMessage.error('保存失败')
  }
}

// 格式化日期为 YYYY-MM-DD
const formatDate = (row: any, column: any, cellValue: any) => {
  if (!cellValue) return ''
  const date = new Date(cellValue)
  return date.toISOString().split('T')[0]
}

onMounted(() => {
  fetch()
})
</script>

<template>
  <div class="team-intro">
    <el-card shadow="never">
      <div class="table-header">
        <h3>队伍介绍列表</h3>
        <el-button type="success" @click="handleAdd"><el-icon><Plus /></el-icon>新增</el-button>
      </div>
      <el-table :data="data" stripe v-loading="loading">
        <el-table-column prop="title" label="标题" min-width="200" />
        <el-table-column prop="updatedAt" label="更新时间" width="110" :formatter="formatDate" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button text type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button text type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <Pagination
        :total="total"
        :page="page"
        :page-size="pageSize"
        @change="handlePageChange"
      />
    </el-card>

    <el-dialog v-model="dialogVisible" title="队伍介绍" width="1200px">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="标题"><el-input v-model="formData.title" /></el-form-item>
        <el-form-item label="内容"><RichTextEditor v-model="formData.content" placeholder="请输入队伍介绍内容" height="400px" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.team-intro { :deep(.el-card__body) { padding: 0; } .table-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #f0f0f0; h3 { margin: 0; font-size: 16px; font-weight: 500; } } :deep(.el-table .el-button--text) { padding: 0; margin-right: 8px; } }
</style>
