<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import http from '@/utils/http'

interface Location {
  id?: number
  name: string
  address: string
  phone: string
  sort?: number
  status?: number
}

const tableData = ref<Location[]>([])
const loading = ref(false)
const dialogVisible = ref(false)
const formData = ref<Location>({ name: '', address: '', phone: '', sort: 0, status: 1 })
const isEdit = ref(false)
const total = ref(0)
const page = ref(1)
const pageSize = ref(10)

// 获取列表
const fetchList = async () => {
  loading.value = true
  try {
    const response = await http.get('/locations', {
      params: { page: page.value, pageSize: pageSize.value }
    })
    tableData.value = response.data.items || []
    total.value = response.data.total || 0
  } catch (error) {
    ElMessage.error('获取数据失败')
    console.error(error)
  } finally {
    loading.value = false
  }
}

// 新增
const handleAdd = () => {
  formData.value = { name: '', address: '', phone: '', sort: 0, status: 1 }
  isEdit.value = false
  dialogVisible.value = true
}

// 编辑
const handleEdit = (row: Location) => {
  formData.value = { ...row }
  isEdit.value = true
  dialogVisible.value = true
}

// 删除
const handleDelete = async (row: Location) => {
  try {
    await ElMessageBox.confirm('确定删除该地理位置吗？', '提示', { type: 'warning' })
    await http.delete(`/locations/${row.id}`)
    ElMessage.success('删除成功')
    fetchList()
  } catch (error: any) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

// 保存
const handleSave = async () => {
  try {
    if (isEdit.value && formData.value.id) {
      await http.patch(`/locations/${formData.value.id}`, formData.value)
      ElMessage.success('更新成功')
    } else {
      await http.post('/locations', formData.value)
      ElMessage.success('创建成功')
    }
    dialogVisible.value = false
    fetchList()
  } catch (error) {
    ElMessage.error('保存失败')
    console.error(error)
  }
}

// 分页变化
const handlePageChange = (newPage: number) => {
  page.value = newPage
  fetchList()
}

const handleSizeChange = (newSize: number) => {
  pageSize.value = newSize
  page.value = 1
  fetchList()
}

onMounted(() => {
  fetchList()
})
</script>

<template>
  <div class="location">
    <el-card shadow="never">
      <div class="table-header">
        <h3>地理位置列表</h3>
        <el-button type="success" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          新增
        </el-button>
      </div>
      <el-table :data="tableData" stripe v-loading="loading">
        <el-table-column prop="name" label="单位名称" min-width="140" />
        <el-table-column prop="address" label="地址" min-width="180" />
        <el-table-column prop="phone" label="联系电话" width="120" />
        <el-table-column prop="sort" label="排序" width="80" />
        <el-table-column label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'info'">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button text type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button text type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          v-model:current-page="page"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑地理位置' : '新增地理位置'" width="700px">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="单位名称">
          <el-input v-model="formData.name" placeholder="请输入单位名称" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="formData.address" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="formData.phone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="formData.sort" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.location {
  :deep(.el-card__body) {
    padding: 0;
  }

  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;

    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .pagination {
    padding: 16px 20px;
    display: flex;
    justify-content: flex-end;
  }

  :deep(.el-table .el-button--text) {
    padding: 0;
    margin-right: 8px;
  }
}
</style>
