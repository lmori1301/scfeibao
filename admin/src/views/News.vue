<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import { requiredRule } from '@/utils/validate'
import Pagination from '@/components/Pagination.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import RichTextEditor from '@/components/RichTextEditor.vue'
import http from '@/utils/http'

const searchForm = ref({ title: '', category: '', status: '' })
const dialogVisible = ref(false)
const dialogTitle = ref('新增新闻')
const formRef = ref()
const formData = ref({
  title: '', category: '', author: '', summary: '', content: '',
  coverImage: '', publishedAt: '', status: '草稿'
})

const newsCategories = ['动态要闻', '各地动态', '救援行动', '政策解读', '媒体播报', '图文资讯']

const rules = {
  title: [requiredRule('标题')],
  category: [requiredRule('分类')]
}

const { data, total, loading, page, pageSize, fetch, handlePageChange } = usePagination(
  (params) => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
    )
    return http.get('/news', { params: filteredParams })
  }
)

const handleSearch = () => fetch(searchForm.value)
const handleReset = () => {
  searchForm.value = { title: '', category: '', status: '' }
  fetch()
}

const handleAdd = () => {
  dialogTitle.value = '新增新闻'
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const today = new Date().toISOString().split('T')[0]
  formData.value = {
    title: '', category: '', author: user.realName || user.username || '管理员',
    summary: '', content: '', coverImage: '', publishedAt: today, status: '草稿',
    isHeadline: 0,
    isNew: 0
  }
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  dialogTitle.value = '编辑新闻'
  formData.value = {
    ...row,
    status: getStatusText(row.status)
  }
  dialogVisible.value = true
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确定删除该新闻吗？', '提示', { type: 'warning' }).then(async () => {
    await http.delete(`/news/${row.id}`)
    ElMessage.success('删除成功')
    fetch()
  })
}

const handleToggleNew = async (row: any) => {
  const newValue = row.isNew === 1 ? 0 : 1
  const action = newValue === 1 ? '设为NEW' : '取消NEW'
  try {
    await http.patch(`/news/${row.id}`, { isNew: newValue })
    ElMessage.success(`${action}成功`)
    fetch()
  } catch (error) {
    ElMessage.error(`${action}失败`)
  }
}

const handleSave = async () => {
  await formRef.value.validate()

  // 🔥 代码已更新 - 版本 3.0
  console.log('🔥 handleSave 函数已执行 - 版本 3.0')
  console.log('原始 publishedAt:', formData.value.publishedAt)

  // 转换日期格式（不带毫秒）
  let publishedAtValue = undefined
  if (formData.value.publishedAt) {
    const date = new Date(formData.value.publishedAt)
    // 格式：2026-02-26T00:00:00Z（不带毫秒）
    publishedAtValue = date.toISOString().replace(/\.\d{3}Z$/, 'Z')
  }

  // 只发送允许更新的字段，过滤掉id、createdAt等自动生成的字段
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
    isNew: formData.value.isNew
  }

  if (formData.value.id) {
    await http.patch(`/news/${formData.value.id}`, saveData)
  } else {
    await http.post('/news', saveData)
  }
  ElMessage.success('保存成功')
  dialogVisible.value = false
  fetch()
}

// 格式化日期为 YYYY-MM-DD
const formatDate = (row: any, column: any, cellValue: any) => {
  if (!cellValue) return ''
  const date = new Date(cellValue)
  return date.toISOString().split('T')[0]
}

// 格式化状态显示
const getStatusText = (status: any) => {
  if (status === 1 || status === '已发布') return '已发布'
  return '草稿'
}

// 格式化状态值（用于保存）
const getStatusValue = (status: any) => {
  if (status === '已发布' || status === 1) return 1
  return 0
}

fetch()
</script>

<template>
  <div class="page-container">
    <el-card shadow="never" class="mb-md">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="标题">
          <el-input v-model="searchForm.title" placeholder="请输入标题" clearable />
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="searchForm.category" placeholder="请选择分类" clearable>
            <el-option v-for="cat in newsCategories" :key="cat" :label="cat" :value="cat" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="已发布" value="已发布" />
            <el-option label="草稿" value="草稿" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never">
      <div class="flex-between mb-md">
        <h3>新闻列表</h3>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </div>
      <el-table :data="data" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column label="标题" min-width="200">
          <template #default="{ row }">
            <span>{{ row.title }}</span>
            <el-tag v-if="row.isNew === 1" type="danger" size="small" style="margin-left: 8px;">NEW</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="分类" width="100" />
        <el-table-column prop="author" label="作者" width="120" show-overflow-tooltip />
        <el-table-column prop="publishedAt" label="发布日期" width="110" :formatter="formatDate" />
        <el-table-column prop="views" label="浏览量" width="90" />
        <el-table-column label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="getStatusText(row.status) === '已发布' ? 'success' : 'info'">{{ getStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button text type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button text type="warning" size="small" @click="handleToggleNew(row)">
              {{ row.isNew === 1 ? '取消NEW' : '设为NEW' }}
            </el-button>
            <el-button text type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="total" :page="page" :page-size="pageSize" @change="handlePageChange" />
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="1200px">
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title" placeholder="请输入标题" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="分类" prop="category">
              <el-select v-model="formData.category" placeholder="请选择分类" style="width: 100%">
                <el-option v-for="cat in newsCategories" :key="cat" :label="cat" :value="cat" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作者">
              <el-input v-model="formData.author" placeholder="请输入作者" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="封面图片" prop="coverImage">
          <ImageUpload v-model="formData.coverImage" />
        </el-form-item>
        <el-form-item label="摘要">
          <el-input v-model="formData.summary" type="textarea" :rows="3" placeholder="请输入摘要" />
        </el-form-item>
        <el-form-item label="内容">
          <RichTextEditor v-model="formData.content" placeholder="请输入新闻内容" height="400px" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="发布日期">
              <el-date-picker v-model="formData.publishedAt" type="date" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select v-model="formData.status" style="width: 100%">
                <el-option label="草稿" value="草稿" />
                <el-option label="已发布" value="已发布" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="设置为头条">
              <el-switch v-model="formData.isHeadline" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示NEW标签">
              <el-switch v-model="formData.isNew" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.page-container {
  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
