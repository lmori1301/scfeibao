<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, RefreshRight } from '@element-plus/icons-vue'
import Pagination from '@/components/Pagination.vue'
import {
  createTeamUnit,
  deleteTeamUnit,
  getTeamUnitList,
  type TeamUnitItem,
  updateTeamUnit,
} from '@/api/team-unit'

const loading = ref(false)
const saving = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)
const tableData = ref<TeamUnitItem[]>([])
const total = ref(0)
const page = ref(1)
const pageSize = ref(10)
const formData = ref<Partial<TeamUnitItem>>({
  name: '',
  pointName: '',
  sort: 0,
  status: 1,
})

const buildPayload = () => ({
  name: formData.value.name?.trim() || '',
  pointName: formData.value.pointName?.trim() || '',
  sort: Number(formData.value.sort ?? 0),
  status: Number(formData.value.status ?? 1),
})

const fetchList = async () => {
  loading.value = true
  try {
    const response = await getTeamUnitList({ page: page.value, pageSize: pageSize.value })
    tableData.value = response.data.items || []
    total.value = response.data.total || 0
  } catch {
    ElMessage.error('获取队伍字典失败')
  } finally {
    loading.value = false
  }
}

const handleAdd = () => {
  formData.value = { name: '', pointName: '', sort: 0, status: 1 }
  isEdit.value = false
  dialogVisible.value = true
}

const handleEdit = (row: TeamUnitItem) => {
  formData.value = { ...row }
  isEdit.value = true
  dialogVisible.value = true
}

const handleSave = async () => {
  if (saving.value) return
  if (!formData.value.name?.trim()) {
    ElMessage.warning('请填写队伍名称')
    return
  }
  if (!formData.value.pointName?.trim()) {
    ElMessage.warning('请填写默认点位名称')
    return
  }

  saving.value = true
  try {
    const payload = buildPayload()
    if (isEdit.value && formData.value.id) {
      await updateTeamUnit(formData.value.id, payload)
      ElMessage.success('更新成功')
    } else {
      await createTeamUnit(payload)
      ElMessage.success('创建成功')
    }
    dialogVisible.value = false
    fetchList()
  } catch (error: any) {
    ElMessage.error(error?.response?.data?.message || '保存失败')
  } finally {
    saving.value = false
  }
}

const handleDelete = async (row: TeamUnitItem) => {
  try {
    await ElMessageBox.confirm(`确定删除队伍“${row.name}”吗？`, '提示', { type: 'warning' })
    await deleteTeamUnit(row.id)
    ElMessage.success('删除成功')
    fetchList()
  } catch (error: any) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

const handlePageChange = (newPage: number, newPageSize: number) => {
  page.value = newPage
  pageSize.value = newPageSize
  fetchList()
}

onMounted(() => {
  fetchList()
})
</script>

<template>
  <div class="location-page admin-view-stack">
    <div class="page-crumb">系统首页 / 门户内容 / 队伍字典</div>

    <section class="admin-card admin-card--table location-panel location-table-panel">
      <div class="admin-table-panel__head">
        <div class="panel-title">队伍字典列表</div>
        <div class="admin-table-panel__head-actions">
          <el-button plain @click="fetchList">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增队伍
          </el-button>
        </div>
      </div>

      <el-table :data="tableData" stripe v-loading="loading">
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column prop="name" label="队伍名称" min-width="220" />
        <el-table-column prop="pointName" label="默认点位名称" min-width="260" />
        <el-table-column prop="sort" label="默认排序" width="100" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'info'">{{ row.status === 1 ? '启用' : '禁用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="total" :page="page" :page-size="pageSize" @change="handlePageChange" />
    </section>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑队伍字典' : '新增队伍字典'" width="720px">
      <el-form :model="formData" label-width="110px">
        <el-form-item label="队伍名称">
          <el-input v-model="formData.name" placeholder="请输入队伍名称" />
        </el-form-item>
        <el-form-item label="默认点位名称">
          <el-input v-model="formData.pointName" placeholder="请输入默认点位名称" />
        </el-form-item>
        <el-form-item label="默认排序">
          <el-input-number v-model="formData.sort" :min="0" style="width: 100%" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="formData.status">
            <el-radio :value="1">启用</el-radio>
            <el-radio :value="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>
