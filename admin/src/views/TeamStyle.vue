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

const dialogVisible = ref(false)
const dialogTitle = ref('新增队伍风采')
const formRef = ref()
const formData = ref<Record<string, any>>({ title: '', type: '', sort: 1, status: '显示', image: '', content: '' })
const titleKeyword = ref('')
const statusFilter = ref('' as '' | '显示' | '隐藏')

const rules = {
  title: [requiredRule('标题')],
  type: [requiredRule('类型')],
  image: [requiredRule('图片')],
}

const { data, total, loading, page, pageSize, fetch, handlePageChange } = usePagination(
  (params) => http.get('/team-showcase', { params })
)

const tableRows = computed(() =>
  data.value.filter((item: any) => {
    if (titleKeyword.value.trim()) {
      const kw = titleKeyword.value.trim()
      if (!item.title?.includes(kw)) return false
    }
    if (statusFilter.value === '显示') return item.status === '显示'
    if (statusFilter.value === '隐藏') return item.status !== '显示'
    return true
  })
)

const handleSearch = () => {
  fetch()
}

const handleReset = () => {
  titleKeyword.value = ''
  statusFilter.value = ''
  fetch()
}

const handleAdd = () => {
  dialogTitle.value = '新增队伍风采'
  formData.value = { title: '', type: '', sort: 1, status: '显示', image: '', content: '' }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleEdit = (row: any) => {
  dialogTitle.value = '编辑队伍风采'
  formData.value = {
    id: row.id,
    title: row.title,
    type: row.type,
    sort: row.sort,
    status: row.status,
    image: row.imageUrl,
    content: row.description || '',
  }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleDialogClosed = () => {
  formRef.value?.resetFields?.()
  formRef.value?.clearValidate?.()
  formData.value = { title: '', type: '', sort: 1, status: '显示', image: '', content: '' }
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确定删除当前图文内容吗？', '提示', { type: 'warning' }).then(async () => {
    await http.delete(`/team-showcase/${row.id}`)
    ElMessage.success('删除成功')
    fetch()
  })
}

const handleSave = async () => {
  await formRef.value.validate()

  const saveData = {
    title: formData.value.title,
    type: formData.value.type,
    imageUrl: formData.value.image,
    description: formData.value.content,
    sort: formData.value.sort,
    status: formData.value.status,
  }

  if (formData.value.id) {
    await http.patch(`/team-showcase/${formData.value.id}`, saveData)
  } else {
    await http.post('/team-showcase', saveData)
  }
  ElMessage.success('保存成功')
  dialogVisible.value = false
  fetch()
}

const formatDate = (row: any, column: any, cellValue: any) => {
  if (!cellValue) return '--'
  return new Date(cellValue).toISOString().split('T')[0]
}

fetch()
</script>

<template>
  <div class="portal-content-page admin-view-stack">
    <div class="page-crumb">系统首页 / 门户内容 / 队伍风采</div>

    <section class="admin-page-list-card">
      <div class="admin-page-list-card__toolbar">
        <section class="portal-toolbar admin-list-query">
          <div class="portal-toolbar__filters">
            <el-input
              v-model="titleKeyword"
              placeholder="请输入标题关键词"
              clearable
              class="portal-toolbar__keyword"
              @keyup.enter="handleSearch"
            >
              <template #prefix><el-icon><Search /></el-icon></template>
            </el-input>
            <el-select v-model="statusFilter" placeholder="展示状态" clearable class="portal-toolbar__filter">
              <el-option label="全部图集" value="" />
              <el-option label="显示中" value="显示" />
              <el-option label="已隐藏" value="隐藏" />
            </el-select>
          </div>
          <div class="portal-toolbar__actions">
            <div class="admin-toolbar-actions__primary">
              <el-button type="primary" @click="handleSearch">查询</el-button>
              <el-button @click="handleReset">重置</el-button>
            </div>
            <div class="admin-toolbar-actions__end">
              <el-button plain @click="fetch()">
                <el-icon><RefreshRight /></el-icon>
                刷新
              </el-button>
              <el-button type="primary" @click="handleAdd">
                <el-icon><Plus /></el-icon>
                新增风采
              </el-button>
            </div>
          </div>
        </section>
      </div>

      <div class="admin-page-list-card__main">
        <div class="panel-title">队伍风采图集</div>
        <el-table :data="tableRows" v-loading="loading" stripe>
        <el-table-column type="selection" width="46" />
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip />
        <el-table-column prop="type" label="类型" width="120" show-overflow-tooltip />
        <el-table-column prop="sort" label="排序" width="80" align="center" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === '显示' ? 'success' : 'info'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="130" :formatter="formatDate" />
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
    </section>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="1040px" @closed="handleDialogClosed">
      <div class="portal-dialog">
        <div class="portal-dialog__main">
          <el-form ref="formRef" :model="formData" :rules="rules" label-width="96px">
            <section class="portal-form-section">
              <div class="portal-form-section__header">
                <strong>视觉素材</strong>
                <span>先上传封面图片并确定风采标题与类型。</span>
              </div>
              <div class="portal-form-section__body">
                <el-form-item label="图片" prop="image">
                  <ImageUpload v-model="formData.image" />
                </el-form-item>
                <el-form-item label="标题" prop="title">
                  <el-input v-model="formData.title" placeholder="请输入风采标题" />
                </el-form-item>
                <el-form-item label="类型" prop="type">
                  <el-select v-model="formData.type" style="width: 100%">
                    <el-option label="训练活动" value="训练活动" />
                    <el-option label="救援行动" value="救援行动" />
                    <el-option label="文化活动" value="文化活动" />
                  </el-select>
                </el-form-item>
              </div>
            </section>

            <section class="portal-form-section">
              <div class="portal-form-section__header">
                <strong>正文内容</strong>
                <span>单独放置富文本，避免和其他字段混在一起显得拥挤。</span>
              </div>
              <div class="portal-form-section__body">
                <el-form-item label="内容">
                  <AsyncRichTextEditor
                    v-if="dialogVisible"
                    v-model="formData.content"
                    placeholder="请输入队伍风采内容"
                    height="320px"
                  />
                </el-form-item>
              </div>
            </section>

            <section class="portal-form-section">
              <div class="portal-form-section__header">
                <strong>发布设置</strong>
                <span>通过排序和状态控制前台展示顺序。</span>
              </div>
              <div class="portal-form-section__body">
                <el-form-item label="排序">
                  <el-input-number v-model="formData.sort" :min="1" style="width: 100%" />
                </el-form-item>
                <el-form-item label="状态">
                  <el-select v-model="formData.status" style="width: 100%">
                    <el-option label="显示" value="显示" />
                    <el-option label="隐藏" value="隐藏" />
                  </el-select>
                </el-form-item>
              </div>
            </section>
          </el-form>
        </div>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.portal-content-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.portal-dialog__main {
  min-width: 0;
}
.portal-form-section {
  border: 1px solid #e6edf8;
  border-radius: 20px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  box-shadow: 0 12px 28px rgba(31, 57, 106, 0.04);
}
.portal-form-section + .portal-form-section {
  margin-top: 16px;
}
.portal-form-section__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px 20px 14px;
  border-bottom: 1px solid #eef3fb;
}
.portal-form-section__header strong {
  color: #1f2f46;
  font-size: 15px;
  font-weight: 700;
}
.portal-form-section__header span {
  color: #7a879d;
  font-size: 12px;
  line-height: 1.6;
}
.portal-form-section__body {
  padding: 18px 20px 4px;
}
.portal-form-section__body :deep(.el-form-item) {
  margin-bottom: 14px;
}

.portal-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 12px 16px;
}

.portal-toolbar__filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.portal-toolbar__filter {
  width: 160px;
}

.portal-toolbar__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

</style>
