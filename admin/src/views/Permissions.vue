<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const roles = ref([
  { id: 1, name: '超级管理员', description: '拥有所有权限', userCount: 1 },
  { id: 2, name: '内容编辑', description: '可编辑内容模块', userCount: 5 },
  { id: 3, name: '审核员', description: '可审核内容', userCount: 3 },
  { id: 4, name: '查询员', description: '仅查询权限', userCount: 10 }
])
const dialogVisible = ref(false)
const formData = ref({ name: '', description: '', permissions: [] })

const handleAdd = () => { formData.value = { name: '', description: '', permissions: [] }; dialogVisible.value = true }
const handleEdit = (row: any) => { formData.value = { ...row }; dialogVisible.value = true }
const handleSave = () => { ElMessage.success('保存成功'); dialogVisible.value = false }
</script>

<template>
  <div class="permissions">
    <el-card shadow="never">
      <div class="table-header">
        <h3>权限组列表</h3>
        <el-button type="success" @click="handleAdd"><el-icon><Plus /></el-icon>新增</el-button>
      </div>
      <el-table :data="roles" stripe>
        <el-table-column prop="name" label="角色名称" width="100" />
        <el-table-column prop="description" label="描述" min-width="200" />
        <el-table-column prop="userCount" label="用户数" width="100" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button text type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="权限组" width="700px">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="角色名称"><el-input v-model="formData.name" /></el-form-item>
        <el-form-item label="描述"><el-input v-model="formData.description" type="textarea" :rows="3" /></el-form-item>
        <el-form-item label="权限"><el-checkbox-group v-model="formData.permissions"><el-checkbox label="内容管理" /><el-checkbox label="用户管理" /><el-checkbox label="查询系统" /><el-checkbox label="系统设置" /></el-checkbox-group></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.permissions { :deep(.el-card__body) { padding: 0; } .table-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #f0f0f0; h3 { margin: 0; font-size: 16px; font-weight: 500; } } :deep(.el-table .el-button--text) { padding: 0; margin-right: 8px; } }
</style>
