<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { Plus, RefreshRight, Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import { requiredRule } from '@/utils/validate'
import Pagination from '@/components/Pagination.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import AsyncRichTextEditor from '@/components/AsyncRichTextEditor.vue'
import http from '@/utils/http'

const searchForm = ref({
  title: '',
  category: '',
  status: '',
  listScope: '' as '' | '已发布' | '草稿',
})
const dialogVisible = ref(false)
const dialogTitle = ref('新增新闻')
const formRef = ref()
const formData = ref({
  title: '',
  category: '',
  author: '',
  summary: '',
  content: '',
  coverImage: '',
  publishedAt: '',
  status: '草稿',
  sort: 1,
  isHeadline: 0,
  isNew: 0,
})

const newsCategories = ['动态要闻', '各地动态', '救援行动', '政策解读', '媒体播报', '图文资讯']

const rules = {
  title: [requiredRule('标题')],
  category: [requiredRule('分类')],
}

const { data, total, loading, page, pageSize, fetch, handlePageChange } = usePagination((params) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
  )
  return http.get('/news', { params: filteredParams })
})

const getStatusText = (status: any) => {
  if (status === 1 || status === '已发布') return '已发布'
  return '草稿'
}

const getStatusValue = (status: any) => {
  if (status === '已发布' || status === 1) return 1
  return 0
}

const formatDate = (_row: any, _column: any, cellValue: any) => {
  if (!cellValue) return '--'
  const date = new Date(cellValue)
  return date.toISOString().split('T')[0]
}

const filteredRows = computed(() =>
  data.value.filter((item: any) => {
    if (searchForm.value.listScope === '已发布') return getStatusText(item.status) === '已发布'
    if (searchForm.value.listScope === '草稿') return getStatusText(item.status) === '草稿'
    return true
  })
)

const sortedRows = computed(() =>
  [...filteredRows.value].sort(
    (a: any, b: any) => new Date(b.publishedAt || b.createdAt || 0).getTime() - new Date(a.publishedAt || a.createdAt || 0).getTime()
  )
)

const getApiParams = () => {
  const { listScope: _listScope, ...rest } = searchForm.value
  return rest
}

const handleSearch = () => fetch(getApiParams())

const handleReset = () => {
  searchForm.value = { title: '', category: '', status: '', listScope: '' }
  fetch(getApiParams())
}

const handleAdd = () => {
  dialogTitle.value = '新增新闻'
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const today = new Date().toISOString().split('T')[0]
  formData.value = {
    title: '',
    category: '',
    author: user.realName || user.username || '管理员',
    summary: '',
    content: '',
    coverImage: '',
    publishedAt: today,
    status: '草稿',
    sort: 1,
    isHeadline: 0,
    isNew: 0,
  }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleEdit = (row: any) => {
  dialogTitle.value = '编辑新闻'
  formData.value = {
    ...row,
    status: getStatusText(row.status),
    sort: row.sort || 1,
    isHeadline: row.isHeadline ?? 0,
    isNew: row.isNew ?? 0,
  }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleDialogClosed = () => {
  formRef.value?.resetFields?.()
  formRef.value?.clearValidate?.()
}

const handleDialogCancel = () => {
  dialogVisible.value = false
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm(`确定删除新闻“${row.title}”吗？`, '提示', { type: 'warning' }).then(async () => {
    await http.delete(`/news/${row.id}`)
    ElMessage.success('删除成功')
    fetch(getApiParams())
  })
}

const handleToggleNew = async (row: any) => {
  const newValue = row.isNew === 1 ? 0 : 1
  const action = newValue === 1 ? '设为 NEW' : '取消 NEW'
  try {
    await http.patch(`/news/${row.id}`, { isNew: newValue })
    ElMessage.success(`${action}成功`)
    fetch(getApiParams())
  } catch {
    ElMessage.error(`${action}失败`)
  }
}

const handleSave = async () => {
  await formRef.value.validate()

  let publishedAtValue = undefined
  if (formData.value.publishedAt) {
    const date = new Date(formData.value.publishedAt)
    publishedAtValue = date.toISOString().replace(/\.\d{3}Z$/, 'Z')
  }

  const saveData = {
    title: formData.value.title,
    summary: formData.value.summary,
    content: formData.value.content,
    coverImage: formData.value.coverImage,
    category: formData.value.category,
    author: formData.value.author,
    status: getStatusValue(formData.value.status),
    publishedAt: publishedAtValue,
    sort: formData.value.sort,
    isHeadline: formData.value.isHeadline,
    isNew: formData.value.isNew,
  }

  if (formData.value.id) {
    await http.patch(`/news/${formData.value.id}`, saveData)
  } else {
    await http.post('/news', saveData)
  }

  ElMessage.success('保存成功')
  dialogVisible.value = false
  fetch(getApiParams())
}

fetch(getApiParams())
</script>

<template>
  <div class="news-page admin-view-stack">
    <div class="page-crumb">系统首页 / 门户内容 / 新闻管理</div>

    <div class="admin-card admin-card--search">
      <section class="content-toolbar">
        <div class="content-toolbar__filters">
          <el-input v-model="searchForm.title" placeholder="请输入关键词" clearable class="content-toolbar__field--grow">
            <template #prefix><el-icon><Search /></el-icon></template>
          </el-input>
          <el-select v-model="searchForm.category" placeholder="新闻分类" clearable class="content-toolbar__field">
            <el-option v-for="cat in newsCategories" :key="cat" :label="cat" :value="cat" />
          </el-select>
          <el-select v-model="searchForm.status" placeholder="发布状态" clearable class="content-toolbar__field">
            <el-option label="已发布" value="1" />
            <el-option label="草稿" value="0" />
          </el-select>
          <el-select v-model="searchForm.listScope" placeholder="列表范围" clearable class="content-toolbar__field">
            <el-option label="全部新闻" value="" />
            <el-option label="已发布" value="已发布" />
            <el-option label="草稿箱" value="草稿" />
          </el-select>
        </div>
        <div class="content-toolbar__actions">
          <div class="admin-toolbar-actions__primary">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </div>
        </div>
      </section>
    </div>

    <div class="admin-card admin-card--table">
      <div class="admin-table-panel__head">
        <div class="panel-title">新闻内容列表</div>
        <div class="admin-table-panel__head-actions">
          <el-button plain @click="fetch(getApiParams())">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增新闻
          </el-button>
        </div>
      </div>
      <el-table :data="sortedRows" v-loading="loading" stripe>
        <el-table-column type="selection" width="46" />
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip />
        <el-table-column label="摘要" min-width="200" show-overflow-tooltip>
          <template #default="{ row }">{{ row.summary || '—' }}</template>
        </el-table-column>
        <el-table-column label="分类" width="120" show-overflow-tooltip>
          <template #default="{ row }">{{ row.category || '—' }}</template>
        </el-table-column>
        <el-table-column label="头条" width="72" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.isHeadline === 1" type="danger" size="small">是</el-tag>
            <span v-else>—</span>
          </template>
        </el-table-column>
        <el-table-column label="NEW" width="80" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.isNew === 1" type="warning" size="small">NEW</el-tag>
            <span v-else>—</span>
          </template>
        </el-table-column>
        <el-table-column label="作者" width="100" show-overflow-tooltip>
          <template #default="{ row }">{{ row.author || '—' }}</template>
        </el-table-column>
        <el-table-column label="发布日期" width="120">
          <template #default="{ row }">{{ formatDate(null, null, row.publishedAt || row.createdAt) }}</template>
        </el-table-column>
        <el-table-column label="排序" width="80" align="center">
          <template #default="{ row }">{{ row.sort ?? 1 }}</template>
        </el-table-column>
        <el-table-column label="状态" width="120">
          <template #default="{ row }">
            <el-tag :type="getStatusText(row.status) === '已发布' ? 'success' : 'warning'">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="快捷操作" width="132">
          <template #default="{ row }">
            <el-switch
              :model-value="row.isNew"
              :active-value="1"
              :inactive-value="0"
              inline-prompt
              active-text="NEW"
              inactive-text="普通"
              @change="handleToggleNew(row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="196"
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
    </div>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="1180px" @closed="handleDialogClosed">
      <div class="content-dialog">
        <div class="content-dialog__main">
          <el-form ref="formRef" :model="formData" :rules="rules" label-width="96px">
            <section class="content-form-section">
              <div class="content-form-section__header">
                <strong>基础信息</strong>
                <span>优先填写标题、分类、作者与封面，形成内容卡片基础信息。</span>
              </div>
              <div class="content-form-section__body">
                <el-form-item label="新闻标题" prop="title">
                  <el-input v-model="formData.title" placeholder="请输入新闻标题" />
                </el-form-item>
                <el-form-item label="新闻分类" prop="category">
                  <el-select v-model="formData.category" placeholder="请选择分类" style="width: 100%">
                    <el-option v-for="cat in newsCategories" :key="cat" :label="cat" :value="cat" />
                  </el-select>
                </el-form-item>
                <el-form-item label="作者">
                  <el-input v-model="formData.author" placeholder="请输入作者名称" />
                </el-form-item>
                <el-form-item label="封面图片">
                  <ImageUpload v-model="formData.coverImage" />
                </el-form-item>
                <el-form-item label="摘要">
                  <el-input v-model="formData.summary" type="textarea" :rows="4" placeholder="用于官网列表和详情页导语展示" />
                </el-form-item>
              </div>
            </section>

            <section class="content-form-section">
              <div class="content-form-section__header">
                <strong>发布设置</strong>
                <span>通过发布时间、状态、排序和标签控制前台展示方式。</span>
              </div>
              <div class="content-form-section__body">
                <el-form-item label="发布日期">
                  <el-date-picker v-model="formData.publishedAt" type="date" style="width: 100%" />
                </el-form-item>
                <el-form-item label="发布状态">
                  <el-select v-model="formData.status" style="width: 100%">
                    <el-option label="草稿" value="草稿" />
                    <el-option label="已发布" value="已发布" />
                  </el-select>
                </el-form-item>
                <el-form-item label="排序值">
                  <el-input-number v-model="formData.sort" :min="1" style="width: 100%" />
                </el-form-item>
                <el-form-item label="设为头条">
                  <el-switch v-model="formData.isHeadline" :active-value="1" :inactive-value="0" />
                </el-form-item>
                <el-form-item label="显示 NEW">
                  <el-switch v-model="formData.isNew" :active-value="1" :inactive-value="0" />
                </el-form-item>
              </div>
            </section>

            <section class="content-form-section">
              <div class="content-form-section__header">
                <strong>正文内容</strong>
                <span>正文单独分区，编辑时不会被其他字段打断。</span>
              </div>
              <div class="content-form-section__body">
                <el-form-item label="正文内容">
                  <AsyncRichTextEditor
                    v-if="dialogVisible"
                    v-model="formData.content"
                    placeholder="请输入新闻正文"
                    height="420px"
                  />
                </el-form-item>
              </div>
            </section>
          </el-form>
        </div>

        <aside class="content-dialog__side">
          <div class="preview-card">
            <div class="preview-card__cover">
              <img v-if="formData.coverImage" :src="formData.coverImage" :alt="formData.title || '新闻封面'" />
              <div v-else class="preview-card__empty">新闻封面预览</div>
            </div>
            <strong>{{ formData.title || '未填写标题' }}</strong>
            <p>{{ formData.summary || '摘要将在这里显示，用于模拟官网列表卡片和详情导语。' }}</p>
            <div class="preview-card__meta">
              <span>{{ formData.category || '待选分类' }}</span>
              <span>{{ formData.status }}</span>
            </div>
          </div>
        </aside>
      </div>
      <template #footer>
        <el-button @click="handleDialogCancel">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.content-toolbar {
  padding: 0;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  border: 0;
  background: transparent;
}

.content-toolbar__filters {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;
  flex: 0 1 auto;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: thin;
}

.admin-card--search .content-toolbar .content-toolbar__field--grow {
  flex: 0 0 auto;
  width: 220px;
  min-width: 160px;
  max-width: 280px;
}

.content-toolbar__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.content-toolbar__field {
  width: 140px;
}

.content-toolbar__field--grow {
  flex: 1;
  min-width: 200px;
  max-width: 420px;
}
.content-dialog__main {
  min-width: 0;
}
.content-form-section {
  border: 1px solid #e6edf8;
  border-radius: 20px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  box-shadow: 0 12px 28px rgba(31, 57, 106, 0.04);
}
.content-form-section + .content-form-section {
  margin-top: 16px;
}
.content-form-section__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px 20px 14px;
  border-bottom: 1px solid #eef3fb;
}
.content-form-section__header strong {
  color: #1f2f46;
  font-size: 15px;
  font-weight: 700;
}
.content-form-section__header span {
  color: #7a879d;
  font-size: 12px;
  line-height: 1.6;
}
.content-form-section__body {
  padding: 18px 20px 4px;
}
.content-form-section__body :deep(.el-form-item) {
  margin-bottom: 14px;
}

.content-dialog {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) 320px;
  gap: 24px;
}

.preview-card {
  padding: 18px;
  border-radius: 20px;
  border: 1px solid #d8e4fb;
  background: linear-gradient(180deg, #f7fbff 0%, #edf4ff 100%);
}

.preview-card__cover {
  height: 180px;
  border-radius: 0;
  overflow: hidden;
  background: #dfe8f8;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.preview-card__empty {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: #8390a4;
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

.preview-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;

  span {
    padding: 6px 10px;
    border-radius: 999px;
    background: rgba(47, 103, 255, 0.1);
    color: #2f67ff;
    font-size: 12px;
    font-weight: 600;
  }
}

@media (max-width: 1280px) {
  .content-dialog {
    grid-template-columns: 1fr;
  }

  .content-dialog__side {
    order: -1;
  }
}

@media (max-width: 768px) {
  .news-cell {
    flex-direction: column;
  }

  .news-cell__cover {
    width: 100%;
    height: 160px;
  }
}
</style>
