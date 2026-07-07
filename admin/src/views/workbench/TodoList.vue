<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Files, RefreshRight, Tickets } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import WorkbenchNav from '@/components/WorkbenchNav.vue'
import http from '@/utils/http'

type TodoItem = {
  id: number
  title: string
  status: string
  priority: string
}

const loading = ref(false)
const todos = ref<TodoItem[]>([])
const activeTab = ref<'pending' | 'in_progress' | 'done'>('pending')

const loadTodos = async () => {
  loading.value = true
  try {
    const res = await http.get('/admin/dashboard/todos')
    todos.value = res.data || []
  } catch {
    ElMessage.error('获取待办事项失败')
  } finally {
    loading.value = false
  }
}

const pendingTodos = computed(() => todos.value.filter((item) => item.status === 'pending'))
const progressingTodos = computed(() => todos.value.filter((item) => item.status === 'in_progress'))
const doneTodos = computed(() => todos.value.filter((item) => !['pending', 'in_progress'].includes(item.status)))
const tabItems = computed(() => [
  {
    key: 'pending' as const,
    label: '待处理',
    count: pendingTodos.value.length,
    list: pendingTodos.value,
    desc: '优先处理新进入队列、尚未分派的事项。',
  },
  {
    key: 'in_progress' as const,
    label: '处理中',
    count: progressingTodos.value.length,
    list: progressingTodos.value,
    desc: '跟踪已派发任务的推进状态与当前进展。',
  },
  {
    key: 'done' as const,
    label: '已完成',
    count: doneTodos.value.length,
    list: doneTodos.value,
    desc: '回看已闭环任务，快速确认最近处理结果。',
  },
])
const activeTabData = computed(() => tabItems.value.find((item) => item.key === activeTab.value) ?? tabItems.value[0])

const statusLabel = (status: string) => {
  if (status === 'pending') return '待处理'
  if (status === 'in_progress') return '处理中'
  return '已完成'
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

onMounted(loadTodos)
</script>

<template>
  <div class="todo-page">
    <WorkbenchNav />

    <section class="todo-hero">
      <div>
        <div class="todo-hero__crumb">系统首页 / 总览中心 / 待办事项</div>
        <span class="todo-hero__eyebrow">TASK COMMAND BOARD</span>
        <h1>待办事项</h1>
        <p>用页签切换不同状态的任务列表，优先级直接可见，便于值班人员快速分配和跟进。</p>
      </div>
      <el-button plain :loading="loading" @click="loadTodos">
        <el-icon><RefreshRight /></el-icon>
        刷新任务
      </el-button>
    </section>

    <section class="todo-summary">
      <article class="summary-card">
        <el-icon><Tickets /></el-icon>
        <div>
          <strong>{{ pendingTodos.length }}</strong>
          <span>待处理</span>
        </div>
      </article>
      <article class="summary-card">
        <el-icon><Files /></el-icon>
        <div>
          <strong>{{ progressingTodos.length }}</strong>
          <span>处理中</span>
        </div>
      </article>
      <article class="summary-card">
        <el-icon><RefreshRight /></el-icon>
        <div>
          <strong>{{ doneTodos.length }}</strong>
          <span>已完成</span>
        </div>
      </article>
    </section>

    <section class="todo-panel">
      <div class="todo-tabs" role="tablist" aria-label="待办状态切换">
        <button
          v-for="tab in tabItems"
          :key="tab.key"
          type="button"
          class="todo-tab"
          :class="{ 'is-active': activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          <span>{{ tab.label }}</span>
          <strong>{{ tab.count }}</strong>
        </button>
      </div>

      <div class="todo-list-panel">
        <header class="todo-list-panel__head">
          <div>
            <span class="todo-list-panel__eyebrow">TASK LIST</span>
            <h2>{{ activeTabData.label }}</h2>
            <p>{{ activeTabData.desc }}</p>
          </div>
          <span class="todo-list-panel__count">共 {{ activeTabData.count }} 项</span>
        </header>

        <div v-if="activeTabData.list.length" class="todo-list">
          <article
            v-for="item in activeTabData.list"
            :key="item.id"
            class="todo-card"
            :class="{ 'todo-card--done': activeTabData.key === 'done' }"
          >
            <div class="todo-card__main">
              <p>{{ item.title }}</p>
              <div class="todo-card__meta">
                <span>{{ statusLabel(item.status) }}</span>
                <span :class="priorityClass(item.priority)">{{ priorityLabel(item.priority) }}</span>
              </div>
            </div>
          </article>
        </div>
        <div v-else class="todo-empty">当前没有{{ activeTabData.label }}事项</div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.todo-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.todo-hero,
.summary-card,
.todo-panel,
.todo-list-panel,
.todo-card,
.todo-empty {
  border: 1px solid #dfe8f6;
  background: #fff;
}

.todo-hero {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  padding: 24px;
  border-radius: 26px;
  background:
    radial-gradient(circle at left top, rgba(42, 92, 229, 0.16), transparent 34%),
    linear-gradient(135deg, #f8fbff 0%, #eef4ff 100%);
}

.todo-hero__eyebrow {
  display: inline-flex;
  margin-bottom: 10px;
  color: #5d7091;
  font-size: 11px;
  letter-spacing: 0.2em;
}

.todo-hero__crumb {
  margin-bottom: 12px;
  color: #7a889d;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.todo-hero h1 {
  font-size: 30px;
  color: #15263f;
}

.todo-hero p {
  max-width: 620px;
  margin-top: 10px;
  color: #637289;
  line-height: 1.8;
}

.todo-summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.summary-card {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 18px;
  border-radius: 20px;
}

.summary-card :deep(.el-icon) {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #edf3ff 0%, #dae7ff 100%);
  color: #2a5ce5;
  font-size: 18px;
}

.summary-card strong {
  display: block;
  color: #14243e;
  font-size: 28px;
}

.summary-card span {
  display: block;
  margin-top: 3px;
  color: #66758d;
  font-size: 13px;
}

.todo-panel {
  position: relative;
  padding: 18px;
  border-radius: 24px;
  background: linear-gradient(180deg, #f8fbff 0%, #f2f7ff 100%);
  overflow: hidden;
}

.todo-panel::after {
  content: '';
  position: absolute;
  top: -72px;
  right: -40px;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(68, 127, 255, 0.12) 0%, transparent 70%);
  pointer-events: none;
}

.todo-tabs {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  padding: 6px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid #dfe8f6;
  width: fit-content;
  max-width: 100%;
}

.todo-tab {
  flex: 0 0 auto;
  min-width: 0;
  padding: 10px 14px;
  border: 0;
  border-radius: 14px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #5f7394;
  transition: color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
  white-space: nowrap;
}

.todo-tab span {
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
}

.todo-tab strong {
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(227, 236, 252, 0.92);
  color: #5e7398;
  font-size: 11px;
  font-weight: 700;
}

.todo-tab:hover {
  color: #36588f;
}

.todo-tab.is-active {
  color: #255ed8;
  background: linear-gradient(180deg, #edf4ff 0%, #e3edff 100%);
  box-shadow: inset 0 0 0 1px rgba(170, 197, 255, 0.9);
}

.todo-tab.is-active strong {
  background: linear-gradient(135deg, #2f6df7 0%, #5b8dff 100%);
  color: #fff;
}

.todo-list-panel {
  position: relative;
  z-index: 1;
  margin-top: 16px;
  padding: 18px;
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(246,250,255,0.96) 100%);
  box-shadow: 0 16px 32px rgba(32, 63, 115, 0.06);
}

.todo-list-panel__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding-bottom: 14px;
  border-bottom: 1px solid #e5edf9;
}

.todo-list-panel__eyebrow {
  display: inline-flex;
  margin-bottom: 8px;
  padding: 4px 10px;
  border-radius: 999px;
  background: #eef4ff;
  color: #60759a;
  font-size: 11px;
  letter-spacing: 0.16em;
}

.todo-list-panel__head h2 {
  color: #152741;
  font-size: 24px;
  letter-spacing: -0.02em;
}

.todo-list-panel__head p {
  margin-top: 8px;
  color: #69809f;
  font-size: 13px;
  line-height: 1.7;
}

.todo-list-panel__count {
  padding: 8px 12px;
  border-radius: 999px;
  background: #f3f7ff;
  border: 1px solid #dfe9fb;
  color: #56719d;
  font-size: 13px;
  font-weight: 700;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}

.todo-card {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 16px 18px;
  border-radius: 18px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  box-shadow: 0 10px 20px rgba(32, 63, 115, 0.05);
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
  overflow: hidden;
}

.todo-card::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 4px;
  border-radius: 999px;
  background: linear-gradient(180deg, #2f6df7 0%, #79a2ff 100%);
}

.todo-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 26px rgba(32, 63, 115, 0.08);
}

.todo-card__main {
  min-width: 0;
}

.todo-card p {
  color: #1a2b47;
  font-weight: 700;
  line-height: 1.65;
  font-size: 15px;
}

.todo-card--done {
  opacity: 0.82;
}

.todo-card--done::before {
  background: linear-gradient(180deg, #93a4be 0%, #c1cede 100%);
}

.todo-card__meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.todo-card__meta span {
  padding: 4px 10px;
  border-radius: 999px;
  background: #f2f5fb;
  color: #6b778d;
  font-size: 12px;
}

.todo-card__meta .is-high {
  background: #ffe7e6;
  color: #c2410c;
}

.todo-card__meta .is-medium {
  background: #fff1db;
  color: #b45309;
}

.todo-card__meta .is-low {
  background: #ebf5ff;
  color: #2563eb;
}

.todo-empty {
  margin-top: 16px;
  padding: 28px 16px;
  border-radius: 18px;
  text-align: center;
  color: #7a879b;
  background: rgba(255, 255, 255, 0.78);
}

@media (max-width: 1200px) {
  .todo-summary {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .todo-hero {
    flex-direction: column;
    padding: 20px;
  }

  .todo-hero h1 {
    font-size: 26px;
  }

  .todo-tabs,
  .todo-list-panel__head {
    flex-direction: column;
  }

  .todo-tab {
    width: auto;
    justify-content: flex-start;
  }
}
</style>
