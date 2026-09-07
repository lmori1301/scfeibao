<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Plus, RefreshRight, Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import http from '@/utils/http'
import AsyncRichTextEditor from '@/components/AsyncRichTextEditor.vue'
import Pagination from '@/components/Pagination.vue'

const searchForm = ref({
  title: '',
  type: '',
  publishScope: '' as '' | '已发布' | '草稿',
})
const tableData = ref<any[]>([])
const loading = ref(false)
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const dialogVisible = ref(false)
const createDefaultFormData = (): Record<string, any> => ({
  title: '',
  type: '',
  content: '',
  publishDate: new Date().toISOString().split('T')[0],
  status: '草稿',
})
const formData = ref(createDefaultFormData())
const partyTypes = ['党建工作', '团建工作', '党员先锋', '党员学习']

const tableRows = computed(() =>
  tableData.value.filter((item: any) => {
    if (searchForm.value.publishScope === '已发布') return item.status === '已发布'
    if (searchForm.value.publishScope === '草稿') return item.status !== '已发布'
    return true
  })
)

const fetchParty = async () => {
  loading.value = true
  try {
    const { publishScope: _p, ...rest } = searchForm.value
    const params = { page: page.value, pageSize: pageSize.value, ...rest }
    const res = await http.get('/party/work-list', { params })
    tableData.value = res.data.list || []
    total.value = res.data.total || 0
  } catch {
    ElMessage.error('获取党建列表失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchParty()
})

const handlePageChange = (newPage: number, newPageSize: number) => {
  page.value = newPage
  pageSize.value = newPageSize
  fetchParty()
}

const handleSearch = () => {
  page.value = 1
  fetchParty()
}

const handleReset = () => {
  searchForm.value = { title: '', type: '', publishScope: '' }
  page.value = 1
  fetchParty()
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
  ElMessageBox.confirm(`确定删除栏目“${row.title}”吗？`, '提示', { type: 'warning' }).then(async () => {
    try {
      await http.delete(`/party-building/${row.id}`)
      ElMessage.success('删除成功')
      fetchParty()
    } catch {
      ElMessage.error('删除失败')
    }
  })
}

const handleSave = async () => {
  try {
    if (formData.value.id) {
      await http.patch(`/party-building/${formData.value.id}`, formData.value)
    } else {
      await http.post('/party-building', formData.value)
    }
    ElMessage.success('保存成功')
    dialogVisible.value = false
    fetchParty()
  } catch {
    ElMessage.error('保存失败')
  }
}

const handleDialogClosed = () => {
  formData.value = createDefaultFormData()
}

const formatDate = (_row: any, _column: any, cellValue: any) => {
  if (!cellValue) return '--'
  const date = new Date(cellValue)
  return date.toISOString().split('T')[0]
}
</script>

<template>
  <div class="party-page admin-view-stack">
    <div class="page-crumb">系统首页 / 门户内容 / 党建专栏</div>

    <div class="admin-card admin-card--search">
      <section class="party-panel party-toolbar">
        <div class="party-toolbar__filters">
          <el-input v-model="searchForm.title" placeholder="请输入标签" clearable class="party-toolbar__grow">
            <template #prefix><el-icon><Search /></el-icon></template>
          </el-input>
          <el-select v-model="searchForm.type" placeholder="请选择类型" clearable class="party-toolbar__field">
            <el-option v-for="type in partyTypes" :key="type" :label="type" :value="type" />
          </el-select>
          <el-select v-model="searchForm.publishScope" placeholder="发布状态" clearable class="party-toolbar__field">
            <el-option label="全部栏目" value="" />
            <el-option label="已发布" value="已发布" />
            <el-option label="草稿" value="草稿" />
          </el-select>
        </div>
          <div class="party-toolbar__actions">
            <div class="admin-toolbar-actions__primary">
              <el-button type="primary" @click="handleSearch">查询</el-button>
              <el-button @click="handleReset">重置</el-button>
            </div>
          </div>
      </section>
    </div>

    <section class="admin-card admin-card--table party-panel party-table-panel">
      <div class="admin-table-panel__head">
        <div class="panel-title">党建专栏列表</div>
        <div class="admin-table-panel__head-actions">
          <el-button plain @click="fetchParty">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增栏目
          </el-button>
        </div>
      </div>
      <el-table :data="tableRows" stripe v-loading="loading">
        <el-table-column type="selection" width="46" />
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column prop="title" label="标题" min-width="220" show-overflow-tooltip />
        <el-table-column label="类型" width="120" show-overflow-tooltip>
          <template #default="{ row }">{{ row.type || '—' }}</template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === '已发布' ? 'success' : 'info'" size="small">{{ row.status || '—' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布日期" width="120">
          <template #default="{ row }">{{ formatDate(null, null, row.publishDate) }}</template>
        </el-table-column>
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

    <el-dialog v-model="dialogVisible" title="党建专栏" width="1160px" @closed="handleDialogClosed">
      <div class="party-dialog">
        <div class="party-dialog__main">
          <el-form :model="formData" label-width="96px">
            <section class="party-form-section">
              <div class="party-form-section__header">
                <strong>栏目基础信息</strong>
                <span>先维护标题、类型和状态，确认专栏定位与发布方式。</span>
              </div>
              <div class="party-form-section__body">
                <el-form-item label="栏目标题">
                  <el-input v-model="formData.title" placeholder="请输入栏目标题" />
                </el-form-item>
                <el-form-item label="栏目类型">
                  <el-select v-model="formData.type" style="width: 100%">
                    <el-option v-for="type in partyTypes" :key="type" :label="type" :value="type" />
                  </el-select>
                </el-form-item>
                <el-form-item label="发布状态">
                  <el-select v-model="formData.status" style="width: 100%">
                    <el-option label="草稿" value="草稿" />
                    <el-option label="已发布" value="已发布" />
                  </el-select>
                </el-form-item>
              </div>
            </section>

            <section class="party-form-section">
              <div class="party-form-section__header">
                <strong>正文内容</strong>
                <span>正文独立分组，便于沉浸式编辑。</span>
              </div>
              <div class="party-form-section__body">
                <el-form-item label="正文内容">
                  <AsyncRichTextEditor
                    v-if="dialogVisible"
                    v-model="formData.content"
                    placeholder="请输入党建专栏内容"
                    height="380px"
                  />
                </el-form-item>
              </div>
            </section>
          </el-form>
        </div>
        <aside class="party-dialog__side">
          <div class="preview-card">
            <div class="preview-card__badge">{{ formData.type || '待选类型' }}</div>
            <strong>{{ formData.title || '未填写栏目标题' }}</strong>
            <p>{{ formData.status }} · 该预览用于模拟门户专栏卡片的视觉层级。</p>
          </div>
        </aside>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">

.party-dialog__main {
  min-width: 0;
}

.party-form-section {
  border: 1px solid #e6edf8;
  border-radius: 20px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  box-shadow: 0 12px 28px rgba(31, 57, 106, 0.04);
}

.party-form-section + .party-form-section {
  margin-top: 16px;
}

.party-form-section__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px 20px 14px;
  border-bottom: 1px solid #eef3fb;
}

.party-form-section__header strong {
  color: #1f2f46;
  font-size: 15px;
  font-weight: 700;
}

.party-form-section__header span {
  color: #7a879d;
  font-size: 12px;
  line-height: 1.6;
}

.party-form-section__body {
  padding: 18px 20px 4px;
}

.party-form-section__body :deep(.el-form-item) {
  margin-bottom: 14px;
}

.party-toolbar {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
}

.party-toolbar__filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  flex: 0 1 auto;
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: thin;
}

.admin-card--search .party-toolbar .party-toolbar__grow {
  flex: 0 0 auto;
  width: 220px;
  min-width: 160px;
  max-width: 320px;
}

.party-toolbar__field {
  width: 140px;
}

.party-toolbar__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.party-dialog {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) 320px;
  gap: 24px;
}

.preview-card {
  padding: 18px;
  border-radius: 20px;
  border: 1px solid #d8e4fb;
  background: linear-gradient(180deg, #f7fbff 0%, #edf4ff 100%);
}

.preview-card__badge {
  display: inline-flex;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(47, 103, 255, 0.1);
  color: #2f67ff;
  font-size: 12px;
  font-weight: 700;
}

.preview-card strong {
  display: block;
  margin-top: 14px;
  color: #1f2f46;
  font-size: 18px;
  line-height: 1.5;
}

.preview-card p {
  margin-top: 8px;
  color: #718198;
  font-size: 13px;
  line-height: 1.7;
}

@media (max-width: 1280px) {
  .party-dialog {
    grid-template-columns: 1fr;
  }

  .party-dialog__side {
    order: -1;
  }
}
</style>
