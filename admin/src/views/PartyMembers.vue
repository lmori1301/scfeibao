<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Plus, RefreshRight } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Pagination from '@/components/Pagination.vue'
import http from '@/utils/http'

const loading = ref(false)
const tableData = ref<any[]>([])
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const dialogVisible = ref(false)
const createDefaultFormData = () => ({ id: null, name: '', position: '', avatar: '', description: '', sort: 0 })
const formData = ref(createDefaultFormData())

const fetchData = async () => {
  loading.value = true
  try {
    const res = await http.get('/party-members', { params: { page: page.value, pageSize: pageSize.value } })
    tableData.value = res.data.items || res.data
    total.value = res.data.total || 0
  } catch {
    ElMessage.error('获取数据失败')
  } finally {
    loading.value = false
  }
}

const handlePageChange = (newPage: number, newPageSize: number) => {
  page.value = newPage
  pageSize.value = newPageSize
  fetchData()
}

const handleAdd = () => {
  formData.value = createDefaultFormData()
  dialogVisible.value = true
}
const handleEdit = (row: any) => {
  formData.value = { ...row }
  dialogVisible.value = true
}
const handleDelete = (row: any) => {
  ElMessageBox.confirm(`确定删除党员“${row.name}”吗？`, '提示', { type: 'warning' }).then(async () => {
    try {
      await http.delete(`/party-members/${row.id}`)
      ElMessage.success('删除成功')
      fetchData()
    } catch {
      ElMessage.error('删除失败')
    }
  })
}
const handleSave = async () => {
  try {
    if (formData.value.id) {
      await http.patch(`/party-members/${formData.value.id}`, formData.value)
    } else {
      await http.post('/party-members', formData.value)
    }
    ElMessage.success('保存成功')
    dialogVisible.value = false
    fetchData()
  } catch {
    ElMessage.error('保存失败')
  }
}

const handleDialogClosed = () => {
  formData.value = createDefaultFormData()
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="party-members-page admin-view-stack">
    <div class="page-crumb">系统首页 / 门户内容 / 党员信息</div>

    <section class="admin-card admin-card--table party-members-panel party-members-table-panel">
      <div class="admin-table-panel__head">
        <div class="panel-title">党员信息列表</div>
        <div class="admin-table-panel__head-actions">
          <el-button plain @click="fetchData">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增党员
          </el-button>
        </div>
      </div>
      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column type="selection" width="46" />
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column label="党员信息" min-width="320">
          <template #default="{ row }">
            <div class="member-cell">
              <div class="member-cell__meta">
                <strong>{{ row.name }}</strong>
                <span>{{ row.position || '未填写职位' }}</span>
                <p>{{ row.description || '暂无简介' }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="90" />
        <el-table-column
          label="操作"
          width="160"
          fixed="right"
          class-name="admin-table-ops-col"
          label-class-name="admin-table-ops-col--header"
        >
          <template #default="{ row }">
            <div class="admin-table-ops">
              <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
              <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="total" :page="page" :page-size="pageSize" @change="handlePageChange" />
    </section>

    <el-dialog v-model="dialogVisible" :title="formData.id ? '编辑党员' : '新增党员'" width="980px" @closed="handleDialogClosed">
      <div class="party-members-dialog">
        <div class="party-members-dialog__main">
          <el-form :model="formData" label-width="96px">
            <el-form-item label="姓名"><el-input v-model="formData.name" placeholder="请输入姓名" /></el-form-item>
            <el-form-item label="职位"><el-input v-model="formData.position" placeholder="请输入职位" /></el-form-item>
            <el-form-item label="头像地址"><el-input v-model="formData.avatar" placeholder="请输入头像地址" /></el-form-item>
            <el-form-item label="简介"><el-input v-model="formData.description" type="textarea" :rows="5" placeholder="请输入简介" /></el-form-item>
            <el-form-item label="排序"><el-input-number v-model="formData.sort" :min="0" /></el-form-item>
          </el-form>
        </div>
        <aside class="party-members-dialog__side">
          <div class="preview-card">
            <div class="preview-card__avatar">
              <img v-if="formData.avatar" :src="formData.avatar" :alt="formData.name || '头像'" />
              <div v-else class="preview-card__empty">头像预览</div>
            </div>
            <strong>{{ formData.name || '未填写姓名' }}</strong>
            <p>{{ formData.position || '待填写职位' }}</p>
          </div>
        </aside>
      </div>
      <template #footer><el-button @click="dialogVisible = false">取消</el-button><el-button type="primary" @click="handleSave">保存</el-button></template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.party-members-page { display: flex; flex-direction: column; gap: 18px; }
.party-members-panel, .preview-card { border: 1px solid #e6edf7; background: #fff; }
.party-members-panel { padding: 20px; border-radius: 22px; overflow: hidden; }
.member-cell { display: flex; gap: 14px; align-items: center; }
.member-cell__avatar, .preview-card__avatar {
  width: 68px; height: 68px; border-radius: 0; overflow: hidden; background: #edf3fb; flex: 0 0 auto;
  img { width: 100%; height: 100%; object-fit: contain; }
}
.member-cell__empty, .preview-card__empty { width: 100%; height: 100%; display: grid; place-items: center; color: #8b98ad; }
.member-cell__meta { min-width: 0; }
.member-cell__meta strong { display: block; color: #1f2f46; font-size: 15px; line-height: 1.5; }
.member-cell__meta span { display: block; margin-top: 4px; color: #2f67ff; font-size: 13px; font-weight: 600; }
.member-cell__meta p { margin-top: 6px; color: #7b879b; font-size: 12px; line-height: 1.6; }
.party-members-dialog { display: grid; grid-template-columns: minmax(0, 1.35fr) 300px; gap: 24px; }
.preview-card { padding: 18px; border-radius: 20px; background: linear-gradient(180deg, #f7fbff 0%, #edf4ff 100%); }
.preview-card strong { display: block; margin-top: 14px; font-size: 18px; color: #1f2f46; line-height: 1.5; }
.preview-card p { margin-top: 8px; color: #718198; font-size: 13px; }
@media (max-width: 1200px) {
  .party-members-dialog { grid-template-columns: 1fr; }
}
</style>
