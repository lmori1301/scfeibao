<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowDown, ArrowUp, RefreshRight, Search } from '@element-plus/icons-vue'

const props = withDefaults(
  defineProps<{
    /** 查询进行中：禁用/loading 查询按钮 */
    searching?: boolean
    /** 是否启用「展开/收起」：为 true 时，带 .qf-advanced 的字段默认收起 */
    collapsible?: boolean
    /** 默认是否收起（仅当 collapsible=true 且存在高级字段时） */
    defaultCollapsed?: boolean
    /** 是否展示内置 查询/重置 按钮（可在 #actions 插槽自定义） */
    showActions?: boolean
    searchText?: string
    resetText?: string
    /** 表单项标签宽度 */
    labelWidth?: string
    /** 标签位置 */
    labelPosition?: 'left' | 'right' | 'top'
  }>(),
  {
    searching: false,
    collapsible: true,
    defaultCollapsed: true,
    showActions: true,
    searchText: '查询',
    resetText: '重置',
    labelWidth: '80px',
    labelPosition: 'right',
  }
)

const emit = defineEmits<{
  search: []
  reset: []
}>()

const collapsed = ref(props.collapsible ? props.defaultCollapsed : false)

const onSearch = () => {
  if (props.searching) return
  emit('search')
}
const onReset = () => {
  if (props.searching) return
  emit('reset')
}
const toggle = () => {
  collapsed.value = !collapsed.value
}

// 是否显示展开/收起按钮：仅当启用折叠时
const showToggle = computed(() => props.collapsible)
</script>

<template>
  <div
    class="qf"
    :class="{ 'qf--collapsed': showToggle && collapsed, 'qf--no-actions': !showActions }"
  >
    <el-form
      class="qf__form"
      :label-width="labelWidth"
      :label-position="labelPosition"
      @submit.prevent="onSearch"
      @keydown.enter.prevent="onSearch"
    >
      <div class="qf__grid">
        <slot />
      </div>
    </el-form>

    <!-- 操作区：searching 时禁用并 loading 查询按钮 -->
    <div v-if="showActions" class="qf__bar">
      <div class="qf__actions">
        <slot name="actions">
          <el-button type="primary" :loading="searching" @click="onSearch">
            <el-icon><Search /></el-icon>{{ searchText }}
          </el-button>
          <el-button :disabled="searching" @click="onReset">
            <el-icon><RefreshRight /></el-icon>{{ resetText }}
          </el-button>
        </slot>
      </div>
      <el-button
        v-if="showToggle"
        class="qf__toggle"
        text
        type="primary"
        @click="toggle"
      >
        {{ collapsed ? '展开' : '收起' }}
        <el-icon class="qf__toggle-icon">
          <ArrowDown v-if="collapsed" />
          <ArrowUp v-else />
        </el-icon>
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* 紧凑单行工具栏：字段定宽、左对齐，查询/重置紧随字段其后 */
.qf {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 10px 16px;
}

.qf__form {
  flex: 0 1 auto;
  min-width: 0;
}

/* 查询字段：横向紧凑排列，字段定宽、不拉伸 */
.qf__grid {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 14px;
  min-width: 0;
}

/* 业务分组容器：整行分隔标题（使用方在插槽内声明，需 :deep 命中） */
.qf__grid :deep(.qf__group) {
  flex: 0 0 100%;
}

.qf__grid :deep(.el-form-item) {
  flex: 0 0 auto;
  margin-bottom: 0;
}

.qf__grid :deep(.el-form-item__label) {
  color: #5a6b85;
  font-size: 13px;
  font-weight: 500;
  line-height: 32px;
  padding-right: 10px;
}

/* 字段控件统一宽度，保证多字段纵向对齐 */
.qf__grid :deep(.el-input),
.qf__grid :deep(.el-select),
.qf__grid :deep(.el-date-editor),
.qf__grid :deep(.el-cascader) {
  width: 200px;
}

/* 收起态：隐藏高级字段（使用方给字段加 .qf-advanced） */
.qf--collapsed :deep(.qf-advanced) {
  display: none;
}

.qf__bar {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;
  flex: 0 0 auto;
}

.qf__actions {
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;
}

/* 当没有自定义操作且非折叠时，保持与查询条左对齐 */
.qf--no-actions .qf__bar {
  display: none;
}

.qf__toggle {
  margin-left: 2px;
  white-space: nowrap;
}

.qf__toggle-icon {
  margin-left: 2px;
}

@media (max-width: 768px) {
  .qf {
    flex-direction: column;
    align-items: stretch;
  }

  .qf__form {
    width: 100%;
  }

  .qf__grid {
    gap: 10px 12px;
  }

  .qf__grid :deep(.el-form-item) {
    flex: 1 1 100%;
  }

  .qf__grid :deep(.el-input),
  .qf__grid :deep(.el-select),
  .qf__grid :deep(.el-date-editor),
  .qf__grid :deep(.el-cascader) {
    width: 100%;
  }

  .qf__bar {
    justify-content: flex-start;
  }

  .qf__actions {
    flex-wrap: wrap;
  }
}
</style>
