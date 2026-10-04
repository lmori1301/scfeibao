<script setup lang="ts">
/**
 * 首页右下角「值班台账」悬浮卡片
 *
 * - 固定在视口右下角，随页面滚动始终可见（不受 Pixso 画布缩放影响）
 * - 悬浮 / 点击展开，显示当天值班：日期、值班干部、联系电话、值班员、备注
 * - 无当天值班记录时不渲染（不占位、不打扰）
 * - 电话可直接点击拨号
 */
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { getTeamDutyByDate, formatDateKey, type TeamDutyItem } from '@/api/team-duty'

const open = ref(false)
const loading = ref(false)
const today = formatDateKey(new Date())
const items = ref<TeamDutyItem[]>([])

const todayLabel = computed(() => {
  const d = new Date()
  const week = ['日', '一', '二', '三', '四', '五', '六'][d.getDay()]
  return `${d.getMonth() + 1}月${d.getDate()}日 周${week}`
})

/** 当天可能有多条（多支队伍），取第一条为主卡，其余折叠为次要条目 */
const primary = computed(() => items.value[0] || null)
const extra = computed(() => items.value.slice(1))

const staffList = (raw: string | null) =>
  (raw || '')
    .split(/[,，]/)
    .map((s) => s.trim())
    .filter(Boolean)

const primaryStaff = computed(() => staffList(primary.value?.dutyStaff))

const load = async () => {
  if (loading.value) return
  loading.value = true
  try {
    const res = await getTeamDutyByDate(today)
    const data = (res as any)?.data
    items.value = Array.isArray(data?.items) ? data.items : []
  } catch (error) {
    console.error('获取值班台账失败:', error)
    items.value = []
  } finally {
    loading.value = false
  }
}

const toggle = () => {
  open.value = !open.value
  if (open.value && items.value.length === 0) {
    void load()
  }
}

let timer: number | null = null
onMounted(() => {
  // 延迟到首屏空闲时再拉，避免与首页其它接口争抢带宽
  timer = window.setTimeout(() => void load(), 2500)
})
onUnmounted(() => {
  if (timer !== null) clearTimeout(timer)
})
</script>

<template>
  <div
    v-if="items.length > 0 || loading"
    class="duty-card"
    :class="{ 'is-open': open }"
    @mouseenter="open = true"
    @mouseleave="open = false"
  >
    <!-- 收起态：竖排标签 -->
    <button type="button" class="duty-card__trigger" :aria-expanded="open" @click="toggle">
      <span class="duty-card__trigger-icon">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            d="M7 3v3M17 3v3M3.5 9h17M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v12A1.5 1.5 0 0 1 19 20.5H5A1.5 1.5 0 0 1 3.5 19V7A1.5 1.5 0 0 1 5 5.5Z"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
          />
        </svg>
      </span>
      <span class="duty-card__trigger-text">值班台账</span>
    </button>

    <!-- 展开态：当天值班详情 -->
    <div v-if="open" class="duty-card__panel">
      <header class="duty-card__head">
        <div class="duty-card__head-main">
          <strong>今日值班</strong>
          <span class="duty-card__date">{{ todayLabel }}</span>
        </div>
        <button type="button" class="duty-card__close" aria-label="收起" @click="open = false">×</button>
      </header>

      <div v-if="loading" class="duty-card__body duty-card__body--empty">加载中…</div>

      <div v-else-if="!primary" class="duty-card__body duty-card__body--empty">今日暂无值班安排</div>

      <div v-else class="duty-card__body">
        <div class="duty-card__row">
          <span class="duty-card__label">队伍</span>
          <span class="duty-card__value">{{ primary.teamName }}</span>
        </div>

        <div class="duty-card__row">
          <span class="duty-card__label">值班日期</span>
          <span class="duty-card__value">{{ primary.dutyDate || today }}</span>
        </div>

        <div v-if="primary.dutyCadreName" class="duty-card__row">
          <span class="duty-card__label">值班干部</span>
          <span class="duty-card__value duty-card__value--strong">{{ primary.dutyCadreName }}</span>
        </div>

        <div v-if="primary.dutyCadrePhone" class="duty-card__row">
          <span class="duty-card__label">联系电话</span>
          <a class="duty-card__value duty-card__value--phone" :href="`tel:${primary.dutyCadrePhone}`">
            {{ primary.dutyCadrePhone }}
          </a>
        </div>

        <div v-if="primaryStaff.length" class="duty-card__row duty-card__row--staff">
          <span class="duty-card__label">值班员</span>
          <div class="duty-card__staff">
            <span v-for="(s, i) in primaryStaff" :key="i" class="duty-card__tag">{{ s }}</span>
          </div>
        </div>

        <div v-if="primary.remark" class="duty-card__row duty-card__row--remark">
          <span class="duty-card__label">备注</span>
          <span class="duty-card__value duty-card__value--remark">{{ primary.remark }}</span>
        </div>

        <div v-if="extra.length" class="duty-card__extra">
          <div v-for="e in extra" :key="e.id" class="duty-card__extra-item">
            <span class="duty-card__label">其他队伍</span>
            <span class="duty-card__value">{{ e.teamName }}{{ e.dutyCadreName ? ' · ' + e.dutyCadreName : '' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.duty-card {
  position: fixed;
  right: 20px;
  bottom: 90px;
  z-index: 900;
  font-family: "Alibaba PuHuiTi-Regular", "Microsoft YaHei", sans-serif;
}

/* ---- 收起态：竖排小标签 ---- */
.duty-card__trigger {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 7px;
  border: none;
  border-radius: 6px 0 0 6px;
  background: rgba(0, 92, 190, 0.92);
  color: #fff;
  cursor: pointer;
  writing-mode: vertical-rl;
  letter-spacing: 2px;
  font-size: 13px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18);
  transition: background 0.2s ease, transform 0.2s ease;
}

.duty-card__trigger:hover {
  background: rgba(0, 92, 190, 1);
  transform: translateX(-2px);
}

.duty-card__trigger-icon {
  display: flex;
  writing-mode: horizontal-tb;
}

.duty-card__trigger-text {
  line-height: 1;
}

/* ---- 展开态：详情面板 ---- */
.duty-card.is-open .duty-card__trigger {
  border-radius: 0;
}

.duty-card__panel {
  position: absolute;
  right: 100%;
  bottom: 0;
  width: 300px;
  border: 1px solid rgba(0, 92, 190, 0.18);
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.16);
  overflow: hidden;
}

.duty-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background: rgba(0, 92, 190, 0.06);
  border-bottom: 1px solid rgba(0, 92, 190, 0.12);
}

.duty-card__head-main {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.duty-card__head strong {
  font-size: 15px;
  color: #1f2d3d;
  letter-spacing: 1px;
}

.duty-card__date {
  font-size: 12px;
  color: #8492a6;
}

.duty-card__close {
  border: none;
  background: transparent;
  color: #8492a6;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  padding: 0 2px;
}

.duty-card__close:hover {
  color: #1f2d3d;
}

.duty-card__body {
  padding: 12px 14px 14px;
  max-height: 46vh;
  overflow-y: auto;
}

.duty-card__body--empty {
  color: #8492a6;
  font-size: 13px;
  text-align: center;
  padding: 22px 14px;
}

.duty-card__row {
  display: flex;
  gap: 10px;
  padding: 5px 0;
  font-size: 13px;
  line-height: 20px;
}

.duty-card__label {
  flex: 0 0 60px;
  color: #8492a6;
}

.duty-card__value {
  flex: 1;
  color: #1f2d3d;
  word-break: break-all;
}

.duty-card__value--strong {
  font-weight: 600;
}

.duty-card__value--phone {
  color: #005cbe;
  text-decoration: none;
}

.duty-card__value--phone:hover {
  text-decoration: underline;
}

.duty-card__value--remark {
  color: #5a6b7f;
  font-size: 12px;
}

.duty-card__staff {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.duty-card__tag {
  padding: 2px 8px;
  border-radius: 10px;
  background: rgba(0, 92, 190, 0.08);
  color: #005cbe;
  font-size: 12px;
  line-height: 18px;
}

.duty-card__extra {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed rgba(0, 92, 190, 0.16);
}

.duty-card__extra-item {
  display: flex;
  gap: 10px;
  padding: 3px 0;
  font-size: 12px;
}

.duty-card__extra-item .duty-card__label {
  flex-basis: 60px;
  font-size: 12px;
}
</style>
