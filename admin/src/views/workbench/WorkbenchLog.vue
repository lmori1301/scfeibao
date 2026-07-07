<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RefreshRight } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import WorkbenchNav from '@/components/WorkbenchNav.vue'
import http from '@/utils/http'

type LogItem = {
  id: number
  user: string
  action: string
  target: string
  time: string
}

const loading = ref(false)
const logs = ref<LogItem[]>([])

const loadLogs = async () => {
  loading.value = true
  try {
    const res = await http.get('/admin/dashboard/logs', { params: { page: 1, pageSize: 20 } })
    logs.value = res.data?.list || []
  } catch {
    ElMessage.error('获取操作日志失败')
  } finally {
    loading.value = false
  }
}

const formatTime = (time: string) => new Date(time).toLocaleString('zh-CN', { hour12: false })

onMounted(loadLogs)
</script>

<template>
  <div class="log-page">
    <WorkbenchNav />

    <section class="log-hero">
      <div>
        <div class="log-hero__crumb">系统首页 / 总览中心 / 操作日志</div>
        <span class="log-hero__eyebrow">AUDIT ACTIVITY FEED</span>
        <h1>操作日志</h1>
        <p>按时间串联用户行为，突出“谁在何时对什么对象做了什么”，便于审计和回溯。</p>
      </div>
      <el-button plain :loading="loading" @click="loadLogs">
        <el-icon><RefreshRight /></el-icon>
        刷新日志
      </el-button>
    </section>

    <section class="log-stream">
      <article v-for="row in logs" :key="row.id" class="log-row">
        <div class="log-row__rail">
          <span class="log-row__dot" />
        </div>
        <div class="log-row__card">
          <div class="log-row__head">
            <div>
              <strong>{{ row.user }}</strong>
              <span>{{ formatTime(row.time) }}</span>
            </div>
            <em>审计记录</em>
          </div>
          <p class="log-row__action">{{ row.action }}</p>
          <p class="log-row__target">{{ row.target || '未记录目标内容' }}</p>
        </div>
      </article>

      <div v-if="!logs.length" class="log-empty">当前没有操作日志</div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.log-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.log-hero,
.log-row__card,
.log-empty {
  border: 1px solid #dfe8f6;
  background: #fff;
}

.log-hero {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  padding: 24px;
  border-radius: 26px;
  background:
    radial-gradient(circle at right top, rgba(31, 104, 255, 0.14), transparent 32%),
    linear-gradient(135deg, #f8fbff 0%, #eef4ff 100%);
}

.log-hero__eyebrow {
  display: inline-flex;
  margin-bottom: 10px;
  color: #5d7091;
  font-size: 11px;
  letter-spacing: 0.2em;
}

.log-hero__crumb {
  margin-bottom: 12px;
  color: #7a889d;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.log-hero h1 {
  font-size: 30px;
  color: #15263f;
}

.log-hero p {
  max-width: 680px;
  margin-top: 10px;
  color: #637289;
  line-height: 1.8;
}

.log-stream {
  position: relative;
}

.log-row {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  gap: 14px;
}

.log-row + .log-row {
  margin-top: 14px;
}

.log-row__rail {
  position: relative;
  display: flex;
  justify-content: center;
}

.log-row__rail::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: -18px;
  width: 2px;
  background: linear-gradient(180deg, #cfe0ff 0%, #e7eef9 100%);
}

.log-row:last-of-type .log-row__rail::before {
  bottom: 22px;
}

.log-row__dot {
  position: relative;
  z-index: 1;
  width: 14px;
  height: 14px;
  margin-top: 8px;
  border: 3px solid #fff;
  border-radius: 50%;
  background: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.14);
}

.log-row__card {
  padding: 18px 20px;
  border-radius: 20px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
}

.log-row__head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}

.log-row__head strong {
  display: block;
  color: #182842;
  font-size: 16px;
}

.log-row__head span {
  display: block;
  margin-top: 6px;
  color: #7c8798;
  font-size: 12px;
}

.log-row__head em {
  padding: 6px 10px;
  border-radius: 999px;
  background: #edf4ff;
  color: #2852aa;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
}

.log-row__action {
  margin-top: 12px;
  color: #1f3f7c;
  font-weight: 700;
  line-height: 1.7;
}

.log-row__target {
  margin-top: 8px;
  color: #69768a;
  line-height: 1.8;
}

.log-empty {
  margin-left: 42px;
  padding: 26px 18px;
  border-radius: 18px;
  text-align: center;
  color: #7c8798;
}

@media (max-width: 768px) {
  .log-hero,
  .log-row__head {
    flex-direction: column;
    align-items: flex-start;
  }

  .log-hero {
    padding: 20px;
  }

  .log-hero h1 {
    font-size: 26px;
  }
}
</style>
