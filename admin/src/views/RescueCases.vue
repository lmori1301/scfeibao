<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { Plus, RefreshRight } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import Pagination from '@/components/Pagination.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import AsyncRichTextEditor from '@/components/AsyncRichTextEditor.vue'
import http from '@/utils/http'
import QueryFilter from '@/components/QueryFilter.vue'

const searchForm = ref({ title: '', listScope: '' as '' | 'recent' })
const dialogVisible = ref(false)
const dialogTitle = ref('新增救援案例')
const formRef = ref()
const formData = ref({ id: null, title: '', location: '', rescueDate: '', coverImage: '', content: '' })

// 表单校验：标题/地点/日期/内容为必填（封面可选），与后端 CreateRescueCaseDto 一致
// content 用富文本编辑器后 blur 事件不触发自动校验，保存时 validate() 仍会全量校验；
// 额外加剥标签校验：wangEditor 空内容会产出 "<p><br></p>"，直接判空字符串会漏放行
const rules = {
  title: [{ required: true, message: '请输入案例标题', trigger: 'blur' }],
  location: [{ required: true, message: '请输入救援地点', trigger: 'blur' }],
  rescueDate: [{ required: true, message: '请选择救援日期', trigger: 'change' }],
  content: [
    { required: true, message: '请输入案例内容', trigger: 'change' },
    {
      validator: (_rule: any, value: string, cb: (e?: Error) => void) => {
        const text = (value || '').replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()
        text ? cb() : cb(new Error('请输入案例内容'))
      },
      trigger: 'change',
    },
  ],
}

// 历史数据是纯文本（\n 分段），富文本编辑器按 HTML 渲染会把换行折叠成空格、
// 整段连排；打开编辑弹窗时把纯文本转成 <p> 段落，已是 HTML 的富文本内容原样透传
const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const plainTextToHtml = (text: string): string => {
  if (!text) return ''
  if (/<[a-z][\s\S]*>/i.test(text)) return text
  return text
    .split(/\r?\n/)
    .map((line) => (line.trim() ? `<p>${escapeHtml(line)}</p>` : '<p><br></p>'))
    .join('')
}
const { data, total, loading, page, pageSize, fetch, handlePageChange } = usePagination(
  (params) => http.get('/rescue-cases', { params })
)

const sortedRows = computed(() =>
  [...data.value].sort((a: any, b: any) => new Date(b.rescueDate).getTime() - new Date(a.rescueDate).getTime())
)

const tableRows = computed(() =>
  searchForm.value.listScope === 'recent' ? sortedRows.value : data.value
)

const getApiParams = () => {
  const { listScope: _l, ...rest } = searchForm.value
  return rest
}

const handleSearch = () => fetch(getApiParams())
const handleReset = () => {
  searchForm.value = { title: '', listScope: '' }
  fetch(getApiParams())
}

const handleRefresh = () => fetch(getApiParams())

const handleAdd = () => {
  dialogTitle.value = '新增救援案例'
  formData.value = { id: null, title: '', location: '', rescueDate: '', coverImage: '', content: '' }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

// 日期统一按本地时区（东八区）取年月日：禁用 toISOString()——UTC 截取会把当天零点变成前一天
const toLocalDateStr = (val: any): string => {
  if (!val) return ''
  const d = val instanceof Date ? val : new Date(val)
  if (Number.isNaN(d.getTime())) return typeof val === 'string' ? val.slice(0, 10) : ''
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const rescueDateForPicker = (row: any) => toLocalDateStr(row?.rescueDate)

const handleEdit = (row: any) => {
  dialogTitle.value = '编辑救援案例'
  formData.value = { ...row, rescueDate: rescueDateForPicker(row), content: plainTextToHtml(row.content || '') }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleDialogClosed = () => {
  formRef.value?.resetFields?.()
  formRef.value?.clearValidate?.()
  formData.value = { id: null, title: '', location: '', rescueDate: '', coverImage: '', content: '' }
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm(`确定删除案例“${row.title}”吗？`, '提示', { type: 'warning' }).then(async () => {
    try {
      await http.delete(`/rescue-cases/${row.id}`)
      ElMessage.success('删除成功')
      fetch(getApiParams())
    } catch {
      ElMessage.error('删除失败')
    }
  })
}

const handleSave = async () => {
  // 先过前端校验，必填项缺失时弹字段级提示，不再发无效请求
  try {
    await formRef.value?.validate()
  } catch {
    return
  }
  try {
    // 只提交业务字段（后端 ValidationPipe 开了 forbidNonWhitelisted，多带 id/createdAt 会被 400 拒掉）
    const payload = {
      title: formData.value.title,
      location: formData.value.location,
      rescueDate: formData.value.rescueDate,
      coverImage: formData.value.coverImage || '',
      content: formData.value.content,
    }
    if (formData.value.id) {
      await http.patch(`/rescue-cases/${formData.value.id}`, payload)
    } else {
      await http.post('/rescue-cases', payload)
    }
    ElMessage.success('保存成功')
    dialogVisible.value = false
    fetch(getApiParams())
  } catch {
    ElMessage.error('保存失败')
  }
}

const formatDate = (row: any, column: any, cellValue: any) => toLocalDateStr(cellValue) || '--'

onMounted(() => {
  fetch(getApiParams())
})
</script>

<template>
  <div class="rescue-case-page admin-view-stack">
    <div class="page-crumb">系统首页 / 门户内容 / 救援案例</div>

    <div class="admin-card admin-card--search">
      <QueryFilter :searching="loading" @search="handleSearch" @reset="handleReset">
        <el-form-item label="案例标题">
          <el-input v-model="searchForm.title" placeholder="输入案例标题关键词" clearable />
        </el-form-item>
        <el-form-item label="列表范围" class="qf-advanced">
          <el-select v-model="searchForm.listScope" placeholder="全部案例" clearable>
            <el-option label="全部案例" value="" />
            <el-option label="最近案例" value="recent" />
          </el-select>
        </el-form-item>
      </QueryFilter>
    </div>

    <section class="admin-card admin-card--table case-table-panel">
      <div class="admin-table-panel__head">
        <div class="panel-title">案例内容列表</div>
        <div class="admin-table-panel__head-actions">
          <el-button plain @click="handleRefresh">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增案例
          </el-button>
        </div>
      </div>
      <el-table max-height="calc(100vh - 320px)" :data="tableRows" stripe v-loading="loading">
        <el-table-column type="selection" width="46" fixed="left" />
        <el-table-column type="index" label="序号" width="70" fixed="left" />
        <el-table-column prop="title" label="案例标题" min-width="220" show-overflow-tooltip />
        <el-table-column label="救援地点" min-width="180" show-overflow-tooltip>
          <template #default="{ row }">{{ row.location || '—' }}</template>
        </el-table-column>
        <el-table-column label="救援日期" width="120">
          <template #default="{ row }">{{ formatDate(null, null, row.rescueDate) }}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
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

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="1120px" @closed="handleDialogClosed">
      <div class="case-dialog-layout">
        <div class="case-dialog-layout__main">
          <el-form ref="formRef" :model="formData" :rules="rules" label-width="96px">
            <el-form-item label="案例标题">
              <el-input v-model="formData.title" placeholder="请输入案例标题" />
            </el-form-item>
            <el-form-item label="救援地点">
              <el-input v-model="formData.location" placeholder="请输入救援地点" />
            </el-form-item>
            <el-form-item label="救援日期">
              <el-date-picker v-model="formData.rescueDate" type="date" value-format="YYYY-MM-DD" style="width: 100%" />
            </el-form-item>
            <el-form-item label="封面图片">
              <ImageUpload v-model="formData.coverImage" />
            </el-form-item>
            <el-form-item label="案例内容" prop="content">
              <AsyncRichTextEditor
                v-if="dialogVisible"
                v-model="formData.content"
                placeholder="请输入救援过程、行动亮点与结果总结"
                height="420px"
              />
            </el-form-item>
          </el-form>
        </div>

        <aside class="case-dialog-layout__side">
          <div class="case-preview-card">
            <div class="case-preview-card__title">内容预览</div>
            <div class="case-preview-card__cover">
              <img v-if="formData.coverImage" :src="formData.coverImage" :alt="formData.title || '案例封面'" />
              <div v-else class="case-preview-card__empty">未设置封面</div>
            </div>
            <strong>{{ formData.title || '案例标题预览' }}</strong>
            <p>{{ formData.location || '救援地点待填写' }}</p>
            <span>{{ formData.rescueDate ? formatDate(null, null, formData.rescueDate) : '救援日期待填写' }}</span>
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
.rescue-case-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.case-toolbar {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
}

.case-toolbar__filters {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;
  flex: 0 1 auto;
  min-width: 0;
}

.case-toolbar__scope {
  width: 140px;
}

.case-toolbar__filters .el-input {
  flex: 1;
  min-width: 200px;
  max-width: 420px;
}

.case-toolbar__actions {
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  flex: 0 0 auto;
}

.case-dialog-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) 300px;
  gap: 24px;
}

.case-preview-card {
  padding: 16px;
  border-radius: 18px;
  background: linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%);
  border: 1px solid #dce7fb;
}

.case-preview-card__title {
  color: #62738d;
  font-size: 13px;
  font-weight: 600;
}

.case-preview-card__cover {
  margin-top: 12px;
  height: 160px;
  border-radius: 0;
  overflow: hidden;
  background: #dfe7f6;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.case-preview-card__empty {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: #8290a5;
  font-size: 13px;
}

.case-preview-card strong {
  display: block;
  margin-top: 14px;
  color: #1f2f46;
  font-size: 16px;
  line-height: 1.5;
}

.case-preview-card p {
  margin-top: 8px;
  color: #5f718a;
  font-size: 14px;
  line-height: 1.7;
}

.case-preview-card span {
  display: block;
  margin-top: 6px;
  color: #8a99ae;
  font-size: 12px;
}

@media (max-width: 1200px) {
  .case-dialog-layout {
    grid-template-columns: 1fr;
  }
}

</style>
