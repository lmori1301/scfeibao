<script setup lang="ts">
/**
 * 值班台账上传入口（侧边悬浮）
 *
 * 收起态为贴在视口右侧的竖排入口，样式参考设计稿：
 * 浅蓝底 + 红色标题 + 右侧白色箭头。
 * 点击或悬浮展开表单弹窗（年份 / 队伍 / 附件）。
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
      <span class="duty-entry__text">上传应急值班值守台账</span>
      <span class="duty-entry__arrow" aria-hidden="true">›</span>
    </button>

    <DutyImportDialog v-model="dialogVisible" />
  </div>
</template>

<style scoped>
.duty-entry {
  position: fixed;
  right: 0;
  top: 38%;
  z-index: 880;
  font-family: "Alibaba PuHuiTi-Regular", "Microsoft YaHei", sans-serif;
}

.duty-entry__panel {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 26px 18px 26px 20px;
  border: none;
  border-radius: 0;
  background: linear-gradient(135deg, #d6ecff 0%, #c3e2ff 100%);
  color: #e60012;
  cursor: pointer;
  box-shadow: -2px 0 12px rgba(0, 60, 130, 0.12);
  transition: background 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease;
}

.duty-entry__panel:hover {
  background: linear-gradient(135deg, #c3e2ff 0%, #aed8ff 100%);
  box-shadow: -3px 0 18px rgba(0, 60, 130, 0.2);
  transform: translateX(-2px);
}

.duty-entry__text {
  /* 竖排逐字排列，与设计稿一致 */
  writing-mode: vertical-rl;
  text-orientation: upright;
  letter-spacing: 4px;
  font-size: 19px;
  font-weight: 700;
  line-height: 1.25;
  white-space: nowrap;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.6);
}

.duty-entry__arrow {
  font-size: 26px;
  line-height: 1;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 80, 160, 0.25);
  transform: translateY(-1px);
}
</style>
