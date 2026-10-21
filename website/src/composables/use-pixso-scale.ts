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
    // 浏览器缩放（Ctrl +/-）会让 layout viewport 的 clientWidth 按 1/zoom 同比例变化：
    // 25% 缩放下 clientWidth 变为原来的 4 倍，若直接拿它算 scale，会被放大 4 倍、再被
    // 浏览器 0.25 缩放抵消，导致「缩放下页面看起来没变化」，且导航红色块等栅格图会经过
    // 4× transform 上采样 + 0.25 浏览器下采样产生失真。
    // 用 visualViewport.scale 还原出「未受缩放影响的物理窗口宽度」再算 scale，
    // 页面即可像普通网页一样随浏览器缩放整体缩小/放大。
    const vv = window.visualViewport
    const zoom = vv && vv.scale ? vv.scale : 1
    const physicalWidth = width * zoom
    const nextScale = physicalWidth / designWidth
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
        // 浏览器缩放变化时 visualViewport.scale 会变并触发其 resize 事件，
        // 但 clientWidth 的变化不一定让 ResizeObserver 以正确时机回调，
        // 这里额外监听 resize 以保证缩放比例实时修正。
        if (window.visualViewport) {
          window.visualViewport.addEventListener('resize', updateScale)
        }
      })
    })
  })

  onUnmounted(() => {
    resizeObserver?.disconnect()
    if (window.visualViewport) {
      window.visualViewport.removeEventListener('resize', updateScale)
    }
  })

  return { scrollContainerRef, frameRef, scale, updateScale }
}
