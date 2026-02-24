<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const notifications = ref([
  { id: 1, type: '系统公告', title: '系统维护通知', content: '系统将于本周六进行维护', time: '2024-01-15 09:00', read: false },
  { id: 2, type: '自动提醒', title: '证书到期提醒', content: '有8个证书即将到期', time: '2024-01-15 08:00', read: false },
  { id: 3, type: '自动提醒', title: '备份完成', content: '数据备份已完成', time: '2024-01-14 23:00', read: true }
])

const markRead = (item: any) => {
  item.read = true
  ElMessage.success('已标记为已读')
}

const markAllRead = () => {
  notifications.value.forEach(n => n.read = true)
  ElMessage.success('全部标记为已读')
}
</script>

<template>
  <div class="notifications">
    <div class="header">
      <h2>系统通知</h2>
      <el-button size="small" @click="markAllRead">全部已读</el-button>
    </div>

    <el-timeline>
      <el-timeline-item v-for="item in notifications" :key="item.id" :timestamp="item.time" placement="top">
        <el-card :class="{ unread: !item.read }">
          <div class="notification-header">
            <el-tag :type="item.type === '系统公告' ? 'primary' : 'warning'" size="small">{{ item.type }}</el-tag>
            <span class="title">{{ item.title }}</span>
          </div>
          <p class="content">{{ item.content }}</p>
          <el-button v-if="!item.read" text type="primary" size="small" @click="markRead(item)">标记已读</el-button>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<style scoped lang="scss">
.notifications {
  .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; h2 { margin: 0; font-size: 20px; font-weight: 500; } }

  .unread { border-left: 3px solid #f56c6c; }

  .notification-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
    .title { font-weight: 500; font-size: 15px; }
  }

  .content { margin: 8px 0; color: #606266; font-size: 14px; }
}
</style>
