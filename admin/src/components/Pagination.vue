<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  total: number
  page: number
  pageSize: number
  pageSizes?: number[]
}>(), {
  pageSizes: () => [10]
})

const emit = defineEmits<{
  change: [page: number, pageSize: number]
}>()

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

const handleCurrentChange = (page: number) => {
  emit('change', page, props.pageSize)
}
</script>

<template>
  <!--
    1:1 对齐 web2 ListPage.vue 的 .lp-pager：
    左侧「共 N 条 · 第 X / Y 页」12px 灰字（margin-right:auto 撑到最左），
    右侧 el-pagination layout="prev, pager, next, jumper" + background。
    web2 默认**不显示**「每页条数」下拉（只有页面显式声明 sizeOptions 时才在翻页器右侧额外渲染），
    故此处不再输出 sizes，与 web2 默认形态一致。
  -->
  <div v-if="total > 0" class="admin-pagination">
    <span class="admin-pagination__total">共 {{ total }} 条 · 第 {{ page }} / {{ totalPages }} 页</span>
    <el-pagination
      :current-page="page"
      :page-size="pageSize"
      :total="total"
      :pager-count="7"
      background
      layout="prev, pager, next, jumper"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
