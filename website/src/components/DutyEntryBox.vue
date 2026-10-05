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
    position: relative;
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
    /* 四川消防救援队列实景图作底 + 深红蒙版压暗，保证白色文字可读 */
    background-image:
        linear-gradient(180deg, rgba(150, 12, 18, 0.46) 0%, rgba(104, 8, 12, 0.62) 100%),
        url('@/assets/images/Vector_1_1011.webp');
    background-size: 175%;
    background-position: 76% 42%;
    background-repeat: no-repeat;
    color: #fff;
    cursor: pointer;
    box-shadow: -2px 2px 10px rgba(154, 20, 24, 0.22);
    transition: transform 0.22s ease, box-shadow 0.22s ease, filter 0.22s ease;
}

/* hover 时略微提亮图片、蒙版变浅，避免整块死黑 */
.duty-entry__cube:hover {
    background-image:
        linear-gradient(180deg, rgba(176, 22, 27, 0.34) 0%, rgba(138, 12, 17, 0.50) 100%),
        url('@/assets/images/Vector_1_1011.webp');
    box-shadow: -3px 3px 14px rgba(154, 20, 24, 0.32);
    transform: translateX(-2px);
}

.duty-entry__title {
    font-size: 13px;
    font-weight: 700;
    line-height: 1.45;
    text-align: center;
    /* 背景图上叠字，用双层投影 + 白色描边提升对比 */
    text-shadow:
        0 1px 2px rgba(0, 0, 0, 0.85),
        0 0 4px rgba(0, 0, 0, 0.6);
}

.duty-entry__action {
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  color: #fff;
}
</style>
