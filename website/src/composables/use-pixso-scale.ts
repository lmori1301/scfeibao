import { ref, onMounted, onUnmounted, nextTick } from 'vue'

/**
 * 用于 Pixso 导出的固定宽度页面的等比缩放适配
 * @param designWidth 设计稿宽度，默认 1920
 * @param designHeight 设计稿高度
 */
export function usePixsoScale(designWidth = 1920, designHeight: number) {
  const scrollContainerRef = ref<HTMLElement | null>(null)
  const frameRef = ref<HTMLElement | null>(null)
  const scale = ref(1)
  let resizeObserver: ResizeObserver | null = null

  function updateScale() {
    const container = scrollContainerRef.value
    const frame = frameRef.value
    if (!container || !frame) return
    const width = container.clientWidth || window.innerWidth
    if (width === 0) return
    const nextScale = width / designWidth
    scale.value = nextScale
    frame.style.transform = `scale(${nextScale})`
    frame.style.transformOrigin = 'top left'
    container.style.height = `${designHeight * nextScale}px`
  }

  onMounted(() => {
    // nextTick + rAF 确保 DOM 完全布局后再计算
    nextTick(() => {
      requestAnimationFrame(() => {
        updateScale()
        resizeObserver = new ResizeObserver(updateScale)
        if (scrollContainerRef.value) {
          resizeObserver.observe(scrollContainerRef.value)
        }
      })
    })
  })

  onUnmounted(() => {
    resizeObserver?.disconnect()
  })

  return { scrollContainerRef, frameRef, scale, updateScale }
}
