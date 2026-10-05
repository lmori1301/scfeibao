<script setup lang="ts">
/**
 * 值班台账上传入口（右侧悬浮卡片）
 *
 * 设计参考：浅蓝底水平卡片 + 红色标题 + 右侧「入口 >」
 * 点击打开上传弹窗。卡片位置下移，避免遮挡 banner 主视觉。
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
    <button type="button" class="duty-entry__panel" aria-label="上传应急值班值守台账" @click="openDialog">
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
  top: 62%;
  z-index: 880;
  font-family: "Alibaba PuHuiTi-Regular", "Microsoft YaHei", sans-serif;
}

.duty-entry__panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 18px 14px 20px;
  border: none;
  border-radius: 10px 0 0 10px;
  background: linear-gradient(135deg, #d6ecff 0%, #c3e2ff 100%);
  color: #e60012;
  cursor: pointer;
  box-shadow: -2px 2px 12px rgba(0, 60, 130, 0.12);
  transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
}

.duty-entry__panel:hover {
  background: linear-gradient(135deg, #c3e2ff 0%, #aed8ff 100%);
  box-shadow: -4px 4px 18px rgba(0, 60, 130, 0.18);
  transform: translateX(-3px);
}

.duty-entry__title {
  font-size: 17px;
  font-weight: 700;
  line-height: 1.35;
  text-align: left;
  white-space: nowrap;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.6);
}

.duty-entry__action {
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  color: #e60012;
  white-space: nowrap;
}
</style>
