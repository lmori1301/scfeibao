'use strict';

const fs = require('fs');
const path = require('path');

// 读取 .claude/config.json；缺失或损坏时回退到安全默认值。
// 从 cwd 向上找 .claude/config.json（与 run.cjs 的根定位一致）。
function findConfig(start) {
  let dir = start || process.cwd();
  for (;;) {
    const candidate = path.join(dir, '.claude', 'config.json');
    if (fs.existsSync(candidate)) return candidate;
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

/*
  读取 codeReview 配置段；缺失或 JSON 损坏时返回空对象，由各 getter 回退默认值。

  结果缓存在模块作用域：hook 进程活不过单次调用，缓存只在本进程内复用，
  不存在读到过期配置的问题。stop-quality-gate 一次运行里会调三个 getter
  （两个阈值 + reviewMode），原先就是三次 findConfig 目录遍历 + 三次 readFileSync。
*/
let _cache = null;

function readCodeReview() {
  if (_cache) return _cache;
  try {
    const fp = findConfig();
    if (!fp) return (_cache = {});
    const cfg = JSON.parse(fs.readFileSync(fp, 'utf8'));
    return (_cache = cfg?.codeReview ?? {});
  } catch {
    return (_cache = {});
  }
}

// code-reviewer 门禁模式：'off' | 'background' | 'blocking'，默认 'background'
exports.reviewMode = () => {
  const mode = readCodeReview().mode;
  return ['off', 'background', 'blocking'].includes(mode) ? mode : 'background';
};

/**
 * 读取一个非负整数阈值
 *
 * 0 是有效值（表示「任何改动都要审」），所以不能用 `|| fallback` 兜底——
 * 那会把 0 也当成缺失。只在非数字、负数、非整数时才回退。
 */
function intThreshold(raw, fallback) {
  return Number.isInteger(raw) && raw >= 0 ? raw : fallback;
}

/** 小改动免审阈值：本轮净变更低于此值且非敏感路径 → 免 review。默认 1000 */
exports.smallDiffThreshold = () => intThreshold(readCodeReview().smallDiffThreshold, 1000);

/** 敏感路径阈值：敏感文件自身净变更达到此值即强制 review。默认 15 */
exports.sensitiveDiffThreshold = () => intThreshold(readCodeReview().sensitiveDiffThreshold, 15);
