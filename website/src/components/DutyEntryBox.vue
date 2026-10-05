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
      <span class="duty-entry__title">应急值班值守台账</span>
      <span class="duty-entry__action" aria-hidden="true">入口 &gt;</span>
    </button>

    <DutyImportDialog v-model="dialogVisible" />
  </div>
</template>

<style scoped>
.duty-entry {
  position: fixed;
  right: 0;
  top: 26%;
  z-index: 880;
  font-family: "Alibaba PuHuiTi-Regular", "Microsoft YaHei", sans-serif;
}

.duty-entry__cube {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 124px;
  height: 124px;
  padding: 14px 10px;
  border: none;
  border-radius: 12px 0 0 12px;
  background: linear-gradient(135deg, #d6ecff 0%, #c3e2ff 100%);
  color: #e60012;
  cursor: pointer;
  box-shadow: -2px 2px 14px rgba(0, 60, 130, 0.14);
  transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
}

.duty-entry__cube:hover {
  background: linear-gradient(135deg, #c3e2ff 0%, #aed8ff 100%);
  box-shadow: -4px 4px 20px rgba(0, 60, 130, 0.2);
  transform: translateX(-3px);
}

.duty-entry__title {
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  text-align: center;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.6);
}

.duty-entry__action {
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  color: #e60012;
}
</style>
