<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Plus, RefreshRight, Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Pagination from '@/components/Pagination.vue'
import { usePagination } from '@/composables/usePagination'
import http from '@/utils/http'

const route = useRoute()

const pageCrumb = computed(() => {
  const group = String(route.meta.groupTitle ?? '').trim()
  const title = String(route.meta.title ?? '').trim()
  if (group && title) return `系统首页 / ${group} / ${title}`
  return '系统首页 / 系统配置 / 数据字典'
})

/** 可维护的字典类型；team_name 走「队伍字典」页面，不在此维护 */
const DICT_TYPES = [
  { value: 'duty_year', label: '值班年份' },
  { value: 'custom_1', label: '自定义字典 1' },
]

const searchForm = reactive({ dictType: 'duty_year', status: '' as '' | number })

const { data, total, loading, page, pageSize, fetch, handlePageChange } = usePagination((params: any) =>
  http.get('/system/dict/data/list', { params })
)

const buildQuery = () => {
  const q: Record<string, any> = { dictType: searchForm.dictType }
  if (searchForm.status !== '') q.status = searchForm.status
  return q
}

const handleSearch = () => {
  page.value = 1
  fetch(buildQuery())
}

const handleReset = () => {
  searchForm.dictType = 'duty_year'
  searchForm.status = ''
  page.value = 1
  fetch({})
}

const dialogVisible = ref(false)
const dialogTitle = ref('新增字典项')
const formRef = ref()
const submitting = ref(false)
const formData = reactive({
  id: 0,
  dictType: 'duty_year',
  dictLabel: '',
  dictValue: '',
  sort: 0,
  status: 1,
  remark: '',
})

const rules = {
  dictLabel: [{ required: true, message: '字典标签不能为空', trigger: 'blur' }],
}

const handleAdd = () => {
  dialogTitle.value = '新增字典项'
  Object.assign(formData, {
    id: 0,
    dictType: searchForm.dictType,
    dictLabel: '',
    dictValue: '',
    sort: 0,
    status: 1,
    remark: '',
  })
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleEdit = (row: any) => {
  dialogTitle.value = '编辑字典项'
  Object.assign(formData, {
    id: row.id,
    dictType: row.dictType,
    dictLabel: row.dictLabel,
    dictValue: row.dictValue,
    sort: row.sort,
    status: row.status,
    remark: row.remark || '',
  })
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleSave = async () => {
  await formRef.value?.validate()
  submitting.value = true
  try {
    const payload = {
      dictLabel: formData.dictLabel,
      dictValue: formData.dictValue || undefined,
      sort: formData.sort,
      status: formData.status,
      remark: formData.remark || undefined,
    }
    if (formData.id) {
      await http.patch(`/system/dict/data/${formData.id}`, payload)
    } else {
      await http.post('/system/dict', { ...payload, dictType: formData.dictType })
    }
    ElMessage.success('保存成功')
    dialogVisible.value = false
    fetch()
  } finally {
    submitting.value = false
  }
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm(`确定删除字典项「${row.dictLabel}」吗？`, '提示', { type: 'warning' })
    .then(async () => {
      await http.delete(`/system/dict/data/${row.id}`)
      ElMessage.success('删除成功')
      fetch()
    })
    .catch(() => {})
}

onMounted(() => fetch())
</script>

<template>
  <div class="system-dict-page admin-view-stack">
    <div class="page-crumb">{{ pageCrumb }}</div>

    <el-alert type="info" :closable="false" show-icon class="system-dict-page__tip">
      队伍名称字典统一在「门户内容 → 队伍字典」维护，本页仅维护值班年份等通用字典，避免同一队伍名称两处维护。
    </el-alert>

    <div class="admin-card admin-card--search">
      <div class="admin-list-toolbar">
        <div class="admin-list-toolbar__filters">
          <el-select v-model="searchForm.dictType" placeholder="字典类型" style="width: 200px">
            <el-option v-for="t in DICT_TYPES" :key="t.value" :label="`${t.label}（${t.value}）`" :value="t.value" />
          </el-select>
          <el-select v-model="searchForm.status" placeholder="状态" clearable style="width: 120px">
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </div>
        <div class="admin-list-toolbar__actions">
          <div class="admin-toolbar-actions__primary">
            <el-button type="primary" @click="handleSearch">
              <el-icon><Search /></el-icon>
              查询
            </el-button>
            <el-button @click="handleReset">重置</el-button>
          </div>
        </div>
      </div>
    </div>

    <section class="admin-card admin-card--table system-dict-table-panel">
      <div class="admin-table-panel__head">
        <div class="panel-title">字典项列表</div>
        <div class="admin-table-panel__head-actions">
          <el-button plain @click="fetch()">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增字典项
          </el-button>
        </div>
      </div>
      <el-table :data="data" v-loading="loading" stripe>
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column prop="dictType" label="字典类型" min-width="140" />
        <el-table-column prop="dictLabel" label="字典标签" min-width="140" />
        <el-table-column prop="dictValue" label="字典值" min-width="140" />
        <el-table-column prop="sort" label="排序" width="90" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'warning'">{{ row.status === 1 ? '启用' : '禁用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="140"
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

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="600px">
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="96px">
        <el-form-item label="字典类型">
          <el-select v-model="formData.dictType" :disabled="!!formData.id" style="width: 100%">
            <el-option v-for="t in DICT_TYPES" :key="t.value" :label="`${t.label}（${t.value}）`" :value="t.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="字典标签" prop="dictLabel">
          <el-input v-model="formData.dictLabel" placeholder="如 2026年" />
        </el-form-item>
        <el-form-item label="字典值">
          <el-input v-model="formData.dictValue" placeholder="留空则与标签一致，如 2026" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="formData.sort" :min="0" :max="9999" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="formData.status">
            <el-radio :value="1">启用</el-radio>
            <el-radio :value="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formData.remark" type="textarea" :rows="2" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitting" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.system-dict-page { display: flex; flex-direction: column; gap: 18px; }
.system-dict-page__tip { line-height: 1.7; }
.system-dict-table-panel { padding: 20px; border-radius: 22px; overflow: hidden; }
</style>
