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
    labelWidth: '96px',
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
.qf {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 12px 16px;
}

.qf__form {
  flex: 1 1 auto;
  min-width: 0;
}

/* 查询字段网格：每列固定最小宽度，标签与控件在本格内左对齐、跨列标签基线一致 */
.qf__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(248px, 1fr));
  gap: 4px 16px;
  align-items: start;
}

/* 业务分组容器（由使用方在插槽内声明，跨组件作用域，需用 :deep 命中） */
.qf__grid :deep(.qf__group) {
  grid-column: 1 / -1;
}

.qf__grid :deep(.el-form-item) {
  margin-bottom: 0;
  /* 让 label 与控件在折叠态也能保持对齐 */
}

.qf__grid :deep(.el-form-item__label) {
  color: #5a6b85;
  font-size: 13px;
  font-weight: 500;
  line-height: 32px;
  padding-right: 10px;
}

.qf__grid :deep(.el-input),
.qf__grid :deep(.el-select),
.qf__grid :deep(.el-date-editor),
.qf__grid :deep(.el-cascader) {
  width: 100%;
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
  margin-left: 4px;
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

  .qf__grid {
    grid-template-columns: 1fr;
  }

  .qf__bar {
    justify-content: flex-start;
  }

  .qf__actions {
    flex-wrap: wrap;
  }
}
</style>
