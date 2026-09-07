/**
 * 自检：把所有尺寸别名过一遍官方约束。
 *
 * 别名是脚本自己维护的映射表，写错了会让使用者拿到一个必然 400 的尺寸，
 * 而且报错来自服务端、看不出是别名表的问题。故留一个可随时重跑的校验。
 *
 * 用法：node scripts/check-sizes.mjs
 */
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(HERE, 'gpt-image.mjs'), 'utf8');

/** 从主脚本里取出两个常量，避免在两处各写一份表 */
function extract(name) {
  const m = new RegExp(`const ${name} = (\\{[\\s\\S]*?\\n\\});`).exec(src);
  if (!m) throw new Error(`未能从 gpt-image.mjs 提取 ${name}`);
  return eval(`(${m[1]})`);
}

const SIZE_ALIASES = extract('SIZE_ALIASES');
const SIZE_LIMIT = extract('SIZE_LIMIT');

const rows = [];
const bad = [];

for (const [alias, px] of Object.entries(SIZE_ALIASES)) {
  const [w, h] = px.split('x').map(Number);
  const errs = [];
  if (Math.max(w, h) > SIZE_LIMIT.maxEdge) errs.push(`最长边 ${Math.max(w, h)} > ${SIZE_LIMIT.maxEdge}`);
  if (w % SIZE_LIMIT.multiple) errs.push(`宽 ${w} 不是 ${SIZE_LIMIT.multiple} 的倍数`);
  if (h % SIZE_LIMIT.multiple) errs.push(`高 ${h} 不是 ${SIZE_LIMIT.multiple} 的倍数`);
  const ratio = Math.max(w, h) / Math.min(w, h);
  if (ratio > SIZE_LIMIT.maxRatio) errs.push(`比例 ${ratio.toFixed(2)}:1 > ${SIZE_LIMIT.maxRatio}:1`);
  const total = w * h;
  if (total < SIZE_LIMIT.minPixels) errs.push(`像素 ${total} < ${SIZE_LIMIT.minPixels}`);
  if (total > SIZE_LIMIT.maxPixels) errs.push(`像素 ${total} > ${SIZE_LIMIT.maxPixels}`);

  rows.push({ alias, px, mp: (total / 1e6).toFixed(2), ok: errs.length === 0 });
  if (errs.length) bad.push(`${alias} -> ${px}: ${errs.join('; ')}`);
}

for (const r of rows) {
  console.log(`${r.ok ? '✓' : '✗'} ${r.alias.padEnd(12)} ${r.px.padEnd(11)} ${r.mp}MP`);
}

if (bad.length) {
  console.error(`\n✗ ${bad.length} 个别名不合法：`);
  for (const b of [...new Set(bad)]) console.error('  ' + b);
  process.exit(1);
}
console.log(`\n✓ ${rows.length} 个别名全部满足官方约束`);
