<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Bell, RefreshRight } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import WorkbenchNav from '@/components/WorkbenchNav.vue'
import http from '@/utils/http'

type NotificationItem = {
  id: number
  type: string
  title: string
  content: string
  time: string
}

const loading = ref(false)
const notifications = ref<NotificationItem[]>([])

const loadNotifications = async () => {
  loading.value = true
  try {
    const res = await http.get('/admin/dashboard/notifications')
    notifications.value = res.data || []
  } catch {
    ElMessage.error('获取系统通知失败')
  } finally {
    loading.value = false
  }
}

const formatTime = (time: string) => new Date(time).toLocaleString('zh-CN', { hour12: false })

const typeLabel = (type: string) => {
  if (type === 'warning') return '预警'
  if (type === 'danger') return '紧急'
  if (type === 'success') return '完成'
  return '通知'
}

const typeClass = (type: string) => {
  if (type === 'warning') return 'is-warning'
  if (type === 'danger') return 'is-danger'
  if (type === 'success') return 'is-success'
  return 'is-info'
}

const summary = computed(() => ({
  total: notifications.value.length,
  danger: notifications.value.filter((item) => item.type === 'danger').length,
  warning: notifications.value.filter((item) => item.type === 'warning').length,
}))

onMounted(loadNotifications)
</script>

<template>
  <div class="notifications-page">
    <WorkbenchNav />

    <section class="notice-hero">
      <div>
        <div class="notice-hero__crumb">系统首页 / 总览中心 / 系统通知</div>
        <span class="notice-hero__eyebrow">SYSTEM BROADCAST STREAM</span>
        <h1>系统通知</h1>
        <p>按通知类型分出轻重缓急，让值班人员能快速识别公告、预警和紧急事件。</p>
      </div>
      <el-button plain :loading="loading" @click="loadNotifications">
        <el-icon><RefreshRight /></el-icon>
        刷新通知
      </el-button>
    </section>

    <section class="notice-summary">
      <article class="notice-summary__card">
        <el-icon><Bell /></el-icon>
        <div>
          <strong>{{ summary.total }}</strong>
          <span>全部通知</span>
        </div>
      </article>
      <article class="notice-summary__card">
        <strong>{{ summary.warning }}</strong>
        <span>预警类通知</span>
      </article>
      <article class="notice-summary__card">
        <strong>{{ summary.danger }}</strong>
        <span>紧急类通知</span>
      </article>
    </section>

    <section class="notice-stream">
      <article
        v-for="item in notifications"
        :key="item.id"
        class="notice-card"
        :class="typeClass(item.type)"
      >
        <div class="notice-card__tag">{{ typeLabel(item.type) }}</div>
        <div class="notice-card__content">
          <div class="notice-card__head">
            <strong>{{ item.title }}</strong>
            <time>{{ formatTime(item.time) }}</time>
          </div>
          <p>{{ item.content }}</p>
        </div>
      </article>

      <div v-if="!notifications.length" class="notice-empty">当前没有系统通知</div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.notifications-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.notice-hero,
.notice-summary__card,
.notice-card,
.notice-empty {
  border: 1px solid #dfe8f6;
  background: #fff;
}

.notice-hero {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  padding: 24px;
  border-radius: 26px;
  background:
    radial-gradient(circle at left top, rgba(38, 99, 235, 0.14), transparent 30%),
    linear-gradient(135deg, #f8fbff 0%, #eef4ff 100%);
}

.notice-hero__eyebrow {
  display: inline-flex;
  margin-bottom: 10px;
  color: #5d7091;
  font-size: 11px;
  letter-spacing: 0.2em;
}

.notice-hero__crumb {
  margin-bottom: 12px;
  color: #7a889d;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.notice-hero h1 {
  font-size: 30px;
  color: #15263f;
}

.notice-hero p {
  max-width: 680px;
  margin-top: 10px;
  color: #637289;
  line-height: 1.8;
}

.notice-summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.notice-summary__card {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 18px;
  border-radius: 20px;
}

.notice-summary__card :deep(.el-icon) {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #edf3ff 0%, #dae7ff 100%);
  color: #2a5ce5;
  font-size: 18px;
}

.notice-summary__card strong {
  color: #15263f;
  font-size: 28px;
}

.notice-summary__card span {
  display: block;
  margin-top: 4px;
  color: #67748a;
  font-size: 13px;
}

.notice-stream {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.notice-card {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 16px;
  align-items: stretch;
  padding: 16px;
  border-radius: 22px;
}

.notice-card__tag {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 700;
}

.notice-card__head {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: flex-start;
}

.notice-card__head strong {
  color: #15253f;
  font-size: 16px;
}

.notice-card__head time {
  color: #7c8798;
  font-size: 12px;
  white-space: nowrap;
}

.notice-card p {
  margin-top: 10px;
  color: #617085;
  line-height: 1.8;
}

.notice-card.is-info {
  background: linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%);
}

.notice-card.is-info .notice-card__tag {
  background: #dce8ff;
  color: #2450a6;
}

.notice-card.is-warning {
  background: linear-gradient(180deg, #fffaf2 0%, #fff0d7 100%);
}

.notice-card.is-warning .notice-card__tag {
  background: #ffe3ad;
  color: #b45309;
}

.notice-card.is-danger {
  background: linear-gradient(180deg, #fff7f6 0%, #ffe7e4 100%);
}

.notice-card.is-danger .notice-card__tag {
  background: #ffd0cb;
  color: #c2410c;
}

.notice-card.is-success {
  background: linear-gradient(180deg, #f6fff8 0%, #e8f8ee 100%);
}

.notice-card.is-success .notice-card__tag {
  background: #cfeeda;
  color: #15803d;
}

.notice-empty {
  padding: 26px 18px;
  border-radius: 18px;
  text-align: center;
  color: #7c8798;
}

@media (max-width: 960px) {
  .notice-summary {
    grid-template-columns: 1fr;
  }

  .notice-card {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .notice-hero,
  .notice-card__head {
    flex-direction: column;
    align-items: flex-start;
  }

  .notice-hero {
    padding: 20px;
  }

  .notice-hero h1 {
    font-size: 26px;
  }
}
</style>
