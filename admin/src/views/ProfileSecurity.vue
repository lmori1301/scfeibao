<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import http from '@/utils/http'
import { refreshSessionUserDisplay } from '@/utils/session-user'

const loading = ref(false)
const saving = ref(false)
const formRef = ref<FormInstance>()

const profile = reactive({
  username: '',
  realName: '',
  role: '',
})

const formData = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const rules: FormRules = {
  oldPassword: [{ required: true, message: '请输入当前密码', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      validator: (_rule, value, callback) => {
        const password = String(value || '')
        const byteLength = new TextEncoder().encode(password).length
        const valid =
          password === password.trim() &&
          byteLength >= 12 &&
          byteLength <= 72 &&
          /[a-z]/.test(password) &&
          /[A-Z]/.test(password) &&
          /\d/.test(password) &&
          /[^A-Za-z0-9]/.test(password)
        if (!valid) {
          return callback(new Error('密码须为 12-72 字节，包含大小写字母、数字和特殊字符，且首尾不能有空白'))
        }
        callback()
      },
      trigger: 'blur',
    },
  ],
  confirmPassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    {
      validator: (_rule, value, callback) => {
        if (String(value || '') !== String(formData.newPassword || '')) {
          return callback(new Error('两次输入的新密码不一致'))
        }
        callback()
      },
      trigger: 'blur',
    },
  ],
}

const fetchProfile = async () => {
  loading.value = true
  try {
    const res = await http.get('/auth/profile')
    const data = res.data || {}
    profile.username = data.username || ''
    profile.realName = data.realName || data.name || ''
    profile.role = data.role || ''
  } catch {
    ElMessage.error('获取当前账号信息失败')
  } finally {
    loading.value = false
  }
}

const handleSave = async () => {
  if (!formRef.value || saving.value) return

  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  saving.value = true
  try {
    const res = await http.post('/auth/change-password', {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    })
    const payload = res.data || {}
    localStorage.setItem('token', payload.token)
    localStorage.setItem('user', JSON.stringify(payload.user || {}))
    refreshSessionUserDisplay()
    formData.oldPassword = ''
    formData.newPassword = ''
    formData.confirmPassword = ''
    formRef.value.clearValidate?.()
    ElMessage.success('密码修改成功')
    await fetchProfile()
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  fetchProfile()
})
</script>

<template>
  <div class="profile-security-page admin-view-stack">
    <div class="page-crumb">系统首页 / 个人中心 / 修改密码</div>

    <div class="profile-security-layout" v-loading="loading">
      <section class="profile-card">
        <div class="profile-card__header">
          <strong>账号信息</strong>
          <span>查看当前登录账号资料，密码修改成功后将立即更新当前会话。</span>
        </div>
        <div class="profile-card__body">
          <div class="profile-meta-row">
            <label>用户名</label>
            <span>{{ profile.username || '—' }}</span>
          </div>
          <div class="profile-meta-row">
            <label>姓名</label>
            <span>{{ profile.realName || '—' }}</span>
          </div>
          <div class="profile-meta-row">
            <label>角色</label>
            <span>{{ profile.role || '—' }}</span>
          </div>
        </div>
      </section>

      <section class="profile-card">
        <div class="profile-card__header">
          <strong>修改密码</strong>
          <span>使用 12-72 字节且包含大小写字母、数字和特殊字符的密码，首尾不能有空白。</span>
        </div>
        <div class="profile-card__body">
          <el-form ref="formRef" :model="formData" :rules="rules" label-width="96px">
            <el-form-item label="当前密码" prop="oldPassword">
              <el-input v-model="formData.oldPassword" type="password" show-password placeholder="请输入当前密码" />
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input v-model="formData.newPassword" type="password" show-password placeholder="请输入新密码" />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input v-model="formData.confirmPassword" type="password" show-password placeholder="请再次输入新密码" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="saving" @click="handleSave">保存新密码</el-button>
            </el-form-item>
          </el-form>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.profile-security-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.profile-security-layout {
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr);
  gap: 18px;
}

.profile-card {
  border: 1px solid #e6edf8;
  border-radius: 20px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  box-shadow: 0 12px 28px rgba(31, 57, 106, 0.04);
}

.profile-card__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px 20px 14px;
  border-bottom: 1px solid #eef3fb;
}

.profile-card__header strong {
  color: #1f2f46;
  font-size: 15px;
  font-weight: 700;
}

.profile-card__header span {
  color: #7a879d;
  font-size: 12px;
  line-height: 1.6;
}

.profile-card__body {
  padding: 18px 20px;
}

.profile-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid #eef3fb;
}

.profile-meta-row:last-child {
  border-bottom: 0;
}

.profile-meta-row label {
  color: #7a879d;
  font-size: 13px;
}

.profile-meta-row span {
  color: #1f2f46;
  font-size: 14px;
  font-weight: 600;
}

@media (max-width: 1100px) {
  .profile-security-layout {
    grid-template-columns: 1fr;
  }
}
</style>
