<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'

/**
 * 固定比例图片裁剪器（无第三方依赖）
 * - 视口区域即最终输出区域，支持拖拽平移与 100%~300% 缩放
 * - 确认时按 outputWidth × outputHeight 用 canvas 导出 JPEG
 */
const props = withDefaults(
  defineProps<{
    modelValue: boolean
    src: string
    /** 宽 / 高 */
    aspectRatio: number
    outputWidth: number
    outputHeight: number
    title?: string
    hint?: string
  }>(),
  {
    title: '裁剪图片',
    hint: '',
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: [blob: Blob]
  closed: []
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

/** 视口宽度固定 680，高度按比例推算 */
const VIEW_W = 680
/** 保留小数，确保视口比例与输出比例严格一致 */
const viewH = computed(() => VIEW_W / props.aspectRatio)

const imgEl = ref<HTMLImageElement | null>(null)
const natural = ref({ w: 0, h: 0 })
/** 图片"铺满视口"所需的基础缩放 */
const baseScale = ref(1)
const zoom = ref(1)
const offset = ref({ x: 0, y: 0 })
const ready = ref(false)
const exporting = ref(false)
const dragging = ref(false)

const dispW = computed(() => natural.value.w * baseScale.value * zoom.value)
const dispH = computed(() => natural.value.h * baseScale.value * zoom.value)

const zoomPercent = computed({
  get: () => Math.round(zoom.value * 100),
  set: (value: number) => applyZoom(value / 100),
})

const clampOffset = () => {
  const minX = Math.min(0, VIEW_W - dispW.value)
  const minY = Math.min(0, viewH.value - dispH.value)
  offset.value = {
    x: Math.min(0, Math.max(minX, offset.value.x)),
    y: Math.min(0, Math.max(minY, offset.value.y)),
  }
}

const centerImage = () => {
  offset.value = {
    x: (VIEW_W - dispW.value) / 2,
    y: (viewH.value - dispH.value) / 2,
  }
}

const resetCrop = () => {
  const { w, h } = natural.value
  if (!w || !h) return
  baseScale.value = Math.max(VIEW_W / w, viewH.value / h)
  zoom.value = 1
  centerImage()
  clampOffset()
  ready.value = true
}

const onImgLoad = () => {
  const el = imgEl.value
  if (!el) return
  natural.value = { w: el.naturalWidth, h: el.naturalHeight }
  resetCrop()
}

/** 缩放时保持视口中心对应的原图位置不变 */
const applyZoom = (next: number) => {
  const clamped = Math.min(3, Math.max(1, next))
  if (!ready.value || clamped === zoom.value) return
  const prev = zoom.value
  const base = baseScale.value
  const cx = (VIEW_W / 2 - offset.value.x) / (base * prev)
  const cy = (viewH.value / 2 - offset.value.y) / (base * prev)
  zoom.value = clamped
  offset.value = {
    x: VIEW_W / 2 - cx * base * clamped,
    y: viewH.value / 2 - cy * base * clamped,
  }
  clampOffset()
}

let dragStart = { x: 0, y: 0, ox: 0, oy: 0 }

const onPointerDown = (event: PointerEvent) => {
  if (!ready.value) return
  event.preventDefault()
  dragging.value = true
  dragStart = { x: event.clientX, y: event.clientY, ox: offset.value.x, oy: offset.value.y }
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp, { once: true })
}

const onPointerMove = (event: PointerEvent) => {
  if (!dragging.value) return
  offset.value = {
    x: dragStart.ox + (event.clientX - dragStart.x),
    y: dragStart.oy + (event.clientY - dragStart.y),
  }
  clampOffset()
}

const onPointerUp = () => {
  dragging.value = false
  window.removeEventListener('pointermove', onPointerMove)
}

const onWheel = (event: WheelEvent) => {
  if (!ready.value) return
  applyZoom(zoom.value - event.deltaY * 0.001)
}

const handleConfirm = async () => {
  const el = imgEl.value
  if (!el || !ready.value) return
  exporting.value = true
  try {
    const scale = baseScale.value * zoom.value
    // 视口在原图坐标系中的可见区域
    const sx = Math.max(0, -offset.value.x / scale)
    const sy = Math.max(0, -offset.value.y / scale)
    const sw = Math.min(natural.value.w - sx, VIEW_W / scale)
    const sh = Math.min(natural.value.h - sy, viewH.value / scale)

    const canvas = document.createElement('canvas')
    canvas.width = props.outputWidth
    canvas.height = props.outputHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('浏览器不支持画布导出')
    // 透明图转 JPEG 时铺白底，避免出现黑块
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(el, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height)

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', 0.92)
    )
    if (!blob) throw new Error('裁剪图片导出失败')
    emit('confirm', blob)
    visible.value = false
  } finally {
    exporting.value = false
  }
}

const handleClosed = () => {
  ready.value = false
  natural.value = { w: 0, h: 0 }
  zoom.value = 1
  offset.value = { x: 0, y: 0 }
  emit('closed')
}

watch(
  () => props.src,
  async () => {
    ready.value = false
    await nextTick()
    const el = imgEl.value
    if (el?.complete && el.naturalWidth) onImgLoad()
  }
)

const lowResolution = computed(
  () => natural.value.w > 0 && (natural.value.w < props.outputWidth || natural.value.h < props.outputHeight)
)
</script>

<template>
  <el-dialog
    v-model="visible"
    :title="title"
    width="760px"
    align-center
    append-to-body
    destroy-on-close
    class="image-cropper-dialog"
    @closed="handleClosed"
  >
    <div class="image-cropper">
      <p class="image-cropper__tip">
        拖动图片调整位置，滚轮或下方滑块缩放；框内区域即最终展示效果。
      </p>

      <div
        class="image-cropper__viewport"
        :style="{ width: `${VIEW_W}px`, height: `${viewH}px` }"
        @pointerdown="onPointerDown"
        @wheel.prevent="onWheel"
      >
        <img
          v-if="src"
          ref="imgEl"
          :src="src"
          alt="待裁剪图片"
          draggable="false"
          class="image-cropper__img"
          :style="{
            width: `${dispW}px`,
            height: `${dispH}px`,
            transform: `translate(${offset.x}px, ${offset.y}px)`,
          }"
          @load="onImgLoad"
        />
        <div class="image-cropper__grid"></div>
        <div v-if="!ready" class="image-cropper__loading">图片加载中…</div>
      </div>

      <div class="image-cropper__toolbar">
        <span class="image-cropper__label">缩放</span>
        <el-slider v-model="zoomPercent" :min="100" :max="300" :step="1" class="image-cropper__slider" />
        <span class="image-cropper__zoom">{{ zoomPercent }}%</span>
        <el-button size="small" plain @click="resetCrop">重置</el-button>
      </div>

      <p class="image-cropper__meta">
        输出尺寸：{{ outputWidth }} × {{ outputHeight }} px
        <span class="image-cropper__ratio">（{{ aspectRatio.toFixed(2) }} : 1）</span>
        <span v-if="hint" class="image-cropper__hint">{{ hint }}</span>
      </p>
      <p v-if="lowResolution" class="image-cropper__warn">
        原图分辨率低于输出尺寸，导出后会被放大，建议更换更清晰的图片。
      </p>
    </div>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :loading="exporting" :disabled="!ready" @click="handleConfirm">
        确定并上传
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.image-cropper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.image-cropper__tip {
  align-self: stretch;
  margin: 0;
  color: #7a879d;
  font-size: 12px;
  line-height: 1.6;
}

.image-cropper__viewport {
  position: relative;
  overflow: hidden;
  background: #1b2333;
  border-radius: 8px;
  cursor: grab;
  touch-action: none;
  user-select: none;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);

  &:active {
    cursor: grabbing;
  }
}

.image-cropper__img {
  position: absolute;
  top: 0;
  left: 0;
  max-width: none;
  max-height: none;
  transform-origin: 0 0;
  will-change: transform;
  user-select: none;
  pointer-events: none;
}

/* 三分线辅助构图 */
.image-cropper__grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.32) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.32) 1px, transparent 1px);
  background-size: 33.333% 100%, 100% 33.333%;
  background-position: 33.333% 0, 0 33.333%;
  background-repeat: no-repeat;
  opacity: 0.55;
}

.image-cropper__loading {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: #cfd8e6;
  font-size: 13px;
}

.image-cropper__toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.image-cropper__label {
  flex: 0 0 auto;
  color: #55627a;
  font-size: 13px;
}

.image-cropper__slider {
  flex: 1;
  min-width: 0;
}

.image-cropper__zoom {
  flex: 0 0 auto;
  width: 44px;
  color: #55627a;
  font-size: 12px;
  text-align: right;
}

.image-cropper__meta {
  align-self: stretch;
  margin: 0;
  color: #7a879d;
  font-size: 12px;
}

.image-cropper__ratio {
  color: #9aa6b8;
}

.image-cropper__hint {
  margin-left: 8px;
  color: #9aa6b8;
}

.image-cropper__warn {
  align-self: stretch;
  margin: 0;
  padding: 8px 10px;
  border-radius: 8px;
  background: #fff7e8;
  color: #b7791f;
  font-size: 12px;
}
</style>
