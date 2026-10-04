<script setup lang="ts">
/**
 * 标语横幅轮播（首页「动态要闻」板块上方）
 *
 * - 绝对定位于 Pixso 画布（1920x4430），随 frame 一起等比缩放
 * - 悬浮暂停轮播，移开继续
 * - 仅 1 条时不显示箭头与指示器，也不自动轮播
 * - 图片懒加载，非当前帧不请求
 */
import { computed, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

interface SloganItem {
  id: number
  imageUrl: string
  slogan: string
  link: string
  linkTarget: string
}

const props = defineProps<{ items: SloganItem[] }>()

const router = useRouter()
const currentIndex = ref(0)
const paused = ref(false)
let timer: number | null = null

const AUTO_PLAY_MS = 4000
const multiple = computed(() => props.items.length > 1)
const currentItem = computed(() => props.items[currentIndex.value] || null)

const startTimer = () => {
  stopTimer()
  if (!multiple.value || paused.value) return
  timer = window.setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % props.items.length
  }, AUTO_PLAY_MS)
}

const stopTimer = () => {
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
}

const go = (idx: number) => {
  if (!props.items.length) return
  currentIndex.value = (idx + props.items.length) % props.items.length
}

const prev = () => {
  go(currentIndex.value - 1)
  startTimer()
}

const next = () => {
  go(currentIndex.value + 1)
  startTimer()
}

const onEnter = () => {
  paused.value = true
  stopTimer()
}

const onLeave = () => {
  paused.value = false
  startTimer()
}

const handleClick = () => {
  const item = currentItem.value
  if (!item || !item.link) return
  if (item.linkTarget === '_blank') {
    window.open(item.link, '_blank', 'noopener,noreferrer')
  } else {
    // 站内地址走 router，避免整页刷新；站外地址用原生跳转
    if (item.link.startsWith('/')) {
      router.push(item.link)
    } else {
      window.location.href = item.link
    }
  }
}

watch(
  () => props.items.length,
  (len) => {
    currentIndex.value = 0
    stopTimer()
    if (len > 1) startTimer()
  },
  { immediate: true }
)

onUnmounted(stopTimer)
</script>

<template>
  <div
    v-if="items.length > 0"
    class="slogan-carousel"
    :class="{ 'is-clickable': !!currentItem?.link }"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <div class="slogan-carousel__viewport">
      <div
        class="slogan-carousel__track"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="(item, idx) in items"
          :key="item.id"
          class="slogan-carousel__slide"
          :aria-hidden="idx !== currentIndex"
        >
          <img
            class="slogan-carousel__img"
            :src="item.imageUrl"
            :alt="item.slogan || '标语横幅'"
            :loading="idx === 0 ? 'eager' : 'lazy'"
            decoding="async"
            @click.stop="idx === currentIndex && handleClick()"
          />
          <p v-if="item.slogan" class="slogan-carousel__text">{{ item.slogan }}</p>
        </div>
      </div>
    </div>

    <!-- 切换箭头：仅多条时显示 -->
    <button
      v-if="multiple"
      type="button"
      class="slogan-carousel__arrow slogan-carousel__arrow--prev"
      aria-label="上一条"
      @click.stop="prev"
    >
      <span>‹</span>
    </button>
    <button
      v-if="multiple"
      type="button"
      class="slogan-carousel__arrow slogan-carousel__arrow--next"
      aria-label="下一条"
      @click.stop="next"
    >
      <span>›</span>
    </button>

    <!-- 指示器：仅多条时显示 -->
    <div v-if="multiple" class="slogan-carousel__dots">
      <button
        v-for="(item, idx) in items"
        :key="`dot-${item.id}`"
        type="button"
        class="slogan-carousel__dot"
        :class="{ active: idx === currentIndex }"
        :aria-label="`切换到第 ${idx + 1} 条`"
        @click.stop="go(idx)"
      ></button>
    </div>
  </div>
</template>

<style scoped>
.slogan-carousel {
  position: absolute;
  left: 5.89%;
  right: 5.83%;
  top: 23.24%;
  height: 96px;
  overflow: hidden;
  background-color: rgba(245, 247, 250, 1);
}

.slogan-carousel.is-clickable {
  cursor: pointer;
}

.slogan-carousel__viewport {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.slogan-carousel__track {
  display: flex;
  height: 100%;
  transition: transform 0.45s ease;
  will-change: transform;
}

.slogan-carousel__slide {
  position: relative;
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
}

.slogan-carousel__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  -webkit-user-drag: none;
}

/* 标语文字：图片自带文字时可无 slogan，此时不占位 */
.slogan-carousel__text {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 6px 16px;
  font-size: 15px;
  line-height: 20px;
  color: #fff;
  text-align: center;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0));
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  pointer-events: none;
}

/* ---- 箭头 ---- */
.slogan-carousel__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.32);
  color: #fff;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.25s ease, background 0.25s ease;
  z-index: 2;
}

.slogan-carousel:hover .slogan-carousel__arrow {
  opacity: 1;
}

.slogan-carousel__arrow:hover {
  background: rgba(0, 0, 0, 0.55);
}

.slogan-carousel__arrow--prev {
  left: 10px;
}

.slogan-carousel__arrow--next {
  right: 10px;
}

/* ---- 指示器 ---- */
.slogan-carousel__dots {
  position: absolute;
  right: 12px;
  bottom: 8px;
  display: flex;
  gap: 6px;
  z-index: 2;
}

.slogan-carousel__dot {
  width: 8px;
  height: 8px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.55);
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.35);
  cursor: pointer;
  transition: background 0.25s ease, width 0.25s ease;
}

.slogan-carousel__dot.active {
  width: 18px;
  border-radius: 4px;
  background: #fff;
}
</style>
