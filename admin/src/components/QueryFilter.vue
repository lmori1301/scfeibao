<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'

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
    collapsible: false,
    defaultCollapsed: true,
    showActions: true,
    searchText: '查询',
    resetText: '重置',
    // label 宽度跟随内容（web2 的 <el-form inline> 就是内容自适应，没有固定 label-width）。
    // 之前写死 64px 会让「标题关键词」这类 5 字标签超出可用宽度(64-12=52px)后折行成两行，
    // 把查询卡从 58px 撑到 75px。auto 时 4 字标签仍是 64px，视觉与之前一致。
    labelWidth: 'auto',
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
    :class="{ 'qf--collapsed': showToggle && collapsed, 'qf--no-actions': !showActions && !showToggle }"
  >
    <!--
      1:1 对齐 web2 ListPage.vue：
      查询/重置 是 el-form 流内的**最后一个 el-form-item**（不是并排的独立 flex 列），
      因此字段换行时按钮会跟着落到下一行左侧，与 web2 完全一致；
      表单项 margin-right 32 / margin-bottom 12 也与 web2 的 inline form 相同。
    -->
    <el-form
      class="qf__form"
      :label-width="labelWidth"
      :label-position="labelPosition"
      @submit.prevent="onSearch"
      @keydown.enter.prevent="onSearch"
    >
      <div class="qf__grid">
        <slot />

        <!-- 操作区：内置 查询/重置 + 可选的 展开/收起
             label-width="0"：EP 会给无 label 的表单项写死 margin-left:64px（=表单 label 宽），
             去掉后按钮紧跟上一个字段（间距 32px）或换行后贴左，与 web2 一致 -->
        <el-form-item v-if="showActions || showToggle" class="qf__bar" label-width="0">
          <slot name="actions">
            <el-button type="primary" :loading="searching" @click="onSearch">
              {{ searchText }}
            </el-button>
            <el-button :disabled="searching" @click="onReset">
              {{ resetText }}
            </el-button>
          </slot>
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
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
/* web2 基准（ListPage.vue + theme.css）：
   .lp-toolbar .el-card__body { padding: 12px 12px 0 }
   .lp-toolbar .el-form-item  { margin-bottom: 12px }
   inline form 的 .el-form-item { margin-right: 32px }
   → 卡片高度 = 1 + 12 + 32 + 12 + 1 = 58px */
.qf {
  display: block;
  min-width: 0;
}

.qf__form {
  min-width: 0;
}

/* 查询字段：横向排列，字段定宽、不拉伸；间距交给表单项 margin（与 web2 一致） */
.qf__grid {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  min-width: 0;
}

/* 业务分组容器：已废弃（用 display:contents 让子项直接参与 flex 排布，
   分组标题与整行占位一并消失，对齐 web2 无分组标题的查询卡） */
.qf__grid :deep(.qf__group) {
  display: contents;
}

.qf__grid :deep(.el-form-item) {
  flex: 0 0 auto;
  margin-right: 32px;
  margin-bottom: 12px;
}

.qf__grid :deep(.el-form-item__label) {
  color: #606266;
  font-size: 13px;
  font-weight: 500;
  line-height: 32px;
  padding-right: 12px;
}

/* 字段控件统一宽度，对齐 web2：下拉 160 / 输入 260（保证多字段纵向对齐） */
.qf__grid :deep(.el-select) {
  width: 160px;
}

.qf__grid :deep(.el-input),
.qf__grid :deep(.el-date-editor),
.qf__grid :deep(.el-cascader) {
  width: 260px;
}

/* 收起态：隐藏高级字段（使用方给字段加 .qf-advanced） */
.qf--collapsed :deep(.qf-advanced) {
  display: none;
}

.qf__bar {
  margin-right: 0;
}

.qf__toggle {
  margin-left: 2px;
  white-space: nowrap;
}

.qf__toggle-icon {
  margin-left: 2px;
}

@media (max-width: 768px) {
  .qf__grid :deep(.el-form-item) {
    flex: 1 1 100%;
    margin-right: 0;
  }

  .qf__grid :deep(.el-input),
  .qf__grid :deep(.el-select),
  .qf__grid :deep(.el-date-editor),
  .qf__grid :deep(.el-cascader) {
    width: 100%;
  }
}
</style>
