<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Bell, House, List, Memo } from '@element-plus/icons-vue'

const route = useRoute()

const items = computed(() => [
  {
    path: '/dashboard',
    title: '总控台',
    desc: '查看总览态势与核心模块分布',
    icon: House,
  },
  {
    path: '/todo-list',
    title: '待办事项',
    desc: '按状态管理待处理与处理中任务',
    icon: List,
  },
  {
    path: '/workbench-log',
    title: '操作日志',
    desc: '追踪后台审计流与关键行为',
    icon: Memo,
  },
  {
    path: '/notifications',
    title: '系统通知',
    desc: '查看公告、预警与系统广播',
    icon: Bell,
  },
])
</script>

<template>
  <nav class="workbench-nav" aria-label="总览中心导航">
    <router-link
      v-for="item in items"
      :key="item.path"
      :to="item.path"
      class="workbench-nav__item"
      :class="{ 'is-active': route.path === item.path }"
    >
      <div class="workbench-nav__icon">
        <el-icon><component :is="item.icon" /></el-icon>
      </div>
      <div class="workbench-nav__body">
        <strong>{{ item.title }}</strong>
        <span>{{ item.desc }}</span>
      </div>
    </router-link>
  </nav>
</template>

<style scoped lang="scss">
.workbench-nav {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.workbench-nav__item {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 14px 16px;
  border: 1px solid #dfe8f6;
  border-radius: 18px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  color: #1c2d48;
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.workbench-nav__item:hover {
  transform: translateY(-1px);
  border-color: #bdd2ff;
  box-shadow: 0 10px 22px rgba(34, 76, 153, 0.08);
}

.workbench-nav__item.is-active {
  border-color: #8db0ff;
  background:
    radial-gradient(circle at top right, rgba(70, 117, 255, 0.14), transparent 32%),
    linear-gradient(135deg, #f4f8ff 0%, #ebf2ff 100%);
  box-shadow: 0 12px 24px rgba(39, 89, 181, 0.1);
}

.workbench-nav__icon {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #edf3ff 0%, #dae7ff 100%);
  color: #2a5ce5;
  font-size: 18px;
  flex: 0 0 auto;
}

.workbench-nav__body {
  min-width: 0;
}

.workbench-nav__body strong {
  display: block;
  font-size: 15px;
  color: #182842;
}

.workbench-nav__body span {
  display: block;
  margin-top: 4px;
  color: #69778d;
  font-size: 12px;
  line-height: 1.6;
}

@media (max-width: 1280px) {
  .workbench-nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .workbench-nav {
    grid-template-columns: 1fr;
  }
}
</style>
