<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  Bell,
  Document,
  Files,
  Histogram,
  Postcard,
  RefreshRight,
  Tickets,
  User,
  Van,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import WorkbenchNav from '@/components/WorkbenchNav.vue'
import http from '@/utils/http'

type DashboardStats = {
  news: { total: number; trend: string }
  certificates: { total: number; trend: string }
  vehicles: { total: number; trend: string }
  personnel: { total: number; trend: string }
}

type TodoItem = {
  id: number
  title: string
  status: string
  priority: string
}

type NotificationItem = {
  id: number
  type: string
  title: string
  content: string
  time: string
}

type LogItem = {
  id: number
  user: string
  action: string
  target: string
  time: string
}

const loading = ref(false)
const stats = ref<DashboardStats>({
  news: { total: 0, trend: '0%' },
  certificates: { total: 0, trend: '0%' },
  vehicles: { total: 0, trend: '0%' },
  personnel: { total: 0, trend: '0%' },
})
const todos = ref<TodoItem[]>([])
const notifications = ref<NotificationItem[]>([])
const logs = ref<LogItem[]>([])

const overviewCards = computed(() => [
  {
    key: 'news',
    label: '新闻内容',
    value: stats.value.news.total,
    trend: stats.value.news.trend,
    icon: Document,
    tone: 'blue',
    desc: '门户资讯与热点内容',
  },
  {
    key: 'certificates',
    label: '证书台账',
    value: stats.value.certificates.total,
    trend: stats.value.certificates.trend,
    icon: Postcard,
    tone: 'green',
    desc: '证照维护与到期跟踪',
  },
  {
    key: 'vehicles',
    label: '车辆档案',
    value: stats.value.vehicles.total,
    trend: stats.value.vehicles.trend,
    icon: Van,
    tone: 'amber',
    desc: '车辆状态与装备记录',
  },
  {
    key: 'personnel',
    label: '人员名录',
    value: stats.value.personnel.total,
    trend: stats.value.personnel.trend,
    icon: User,
    tone: 'red',
    desc: '队员资料与角色分配',
  },
])

const focusCards = computed(() => [
  {
    label: '待处理事项',
    value: todos.value.filter((item) => item.status === 'pending').length,
    icon: Tickets,
    caption: '需要尽快确认或派发',
  },
  {
    label: '处理中事项',
    value: todos.value.filter((item) => item.status === 'in_progress').length,
    icon: Files,
    caption: '正在流转中的任务',
  },
  {
    label: '最新通知',
    value: notifications.value.length,
    icon: Bell,
    caption: '系统提醒与公告播报',
  },
  {
    label: '今日操作',
    value: logs.value.length,
    icon: Histogram,
    caption: '近一轮系统行为采样',
  },
])

const focusRows = computed(() => [
  {
    key: 'ops',
    items: focusCards.value.slice(0, 2),
  },
  {
    key: 'alerts',
    items: focusCards.value.slice(2, 4),
  },
])

const pendingTodos = computed(() => todos.value.filter((item) => item.status === 'pending').slice(0, 4))
const inProgressTodos = computed(() => todos.value.filter((item) => item.status === 'in_progress').slice(0, 4))
const recentNotifications = computed(() => notifications.value.slice(0, 4))
const recentLogs = computed(() => logs.value.slice(0, 5))
const loadDashboardData = async () => {
  loading.value = true
  try {
    const [statsRes, todosRes, notificationsRes, logsRes] = await Promise.all([
      http.get('/admin/dashboard/stats'),
      http.get('/admin/dashboard/todos'),
      http.get('/admin/dashboard/notifications'),
      http.get('/admin/dashboard/logs', { params: { page: 1, pageSize: 5 } }),
    ])

    stats.value = statsRes.data
    todos.value = todosRes.data || []
    notifications.value = notificationsRes.data || []
    logs.value = logsRes.data?.list || []
  } catch {
    ElMessage.error('获取工作台数据失败')
  } finally {
    loading.value = false
  }
}

const formatTime = (value: string) => {
  if (!value) return '--'
  return new Date(value).toLocaleString('zh-CN', { hour12: false })
}

const priorityLabel = (priority: string) => {
  if (priority === 'high') return '高优先'
  if (priority === 'medium') return '中优先'
  return '低优先'
}

const priorityClass = (priority: string) => {
  if (priority === 'high') return 'is-high'
  if (priority === 'medium') return 'is-medium'
  return 'is-low'
}

const statusLabel = (status: string) => (status === 'pending' ? '待处理' : status === 'in_progress' ? '处理中' : '已完成')

const noticeClass = (type: string) => {
  if (type === 'danger') return 'is-danger'
  if (type === 'warning') return 'is-warning'
  if (type === 'success') return 'is-success'
  return 'is-info'
}

onMounted(() => {
  loadDashboardData()
})
</script>

<template>
  <div class="dashboard-page">
    <WorkbenchNav />

    <section class="dashboard-hero">
      <div class="dashboard-hero__content">
        <div class="dashboard-hero__crumb">系统首页 / 总览中心 / 工作台</div>
        <span class="dashboard-hero__eyebrow">SICHUAN FEIBAO COMMAND DESK</span>
        <h1>总览中心工作台</h1>
        <p>集中查看内容、证照、车辆、人员与系统动向，优先暴露当前最需要处理的事务。</p>
        <div class="dashboard-hero__actions">
          <el-button class="dashboard-hero__button dashboard-hero__button--primary" :loading="loading" @click="loadDashboardData">
            <el-icon><RefreshRight /></el-icon>
            刷新态势
          </el-button>
          <router-link to="/todo-list" class="dashboard-link-card">
            <strong>查看待办</strong>
            <span>当前 {{ pendingTodos.length }} 项待处理</span>
          </router-link>
        </div>
      </div>
      <div class="dashboard-hero__aside">
        <div class="signal-cluster">
          <div class="signal-card">
            <span>核心模块总量</span>
            <strong>
              {{ stats.news.total + stats.certificates.total + stats.vehicles.total + stats.personnel.total }}
            </strong>
            <p>内容、证照、车辆与人员四类核心数据汇总。</p>
          </div>
          <div class="signal-stack">
            <article v-for="row in focusRows" :key="row.key" class="signal-row-card">
              <section v-for="item in row.items" :key="item.label" class="signal-row-card__item">
                <div class="signal-row-card__icon">
                  <el-icon><component :is="item.icon" /></el-icon>
                </div>
                <div class="signal-row-card__body">
                  <span>{{ item.label }}</span>
                  <strong>{{ item.value }}</strong>
                  <p>{{ item.caption }}</p>
                </div>
              </section>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="overview-grid">
      <article v-for="card in overviewCards" :key="card.key" class="overview-card" :class="`overview-card--${card.tone}`">
        <div class="overview-card__head">
          <div class="overview-card__icon">
            <el-icon><component :is="card.icon" /></el-icon>
          </div>
          <span class="overview-card__trend">{{ card.trend }}</span>
        </div>
        <strong class="overview-card__value">{{ card.value }}</strong>
        <span class="overview-card__label">{{ card.label }}</span>
        <p>{{ card.desc }}</p>
      </article>
    </section>

    <section class="command-grid">
      <article class="command-panel command-panel--todo">
        <div class="command-panel__head">
          <div>
            <span class="command-panel__eyebrow">TASK BOARD</span>
            <h2>待办流转</h2>
          </div>
          <router-link to="/todo-list" class="command-panel__more">进入待办页</router-link>
        </div>

        <div class="todo-lanes">
          <section class="todo-lane">
            <header class="todo-lane__head">
              <strong>待处理</strong>
              <span>{{ pendingTodos.length }}</span>
            </header>
            <div v-if="pendingTodos.length" class="todo-lane__body">
              <article v-for="item in pendingTodos" :key="item.id" class="todo-chip">
                <p>{{ item.title }}</p>
                <div class="todo-chip__meta">
                  <span>{{ statusLabel(item.status) }}</span>
                  <span :class="priorityClass(item.priority)">{{ priorityLabel(item.priority) }}</span>
                </div>
              </article>
            </div>
            <div v-else class="empty-card">当前没有待处理事项</div>
          </section>

          <section class="todo-lane">
            <header class="todo-lane__head">
              <strong>处理中</strong>
              <span>{{ inProgressTodos.length }}</span>
            </header>
            <div v-if="inProgressTodos.length" class="todo-lane__body">
              <article v-for="item in inProgressTodos" :key="item.id" class="todo-chip">
                <p>{{ item.title }}</p>
                <div class="todo-chip__meta">
                  <span>{{ statusLabel(item.status) }}</span>
                  <span :class="priorityClass(item.priority)">{{ priorityLabel(item.priority) }}</span>
                </div>
              </article>
            </div>
            <div v-else class="empty-card">当前没有处理中事项</div>
          </section>
        </div>
      </article>

      <article class="command-panel command-panel--notice">
        <div class="command-panel__head">
          <div>
            <span class="command-panel__eyebrow">NOTICE STREAM</span>
            <h2>系统通知</h2>
          </div>
          <router-link to="/notifications" class="command-panel__more">查看全部通知</router-link>
        </div>

        <div v-if="recentNotifications.length" class="notice-stream">
          <article
            v-for="item in recentNotifications"
            :key="item.id"
            class="notice-card"
            :class="noticeClass(item.type)"
          >
            <div class="notice-card__head">
              <strong>{{ item.title }}</strong>
              <time>{{ formatTime(item.time) }}</time>
            </div>
            <p>{{ item.content }}</p>
          </article>
        </div>
        <div v-else class="empty-card">当前没有系统通知</div>
      </article>
    </section>

    <section class="command-panel command-panel--log">
      <div class="command-panel__head">
        <div>
          <span class="command-panel__eyebrow">ACTIVITY TRACE</span>
          <h2>最近操作日志</h2>
        </div>
        <router-link to="/workbench-log" class="command-panel__more">查看完整审计流</router-link>
      </div>

      <div v-if="recentLogs.length" class="log-timeline">
        <article v-for="row in recentLogs" :key="row.id" class="log-entry">
          <div class="log-entry__rail">
            <span class="log-entry__dot" />
          </div>
          <div class="log-entry__card">
            <div class="log-entry__head">
              <strong>{{ row.user }}</strong>
              <time>{{ formatTime(row.time) }}</time>
            </div>
            <p class="log-entry__action">{{ row.action }}</p>
            <p class="log-entry__target">{{ row.target || '未记录目标对象' }}</p>
          </div>
        </article>
      </div>
      <div v-else class="empty-card">当前没有操作日志</div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.dashboard-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.dashboard-hero,
.overview-card,
.command-panel,
.signal-card,
.todo-chip,
.notice-card,
.log-entry__card,
.empty-card {
  border: 1px solid rgba(207, 217, 232, 0.9);
  background: #fff;
}

.dashboard-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.9fr);
  gap: 14px;
  padding: 22px;
  border-radius: 28px;
  background:
    linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px),
    radial-gradient(circle at top left, rgba(111, 161, 255, 0.24), transparent 26%),
    radial-gradient(circle at 78% 18%, rgba(255, 255, 255, 0.14), transparent 20%),
    radial-gradient(circle at bottom right, rgba(84, 185, 255, 0.14), transparent 24%),
    linear-gradient(135deg, #102f57 0%, #163f73 46%, #1f5a9d 100%);
  background-size: 22px 22px, 22px 22px, auto, auto, auto, auto;
  color: #fff;
  overflow: hidden;
  box-shadow: 0 24px 48px rgba(19, 47, 95, 0.18);
  position: relative;
}

.dashboard-hero::after {
  content: '';
  position: absolute;
  inset: auto auto -120px -60px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, transparent 68%);
  pointer-events: none;
}

.dashboard-hero__content,
.dashboard-hero__aside {
  position: relative;
  z-index: 1;
}

.dashboard-hero__content {
  display: flex;
  flex-direction: column;
  min-width: 0;
  max-width: 620px;
}

.dashboard-hero__content h1 {
  font-size: 28px;
  line-height: 1.1;
  letter-spacing: 0.02em;
}

.dashboard-hero__crumb {
  margin-bottom: 10px;
  color: rgba(231, 238, 255, 0.72);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.dashboard-hero__content p {
  max-width: 560px;
  margin-top: 8px;
  color: rgba(236, 242, 255, 0.9);
  line-height: 1.65;
  font-size: 13px;
}

.dashboard-hero__eyebrow,
.command-panel__eyebrow {
  display: inline-flex;
  margin-bottom: 10px;
  color: rgba(231, 238, 255, 0.72);
  font-size: 11px;
  letter-spacing: 0.2em;
}

.dashboard-hero__actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 16px;
}

.dashboard-hero__button {
  height: 42px;
  padding-inline: 16px;
  border-radius: 13px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  font-weight: 700;
  box-shadow: none;
  transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease;
}

.dashboard-hero__button:deep(span) {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.dashboard-hero__button--primary {
  background: linear-gradient(135deg, #4d7dff 0%, #2c67f6 100%);
  color: #fff;
}

.dashboard-hero__button--primary:hover {
  transform: translateY(-1px);
  background: linear-gradient(135deg, #5a87ff 0%, #346efa 100%);
}

.dashboard-link-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-width: 196px;
  min-height: 42px;
  padding: 9px 14px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.08) 100%);
  color: #fff;
  backdrop-filter: blur(10px);
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
}

.dashboard-link-card:hover {
  transform: translateY(-1px);
  border-color: rgba(255, 255, 255, 0.28);
  background: linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.1) 100%);
}

.dashboard-link-card strong {
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
}

.dashboard-link-card span {
  color: rgba(229, 237, 255, 0.82);
  font-size: 11px;
  white-space: nowrap;
}

.dashboard-hero__aside {
  display: flex;
  min-width: 0;
}

.signal-cluster {
  width: 100%;
  padding: 12px;
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.06) 100%);
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.signal-card {
  position: relative;
  padding: 16px 18px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.1) 100%);
  color: #fff;
  backdrop-filter: blur(12px);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12);
  overflow: hidden;
}

.signal-card::after {
  content: '';
  position: absolute;
  right: -36px;
  bottom: -44px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.22) 0%, transparent 68%);
  pointer-events: none;
}

.signal-card span,
.signal-card p {
  color: rgba(236, 241, 255, 0.78);
}

.signal-card strong {
  display: block;
  margin: 6px 0 8px;
  font-size: 34px;
  line-height: 1;
}

.signal-stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.signal-row-card {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  padding: 10px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(248, 251, 255, 0.98) 0%, rgba(241, 246, 255, 0.95) 100%);
  color: #1e3354;
  box-shadow: 0 10px 20px rgba(14, 37, 78, 0.08);
  border: 1px solid rgba(225, 234, 247, 0.9);
}

.signal-row-card__item {
  position: relative;
  display: flex;
  gap: 10px;
  align-items: flex-start;
  min-width: 0;
  min-height: 90px;
  padding: 10px;
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(246,249,255,0.92) 100%);
  overflow: hidden;
}

.signal-row-card__item::after {
  content: '';
  position: absolute;
  inset: auto -16px -22px auto;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(55, 110, 255, 0.12) 0%, transparent 70%);
  pointer-events: none;
}

.signal-row-card__icon {
  width: 32px;
  height: 32px;
  border-radius: 11px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #edf3ff 0%, #dae7ff 100%);
  color: #2563eb;
  font-size: 17px;
  flex: 0 0 auto;
}

.signal-row-card__body {
  min-width: 0;
}

.signal-row-card__body span {
  display: block;
  color: #5a6780;
  font-size: 12px;
}

.signal-row-card__body strong {
  display: block;
  margin-top: 6px;
  font-size: 22px;
  line-height: 1;
}

.signal-row-card__body p {
  margin-top: 8px;
  color: #79869b;
  font-size: 11px;
  line-height: 1.6;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.overview-card {
  position: relative;
  padding: 18px;
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid rgba(211, 221, 237, 0.9);
  background:
    linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,251,255,0.96) 100%);
  box-shadow: 0 14px 28px rgba(27, 53, 102, 0.07);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.overview-card::before {
  content: '';
  position: absolute;
  inset: auto -36px -36px auto;
  width: 120px;
  height: 120px;
  border-radius: 999px;
  opacity: 0.16;
}

.overview-card::after {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 88px;
  background: linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0) 100%);
  pointer-events: none;
}

.overview-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 34px rgba(27, 53, 102, 0.11);
}

.overview-card--blue {
  background:
    radial-gradient(circle at top right, rgba(37, 99, 235, 0.12), transparent 34%),
    linear-gradient(180deg, #ffffff 0%, #f5f9ff 100%);
}

.overview-card--green {
  background:
    radial-gradient(circle at top right, rgba(22, 163, 74, 0.11), transparent 34%),
    linear-gradient(180deg, #ffffff 0%, #f6fcf8 100%);
}

.overview-card--amber {
  background:
    radial-gradient(circle at top right, rgba(217, 119, 6, 0.12), transparent 34%),
    linear-gradient(180deg, #ffffff 0%, #fffaf3 100%);
}

.overview-card--red {
  background:
    radial-gradient(circle at top right, rgba(220, 38, 38, 0.11), transparent 34%),
    linear-gradient(180deg, #ffffff 0%, #fff7f6 100%);
}

.overview-card--blue::before { background: #2563eb; }
.overview-card--green::before { background: #16a34a; }
.overview-card--amber::before { background: #d97706; }
.overview-card--red::before { background: #dc2626; }

.overview-card__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  z-index: 1;
}

.overview-card__icon {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #eef4ff 0%, #dde9ff 100%);
  color: #285ee7;
  font-size: 18px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.overview-card__trend {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  color: #2348a0;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid rgba(210, 221, 239, 0.85);
  backdrop-filter: blur(8px);
}

.overview-card__value {
  display: block;
  margin-top: 20px;
  font-size: 36px;
  line-height: 0.95;
  letter-spacing: -0.03em;
  color: #14233c;
  position: relative;
  z-index: 1;
}

.overview-card__label {
  display: block;
  margin-top: 8px;
  color: #44546f;
  font-size: 15px;
  font-weight: 700;
  position: relative;
  z-index: 1;
}

.overview-card p {
  margin-top: 10px;
  color: #78859b;
  font-size: 13px;
  line-height: 1.7;
  max-width: 220px;
  position: relative;
  z-index: 1;
}

.command-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.command-panel {
  position: relative;
  padding: 20px;
  border-radius: 24px;
  background:
    linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  border: 1px solid rgba(211, 221, 237, 0.9);
  box-shadow: 0 10px 30px rgba(25, 54, 105, 0.06);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.command-panel::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 4px;
  background: linear-gradient(90deg, rgba(37, 99, 235, 0.9) 0%, rgba(96, 165, 250, 0.18) 100%);
}

.command-panel::after {
  content: '';
  position: absolute;
  top: -42px;
  right: -42px;
  width: 168px;
  height: 168px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

.command-panel:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 36px rgba(25, 54, 105, 0.1);
  border-color: rgba(198, 211, 232, 0.95);
}

.command-panel--todo::before {
  background: linear-gradient(90deg, #2563eb 0%, rgba(96, 165, 250, 0.2) 100%);
}

.command-panel--notice::before {
  background: linear-gradient(90deg, #0f766e 0%, rgba(45, 212, 191, 0.2) 100%);
}

.command-panel--log::before {
  background: linear-gradient(90deg, #7c3aed 0%, rgba(167, 139, 250, 0.2) 100%);
}

.command-panel--log {
  padding-bottom: 10px;
}

.command-panel__head {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: flex-start;
  margin-bottom: 18px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(226, 233, 244, 0.88);
}

.command-panel__head h2 {
  font-size: 22px;
  color: #16253d;
  letter-spacing: -0.02em;
}

.command-panel__eyebrow {
  padding: 4px 10px;
  border-radius: 999px;
  background: #eef4ff;
  color: #59739d;
  letter-spacing: 0.16em;
}

.command-panel__more {
  color: #2a5ce5;
  font-size: 13px;
  font-weight: 700;
  padding: 9px 12px;
  border-radius: 12px;
  background: #f3f7ff;
  border: 1px solid #dfe9fb;
  transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease;
}

.command-panel__more:hover {
  transform: translateY(-1px);
  background: #edf4ff;
  border-color: #cddcf6;
}

.todo-lanes {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.todo-lane {
  position: relative;
  padding: 14px;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(247, 250, 255, 0.98) 0%, rgba(240, 245, 255, 0.95) 100%);
  border: 1px solid #dde7f7;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.75);
  overflow: hidden;
}

.todo-lane:first-child {
  background: linear-gradient(180deg, rgba(247, 250, 255, 0.98) 0%, rgba(237, 244, 255, 0.95) 100%);
}

.todo-lane:last-child {
  background: linear-gradient(180deg, rgba(248, 251, 255, 0.98) 0%, rgba(243, 247, 255, 0.95) 100%);
}

.todo-lane::after {
  content: '';
  position: absolute;
  inset: auto -24px -34px auto;
  width: 92px;
  height: 92px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 72%);
  pointer-events: none;
}

.todo-lane__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.todo-lane__head strong {
  color: #163053;
  font-size: 15px;
  letter-spacing: 0.01em;
}

.todo-lane__head span {
  min-width: 28px;
  height: 28px;
  padding: 0 8px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: #dce8ff;
  color: #2450a6;
  font-size: 12px;
  font-weight: 700;
}

.todo-lane__body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.todo-chip {
  position: relative;
  padding: 14px;
  border-radius: 18px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  box-shadow: 0 10px 18px rgba(30, 57, 104, 0.05);
  border: 1px solid rgba(227, 234, 245, 0.86);
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.todo-chip:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 24px rgba(30, 57, 104, 0.09);
  border-color: rgba(204, 217, 237, 0.95);
}

.todo-chip p {
  color: #1c2d48;
  font-weight: 700;
  line-height: 1.65;
  font-size: 14px;
}

.todo-chip__meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.todo-chip__meta span {
  padding: 4px 10px;
  border-radius: 999px;
  background: #f2f5fb;
  color: #657489;
  font-size: 12px;
}

.todo-chip__meta .is-high {
  background: #ffe7e6;
  color: #c2410c;
}

.todo-chip__meta .is-medium {
  background: #fff3dd;
  color: #b45309;
}

.todo-chip__meta .is-low {
  background: #ebf5ff;
  color: #2563eb;
}

.notice-stream {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.notice-card {
  position: relative;
  padding: 16px;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 12px 20px rgba(25, 54, 105, 0.05);
  border: 1px solid rgba(224, 232, 243, 0.92);
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.notice-card::after {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 4px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.78);
}

.notice-card__head {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: flex-start;
}

.notice-card__head strong {
  color: #16243b;
  font-size: 15px;
  line-height: 1.5;
}

.notice-card__head time {
  color: #6f7f98;
  font-size: 11px;
  white-space: nowrap;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.66);
  border: 1px solid rgba(221, 230, 242, 0.88);
}

.notice-card p {
  margin-top: 10px;
  color: #5e6b80;
  line-height: 1.8;
  font-size: 13px;
}

.notice-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 16px 24px rgba(25, 54, 105, 0.08);
}

.notice-card.is-info {
  background: linear-gradient(180deg, #f7fbff 0%, #eef5ff 100%);
}

.notice-card.is-info::after {
  background: #2563eb;
}

.notice-card.is-success {
  background: linear-gradient(180deg, #f5fff8 0%, #e8f8ee 100%);
}

.notice-card.is-success::after {
  background: #16a34a;
}

.notice-card.is-warning {
  background: linear-gradient(180deg, #fffaf1 0%, #fff0d6 100%);
}

.notice-card.is-warning::after {
  background: #d97706;
}

.notice-card.is-danger {
  background: linear-gradient(180deg, #fff7f6 0%, #ffe7e4 100%);
}

.notice-card.is-danger::after {
  background: #dc2626;
}

.log-timeline {
  position: relative;
  padding-bottom: 8px;
}

.log-entry {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  gap: 12px;
}

.log-entry + .log-entry {
  margin-top: 14px;
}

.log-entry__rail {
  position: relative;
  display: flex;
  justify-content: center;
}

.log-entry__rail::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: -18px;
  width: 2px;
  background: linear-gradient(180deg, #cfe0ff 0%, #e7eef9 100%);
}

.log-entry:last-child .log-entry__rail::before {
  bottom: 24px;
}

.log-entry__dot {
  position: relative;
  z-index: 1;
  width: 12px;
  height: 12px;
  margin-top: 8px;
  border: 3px solid #fff;
  border-radius: 50%;
  background: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.14);
}

.log-entry__card {
  padding: 16px 18px;
  border-radius: 18px;
  background:
    linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,255,0.96) 100%);
  box-shadow: 0 12px 22px rgba(26, 50, 97, 0.05);
  border: 1px solid rgba(224, 232, 243, 0.9);
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.log-entry__card:hover {
  transform: translateY(-1px);
  box-shadow: 0 16px 28px rgba(26, 50, 97, 0.08);
  border-color: rgba(205, 218, 237, 0.95);
}

.log-entry__head {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
}

.log-entry__head strong {
  color: #182842;
  font-size: 15px;
}

.log-entry__head time {
  color: #7c8798;
  font-size: 12px;
  white-space: nowrap;
}

.log-entry__action {
  margin-top: 10px;
  color: #23407c;
  font-weight: 700;
}

.log-entry__target {
  margin-top: 8px;
  color: #6b778d;
  line-height: 1.8;
}

.empty-card {
  padding: 26px 18px;
  border-radius: 18px;
  text-align: center;
  color: #7d8798;
  background: #fafcff;
}

@media (max-width: 1280px) {
  .dashboard-hero,
  .command-grid,
  .todo-lanes {
    grid-template-columns: 1fr;
  }

  .overview-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .dashboard-hero {
    padding: 20px;
  }

  .dashboard-hero__content h1 {
    font-size: 28px;
  }

  .overview-grid {
    grid-template-columns: 1fr;
  }

  .signal-row-card {
    grid-template-columns: 1fr;
  }

  .command-panel__head,
  .notice-card__head,
  .log-entry__head {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
