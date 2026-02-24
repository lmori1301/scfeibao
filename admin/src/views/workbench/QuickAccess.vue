<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const businessEntries = [
  { icon: 'Document', label: '发布新闻', path: '/news', color: '#409eff' },
  { icon: 'Postcard', label: '新增证书', path: '/certificates', color: '#67c23a' },
  { icon: 'Van', label: '查询车辆', path: '/vehicles', color: '#e6a23c' },
  { icon: 'User', label: '新增人员', path: '/personnel', color: '#f56c6c' }
]

const systemEntries = [
  { icon: 'FolderOpened', label: '手动备份', path: '/data-backup', color: '#909399' },
  { icon: 'Document', label: '查看日志', path: '/operation-log', color: '#606266' },
  { icon: 'Setting', label: '系统设置', path: '/site-config', color: '#303133' }
]

const goTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="quick-access">
    <h2>快捷入口</h2>

    <div class="section">
      <h3>高频业务</h3>
      <div class="entries">
        <div v-for="entry in businessEntries" :key="entry.path" class="entry-card" @click="goTo(entry.path)">
          <el-icon :color="entry.color" :size="32"><component :is="entry.icon" /></el-icon>
          <span>{{ entry.label }}</span>
        </div>
      </div>
    </div>

    <div class="section">
      <h3>运维操作</h3>
      <div class="entries">
        <div v-for="entry in systemEntries" :key="entry.path" class="entry-card" @click="goTo(entry.path)">
          <el-icon :color="entry.color" :size="32"><component :is="entry.icon" /></el-icon>
          <span>{{ entry.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.quick-access {
  h2 { margin: 0 0 24px 0; font-size: 20px; font-weight: 500; }

  .section {
    margin-bottom: 32px;
    h3 { margin: 0 0 16px 0; font-size: 16px; font-weight: 500; color: #606266; }

    .entries {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 16px;

      .entry-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        padding: 24px;
        background: #fff;
        border: 1px solid #e4e7ed;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          border-color: #409eff;
          box-shadow: 0 2px 12px rgba(64, 158, 255, 0.2);
          transform: translateY(-2px);
        }

        span { font-size: 14px; color: #303133; }
      }
    }
  }
}
</style>
