/**
 * 表单提交的空字符串归一化为 null。
 *
 * 背景：后台表单的输入框清空后提交的是 ''，直接落库会让"字段是否为空"
 * 出现两种形态（'' 与 NULL），导致 SQL 判断 / 数据统计口径不一致。
 * 这里在写入前统一转成 null，'null'/'undefined' 字符串同样按空处理。
 *
 * 注意：数字 0 与布尔 false 是有效值，不能转。
 */
export function normalizeEmptyToNull<T extends Record<string, any>>(data: T): T {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return data

  const out: Record<string, any> = { ...data }
  for (const key of Object.keys(out)) {
    const v = out[key]
    if (v === '' || v === 'null' || v === 'undefined') {
      out[key] = null
    }
  }
  return out as T
}
