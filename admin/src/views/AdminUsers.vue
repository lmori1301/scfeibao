<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { Plus, RefreshRight, Search, User } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import Pagination from '@/components/Pagination.vue'
import { usePagination } from '@/composables/usePagination'
import http from '@/utils/http'
import { formatDateTimeLocal } from '@/utils/format'
import { mergeSessionUserIfCurrentAccount } from '@/utils/session-user'

type AdminUserItem = {
  id: number
  username: string
  name: string
  email?: string
  phone?: string
  role?: string
  status: 'active' | 'disabled'
  mustChangePassword?: boolean
  createTime: string
}

const dialogVisible = ref(false)
const dialogTitle = ref('新增管理员')
const isEdit = ref(false)
const formRef = ref<FormInstance>()
const resetPasswordVisible = ref(false)
const resetPasswordLoading = ref(false)
const resetPasswordRef = ref<FormInstance>()
const resetPasswordTarget = ref<AdminUserItem | null>(null)

type AdminAccountScope = '' | '启用中' | '已禁用'

const searchForm = ref({
  username: '',
  role: '',
  accountScope: '' as AdminAccountScope,
})

const roleOptions = ref<string[]>([])
const { data: tableData, total, loading, page, pageSize, fetch, handlePageChange, resetAndFetch } = usePagination(
  (params: Record<string, any>) =>
    http.get('/admin/users', {
      params: {
        page: params.page,
        pageSize: params.pageSize,
        username: params.username,
        role: params.role,
        status:
          params.accountScope === '启用中'
            ? 'active'
            : params.accountScope === '已禁用'
              ? 'disabled'
              : undefined,
      },
    })
)

const formData = ref({
  id: undefined as number | undefined,
  username: '',
  name: '',
  password: '',
  email: '',
  phone: '',
  role: '',
  status: 'active' as 'active' | 'disabled',
})

const resetPasswordForm = ref({
  newPassword: '',
  confirmPassword: '',
})

const formRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度为 3-20 个字符', trigger: 'blur' },
  ],
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  password: [
    {
      validator: (_rule, value, callback) => {
        if (isEdit.value) return callback()
        const password = String(value || '').trim()
        if (!password) return callback(new Error('请输入初始密码'))
        if (password.length < 6) return callback(new Error('初始密码至少 6 位'))
        callback()
      },
      trigger: 'blur',
    },
  ],
}

const resetPasswordRules: FormRules = {
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '新密码至少 6 位', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    {
      validator: (_rule, value, callback) => {
        if (String(value || '') !== resetPasswordForm.value.newPassword) {
          return callback(new Error('两次输入的密码不一致'))
        }
        callback()
      },
      trigger: 'blur',
    },
  ],
}

const tableRows = computed(() => tableData.value as AdminUserItem[])

const statusLabel = (status: string) => (status === 'active' ? '启用' : '禁用')

const fetchRoleOptions = async () => {
  try {
    const res = await http.get('/admin/roles', { params: { page: 1, pageSize: 100 } })
    const roles = res.data?.list || []
    roleOptions.value = roles.map((item: any) => item.name).filter(Boolean)
  } catch {
    roleOptions.value = []
  }
}

const fetchUsers = async () => {
  await fetch({
    username: searchForm.value.username || undefined,
    role: searchForm.value.role || undefined,
    accountScope: searchForm.value.accountScope || undefined,
  })
}

const handleSearch = () => {
  resetAndFetch({
    username: searchForm.value.username || undefined,
    role: searchForm.value.role || undefined,
    accountScope: searchForm.value.accountScope || undefined,
  })
}

const handleReset = () => {
  searchForm.value = { username: '', role: '', accountScope: '' }
  resetAndFetch()
}

const handleAdd = () => {
  dialogTitle.value = '新增管理员'
  isEdit.value = false
  formData.value = {
    id: undefined,
    username: '',
    name: '',
    password: '',
    email: '',
    phone: '',
    role: roleOptions.value[0] || '',
    status: 'active',
  }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleEdit = (row: AdminUserItem) => {
  dialogTitle.value = '编辑管理员'
  isEdit.value = true
  formData.value = {
    id: row.id,
    username: row.username,
    name: row.name,
    password: '',
    email: row.email || '',
    phone: row.phone || '',
    role: row.role || '',
    status: row.status,
  }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleDialogClosed = () => {
  formRef.value?.resetFields?.()
  formRef.value?.clearValidate?.()
}

const handleDelete = (row: AdminUserItem) => {
  ElMessageBox.confirm(`确定删除管理员“${row.name || row.username}”吗？`, '提示', { type: 'warning' }).then(async () => {
    await http.delete(`/admin/users/${row.id}`)
    ElMessage.success('删除成功')
    fetchUsers()
  })
}

const handleOpenResetPassword = (row: AdminUserItem) => {
  resetPasswordTarget.value = row
  resetPasswordForm.value = { newPassword: '', confirmPassword: '' }
  resetPasswordVisible.value = true
  nextTick(() => resetPasswordRef.value?.clearValidate?.())
}

const handleToggleStatus = (row: AdminUserItem) => {
  const nextStatus = row.status === 'active' ? 'disabled' : 'active'
  const actionLabel = nextStatus === 'active' ? '启用' : '禁用'
  ElMessageBox.confirm(`确定${actionLabel}该管理员吗？`, '提示', { type: 'warning' }).then(async () => {
    await http.put(`/admin/users/${row.id}/status`, { status: nextStatus })
    ElMessage.success(`${actionLabel}成功`)
    fetchUsers()
  })
}

const handleSave = async () => {
  if (!formRef.value) return
  formData.value.username = formData.value.username.trim()
  formData.value.name = formData.value.name.trim()
  formData.value.password = formData.value.password.trim()
  formData.value.email = formData.value.email.trim()
  formData.value.phone = formData.value.phone.trim()

  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  const payload = {
    name: formData.value.name,
    email: formData.value.email || undefined,
    phone: formData.value.phone || undefined,
    role: formData.value.role || undefined,
  }

  if (isEdit.value && formData.value.id) {
    await http.put(`/admin/users/${formData.value.id}`, payload)
    await http.put(`/admin/users/${formData.value.id}/status`, { status: formData.value.status })
  } else {
    await http.post('/admin/users', {
      username: formData.value.username,
      password: formData.value.password,
      ...payload,
    })
  }

  dialogVisible.value = false
  fetchUsers()

  const synced = mergeSessionUserIfCurrentAccount(
    { id: formData.value.id, username: formData.value.username },
    {
      username: formData.value.username,
      realName: formData.value.name,
      name: formData.value.name,
      ...(formData.value.role ? { role: formData.value.role } : {}),
    }
  )

  ElMessage.success(synced ? '保存成功，顶栏已同步为当前展示名' : '保存成功')
}

const handleResetPasswordClosed = () => {
  resetPasswordRef.value?.resetFields?.()
  resetPasswordRef.value?.clearValidate?.()
  resetPasswordTarget.value = null
  resetPasswordLoading.value = false
}

const handleResetPasswordSave = async () => {
  if (!resetPasswordRef.value || !resetPasswordTarget.value) return

  resetPasswordForm.value.newPassword = resetPasswordForm.value.newPassword.trim()
  resetPasswordForm.value.confirmPassword = resetPasswordForm.value.confirmPassword.trim()

  const valid = await resetPasswordRef.value.validate().catch(() => false)
  if (!valid) return

  resetPasswordLoading.value = true
  try {
    await http.put(`/admin/users/${resetPasswordTarget.value.id}/reset-password`, {
      newPassword: resetPasswordForm.value.newPassword,
    })
    ElMessage.success(`已重置“${resetPasswordTarget.value.name || resetPasswordTarget.value.username}”的密码`)
    resetPasswordVisible.value = false
  } finally {
    resetPasswordLoading.value = false
  }
}

onMounted(async () => {
  await fetchRoleOptions()
  fetchUsers()
})
</script>

<template>
  <div class="admin-users-page">
    <div class="page-crumb">系统首页 / 系统配置 / 用户管理</div>

    <div class="admin-list-toolbar admin-list-query">
      <div class="admin-list-toolbar__filters admin-users-toolbar__filters">
        <el-select v-model="searchForm.accountScope" placeholder="账号状态" clearable style="min-width: 120px">
          <el-option label="启用中" value="启用中" />
          <el-option label="已禁用" value="已禁用" />
        </el-select>
        <el-input v-model="searchForm.username" placeholder="输入用户名关键词" clearable style="min-width: 200px; max-width: 360px; flex: 1">
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>
        <el-select v-model="searchForm.role" placeholder="角色筛选" clearable style="width: 160px">
          <el-option v-for="role in roleOptions" :key="role" :label="role" :value="role" />
        </el-select>
      </div>
      <div class="admin-list-toolbar__actions">
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>
    </div>

    <section class="admin-users-panel admin-users-table-panel">
      <div class="admin-table-panel__head">
        <div class="panel-title">管理员列表</div>
        <div class="admin-table-panel__head-actions">
          <el-button plain @click="fetchUsers">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增管理员
          </el-button>
        </div>
      </div>
      <el-table :data="tableRows" v-loading="loading" stripe>
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column label="姓名" min-width="120" show-overflow-tooltip>
          <template #default="{ row }">{{ row.name || '—' }}</template>
        </el-table-column>
        <el-table-column label="用户名" min-width="140" show-overflow-tooltip>
          <template #default="{ row }">{{ row.username }}</template>
        </el-table-column>
        <el-table-column label="角色" min-width="120" show-overflow-tooltip>
          <template #default="{ row }">{{ row.role || '—' }}</template>
        </el-table-column>
        <el-table-column label="手机" min-width="130" show-overflow-tooltip>
          <template #default="{ row }">{{ row.phone || '—' }}</template>
        </el-table-column>
        <el-table-column label="邮箱" min-width="200" show-overflow-tooltip>
          <template #default="{ row }">{{ row.email || '—' }}</template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'">{{ statusLabel(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="改密状态" width="130">
          <template #default="{ row }">
            <el-tag v-if="row.mustChangePassword" type="warning">待首次改密</el-tag>
            <el-tag v-else type="success">已完成</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="170">
          <template #default="{ row }">{{ formatDateTimeLocal(row.createTime) }}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="280"
          fixed="right"
          class-name="admin-table-ops-col"
          label-class-name="admin-table-ops-col--header"
        >
          <template #default="{ row }">
            <div class="admin-table-ops">
              <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
              <el-button link type="primary" @click="handleOpenResetPassword(row)">重置密码</el-button>
              <el-button link :type="row.status === 'active' ? 'warning' : 'success'" @click="handleToggleStatus(row)">
                {{ row.status === 'active' ? '禁用' : '启用' }}
              </el-button>
              <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="total" :page="page" :page-size="pageSize" @change="handlePageChange" />
    </section>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="1040px" @closed="handleDialogClosed">
      <div class="admin-users-dialog">
        <div class="admin-users-dialog__main">
          <el-form ref="formRef" :model="formData" :rules="formRules" label-width="96px">
            <section class="admin-users-form-section">
              <div class="admin-users-form-section__header">
                <strong>账号资料</strong>
                <span>按账号、姓名、邮箱和手机号依次维护，信息更聚焦。</span>
              </div>
              <div class="admin-users-form-section__body">
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="formData.username" :disabled="isEdit" />
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="formData.name" />
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input v-model="formData.email" />
                </el-form-item>
                <el-form-item label="手机号">
                  <el-input v-model="formData.phone" />
                </el-form-item>
              </div>
            </section>

            <section class="admin-users-form-section">
              <div class="admin-users-form-section__header">
                <strong>权限设置</strong>
                <span>角色和启用状态单独分组，避免与基础资料混排。</span>
              </div>
              <div class="admin-users-form-section__body">
                <el-form-item label="角色">
                  <el-select v-model="formData.role" style="width: 100%">
                    <el-option v-for="role in roleOptions" :key="role" :label="role" :value="role" />
                  </el-select>
                </el-form-item>
                <el-form-item label="状态">
                  <el-select v-model="formData.status" style="width: 100%" :disabled="!isEdit">
                    <el-option label="启用" value="active" />
                    <el-option label="禁用" value="disabled" />
                  </el-select>
                </el-form-item>
                <el-form-item v-if="!isEdit" label="初始密码" prop="password">
                  <el-input v-model="formData.password" type="password" placeholder="请输入初始密码" show-password />
                </el-form-item>
              </div>
            </section>

          </el-form>
        </div>
        <aside class="admin-users-dialog__side">
          <div class="preview-card">
            <div class="preview-card__avatar"><el-icon><User /></el-icon></div>
            <strong>{{ formData.name || formData.username || '未填写管理员信息' }}</strong>
            <p>{{ formData.role || '待分配角色' }}</p>
            <div class="preview-card__meta">
              <span>{{ formData.status === 'active' ? '当前启用' : '当前禁用' }}</span>
              <span>{{ formData.email || '未填写邮箱' }}</span>
            </div>
          </div>
        </aside>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="resetPasswordVisible"
      title="重置密码"
      width="460px"
      destroy-on-close
      @closed="handleResetPasswordClosed"
    >
      <el-form ref="resetPasswordRef" :model="resetPasswordForm" :rules="resetPasswordRules" label-width="92px">
        <div class="reset-password-tip">重置完成后，该账号可直接使用新密码登录系统。</div>
        <el-form-item label="目标账号">
          <el-input :model-value="resetPasswordTarget?.name || resetPasswordTarget?.username || '—'" disabled />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="resetPasswordForm.newPassword" type="password" placeholder="请输入新密码" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="resetPasswordForm.confirmPassword" type="password" placeholder="请再次输入新密码" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="resetPasswordVisible = false">取消</el-button>
        <el-button type="primary" :loading="resetPasswordLoading" @click="handleResetPasswordSave">确认重置</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.admin-users-page { display: flex; flex-direction: column; gap: 18px; }
.admin-users-panel, .preview-card { border: 1px solid #e6edf7; background: #fff; }
.admin-users-toolbar__filters :deep(.el-input),
.admin-users-toolbar__filters :deep(.el-select) {
  flex: 0 1 auto;
}
.admin-users-dialog__main { min-width: 0; }
.admin-users-form-section {
  border: 1px solid #e6edf8;
  border-radius: 20px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  box-shadow: 0 12px 28px rgba(31, 57, 106, 0.04);
}
.admin-users-form-section + .admin-users-form-section { margin-top: 16px; }
.admin-users-form-section__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px 20px 14px;
  border-bottom: 1px solid #eef3fb;
}
.admin-users-form-section__header strong { color: #1f2f46; font-size: 15px; font-weight: 700; }
.admin-users-form-section__header span { color: #7a879d; font-size: 12px; line-height: 1.6; }
.admin-users-form-section__body { padding: 18px 20px 4px; }
.admin-users-form-section__body :deep(.el-form-item) { margin-bottom: 14px; }
.admin-users-panel { padding: 20px; border-radius: 12px; overflow: hidden; }
.preview-card__avatar {
  width: 60px; height: 60px; border-radius: 10px; display: grid; place-items: center;
  background: linear-gradient(135deg, #edf3ff 0%, #dce8ff 100%); color: #2f67ff; font-size: 24px; flex: 0 0 auto;
}
.admin-users-dialog { display: grid; grid-template-columns: minmax(0, 1.35fr) 320px; gap: 24px; }
.preview-card { padding: 18px; border-radius: 10px; background: linear-gradient(180deg, #f7fbff 0%, #edf4ff 100%); }
.preview-card strong { display: block; margin-top: 14px; font-size: 18px; color: #1f2f46; }
.preview-card p { margin-top: 8px; color: #718198; font-size: 13px; }
.preview-card__meta { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
.preview-card__meta span {
  padding: 6px 10px; border-radius: 999px; background: rgba(47, 103, 255, 0.1); color: #2f67ff; font-size: 12px; font-weight: 600;
}
.reset-password-tip {
  margin-bottom: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  background: #f4f8ff;
  color: #4c6287;
  font-size: 12px;
  line-height: 1.6;
}
@media (max-width: 1280px) {
  .admin-users-dialog { grid-template-columns: 1fr; }
  .admin-users-dialog__side { order: -1; }
}
</style>
