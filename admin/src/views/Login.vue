<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { Lock, User } from '@element-plus/icons-vue'
import { firstAccessibleAdminPath } from '@/router/admin-routes'

const router = useRouter()
const loginFormRef = ref<FormInstance>()
const loginLogo = `${import.meta.env.BASE_URL}login-logo.png`
const loginBackground = `${import.meta.env.BASE_URL}Vector_00_567.png`

const loginForm = reactive({
  username: '',
  password: ''
})

const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度为3-20个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      validator: (_rule, value, callback) => {
        const byteLength = new TextEncoder().encode(String(value || '')).length
        if (byteLength < 6 || byteLength > 72) {
          return callback(new Error('密码长度为 6-72 字节'))
        }
        callback()
      },
      trigger: 'blur'
    }
  ]
}

const persistSession = (token: string, user: Record<string, unknown>) => {
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
}

const handleLoginSuccess = (payload: { token: string; user: Record<string, unknown> }) => {
  persistSession(payload.token, payload.user)
  ElMessage.success('登录成功')
  router.push(firstAccessibleAdminPath(payload.user))
}

const handleLogin = async () => {
  if (!loginFormRef.value) return

  loginForm.username = loginForm.username.trim()

  await loginFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginForm)
        })
        const data = await res.json()
        if (data.code === 200) {
          handleLoginSuccess(data.data)
        } else {
          ElMessage.error(data.message || '登录失败')
        }
      } catch (error) {
        ElMessage.error('登录失败，请检查网络')
      }
    }
  })
}
</script>

<template>
  <div
    class="login-container"
    :style="{
      backgroundImage: `url(${loginBackground})`
    }"
  >
    <div class="login-box">
      <div class="login-header">
        <img class="login-logo" :src="loginLogo" alt="四川飞豹救援 Logo" />
        <h2>四川飞豹救援管理系统</h2>
      </div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="rules" class="login-form">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            size="large"
            autocomplete="username"
          >
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            size="large"
            autocomplete="current-password"
            @keyup.enter="handleLogin"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" style="width: 100%" @click="handleLogin">
            登 录
          </el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #0f325f;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      linear-gradient(180deg, rgba(6, 18, 38, 0.18) 0%, rgba(9, 24, 50, 0.22) 45%, rgba(8, 18, 36, 0.34) 100%);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(7, 20, 41, 0.04) 0%, rgba(7, 20, 41, 0.18) 100%);
  }
}

.login-box {
  width: 420px;
  padding: 38px 40px 56px;
  background: rgba(255, 255, 255, 0.93);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.34);
  border-radius: 18px;
  box-shadow: 0 28px 60px rgba(5, 18, 43, 0.34);
  position: relative;
  z-index: 2;
}

.login-header {
  text-align: center;
  margin-bottom: 26px;

  .login-logo {
    width: 92px;
    height: 92px;
    display: block;
    margin: 0 auto 14px;
    object-fit: contain;
    filter: drop-shadow(0 10px 18px rgba(30, 60, 114, 0.18));
  }

  h2 {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: #1e3c72;
    margin: 0;
    white-space: nowrap;
  }
}

.login-form {
  margin-top: 8px;
  width: 86%;
  margin-left: auto;
  margin-right: auto;

  :deep(.el-form-item) {
    margin-bottom: 14px;
  }

  :deep(.el-form-item:last-child) {
    margin-top: 38px;
    margin-bottom: 0;
  }

  :deep(.el-input__wrapper) {
    background: #fff;
    box-shadow: 0 0 0 1px #dcdfe6 inset;
    border-radius: 6px;
    padding-left: 12px;
  }

  :deep(.el-input__wrapper.is-focus) {
    background: #fff;
    box-shadow: 0 0 0 1px #409eff inset;
  }

  :deep(.el-input__inner) {
    background: transparent;
    color: #1f2937;
    caret-color: #1f2937;
  }

  :deep(.el-input__inner:-webkit-autofill),
  :deep(.el-input__inner:-webkit-autofill:hover),
  :deep(.el-input__inner:-webkit-autofill:focus) {
    -webkit-text-fill-color: #1f2937;
    box-shadow: 0 0 0 1000px #fff inset;
    transition: background-color 9999s ease-out;
  }

  :deep(.el-input),
  :deep(.el-button) {
    width: 100%;
  }

  :deep(.el-input__prefix) {
    color: #6b7a99;
    margin-right: 8px;
  }

  :deep(.el-button--primary) {
    background: #409eff;
    border-color: #409eff;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
    height: 44px;

    &:hover {
      background: #66b1ff;
      border-color: #66b1ff;
    }
  }
}

</style>
