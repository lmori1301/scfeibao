<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const tableData = ref([
  { id: 1, username: 'admin', name: '管理员', role: '超级管理员', status: '启用', createTime: '2024-01-15' }
])
const dialogVisible = ref(false)
const formData = ref({ username: '', name: '', password: '', role: '', status: '启用' })

const handleAdd = () => { formData.value = { username: '', name: '', password: '', role: '', status: '启用' }; dialogVisible.value = true }
const handleEdit = (row: any) => { formData.value = { ...row, password: '' }; dialogVisible.value = true }
const handleDelete = (row: any) => { ElMessageBox.confirm('确定删除该管理员吗？', '提示', { type: 'warning' }).then(() => ElMessage.success('删除成功')) }
const handleSave = () => { ElMessage.success('保存成功'); dialogVisible.value = false }
const handleResetPwd = (row: any) => { ElMessageBox.confirm('确定重置密码吗？', '提示', { type: 'warning' }).then(() => ElMessage.success('密码已重置')) }
</script>

<template>
  <div class="admin-users">
    <el-card shadow="never">
      <div class="table-header">
        <h3>管理员列表</h3>
        <el-button type="success" @click="handleAdd"><el-icon><Plus /></el-icon>新增</el-button>
      </div>
      <el-table :data="tableData" stripe>
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="role" label="角色" width="120" />
        <el-table-column prop="status" label="状态" width="80"><template #default="{ row }"><el-tag :type="row.status === '启用' ? 'success' : 'danger'">{{ row.status }}</el-tag></template></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="150" />
        <el-table-column label="操作" width="240" fixed="right">
          <template #default="{ row }">
            <el-button text type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button text type="warning" size="small" @click="handleResetPwd(row)">重置密码</el-button>
            <el-button text type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="管理员" width="600px">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="用户名"><el-input v-model="formData.username" /></el-form-item>
        <el-form-item label="姓名"><el-input v-model="formData.name" /></el-form-item>
        <el-form-item label="密码"><el-input v-model="formData.password" type="password" placeholder="留空则不修改" /></el-form-item>
        <el-form-item label="角色"><el-select v-model="formData.role" style="width: 100%"><el-option label="超级管理员" value="超级管理员" /><el-option label="内容编辑" value="内容编辑" /><el-option label="审核员" value="审核员" /><el-option label="查询员" value="查询员" /></el-select></el-form-item>
        <el-form-item label="状态"><el-select v-model="formData.status" style="width: 100%"><el-option label="启用" value="启用" /><el-option label="禁用" value="禁用" /></el-select></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.admin-users { :deep(.el-card__body) { padding: 0; } .table-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #f0f0f0; h3 { margin: 0; font-size: 16px; font-weight: 500; } } :deep(.el-table .el-button--text) { padding: 0; margin-right: 8px; } }
</style>
