<template>
  <div class="pagination-wrapper" :class="{ 'pagination-wrapper--portal': variant === 'portal' }">
    <div class="pagination-container">
      <!-- 总条数 -->
      <div class="pagination-total">
        共计 {{ total }} 条
      </div>

      <!-- 分页控制 -->
      <div class="pagination-controls">
        <!-- 上一页 -->
        <button
          class="pagination-btn prev-btn"
          :disabled="currentPage === 1"
          @click="handlePageChange(currentPage - 1)"
        >
          &lt;
        </button>

        <!-- 第一页 -->
        <button
          v-if="totalPages > 0"
          class="pagination-btn page-btn"
          :class="{ active: currentPage === 1 }"
          @click="handlePageChange(1)"
        >
          1
        </button>

        <!-- 左侧省略号 -->
        <span v-if="showLeftEllipsis" class="pagination-ellipsis">...</span>

        <!-- 中间页码 -->
        <button
          v-for="page in visiblePages"
          :key="page"
          v-show="page !== 1 && page !== totalPages"
          class="pagination-btn page-btn"
          :class="{ active: currentPage === page }"
          @click="handlePageChange(page)"
        >
          {{ page }}
        </button>

        <!-- 右侧省略号 -->
        <span v-if="showRightEllipsis" class="pagination-ellipsis">...</span>

        <!-- 最后一页 -->
        <button
          v-if="totalPages > 1"
          class="pagination-btn page-btn"
          :class="{ active: currentPage === totalPages }"
          @click="handlePageChange(totalPages)"
        >
          {{ totalPages }}
        </button>

        <!-- 下一页 -->
        <button
          class="pagination-btn next-btn"
          :disabled="currentPage === totalPages"
          @click="handlePageChange(currentPage + 1)"
        >
          &gt;
        </button>
      </div>

      <!-- 每页条数选择 -->
      <div class="pagination-size">
        <select
          :value="pageSize"
          @change="handleSizeChange"
          class="pagination-select"
        >
          <option
            v-for="size in pageSizeOptions"
            :key="size"
            :value="size"
          >
            {{ size }}条/页
          </option>
        </select>
      </div>

      <!-- 跳页功能 -->
      <div class="pagination-jump">
        <span v-if="variant === 'portal'" class="pagination-jump-label">前往</span>
        <input
          type="number"
          v-model.number="jumpPageValue"
          :min="1"
          :max="totalPages"
          class="pagination-input"
          @keyup.enter="handleJump"
        >
        <span v-if="variant === 'portal'" class="pagination-jump-suffix">页</span>
        <button
          class="pagination-btn jump-btn"
          @click="handleJump"
        >
          {{ variant === 'portal' ? '确定' : '前往' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Props {
  total?: number
  currentPage?: number
  pageSize?: number
  pageSizeOptions?: number[]
  /** 证书查询等门户页：细线框当前页、蓝色主色 */
  variant?: 'default' | 'portal'
}

interface Emits {
  (e: 'update:currentPage', value: number): void
  (e: 'update:pageSize', value: number): void
  (e: 'page-change', page: number): void
  (e: 'size-change', size: number): void
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: 1,
  pageSize: 10,
  total: 0,
  pageSizeOptions: () => [10, 20, 50, 100],
  variant: 'default',
})

const emit = defineEmits<Emits>()

// 跳页输入值
const jumpPageValue = ref(props.currentPage)

// 监听currentPage变化，同步jumpPageValue
watch(() => props.currentPage, (newVal) => {
  jumpPageValue.value = newVal
})

// 计算总页数（避免 total/pageSize 非数字或全量列表导致页码爆炸）
const totalPages = computed(() => {
  const t = Math.max(0, Math.floor(Number(props.total)) || 0)
  const ps = Math.max(1, Math.floor(Number(props.pageSize)) || 10)
  return Math.max(1, Math.ceil(t / ps))
})

// 计算显示的页码
const visiblePages = computed(() => {
  const pages: number[] = []
  const total = totalPages.value
  const current = Math.max(1, Math.floor(Number(props.currentPage)) || 1)

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= Math.min(5, total); i++) {
        pages.push(i)
      }
    } else if (current >= total - 3) {
      for (let i = Math.max(1, total - 4); i <= total; i++) {
        pages.push(i)
      }
    } else {
      for (let i = current - 2; i <= current + 2; i++) {
        if (i >= 1 && i <= total) pages.push(i)
      }
    }
  }

  return pages
})

// 是否显示左侧省略号
const showLeftEllipsis = computed(() => {
  const cur = Math.max(1, Math.floor(Number(props.currentPage)) || 1)
  return totalPages.value > 7 && cur > 4
})

// 是否显示右侧省略号
const showRightEllipsis = computed(() => {
  const cur = Math.max(1, Math.floor(Number(props.currentPage)) || 1)
  return totalPages.value > 7 && cur < totalPages.value - 3
})

// 页码改变处理
function handlePageChange(page: number) {
  const cur = Math.max(1, Math.floor(Number(props.currentPage)) || 1)
  if (page < 1 || page > totalPages.value || page === cur) return
  emit('update:currentPage', page)
  emit('page-change', page)
}

// 每页条数改变处理
function handleSizeChange(event: Event) {
  const target = event.target as HTMLSelectElement
  const size = parseInt(target.value)
  emit('update:pageSize', size)
  emit('size-change', size)
  // 改变每页条数后，重置到第一页
  if (props.currentPage !== 1) {
    emit('update:currentPage', 1)
    emit('page-change', 1)
  }
}

// 跳页处理
function handleJump() {
  const page = Math.max(1, Math.min(jumpPageValue.value, totalPages.value))
  if (page !== props.currentPage) {
    emit('update:currentPage', page)
    emit('page-change', page)
  }
  jumpPageValue.value = page
}
</script>

<style scoped>
.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}

.pagination-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 总条数显示 */
.pagination-total {
  font-size: 14px;
  font-family: inherit;
  font-weight: 400;
  text-align: center;
  line-height: 22px;
  color: #333;
  white-space: nowrap;
}

/* 分页控制区域 */
.pagination-controls {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 分页按钮基础样式 */
.pagination-btn {
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  background: #fff;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-btn:hover:not(:disabled):not(.active) {
  border-color: #3578F8;
  color: #3578F8;
}

.pagination-btn:disabled {
  color: #ccc;
  cursor: not-allowed;
  background: #f5f5f5;
  border-color: #d9d9d9;
}

.pagination-btn.active {
  background: #3578F8;
  color: #fff;
  border-color: #3578F8;
}

/* 省略号 */
.pagination-ellipsis {
  padding: 0 4px;
  color: #999;
  font-size: 14px;
}

/* 每页条数选择器 */
.pagination-size {
  display: flex;
  align-items: center;
}

.pagination-select {
  height: 32px;
  padding: 0 8px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  background: #fff;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  outline: none;
}

.pagination-select:hover {
  border-color: #3578F8;
}

/* 跳页功能 */
.pagination-jump {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pagination-input {
  width: 50px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  text-align: center;
  outline: none;
  font-size: 14px;
}

.pagination-input:focus {
  border-color: #3578F8;
}

.jump-btn {
  padding: 0 12px;
  white-space: nowrap;
}

/* 门户查询页：当前页为蓝框白底，非当前页为朴素数字 */
.pagination-wrapper--portal .pagination-btn.page-btn.active {
  background: #fff;
  color: #3277d0;
  border-color: #3277d0;
  font-weight: 600;
}

.pagination-wrapper--portal .pagination-btn:hover:not(:disabled):not(.active) {
  border-color: #3277d0;
  color: #3277d0;
}

.pagination-wrapper--portal .pagination-select:hover,
.pagination-wrapper--portal .pagination-input:focus {
  border-color: #3277d0;
}

.pagination-wrapper--portal .pagination-jump-label,
.pagination-wrapper--portal .pagination-jump-suffix {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
}

.pagination-wrapper--portal .jump-btn {
  border-color: #3277d0;
  color: #3277d0;
  background: #fff;
}

.pagination-wrapper--portal .jump-btn:hover {
  background: #f0f7ff;
}
</style>
