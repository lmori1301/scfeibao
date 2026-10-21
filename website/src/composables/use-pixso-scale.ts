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

  // 检测浏览器整页缩放系数（Ctrl/Cmd +/-）。整页缩放会把 layout viewport 的 CSS 尺寸
  // 按 1/zoom 膨胀（innerWidth/clientWidth 变大），但 window.outerWidth 始终按 100%
  // 缩放下的窗口尺寸报告（Chrome/Edge 均如此），据此可还原真实缩放系数。
  // ⚠️ visualViewport.scale 只反映触控板捏合缩放，不反映整页缩放（整页缩放下恒为 1），
  // 不能用于检测 Ctrl +/-。
  function detectPageZoom(): number {
    try {
      // 仅桌面精确指针设备启用：移动端 innerWidth 可能是 980 的回退视口，outerWidth 比值无意义
      if (!window.matchMedia('(pointer: fine)').matches) return 1
      const inner = window.innerWidth
      const outer = window.outerWidth
      if (!inner || !outer) return 1
      const z = outer / inner
      if (!Number.isFinite(z) || z <= 0.1 || z >= 8) return 1
      // 吸附到 Chrome 标准缩放档位，消除窗口边框/滚动条带来的约 1% 误差
      const steps = [0.25, 0.33, 0.5, 0.67, 0.75, 0.8, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4, 5]
      for (const s of steps) {
        if (Math.abs(z - s) / s < 0.08) return s
      }
      return z
    } catch {
      return 1
    }
  }

  function updateScale() {
    const container = scrollContainerRef.value
    const frame = frameRef.value
    if (!container || !frame) return
    const width = container.clientWidth || window.innerWidth
    if (width === 0) return
    // 浏览器整页缩放（Ctrl +/-）会让 layout viewport 的 clientWidth 按 1/zoom 同比例变化：
    // 25% 缩放下 clientWidth 变为原来的 4 倍，若直接拿它算 scale，会被放大 4 倍、再被
    // 浏览器 0.25 缩放抵消，导致「缩放下页面看起来没变化」，且导航红色块等栅格图会经过
    // 4× transform 上采样 + 0.25 浏览器下采样产生失真。
    // 用 outerWidth/innerWidth 还原整页缩放系数、用 visualViewport.scale 还原捏合缩放，
    // 两者相乘得到「未受任何缩放影响的 100% 基准窗口宽度」，页面即像普通网页一样随缩放整体缩小/放大。
    const vv = window.visualViewport
    const pinchScale = vv && vv.scale ? vv.scale : 1
    const physicalWidth = width * detectPageZoom() * pinchScale
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
