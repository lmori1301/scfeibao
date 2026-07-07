<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { Plus, RefreshRight, Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import { requiredRule } from '@/utils/validate'
import Pagination from '@/components/Pagination.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import http from '@/utils/http'

const searchForm = ref({ name: '', position: '' })
const dialogVisible = ref(false)
const dialogTitle = ref('新增领导信息')
const formRef = ref()
const formData = ref({
  name: '',
  position: '',
  gender: '',
  nation: '',
  birth: '',
  education: '',
  political: '',
  duty: '',
  experience: 0,
  actions: 0,
  photo: '',
})

const rules = {
  name: [requiredRule('姓名')],
  position: [requiredRule('职位')],
  photo: [requiredRule('照片')],
}

const { data, total, loading, page, pageSize, fetch, handlePageChange } = usePagination((params) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
  )
  return http.get('/leadership', { params: filteredParams })
})

const tableRows = computed(() => data.value)

const handleSearch = () => fetch(searchForm.value)

const handleReset = () => {
  searchForm.value = { name: '', position: '' }
  fetch()
}

const handleAdd = () => {
  dialogTitle.value = '新增领导信息'
  formData.value = {
    name: '',
    position: '',
    gender: '',
    nation: '',
    birth: '',
    education: '',
    political: '',
    duty: '',
    experience: 0,
    actions: 0,
    photo: '',
  }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleEdit = (row: any) => {
  dialogTitle.value = '编辑领导信息'
  formData.value = { ...row }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleDialogClosed = () => {
  formRef.value?.resetFields?.()
  formRef.value?.clearValidate?.()
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm(`确定删除成员“${row.name}”吗？`, '提示', { type: 'warning' }).then(async () => {
    await http.delete(`/leadership/${row.id}`)
    ElMessage.success('删除成功')
    fetch()
  })
}

const handleSave = async () => {
  await formRef.value.validate()
  if (formData.value.id) {
    await http.patch(`/leadership/${formData.value.id}`, formData.value)
  } else {
    await http.post('/leadership', formData.value)
  }
  ElMessage.success('保存成功')
  dialogVisible.value = false
  fetch()
}

fetch()
</script>

<template>
  <div class="leadership-page admin-view-stack">
    <div class="page-crumb">系统首页 / 门户内容 / 领导信息</div>

    <div class="admin-card admin-card--search">
      <section class="leadership-panel leadership-toolbar">
        <div class="leadership-toolbar__filters">
          <el-input v-model="searchForm.name" placeholder="请输入姓名" clearable class="leadership-toolbar__grow">
            <template #prefix><el-icon><Search /></el-icon></template>
          </el-input>
          <el-input v-model="searchForm.position" placeholder="请输入职位" clearable class="leadership-toolbar__grow" />
        </div>
          <div class="leadership-toolbar__actions">
            <div class="admin-toolbar-actions__primary">
              <el-button type="primary" @click="handleSearch">查询</el-button>
              <el-button @click="handleReset">重置</el-button>
            </div>
          </div>
      </section>
    </div>

    <section class="admin-card admin-card--table leadership-panel leadership-table-panel">
      <div class="admin-table-panel__head">
        <div class="panel-title">领导信息列表</div>
        <div class="admin-table-panel__head-actions">
          <el-button plain @click="fetch()">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增成员
          </el-button>
        </div>
      </div>
        <div class="leadership-table-x">
          <el-table class="leadership-table" :data="tableRows" v-loading="loading" stripe>
        <el-table-column type="selection" width="46" />
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column prop="name" label="姓名" width="100" show-overflow-tooltip />
        <el-table-column prop="position" label="职位" min-width="168" show-overflow-tooltip />
        <el-table-column label="性别" width="72" show-overflow-tooltip>
          <template #default="{ row }">{{ row.gender || '—' }}</template>
        </el-table-column>
        <el-table-column label="民族" width="88" show-overflow-tooltip>
          <template #default="{ row }">{{ row.nation || '—' }}</template>
        </el-table-column>
        <el-table-column label="出生年月" width="120" show-overflow-tooltip>
          <template #default="{ row }">{{ row.birth || '—' }}</template>
        </el-table-column>
        <el-table-column label="学历" min-width="168" show-overflow-tooltip>
          <template #default="{ row }">{{ row.education || '—' }}</template>
        </el-table-column>
        <el-table-column label="政治面貌" min-width="128" show-overflow-tooltip>
          <template #default="{ row }">{{ row.political || '—' }}</template>
        </el-table-column>
        <el-table-column label="工作职责" min-width="240" show-overflow-tooltip>
          <template #default="{ row }">{{ row.duty || '—' }}</template>
        </el-table-column>
        <el-table-column label="救援经验" width="108" align="right">
          <template #default="{ row }">{{ row.experience ?? 0 }} 年</template>
        </el-table-column>
        <el-table-column label="参与行动" width="108" align="right">
          <template #default="{ row }">{{ row.actions ?? 0 }} 次</template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="176"
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
        </div>
      <Pagination :total="total" :page="page" :page-size="pageSize" @change="handlePageChange" />
    </section>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="1080px" @closed="handleDialogClosed">
      <div class="leadership-dialog">
        <div class="leadership-dialog__main">
          <el-form ref="formRef" :model="formData" :rules="rules" label-width="96px">
            <section class="leadership-form-section">
              <div class="leadership-form-section__header">
                <strong>成员形象</strong>
                <span>上传头像后，右侧预览会同步展示当前成片效果。</span>
              </div>
              <div class="leadership-form-section__body">
                <el-form-item label="成员照片" prop="photo">
                  <ImageUpload v-model="formData.photo" />
                </el-form-item>
              </div>
            </section>

            <section class="leadership-form-section">
              <div class="leadership-form-section__header">
                <strong>基础资料</strong>
                <span>按姓名、职位、身份信息依次填写，避免字段并排过密。</span>
              </div>
              <div class="leadership-form-section__body">
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="formData.name" />
                </el-form-item>
                <el-form-item label="职位" prop="position">
                  <el-input v-model="formData.position" />
                </el-form-item>
                <el-form-item label="性别">
                  <el-select v-model="formData.gender" style="width: 100%">
                    <el-option label="男" value="男" />
                    <el-option label="女" value="女" />
                  </el-select>
                </el-form-item>
                <el-form-item label="民族">
                  <el-input v-model="formData.nation" />
                </el-form-item>
                <el-form-item label="出生年月">
                  <el-date-picker
                    v-model="formData.birth"
                    type="month"
                    placeholder="选择年月"
                    format="YYYY年MM月"
                    value-format="YYYY年MM月"
                    style="width: 100%"
                  />
                </el-form-item>
                <el-form-item label="学历">
                  <el-input v-model="formData.education" />
                </el-form-item>
                <el-form-item label="政治面貌">
                  <el-input v-model="formData.political" />
                </el-form-item>
              </div>
            </section>

            <section class="leadership-form-section">
              <div class="leadership-form-section__header">
                <strong>履历与职责</strong>
                <span>单列填写经验数据和工作职责，阅读顺序更清晰。</span>
              </div>
              <div class="leadership-form-section__body">
                <el-form-item label="救援经验">
                  <el-input-number v-model="formData.experience" :min="0" style="width: 100%" />
                </el-form-item>
                <el-form-item label="参与行动">
                  <el-input-number v-model="formData.actions" :min="0" style="width: 100%" />
                </el-form-item>
                <el-form-item label="工作职责">
                  <el-input v-model="formData.duty" type="textarea" :rows="4" />
                </el-form-item>
              </div>
            </section>
          </el-form>
        </div>
        <aside class="leadership-dialog__side">
          <div class="preview-card">
            <div class="preview-card__photo">
              <img v-if="formData.photo" :src="formData.photo" :alt="formData.name || '成员照片'" />
              <div v-else class="preview-card__empty">成员照片预览</div>
            </div>
            <strong>{{ formData.name || '未填写姓名' }}</strong>
            <p>{{ formData.position || '待填写职位' }}</p>
            <div class="preview-card__meta">
              <span>{{ formData.experience || 0 }} 年经验</span>
              <span>{{ formData.actions || 0 }} 次行动</span>
            </div>
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
.preview-card {
  border: 1px solid #e6edf7;
  background: #fff;
}

.leadership-toolbar {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
}

.leadership-toolbar__filters {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;
  flex: 0 1 auto;
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: thin;
}

.admin-card--search .leadership-toolbar .leadership-toolbar__grow {
  flex: 0 0 auto;
  width: 200px;
  min-width: 140px;
  max-width: 280px;
}

.leadership-toolbar__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.leadership-dialog {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) 320px;
  gap: 24px;
}

.leadership-dialog__main {
  min-width: 0;
}

.leadership-form-section {
  border: 1px solid #e6edf8;
  border-radius: 20px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  box-shadow: 0 12px 28px rgba(31, 57, 106, 0.04);
}

.leadership-form-section + .leadership-form-section {
  margin-top: 16px;
}

.leadership-form-section__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px 20px 14px;
  border-bottom: 1px solid #eef3fb;

  strong {
    color: #1f2f46;
    font-size: 15px;
    font-weight: 700;
  }

  span {
    color: #7a879d;
    font-size: 12px;
    line-height: 1.6;
  }
}

.leadership-form-section__body {
  padding: 18px 20px 4px;
}

.leadership-form-section__body :deep(.el-form-item) {
  margin-bottom: 14px;
}

.preview-card {
  padding: 18px;
  border-radius: 20px;
  background: linear-gradient(180deg, #f7fbff 0%, #edf4ff 100%);
}

.preview-card__photo {
  height: 220px;
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
  font-size: 18px;
  color: #1f2f46;
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
  gap: 8px;
  flex-wrap: wrap;
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

/* 列多时由外层 .content-panel__body / .admin-page-list-card__main 横向滚动；此处保证表格不被压到小于设计宽度 */
.leadership-table-x {
  width: 100%;
  min-width: 0;
}

/* 与各列 width/min-width 之和大致对齐，避免表格被压窄后固定列与内容叠压 */
.leadership-table {
  min-width: 1620px;
}

@media (max-width: 1280px) {
  .leadership-dialog {
    grid-template-columns: 1fr;
  }

  .leadership-dialog__side {
    order: -1;
  }
}
</style>
