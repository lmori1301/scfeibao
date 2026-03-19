<template>
  <div class="friend-links-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>友情链接管理</span>
          <el-button type="primary" @click="handleAdd">新增链接</el-button>
        </div>
      </template>

      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="单位名称" min-width="140" />
        <el-table-column prop="url" label="链接地址" min-width="200" show-overflow-tooltip />
        <el-table-column prop="sort" label="排序" width="80" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.isActive ? 'success' : 'info'">
              {{ row.isActive ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
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

    <el-dialog v-model="dialogVisible" :title="formData.id ? '编辑链接' : '新增链接'" width="700px">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="单位名称">
          <el-input v-model="formData.name" placeholder="请输入单位名称" />
        </el-form-item>
        <el-form-item label="链接地址">
          <el-input v-model="formData.url" placeholder="请输入链接地址" />
        </el-form-item>
        <el-form-item label="单位logo">
          <el-input v-model="formData.logo" placeholder="请输入logo地址（可选）" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="formData.sort" :min="0" />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="formData.isActive" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import Pagination from '@/components/Pagination.vue'
import http from '@/utils/http'

const dialogVisible = ref(false)
const formData = ref({
  id: null,
  name: '',
  url: '',
  logo: '',
  sort: 0,
  isActive: true
})

const { data: tableData, total, loading, page, pageSize, fetch, handlePageChange } = usePagination(
  (params) => http.get('/friend-links', { params })
)

const handleAdd = () => {
  formData.value = { id: null, name: '', url: '', logo: '', sort: 0, isActive: true }
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  formData.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确定删除吗？', '提示', { type: 'warning' }).then(async () => {
    try {
      await http.delete(`/friend-links/${row.id}`)
      ElMessage.success('删除成功')
      fetch()
    } catch (error) {
      ElMessage.error('删除失败')
    }
  })
}

const handleSave = async () => {
  try {
    const data = {
      name: formData.value.name,
      url: formData.value.url,
      logo: formData.value.logo,
      sort: formData.value.sort,
      isActive: formData.value.isActive
    }

    if (formData.value.id) {
      await http.patch(`/friend-links/${formData.value.id}`, data)
    } else {
      await http.post('/friend-links', data)
    }
    ElMessage.success('保存成功')
    dialogVisible.value = false
    fetch()
  } catch (error) {
    ElMessage.error('保存失败')
  }
}

onMounted(() => {
  fetch()
})
</script>

<style scoped lang="scss">
.friend-links-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
