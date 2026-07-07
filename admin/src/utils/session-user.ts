import { computed, ref } from 'vue'

/** 与 localStorage 解耦，便于在任意处更新会话用户后刷新顶栏等依赖 */
const revision = ref(0)

export function refreshSessionUserDisplay() {
  revision.value += 1
}

export function useSessionUser() {
  const user = computed(() => {
    revision.value
    try {
      return JSON.parse(localStorage.getItem('user') || '{}') as Record<string, unknown>
    } catch {
      return {}
    }
  })
  return { user }
}

/** 若当前登录用户与给定用户名一致，则合并写入 localStorage 并触发界面刷新 */
export function mergeSessionUserIfSameUsername(username: string, partial: Record<string, unknown>) {
  mergeSessionUserIfCurrentAccount({ username }, partial)
}

/**
 * 当前编辑的管理员与登录会话为同一人时（登录名一致，或 id 一致）合并写入并刷新顶栏。
 * 用于「用户管理」保存后同步姓名、用户名、角色等到 localStorage。
 */
/** @returns 是否与当前登录会话匹配并已写入 localStorage、触发顶栏刷新 */
export function mergeSessionUserIfCurrentAccount(
  match: { id?: number; username: string },
  partial: Record<string, unknown>
): boolean {
  try {
    const raw = localStorage.getItem('user')
    if (!raw) return false
    const u = JSON.parse(raw) as { id?: number; username?: string }
    const uname = String(match.username || '').trim()
    const byName = Boolean(uname && u.username === uname)
    const byId =
      match.id != null &&
      u.id != null &&
      !Number.isNaN(Number(match.id)) &&
      !Number.isNaN(Number(u.id)) &&
      Number(u.id) === Number(match.id)
    if (!byName && !byId) return false
    localStorage.setItem('user', JSON.stringify({ ...u, ...partial }))
    refreshSessionUserDisplay()
    return true
  } catch {
    return false
  }
}
