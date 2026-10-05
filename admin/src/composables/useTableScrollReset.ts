/**
 * 列表表格滚动位置复位（全站统一，一处安装全站生效）
 *
 * 背景：Element Plus 2.13 的 `el-table` **不会**在 `data` 变化时复位滚动容器的
 * `scrollTop` / `scrollLeft`。给列表加上 `max-height` 实现「表头固定 + 数据区滚动」后，
 * 用户翻页或切换筛选条件时，如果新数据行数与旧数据相同，Vue 是 patch 复用 `<tr>`
 * （只改文本，不增删节点），滚动位置会被原样保留 → 翻页后停在半空。
 *
 * 做法：全局 MutationObserver 监听 `document`，只要变更发生在某个 `.el-table` 的
 * `tbody` 内（数据更新 / 分页 / 切换筛选 / 排序 都会命中），就把该表格的滚动区复位到左上角。
 * - 用户手动滚动不会改 tbody，因此不会被误复位；
 * - 同一帧内的多条变更用 requestAnimationFrame 合并成一次复位，避免抖动；
 * - 路由切换时再做一次全量复位（换页后表格是重新挂载的，observer 可能错过首次渲染）。
 */
export function installTableScrollReset() {
  if (typeof document === 'undefined' || typeof MutationObserver === 'undefined') return

  const reset = (table: Element | null) => {
    if (!table) return
    table.querySelectorAll<HTMLElement>('.el-scrollbar__wrap').forEach((wrap) => {
      if (wrap.scrollTop) wrap.scrollTop = 0
      if (wrap.scrollLeft) wrap.scrollLeft = 0
    })
  }

  const resetAll = () => {
    document.querySelectorAll('.el-table').forEach(reset)
  }

  let pending: Set<Element> | null = null
  let frame = 0

  const flush = () => {
    frame = 0
    const set = pending
    pending = null
    if (!set) return
    set.forEach(reset)
  }

  const schedule = (table: Element) => {
    if (!pending) pending = new Set()
    pending.add(table)
    if (!frame) frame = requestAnimationFrame(flush)
  }

  const observer = new MutationObserver((records) => {
    for (const record of records) {
      const node = record.target
      if (!(node instanceof Element)) continue
      // 只关心表格 tbody 内部的变更：分页/筛选/排序/批量删除都会命中
      const body = node.closest('tbody')
      const table = (body || node).closest('.el-table')
      if (table) schedule(table)
    }
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  })

  // 路由切换：表格重新挂载，主动全量复位一次
  window.addEventListener('popstate', () => requestAnimationFrame(resetAll))
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) requestAnimationFrame(resetAll)
  })

  return { resetAll, destroy: () => observer.disconnect() }
}
