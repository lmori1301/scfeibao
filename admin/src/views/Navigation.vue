<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const navItems = ref([
  { id: 1, name: '首页', path: '/', visible: true, sort: 1 },
  { id: 2, name: '概况信息', path: '/overview', visible: true, sort: 2 },
  { id: 3, name: '党建专栏', path: '/party', visible: true, sort: 3 },
  { id: 4, name: '动态要闻', path: '/news', visible: true, sort: 4 }
])
const dialogVisible = ref(false)
const formData = ref({ name: '', path: '', visible: true, sort: 1 })

const handleAdd = () => { formData.value = { name: '', path: '', visible: true, sort: 1 }; dialogVisible.value = true }
const handleEdit = (row: any) => { formData.value = { ...row }; dialogVisible.value = true }
const handleSave = () => { ElMessage.success('保存成功'); dialogVisible.value = false }
</script>

<template>
  <div class="navigation">
    <el-card shadow="never">
      <div class="table-header">
        <h3>导航栏设置</h3>
        <el-button type="success" @click="handleAdd"><el-icon><Plus /></el-icon>新增</el-button>
      </div>
      <el-table :data="navItems" stripe>
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="path" label="路径" />
        <el-table-column prop="sort" label="排序" width="80" />
        <el-table-column prop="visible" label="显示" width="80"><template #default="{ row }"><el-tag :type="row.visible ? 'success' : 'info'">{{ row.visible ? '是' : '否' }}</el-tag></template></el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button text type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="导航栏" width="600px">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="名称"><el-input v-model="formData.name" /></el-form-item>
        <el-form-item label="路径"><el-input v-model="formData.path" /></el-form-item>
        <el-form-item label="排序"><el-input-number v-model="formData.sort" :min="1" style="width: 100%" /></el-form-item>
        <el-form-item label="显示"><el-switch v-model="formData.visible" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.navigation { :deep(.el-card__body) { padding: 0; } .table-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #f0f0f0; h3 { margin: 0; font-size: 16px; font-weight: 500; } } :deep(.el-table .el-button--text) { padding: 0; margin-right: 8px; } }
</style>
