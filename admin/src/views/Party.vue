<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import http from '@/utils/http'
import RichTextEditor from '@/components/RichTextEditor.vue'
import Pagination from '@/components/Pagination.vue'

const searchForm = ref({ title: '', type: '' })
const tableData = ref([])
const loading = ref(false)

// 分页状态
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)

const fetchParty = async () => {
  loading.value = true
  try {
    const params = {
      page: page.value,
      pageSize: pageSize.value,
      ...searchForm.value
    }
    const res = await http.get('/party/work-list', { params })
    tableData.value = res.data.list || []
    total.value = res.data.total || 0
  } catch (error) {
    ElMessage.error('获取党建列表失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchParty()
})

const dialogVisible = ref(false)
const formData = ref({ title: '', type: '', content: '', status: '草稿' })
const partyTypes = ['党建工作', '团建工作', '党员先锋', '党员学习']

// 分页处理
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
  searchForm.value = { title: '', type: '' }
  page.value = 1
  fetchParty()
}
const handleAdd = () => { const user = JSON.parse(localStorage.getItem('user') || '{}'); const today = new Date().toISOString().split('T')[0]; formData.value = { title: '', type: '', content: '', publishDate: today, status: '草稿' }; dialogVisible.value = true }
const handleEdit = (row: any) => { formData.value = { ...row }; dialogVisible.value = true }
const handleDelete = (row: any) => { ElMessageBox.confirm('确定删除吗？', '提示', { type: 'warning' }).then(async () => { try { await http.delete(`/party-building/${row.id}`); ElMessage.success('删除成功'); fetchParty() } catch (error) { ElMessage.error('删除失败') } }) }
const handleSave = async () => { try { if (formData.value.id) { await http.patch(`/party-building/${formData.value.id}`, formData.value) } else { await http.post('/party-building', formData.value) } ElMessage.success('保存成功'); dialogVisible.value = false; fetchParty() } catch (error) { ElMessage.error('保存失败') } }
</script>

<template>
  <div class="party">
    <el-card class="search-card" shadow="never">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="标题"><el-input v-model="searchForm.title" placeholder="请输入标题" clearable /></el-form-item>
        <el-form-item label="类型"><el-select v-model="searchForm.type" placeholder="请选择类型" clearable><el-option v-for="t in partyTypes" :key="t" :label="t" :value="t" /></el-select></el-form-item>
        <el-form-item><el-button type="primary" @click="handleSearch">查询</el-button><el-button @click="handleReset">重置</el-button></el-form-item>
      </el-form>
    </el-card>

    <el-card class="table-card" shadow="never">
      <div class="table-header">
        <h3>党建专栏列表</h3>
        <el-button type="success" @click="handleAdd"><el-icon><Plus /></el-icon>新增</el-button>
      </div>
      <el-table :data="tableData" stripe v-loading="loading">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="title" label="标题" min-width="200" />
        <el-table-column prop="type" label="类型" width="120"><template #default="{ row }"><el-tag>{{ row.type }}</el-tag></template></el-table-column>
        <el-table-column prop="publishDate" label="发布日期" width="110" />
        <el-table-column prop="status" label="状态" width="90"><template #default="{ row }"><el-tag :type="row.status === '已发布' ? 'success' : 'info'">{{ row.status }}</el-tag></template></el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button text type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button text type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        :total="total"
        :page="page"
        :page-size="pageSize"
        @change="handlePageChange"
      />
    </el-card>

    <el-dialog v-model="dialogVisible" title="党建专栏" width="600px">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="标题"><el-input v-model="formData.title" /></el-form-item>
        <el-form-item label="类型"><el-select v-model="formData.type" style="width: 100%"><el-option v-for="t in partyTypes" :key="t" :label="t" :value="t" /></el-select></el-form-item>
        <el-form-item label="内容"><RichTextEditor v-model="formData.content" placeholder="请输入党建内容" height="300px" /></el-form-item>
        <el-form-item label="状态"><el-select v-model="formData.status" style="width: 100%"><el-option label="草稿" value="草稿" /><el-option label="已发布" value="已发布" /></el-select></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.party { .search-card { margin-bottom: 16px; :deep(.el-card__body) { padding: 16px; } :deep(.el-form-item) { margin-bottom: 0; } } .table-card { :deep(.el-card__body) { padding: 0; } .table-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #f0f0f0; h3 { margin: 0; font-size: 16px; font-weight: 500; } } :deep(.el-table .el-button--text) { padding: 0; margin-right: 8px; } } }
</style>
