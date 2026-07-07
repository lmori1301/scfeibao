<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { Plus, RefreshRight } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import Pagination from '@/components/Pagination.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import http from '@/utils/http'

const dialogVisible = ref(false)
const formRef = ref()
const formData = ref({ id: null, name: '', url: '', logo: '', sort: 0, isActive: true })
type LinkListFilter = '' | '启用中' | '已禁用'

const linkFilter = ref('' as LinkListFilter)

const { data: tableData, total, loading, page, pageSize, fetch, handlePageChange } = usePagination((params) =>
  http.get('/friend-links', { params })
)

const tableRows = computed(() =>
  tableData.value.filter((item: any) => {
    if (linkFilter.value === '启用中') return item.isActive
    if (linkFilter.value === '已禁用') return !item.isActive
    return true
  })
)

const handleAdd = () => {
  formData.value = { id: null, name: '', url: '', logo: '', sort: 0, isActive: true }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleEdit = (row: any) => {
  formData.value = { ...row }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleDialogClosed = () => {
  formRef.value?.resetFields?.()
  formRef.value?.clearValidate?.()
  formData.value = { id: null, name: '', url: '', logo: '', sort: 0, isActive: true }
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm(`确定删除链接“${row.name}”吗？`, '提示', { type: 'warning' }).then(async () => {
    try {
      await http.delete(`/friend-links/${row.id}`)
      ElMessage.success('删除成功')
      fetch()
    } catch {
      ElMessage.error('删除失败')
    }
  })
}

const handleToggleStatus = async (row: any) => {
  const nextActive = !row.isActive
  const actionText = nextActive ? '启用' : '禁用'
  try {
    await http.patch(`/friend-links/${row.id}`, {
      name: row.name,
      url: row.url,
      logo: row.logo,
      sort: row.sort,
      isActive: nextActive,
    })
    ElMessage.success(`${actionText}成功`)
    fetch()
  } catch {
    ElMessage.error(`${actionText}失败`)
  }
}

const handleSave = async () => {
  try {
    const data = {
      name: formData.value.name,
      url: formData.value.url,
      logo: formData.value.logo,
      sort: formData.value.sort,
      isActive: formData.value.isActive,
    }
    if (formData.value.id) {
      await http.patch(`/friend-links/${formData.value.id}`, data)
    } else {
      await http.post('/friend-links', data)
    }
    ElMessage.success('保存成功')
    dialogVisible.value = false
    fetch()
  } catch {
    ElMessage.error('保存失败')
  }
}

onMounted(() => {
  fetch()
})
</script>

<template>
  <div class="friendly-link-page admin-view-stack">
    <div class="page-crumb">系统首页 / 系统配置 / 友情链接</div>

    <div class="admin-card admin-card--search">
      <div class="admin-list-toolbar">
        <div class="admin-list-toolbar__filters friendly-links-toolbar__filters">
          <el-select v-model="linkFilter" placeholder="链接状态" clearable style="min-width: 120px">
            <el-option label="启用中" value="启用中" />
            <el-option label="已禁用" value="已禁用" />
          </el-select>
        </div>
      </div>
    </div>

    <section class="admin-card admin-card--table link-panel link-table-panel">
      <div class="admin-table-panel__head">
        <div class="panel-title">友情链接列表</div>
        <div class="admin-table-panel__head-actions">
          <el-button plain @click="fetch()">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增链接
          </el-button>
        </div>
      </div>
      <el-table :data="tableRows" v-loading="loading" stripe>
        <el-table-column type="selection" width="46" />
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column label="合作单位" min-width="280">
          <template #default="{ row }">
            <div class="link-cell">
              <div class="link-cell__meta">
                <strong>{{ row.name }}</strong>
                <span>{{ row.url }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="120" />
        <el-table-column label="状态" width="120">
          <template #default="{ row }">
            <el-tag :type="row.isActive ? 'success' : 'info'">{{ row.isActive ? '启用' : '禁用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="220"
          fixed="right"
          class-name="admin-table-ops-col"
          label-class-name="admin-table-ops-col--header"
        >
          <template #default="{ row }">
            <div class="admin-table-ops">
              <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
              <el-button link :type="row.isActive ? 'warning' : 'success'" @click="handleToggleStatus(row)">
                {{ row.isActive ? '禁用' : '启用' }}
              </el-button>
              <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="total" :page="page" :page-size="pageSize" @change="handlePageChange" />
    </section>

    <el-dialog v-model="dialogVisible" :title="formData.id ? '编辑链接' : '新增链接'" width="920px" @closed="handleDialogClosed">
      <div class="link-dialog">
        <div class="link-dialog__main">
          <el-form ref="formRef" :model="formData" label-width="96px">
            <section class="link-form-section">
              <div class="link-form-section__header">
                <strong>链接基础信息</strong>
                <span>先维护名称、链接地址和 Logo，形成友情链接卡片主体。</span>
              </div>
              <div class="link-form-section__body">
                <el-form-item label="单位名称">
                  <el-input v-model="formData.name" placeholder="请输入单位名称" />
                </el-form-item>
                <el-form-item label="链接地址">
                  <el-input v-model="formData.url" placeholder="请输入完整跳转地址" />
                </el-form-item>
                <el-form-item label="单位 Logo">
                  <ImageUpload v-model="formData.logo" />
                </el-form-item>
              </div>
            </section>

            <section class="link-form-section">
              <div class="link-form-section__header">
                <strong>展示设置</strong>
                <span>通过排序与启用状态控制前台露出顺序。</span>
              </div>
              <div class="link-form-section__body">
                <el-form-item label="排序值">
                  <el-input-number v-model="formData.sort" :min="0" style="width: 100%" />
                </el-form-item>
                <el-form-item label="是否启用">
                  <el-switch v-model="formData.isActive" />
                </el-form-item>
              </div>
            </section>
          </el-form>
        </div>
        <aside class="link-dialog__side">
          <div class="preview-card">
            <div class="preview-card__logo">
              <img v-if="formData.logo" :src="formData.logo" :alt="formData.name || 'logo'" />
              <div v-else class="preview-card__empty">Logo 预览</div>
            </div>
            <strong>{{ formData.name || '未填写单位名称' }}</strong>
            <p>{{ formData.url || '链接地址将在这里展示' }}</p>
            <span>{{ formData.isActive ? '当前启用' : '当前禁用' }}</span>
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
.friendly-link-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.link-dialog__main {
  min-width: 0;
}

.link-form-section {
  border: 1px solid #e6edf8;
  border-radius: 20px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  box-shadow: 0 12px 28px rgba(31, 57, 106, 0.04);
}

.link-form-section + .link-form-section {
  margin-top: 16px;
}

.link-form-section__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px 20px 14px;
  border-bottom: 1px solid #eef3fb;
}

.link-form-section__header strong {
  color: #1f2f46;
  font-size: 15px;
  font-weight: 700;
}

.link-form-section__header span {
  color: #7a879d;
  font-size: 12px;
  line-height: 1.6;
}

.link-form-section__body {
  padding: 18px 20px 4px;
}

.link-form-section__body :deep(.el-form-item) {
  margin-bottom: 14px;
}

.friendly-links-toolbar__filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.link-panel {
  padding: 20px;
  border-radius: 22px;
  border: 1px solid #e7edf6;
  background: #fff;
  overflow: hidden;
}

.link-cell {
  display: flex;
  align-items: center;
}

.link-cell__meta {
  min-width: 0;

  strong {
    display: block;
    color: #1f2f46;
    font-size: 15px;
    line-height: 1.5;
  }

  span {
    display: block;
    margin-top: 6px;
    color: #7c889d;
    font-size: 12px;
    line-height: 1.6;
    word-break: break-all;
  }
}

.link-dialog {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) 300px;
  gap: 24px;
}

.preview-card {
  padding: 18px;
  border-radius: 20px;
  border: 1px solid #d8e4fb;
  background: linear-gradient(180deg, #f7fbff 0%, #edf5ff 100%);
}

.preview-card__logo {
  height: 180px;
  border-radius: 0;
  overflow: hidden;
  background: #e0e9f8;

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
}

.preview-card p {
  margin-top: 8px;
  color: #718198;
  font-size: 13px;
  line-height: 1.7;
  word-break: break-all;
}

.preview-card span {
  display: inline-block;
  margin-top: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.1);
  color: #2563eb;
  font-size: 12px;
  font-weight: 600;
}

@media (max-width: 1200px) {
  .link-dialog {
    grid-template-columns: 1fr;
  }

  .link-dialog__side {
    order: -1;
  }
}

@media (max-width: 768px) {
  .link-cell {
    align-items: flex-start;
  }
}
</style>
