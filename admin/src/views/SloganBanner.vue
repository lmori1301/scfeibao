<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { Picture, Plus, RefreshRight, Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import { requiredRule } from '@/utils/validate'
import Pagination from '@/components/Pagination.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import http from '@/utils/http'

const formatDate = (row: any) => {
  if (!row.createdAt) return '--'
  return new Date(row.createdAt)
    .toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    .replace(/\//g, '-')
}

const searchForm = ref({ keyword: '', statusFilter: '' as '' | '显示' | '隐藏' })
const dialogVisible = ref(false)
const dialogTitle = ref('新增标语横幅')
const formRef = ref()
const selectionRef = ref()
const formData = ref({
  id: null as number | null,
  slogan: '',
  imageUrl: '',
  link: '',
  linkTarget: '_self',
  sort: 1,
  status: '显示',
})

const rules = {
  imageUrl: [requiredRule('横幅图片')],
}

const { data, total, loading, page, pageSize, fetch, handlePageChange } = usePagination((params) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
  )
  return http.get('/slogan-banners', { params: filteredParams })
})

const tableRows = computed(() => {
  const kw = (searchForm.value.keyword || '').trim()
  return data.value.filter((item: any) => {
    if (searchForm.value.statusFilter === '显示' && item.status !== '显示') return false
    if (searchForm.value.statusFilter === '隐藏' && item.status !== '隐藏') return false
    if (kw && !(String(item.slogan || '').includes(kw))) return false
    return true
  })
})

const handleSearch = () => fetch()
const handleReset = () => {
  searchForm.value = { keyword: '', statusFilter: '' }
  fetch()
}

const refresh = () => fetch()

const handleAdd = () => {
  dialogTitle.value = '新增标语横幅'
  formData.value = { id: null, slogan: '', imageUrl: '', link: '', linkTarget: '_self', sort: 1, status: '显示' }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleEdit = (row: any) => {
  dialogTitle.value = '编辑标语横幅'
  formData.value = {
    id: row.id,
    slogan: row.slogan || '',
    imageUrl: row.imageUrl || '',
    link: row.link || '',
    linkTarget: row.linkTarget || '_self',
    sort: row.sort ?? 1,
    status: row.status || '显示',
  }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleDialogClosed = () => {
  formRef.value?.clearValidate?.()
}

const handleSave = async () => {
  await formRef.value.validate()
  await http.post('/slogan-banners/save', formData.value)
  ElMessage.success('保存成功')
  dialogVisible.value = false
  refresh()
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确定删除该标语横幅吗？', '提示', { type: 'warning' }).then(async () => {
    await http.delete(`/slogan-banners/${row.id}`)
    ElMessage.success('删除成功')
    refresh()
  })
}

// ---- 批量操作 ----
const getSelectedIds = (): number[] => {
  const rows = selectionRef.value?.getSelectionRows?.() || []
  return rows.map((r: any) => r.id).filter(Boolean)
}

const requireSelection = (): number[] | null => {
  const ids = getSelectedIds()
  if (ids.length === 0) {
    ElMessage.warning('请先勾选要操作的记录')
    return null
  }
  return ids
}

const handleBatchStatus = (isActive: boolean) => {
  const ids = requireSelection()
  if (!ids) return
  ElMessageBox.confirm(
    `确定${isActive ? '启用' : '禁用'}选中的 ${ids.length} 条标语横幅吗？`,
    '提示',
    { type: 'warning' }
  ).then(async () => {
    await http.post('/slogan-banners/status', { ids, isActive })
    ElMessage.success(isActive ? '已启用' : '已禁用')
    refresh()
  })
}

const handleBatchDelete = () => {
  const ids = requireSelection()
  if (!ids) return
  ElMessageBox.confirm(`确定删除选中的 ${ids.length} 条标语横幅吗？`, '提示', {
    type: 'warning',
  }).then(async () => {
    await http.post('/slogan-banners/delete-batch', { ids })
    ElMessage.success('删除成功')
    refresh()
  })
}

const handleSelectionChange = (rows: any[]) => {
  // 保留勾选状态由 el-table 自身管理，这里仅用于占位以便后续扩展
}

fetch()
</script>

<template>
  <div class="portal-banner-page admin-view-stack">
    <div class="page-crumb">系统首页 / 门户内容 / 标语横幅</div>

    <div class="admin-card admin-card--search">
      <div class="portal-toolbar">
        <div class="portal-toolbar__filters">
          <el-select
            v-model="searchForm.statusFilter"
            placeholder="展示状态"
            clearable
            class="portal-toolbar__field portal-toolbar__field--status"
          >
            <el-option label="全部横幅" value="" />
            <el-option label="展示中" value="显示" />
            <el-option label="已隐藏" value="隐藏" />
          </el-select>
          <el-input
            v-model="searchForm.keyword"
            placeholder="输入标语关键词"
            clearable
            class="portal-toolbar__field portal-toolbar__field--keyword"
            @keyup.enter="handleSearch"
          >
            <template #prefix><el-icon><Search /></el-icon></template>
          </el-input>
        </div>
        <div class="portal-toolbar__actions">
          <div class="admin-toolbar-actions__primary">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="admin-card admin-card--table">
      <div class="admin-table-panel__head">
        <div class="panel-title">标语横幅列表</div>
        <div class="admin-table-panel__head-actions">
          <el-button plain @click="refresh">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
          <el-button @click="handleBatchStatus(true)">批量启用</el-button>
          <el-button @click="handleBatchStatus(false)">批量禁用</el-button>
          <el-button type="danger" plain @click="handleBatchDelete">批量删除</el-button>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增横幅
          </el-button>
        </div>
      </div>
      <el-table
        ref="selectionRef"
        :data="tableRows"
        v-loading="loading"
        stripe
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="46" />
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column label="横幅图片" width="150">
          <template #default="{ row }">
            <div class="banner-table-thumb banner-table-thumb--wide">
              <img v-if="row.imageUrl" :src="row.imageUrl" :alt="row.slogan || '横幅图'" />
              <div v-else class="banner-table-thumb--empty"><el-icon><Picture /></el-icon></div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="slogan" label="标语文字" min-width="240" show-overflow-tooltip>
          <template #default="{ row }">
            <span>{{ row.slogan || '（图片自带文字）' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="跳转链接" min-width="180" show-overflow-tooltip>
          <template #default="{ row }">
            <span v-if="row.link">{{ row.link }}</span>
            <span v-else style="color: #999">不跳转</span>
          </template>
        </el-table-column>
        <el-table-column label="打开方式" width="110" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.link" size="small" :type="row.linkTarget === '_blank' ? 'warning' : 'info'">
              {{ row.linkTarget === '_blank' ? '新标签页' : '当前窗口' }}
            </el-tag>
            <span v-else style="color: #999">—</span>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序号" width="90" align="center" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === '显示' ? 'success' : 'info'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="190" :formatter="formatDate" />
        <el-table-column
          label="操作"
          width="180"
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

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="960px" @closed="handleDialogClosed">
      <div class="portal-dialog">
        <div class="portal-dialog__main">
          <el-form ref="formRef" :model="formData" :rules="rules" label-width="110px">
            <section class="portal-form-section">
              <div class="portal-form-section__header">
                <strong>内容信息</strong>
                <span>上传通栏横幅图，标语文字可选（图片自带文字时可留空）。</span>
              </div>
              <div class="portal-form-section__body">
                <el-form-item label="横幅图片" prop="imageUrl">
                  <ImageUpload v-model="formData.imageUrl" />
                </el-form-item>
                <el-form-item label="标语文字">
                  <el-input
                    v-model="formData.slogan"
                    type="textarea"
                    :rows="2"
                    maxlength="255"
                    show-word-limit
                    placeholder="如：深入学习贯彻习近平新时代中国特色社会主义思想（可选）"
                  />
                </el-form-item>
              </div>
            </section>

            <section class="portal-form-section">
              <div class="portal-form-section__header">
                <strong>跳转设置</strong>
                <span>留空链接则点击横幅不跳转。</span>
              </div>
              <div class="portal-form-section__body">
                <el-form-item label="跳转链接">
                  <el-input v-model="formData.link" placeholder="如：/dynamic-news 或 https://example.com（选填）" />
                </el-form-item>
                <el-form-item label="打开方式">
                  <el-radio-group v-model="formData.linkTarget" :disabled="!formData.link">
                    <el-radio value="_self">当前窗口</el-radio>
                    <el-radio value="_blank">新标签页</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </section>

            <section class="portal-form-section">
              <div class="portal-form-section__header">
                <strong>展示设置</strong>
                <span>排序号越小越靠前；禁用后前台不展示。</span>
              </div>
              <div class="portal-form-section__body">
                <el-form-item label="排序号">
                  <el-input-number v-model="formData.sort" :min="0" style="width: 100%" />
                </el-form-item>
                <el-form-item label="状态">
                  <el-select v-model="formData.status" style="width: 100%">
                    <el-option label="启用" value="显示" />
                    <el-option label="禁用" value="隐藏" />
                  </el-select>
                </el-form-item>
              </div>
            </section>
          </el-form>
        </div>
        <aside class="portal-dialog__side">
          <div class="preview-card">
            <div class="preview-card__thumb preview-card__thumb--wide">
              <img v-if="formData.imageUrl" :src="formData.imageUrl" :alt="formData.slogan || '横幅预览'" />
              <div v-else class="preview-card__empty">横幅预览</div>
            </div>
            <strong>{{ formData.slogan || '（未填写标语）' }}</strong>
            <span>{{ formData.status }} · 排序 {{ formData.sort }}</span>
            <span v-if="formData.link" class="preview-card__extra">
              {{ formData.linkTarget === '_blank' ? '新标签页打开' : '当前窗口打开' }}
            </span>
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

<style scoped>
.banner-table-thumb--wide {
  width: 132px;
  height: 40px;
}

.banner-table-thumb--wide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 3px;
}

.preview-card__thumb--wide {
  width: 100%;
  height: 82px;
}

.preview-card__thumb--wide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.preview-card__extra {
  color: #909399;
  font-size: 12px;
}
</style>
