<script setup lang="ts">
/**
 * 值班台账上传入口（右侧方块按钮）
 *
 * 设计参考：浅蓝底方块按钮，顶部红色标题「应急值班值守台账」、底部红色「入口 >」
 * 位置在 banner 下方 / 新闻板块右侧，不遮挡 banner 主视觉。
 * 点击后打开模态弹窗，背景页面变暗锁定。
 */
import { ref } from 'vue'
import DutyImportDialog from './DutyImportDialog.vue'

const dialogVisible = ref(false)
const openDialog = () => {
  dialogVisible.value = true
}
</script>

<template>
  <div class="duty-entry">
    <button type="button" class="duty-entry__cube" aria-label="上传应急值班值守台账" @click="openDialog">
      <span class="duty-entry__title">应急值班台账</span>
      <span class="duty-entry__action" aria-hidden="true">入口 &gt;</span>
    </button>

    <DutyImportDialog v-model="dialogVisible" />
  </div>
</template>

<style scoped>
.duty-entry {
  position: fixed;
  right: 0;
  top: 32%;
  z-index: 100;
  font-family: "Alibaba PuHuiTi-Regular", "Microsoft YaHei", sans-serif;
}

.duty-entry__cube {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 90px;
  height: 90px;
  padding: 8px 6px;
  border: none;
  border-radius: 0;
  background: linear-gradient(135deg, #c41e24 0%, #9a1418 100%);
  color: #fff;
  cursor: pointer;
  box-shadow: -2px 2px 10px rgba(154, 20, 24, 0.22);
  transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
}

.duty-entry__cube:hover {
  background: linear-gradient(135deg, #a3181d 0%, #7d1013 100%);
  box-shadow: -3px 3px 14px rgba(154, 20, 24, 0.32);
  transform: translateX(-2px);
}

.duty-entry__title {
  font-size: 13px;
  font-weight: 700;
  line-height: 1.45;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
}

.duty-entry__action {
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  color: #fff;
}
</style>
