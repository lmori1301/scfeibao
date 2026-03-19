<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const tableData = ref([
  { id: 1, username: 'user001', realName: '张三', phone: '13800138000', email: 'zhangsan@example.com', status: '正常', createTime: '2024-01-10' },
  { id: 2, username: 'user002', realName: '李四', phone: '13900139000', email: 'lisi@example.com', status: '正常', createTime: '2024-01-12' }
])

const dialogVisible = ref(false)
const formData = ref({ username: '', realName: '', phone: '', email: '', password: '', status: '正常' })

const handleAdd = () => { formData.value = { username: '', realName: '', phone: '', email: '', password: '', status: '正常' }; dialogVisible.value = true }
const handleEdit = (row: any) => { formData.value = { ...row, password: '' }; dialogVisible.value = true }
const handleDelete = (row: any) => { ElMessageBox.confirm('确定删除该用户吗？', '提示', { type: 'warning' }).then(() => ElMessage.success('删除成功')) }
const handleSave = () => { ElMessage.success('保存成功'); dialogVisible.value = false }
</script>

<template>
  <div class="user-management">
    <el-card shadow="never">
      <div class="table-header">
        <h3>用户列表</h3>
        <el-button type="success" @click="handleAdd"><el-icon><Plus /></el-icon>新增</el-button>
      </div>
      <el-table :data="tableData" stripe>
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="realName" label="真实姓名" width="100" />
        <el-table-column prop="phone" label="手机号" width="120" />
        <el-table-column prop="email" label="邮箱" min-width="200" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === '正常' ? 'success' : 'danger'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="160" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button text type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button text type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="用户信息" width="700px">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="用户名"><el-input v-model="formData.username" /></el-form-item>
        <el-form-item label="真实姓名"><el-input v-model="formData.realName" /></el-form-item>
        <el-form-item label="手机号"><el-input v-model="formData.phone" /></el-form-item>
        <el-form-item label="邮箱"><el-input v-model="formData.email" /></el-form-item>
        <el-form-item label="密码"><el-input v-model="formData.password" type="password" placeholder="留空则不修改" /></el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formData.status" style="width: 100%">
            <el-option label="正常" value="正常" />
            <el-option label="禁用" value="禁用" />
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
.user-management { :deep(.el-card__body) { padding: 0; } .table-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #f0f0f0; h3 { margin: 0; font-size: 16px; font-weight: 500; } } :deep(.el-table .el-button--text) { padding: 0; margin-right: 8px; } }
</style>
