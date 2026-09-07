#!/usr/bin/env node
/**
 * 提示词库检索。三个子命令：
 *   match <意图>   按需求描述匹配模板 + 相似案例（输出裁剪过，可直接进上下文）
 *   case <id...>   取指定案例的完整 prompt（组装参考用）
 *   list [维度]    列出 templates / categories / styles / scenes
 *
 * 数据来自 assets/prompt-library.json（技能自带的静态资源，无需构建）。
 * 输出刻意做了长度控制：match 只给摘要，完整 prompt 靠 case 按需取，
 * 避免 539 条案例的原文（平均 1200+ 字符）无谓涌进上下文。
 */

import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tokenize, expandTags } from './lib/match.mjs';

const SKILL_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const LIB_PATH = join(SKILL_DIR, 'assets/prompt-library.json');

/** match 输出里单条案例 prompt 的摘要长度 */
const EXCERPT = 260;

/**
 * 载入检索库。
 * @returns {any} 库对象
 */
function loadLib() {
  if (!existsSync(LIB_PATH)) {
    throw new Error(
      `提示词库不存在：${LIB_PATH}\n` +
      `它是技能自带的静态资源，正常不会缺失。若被误删，从版本控制或技能包副本恢复该文件。`
    );
  }
  return JSON.parse(readFileSync(LIB_PATH, 'utf8'));
}

/**
 * 把意图文本解析成检索信号。
 * @param {string} intent 用户需求原文
 * @param {any} lib 检索库
 * @returns {{tokens:string[], tags:string[], categories:string[]}}
 */
function analyze(intent, lib) {
  const tokens = tokenize(intent);
  const tagSet = new Set(expandTags(tokens));

  // 源库 styles/scenes 自带的 keywords（半数为空，作为补充信号）
  for (const dim of [lib.styles, lib.scenes]) {
    for (const item of dim) {
      const hitKeyword = item.keywords.some((k) => tokens.includes(String(k).toLowerCase()));
      const hitTitle = item.title && tokens.includes(item.title.toLowerCase());
      if (hitKeyword || hitTitle) tagSet.add(item.value);
    }
  }

  // 分类中文名直接命中
  const categories = lib.categories
    .filter((c) => c.title && tokens.some((t) => c.title.toLowerCase().includes(t)))
    .map((c) => c.value);

  return { tokens, tags: [...tagSet], categories };
}

/**
 * 给单个条目打分。标签命中权重最高，标题命中次之，featured 仅作平分时的次序。
 * @param {{styles?:string[],scenes?:string[],category?:string,title?:string,tags?:string[],featured?:boolean}} item
 * @param {{tokens:string[], tags:string[], categories:string[]}} sig 检索信号
 * @returns {number} 分数
 */
function score(item, sig) {
  let s = 0;
  const itemTags = [...(item.styles || []), ...(item.scenes || []), ...(item.tags || [])];
  for (const t of itemTags) {
    if (sig.tags.includes(t)) s += 6;
  }
  if (item.category && sig.categories.includes(item.category)) s += 8;
  if (item.category && sig.tags.some((t) => item.category.includes(t))) s += 3;

  // 标题命中：中文标题是最可靠的中文语料。
  // 封顶是必要的——tokenize 产出重叠 n-gram（「海报排版」→ 海报/报排/排版/海报排/报排版），
  // 不封顶则长标题会把同一个语义词重复计价 5 次，系统性压过精确短匹配。
  const title = String(item.title || '').toLowerCase();
  let titleHits = 0;
  for (const t of sig.tokens) {
    if (t.length >= 2 && title.includes(t)) titleHits++;
  }
  s += Math.min(titleHits, 3) * 5; // 上限 15 分

  // prompt 正文弱匹配：源库大量案例共用同一标题（如多条都叫「电商商品展示设计」），
  // 标题分因此失去区分度。用正文补一层低权重信号拉开主题差异，权重压低避免长文本噪声主导。
  if (item.prompt) {
    const body = item.prompt.slice(0, 600).toLowerCase();
    let bodyHits = 0;
    for (const t of sig.tokens) {
      if (t.length >= 2 && body.includes(t)) bodyHits++;
    }
    for (const tag of sig.tags) {
      if (body.includes(tag.toLowerCase())) bodyHits++;
    }
    s += Math.min(bodyHits, 4) * 2; // 上限 8 分
  }

  if (item.featured) s += 1;
  return s;
}

/** match 支持的过滤参数 */
const KNOWN_FLAGS = new Set(['category', 'style', 'scene', 'top']);

/**
 * 解析 --key value 形式的可选过滤参数。
 * 参数名拼错或缺值一律报错，不静默降级——这是给 agent 用的工具，
 * 静默丢掉过滤条件会让调用方把「未过滤的全库结果」当成真实结论。
 * @param {string[]} argv 参数数组
 * @returns {{rest:string[], opts:Record<string,string>}}
 */
function parseFlags(argv) {
  const rest = [];
  const opts = Object.create(null);
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith('--')) { rest.push(argv[i]); continue; }
    const key = argv[i].slice(2);
    if (!KNOWN_FLAGS.has(key)) {
      throw new Error(`未知参数 --${key}（可用：${[...KNOWN_FLAGS].map((k) => '--' + k).join(' / ')}）`);
    }
    const val = argv[i + 1];
    if (val === undefined || val.startsWith('--')) {
      throw new Error(`--${key} 缺少取值`);
    }
    opts[key] = val;
    i++;
  }
  return { rest, opts };
}

/**
 * match 子命令：按意图匹配模板与案例。
 * @param {string[]} argv 子命令参数
 */
function cmdMatch(argv) {
  const { rest, opts } = parseFlags(argv);
  const intent = rest.join(' ').trim();
  if (!intent) throw new Error('用法：find-prompt.mjs match "生图需求描述" [--category X] [--style Y] [--scene Z] [--top N]');

  const lib = loadLib();
  const sig = analyze(intent, lib);
  const topN = Math.max(1, Math.min(12, Number(opts.top) || 5));

  // 硬过滤（用户显式指定时生效）
  const keep = (item) => {
    if (opts.category && item.category !== opts.category) return false;
    if (opts.style && !(item.styles || []).includes(opts.style)) return false;
    if (opts.scene && !(item.scenes || []).includes(opts.scene)) return false;
    return true;
  };

  const rank = (arr) => arr
    .filter(keep)
    .map((x) => ({ x, s: score(x, sig) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s);

  const templates = rank(lib.templates).slice(0, 3);
  const cases = rank(lib.cases).slice(0, topN);

  const out = [];
  out.push(`意图：${intent}`);
  out.push(`识别标签：${sig.tags.join(', ') || '（无命中，回落全库排序）'}`);
  if (sig.categories.length) out.push(`识别分类：${sig.categories.join(', ')}`);
  out.push('');

  if (!templates.length && !cases.length) {
    out.push('无命中。建议：换用更具体的画面词，或用 list 查看全部分类后加 --category 过滤。');
    process.stdout.write(out.join('\n') + '\n');
    return;
  }

  out.push(`## 匹配模板（${templates.length}）`);
  for (const { x, s } of templates) {
    out.push('');
    out.push(`### ${x.title}（${x.id}，得分 ${s}）`);
    out.push(`分类 ${x.category}｜风格 ${x.styles.join('/') || '—'}｜场景 ${x.scenes.join('/') || '—'}`);
    if (x.useWhen) out.push(`何时用：${x.useWhen}`);
    if (x.guidance.length) out.push(`必锁要素：${x.guidance.join(' / ')}`);
    if (x.pitfalls.length) out.push(`避坑：${x.pitfalls.join(' / ')}`);
    if (x.exampleCases.length) out.push(`模板参考案例 id：${x.exampleCases.join('、')}`);
  }
  out.push('');
  out.push(`## 相似案例（${cases.length}）`);
  for (const { x, s } of cases) {
    out.push('');
    out.push(`### [id ${x.id}] ${x.title}（得分 ${s}${x.featured ? '，精选' : ''}）`);
    out.push(`分类 ${x.category}｜风格 ${x.styles.join('/') || '—'}｜场景 ${x.scenes.join('/') || '—'}｜来源 ${x.source || '—'}`);
    if (x.aspect) out.push(`原案例比例：${x.aspect}（选 --size 时参考，别照抄 config 默认值）`);
    const p = x.prompt.replace(/\s+/g, ' ');
    out.push(`prompt 摘要：${p.length > EXCERPT ? p.slice(0, EXCERPT) + ' …' : p}`);
  }
  out.push('');
  out.push(`取完整 prompt：node scripts/find-prompt.mjs case ${cases.map((c) => c.x.id).slice(0, 3).join(' ')}`);
  process.stdout.write(out.join('\n') + '\n');
}

/**
 * case 子命令：输出指定 id 案例的完整 prompt。
 * @param {string[]} argv 案例 id 列表
 */
function cmdCase(argv) {
  const ids = argv.map((x) => Number(x)).filter((x) => Number.isFinite(x));
  if (!ids.length) throw new Error('用法：find-prompt.mjs case <id> [id2 id3 ...]');

  const lib = loadLib();
  const out = [];
  for (const id of ids) {
    const c = lib.cases.find((x) => x.id === id);
    if (!c) { out.push(`[id ${id}] 不存在`, ''); continue; }
    out.push(`## [id ${c.id}] ${c.title}`);
    out.push(`分类 ${c.category}｜风格 ${c.styles.join('/') || '—'}｜场景 ${c.scenes.join('/') || '—'}`);
    out.push(`来源 ${c.source || '—'}${c.sourceUrl ? ' ' + c.sourceUrl : ''}`);
    if (c.aspect) out.push(`原案例比例：${c.aspect}`);
    out.push('');
    out.push('```text');
    out.push(c.prompt);
    out.push('```');
    out.push('');
  }
  process.stdout.write(out.join('\n'));
}

/**
 * list 子命令：列出各维度取值。
 * @param {string[]} argv [维度]
 */
function cmdList(argv) {
  const dim = (argv[0] || 'templates').toLowerCase();
  const lib = loadLib();
  const out = [];

  if (dim === 'templates') {
    out.push(`模板 ${lib.templates.length} 个：`);
    for (const t of lib.templates) {
      out.push(`  ${t.id.padEnd(28)} ${t.title}｜${t.category}`);
    }
  } else if (dim === 'categories') {
    out.push(`分类 ${lib.categories.length} 个（--category 用左侧 value）：`);
    for (const c of lib.categories) {
      const n = lib.cases.filter((x) => x.category === c.value).length;
      out.push(`  ${c.value.padEnd(30)} ${c.title}（${n} 例）`);
    }
  } else if (dim === 'styles' || dim === 'scenes') {
    const arr = lib[dim];
    const key = dim;
    out.push(`${dim} ${arr.length} 个（--${dim.slice(0, -1)} 用左侧 value）：`);
    for (const s of arr) {
      const n = lib.cases.filter((x) => (x[key] || []).includes(s.value)).length;
      out.push(`  ${s.value.padEnd(20)} ${s.title}（${n} 例）`);
    }
  } else {
    throw new Error(`未知维度：${dim}（可用 templates / categories / styles / scenes）`);
  }
  process.stdout.write(out.join('\n') + '\n');
}

const USAGE = `提示词库检索

  node scripts/find-prompt.mjs match "赛博朋克风格的电商详情页" [--category X] [--style Y] [--scene Z] [--top N]
  node scripts/find-prompt.mjs case 17 2 4
  node scripts/find-prompt.mjs list templates|categories|styles|scenes
`;

function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  switch (cmd) {
    case 'match': return cmdMatch(rest);
    case 'case': return cmdCase(rest);
    case 'list': return cmdList(rest);
    default:
      process.stdout.write(USAGE);
      if (cmd) process.exitCode = 1;
  }
}

try {
  main();
} catch (e) {
  process.stderr.write(`检索失败：${e.message}\n`);
  process.exit(1);
}
