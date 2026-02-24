<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const stats = ref([
  { label: '新闻总数', value: 150, trend: '+12%', icon: 'Document', color: '#409eff' },
  { label: '证书总数', value: 500, trend: '+5%', icon: 'Postcard', color: '#67c23a' },
  { label: '车辆总数', value: 50, trend: '+2%', icon: 'Van', color: '#e6a23c' },
  { label: '人员总数', value: 200, trend: '+3%', icon: 'User', color: '#f56c6c' }
])

const todos = ref([
  { id: 1, type: 'news_review', title: '待审核新闻：山区救援行动', priority: 'high', time: '10分钟前' },
  { id: 2, type: 'certificate_expiring', title: '证书即将到期：CERT2024001', priority: 'medium', time: '1小时前' }
])

const logs = ref([
  { id: 1, user: '管理员', action: '创建新闻', module: '内容管理', time: '2024-01-28 10:00' },
  { id: 2, user: '编辑01', action: '更新证书', module: '查询系统', time: '2024-01-28 09:30' }
])

const notifications = ref([
  { id: 1, title: '数据备份成功', content: '系统已于今日02:00完成自动备份', time: '6小时前', unread: true },
  { id: 2, title: '系统更新通知', content: '系统将于本周末进行维护升级', time: '1天前', unread: false }
])

const handleQuickAction = (action: string) => {
  const routes: Record<string, string> = {
    news: '/news',
    certificate: '/certificates',
    vehicle: '/vehicles',
    personnel: '/personnel'
  }
  if (routes[action]) {
    router.push(routes[action])
  }
}

const handleTodoAction = (todo: any) => {
  ElMessage.success('操作成功')
}

const markAsRead = (id: number) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.unread = false
  }
}

onMounted(() => {
  // 可以在这里调用API获取实际数据
})
</script>

<template>
  <div class="dashboard">
    <h2>工作台</h2>

    <!-- 数据概览 -->
    <el-row :gutter="20" class="stats-row">
      <el-col :span="6" v-for="item in stats" :key="item.label">
        <el-card shadow="hover">
          <div class="stat-item">
            <el-icon :size="40" :color="item.color"><component :is="item.icon" /></el-icon>
            <div class="stat-info">
              <div class="stat-value">{{ item.value }}</div>
              <div class="stat-label">{{ item.label }}</div>
              <div class="stat-trend">{{ item.trend }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 快捷入口 -->
    <el-card class="quick-actions" shadow="never">
      <template #header><h3>快捷操作</h3></template>
      <el-space :size="15">
        <el-button type="primary" @click="handleQuickAction('news')"><el-icon><Plus /></el-icon>发布新闻</el-button>
        <el-button type="success" @click="handleQuickAction('certificate')"><el-icon><Plus /></el-icon>添加证书</el-button>
        <el-button type="warning" @click="handleQuickAction('vehicle')"><el-icon><Plus /></el-icon>添加车辆</el-button>
        <el-button type="info" @click="handleQuickAction('personnel')"><el-icon><Plus /></el-icon>添加人员</el-button>
      </el-space>
    </el-card>

    <el-row :gutter="20">
      <!-- 待办事项 -->
      <el-col :span="12">
        <el-card class="todo-card" shadow="never">
          <template #header><h3>待办事项 <el-badge :value="todos.length" class="badge" /></h3></template>
          <el-empty v-if="todos.length === 0" description="暂无待办事项" />
          <div v-else class="todo-list">
            <div v-for="item in todos" :key="item.id" class="todo-item">
              <el-tag :type="item.priority === 'high' ? 'danger' : 'warning'" size="small">{{ item.priority === 'high' ? '紧急' : '一般' }}</el-tag>
              <span class="todo-title">{{ item.title }}</span>
              <span class="todo-time">{{ item.time }}</span>
              <el-button text type="primary" size="small" @click="handleTodoAction(item)">处理</el-button>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 系统通知 -->
      <el-col :span="12">
        <el-card class="notification-card" shadow="never">
          <template #header><h3>系统通知</h3></template>
          <el-empty v-if="notifications.length === 0" description="暂无通知" />
          <div v-else class="notification-list">
            <div v-for="item in notifications" :key="item.id" class="notification-item" :class="{ unread: item.unread }">
              <div class="notification-header">
                <span class="notification-title">{{ item.title }}</span>
                <el-badge v-if="item.unread" is-dot />
              </div>
              <div class="notification-content">{{ item.content }}</div>
              <div class="notification-footer">
                <span class="notification-time">{{ item.time }}</span>
                <el-button v-if="item.unread" text type="primary" size="small" @click="markAsRead(item.id)">标记已读</el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 最近操作日志 -->
    <el-card class="log-card" shadow="never">
      <template #header><h3>最近操作</h3></template>
      <el-table :data="logs" stripe>
        <el-table-column prop="user" label="操作人" width="100" />
        <el-table-column prop="action" label="操作" width="120" />
        <el-table-column prop="module" label="模块" width="120" />
        <el-table-column prop="time" label="时间" />
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  h2 { margin-bottom: 20px; font-size: 20px; font-weight: 500; }

  .stats-row { margin-bottom: 20px; }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 20px;

    .stat-info {
      flex: 1;
      .stat-value { font-size: 28px; font-weight: bold; color: #303133; }
      .stat-label { font-size: 14px; color: #909399; margin-top: 5px; }
      .stat-trend { font-size: 12px; color: #67c23a; margin-top: 5px; }
    }
  }

  .quick-actions {
    margin-bottom: 20px;
    h3 { margin: 0; font-size: 16px; font-weight: 500; }
  }

  .todo-card, .notification-card {
    h3 { margin: 0; font-size: 16px; font-weight: 500; display: flex; align-items: center; gap: 10px; }
    .badge { margin-left: auto; }
  }

  .todo-list {
    .todo-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;
      &:last-child { border-bottom: none; }
      .todo-title { flex: 1; font-size: 14px; }
      .todo-time { font-size: 12px; color: #909399; }
    }
  }

  .notification-list {
    .notification-item {
      padding: 12px;
      border-bottom: 1px solid #f0f0f0;
      &:last-child { border-bottom: none; }
      &.unread { background: #f0f9ff; }

      .notification-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        .notification-title { font-size: 14px; font-weight: 500; }
      }

      .notification-content { font-size: 13px; color: #606266; margin-bottom: 8px; }

      .notification-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .notification-time { font-size: 12px; color: #909399; }
      }
    }
  }

  .log-card {
    margin-top: 20px;
    h3 { margin: 0; font-size: 16px; font-weight: 500; }
  }
}
</style>
