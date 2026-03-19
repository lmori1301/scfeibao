<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import { requiredRule } from '@/utils/validate'
import Pagination from '@/components/Pagination.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import RichTextEditor from '@/components/RichTextEditor.vue'
import http from '@/utils/http'

const dialogVisible = ref(false)
const formRef = ref()
const formData = ref({ title: '', type: '', sort: 1, status: '显示', image: '', content: '' })

const rules = {
  title: [requiredRule('标题')],
  type: [requiredRule('类型')],
  image: [requiredRule('图片')]
}

const { data, total, loading, page, pageSize, fetch, handlePageChange } = usePagination(
  (params) => http.get('/team-showcase', { params })
)

const handleAdd = () => {
  formData.value = { title: '', type: '', sort: 1, status: '显示', image: '', content: '' }
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  formData.value = {
    id: row.id,
    title: row.title,
    type: row.type,
    sort: row.sort,
    status: row.status,
    image: row.imageUrl,
    content: row.description || ''
  }
  dialogVisible.value = true
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确定删除吗？', '提示', { type: 'warning' }).then(async () => {
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
    status: formData.value.status
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

// 格式化日期为 YYYY-MM-DD
const formatDate = (row: any, column: any, cellValue: any) => {
  if (!cellValue) return ''
  const date = new Date(cellValue)
  return date.toISOString().split('T')[0]
}

fetch()
</script>

<template>
  <div class="page-container">
    <el-card shadow="never">
      <div class="flex-between mb-md">
        <h3>队伍风采列表</h3>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </div>
      <el-table :data="data" v-loading="loading" stripe>
        <el-table-column prop="title" label="标题" min-width="200" />
        <el-table-column prop="type" label="类型" width="120" />
        <el-table-column prop="sort" label="排序" width="80" />
        <el-table-column label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === '显示' ? 'success' : 'info'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="110" :formatter="formatDate" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button text type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button text type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="total" :page="page" :page-size="pageSize" @change="handlePageChange" />
    </el-card>

    <el-dialog v-model="dialogVisible" title="队伍风采" width="1200px">
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="图片" prop="image">
          <ImageUpload v-model="formData.image" />
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="formData.type" style="width: 100%">
            <el-option label="训练活动" value="训练活动" />
            <el-option label="救援行动" value="救援行动" />
            <el-option label="文化活动" value="文化活动" />
          </el-select>
        </el-form-item>
        <el-form-item label="内容">
          <RichTextEditor v-model="formData.content" placeholder="请输入队伍风采内容" height="300px" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="formData.sort" :min="1" style="width: 100%" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formData.status" style="width: 100%">
            <el-option label="显示" value="显示" />
            <el-option label="隐藏" value="隐藏" />
          </el-select>
        </el-form-item>
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
