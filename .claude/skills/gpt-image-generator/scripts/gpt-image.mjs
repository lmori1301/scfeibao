#!/usr/bin/env node
// gpt-image-2 生图/改图调用脚本（零依赖，Node 18+）
// 用法见同目录 SKILL.md，参数详情见 references/api.md
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { basename, extname, join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL_DIR = resolve(__dirname, '..');

/** 判断值是否为空或仍是占位符（含"填入"/"your"字样） */
function isPlaceholder(v) {
  return !v || /填入|your-|<.*>/i.test(String(v));
}

/*
  尺寸别名：把口语化说法换成实际像素。

  加这层是因为使用者说的是「4k」「竖版」「1080p」，而不是「3840x2160」。
  没有别名时只能靠人记住确切像素值，记错就白等一次网络往返换一个 400。
*/
const SIZE_ALIASES = {
  // 4K
  '4k': '3840x2160', '4k横': '3840x2160', '4k横版': '3840x2160',
  '4k竖': '2160x3840', '4k竖版': '2160x3840',
  // 2K
  '2k': '2048x1152', '2k横': '2048x1152', '2k方': '2048x2048',
  '2k竖': '1152x2048',
  /*
    1080p 取 1920x1088 而非 1920x1080：1080 不是 16 的倍数，
    接口会直接 400。1088 是最近的合法值，比例 1.76:1 与 16:9 几乎无差。
  */
  '1080p': '1920x1088', 'fhd': '1920x1088',
  '1080p竖': '1088x1920',
  '720p': '1280x720', 'hd': '1280x720',
  // 基础档
  '方': '1024x1024', '方形': '1024x1024', 'square': '1024x1024',
  '横': '1536x1024', '横版': '1536x1024', 'landscape': '1536x1024',
  '竖': '1024x1536', '竖版': '1024x1536', 'portrait': '1024x1536',
};

/** gpt-image-2 的尺寸约束，取自官方文档 */
const SIZE_LIMIT = {
  maxEdge: 3840,
  multiple: 16,
  maxRatio: 3,
  minPixels: 655_360,
  maxPixels: 8_294_400,
  /** 超过此像素数官方标注为实验性 */
  experimentalPixels: 2560 * 1440,
};

/** 往下取到 16 的倍数，且不小于 16 */
const floor16 = (n) => Math.max(16, Math.floor(n / 16) * 16);

/**
 * 归一化并校验尺寸。
 *
 * 返回 { size, warn }：size 为可直接发给接口的值，warn 为非致命提示（如实验性尺寸）。
 * 不合法时直接 throw 并附上修正建议——本地拦掉比等服务端 400 快得多。
 */
function normalizeSize(raw) {
  if (!raw) return { size: undefined, warn: null };
  const key = String(raw).trim().toLowerCase();
  if (key === 'auto') return { size: 'auto', warn: null };

  const mapped = SIZE_ALIASES[key] || key;
  const m = /^(\d+)\s*[x×*]\s*(\d+)$/.exec(mapped);
  if (!m) {
    const names = Object.keys(SIZE_ALIASES).join(' / ');
    throw new Error(
      `无法识别的尺寸「${raw}」。可用别名：${names}；或直接写 宽x高（如 3840x2160）、auto`
    );
  }

  const w = Number(m[1]);
  const h = Number(m[2]);
  const errs = [];
  const fixes = [];

  if (Math.max(w, h) > SIZE_LIMIT.maxEdge) {
    errs.push(`最长边 ${Math.max(w, h)}px 超过上限 ${SIZE_LIMIT.maxEdge}px`);
    const scale = SIZE_LIMIT.maxEdge / Math.max(w, h);
    fixes.push(`${floor16(w * scale)}x${floor16(h * scale)}`);
  }
  if (w % SIZE_LIMIT.multiple || h % SIZE_LIMIT.multiple) {
    errs.push(`两边都必须是 ${SIZE_LIMIT.multiple} 的倍数（当前 ${w}x${h}）`);
    fixes.push(`${floor16(w)}x${floor16(h)}`);
  }
  const ratio = Math.max(w, h) / Math.min(w, h);
  if (ratio > SIZE_LIMIT.maxRatio) {
    errs.push(`长短边比 ${ratio.toFixed(2)}:1 超过上限 ${SIZE_LIMIT.maxRatio}:1`);
  }
  const px = w * h;
  if (px < SIZE_LIMIT.minPixels) {
    errs.push(`总像素 ${px.toLocaleString()} 低于下限 ${SIZE_LIMIT.minPixels.toLocaleString()}`);
  }
  if (px > SIZE_LIMIT.maxPixels) {
    errs.push(`总像素 ${px.toLocaleString()} 超过上限 ${SIZE_LIMIT.maxPixels.toLocaleString()}`);
  }

  if (errs.length) {
    const uniq = [...new Set(fixes)];
    const hint = uniq.length ? `\n  建议改为：${uniq.join(' 或 ')}` : '';
    throw new Error(`尺寸 ${w}x${h} 不合法：\n  - ${errs.join('\n  - ')}${hint}`);
  }

  const warn = px > SIZE_LIMIT.experimentalPixels
    ? `${w}x${h}（${(px / 1e6).toFixed(1)}MP）官方标注为实验性尺寸，生成更慢、更易超时或触发服务端容量错误`
    : null;
  return { size: `${w}x${h}`, warn };
}

/** 按像素量放大超时：4K 比 1K 慢得多，固定 5 分钟不够 */
function timeoutFor(size) {
  const m = /^(\d+)x(\d+)$/.exec(size || '');
  if (!m) return 300_000;
  const px = Number(m[1]) * Number(m[2]);
  // 1MP 约 3 分钟起步，每多 1MP 加 1 分钟，上限 20 分钟
  return Math.min(1_200_000, 180_000 + Math.round(px / 1e6) * 60_000);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/*
  可重试错误：容量不足、限流、网关类 5xx、超时。

  这些都与请求内容无关，原样重试就有机会成功。
  400（参数错）、401（密钥错）之类重试无意义，不在其中。
*/
function isRetryable(err) {
  const m = String(err?.message || '');
  return /接口返回 (429|500|502|503|504)/.test(m)
    || /timeout|aborted|ETIMEDOUT|ECONNRESET|fetch failed|socket hang up/i.test(m);
}

/** 带指数退避的重试：仅对 isRetryable 生效，其余立即抛出 */
async function withRetry(fn, { retries, label }) {
  let last;
  for (let i = 1; i <= retries; i++) {
    try {
      return await fn();
    } catch (err) {
      last = err;
      if (!isRetryable(err) || i === retries) break;
      const wait = Math.min(60_000, 5_000 * 2 ** (i - 1));
      console.error(`⚠️  ${label} 第 ${i}/${retries} 次失败：${err.message}`);
      console.error(`   ${Math.round(wait / 1000)} 秒后重试…`);
      await sleep(wait);
    }
  }
  throw last;
}

/**
 * 读取并校验配置，优先级：环境变量 > config.json。
 * 环境变量：GPT_IMAGE_BASE_URL / GPT_IMAGE_API_KEY / GPT_IMAGE_MODEL。
 * 适配任意 OpenAI Images API 形式的服务，不绑定特定服务商。
 */
function loadConfig() {
  const cfgPath = join(SKILL_DIR, 'config.json');
  const file = existsSync(cfgPath) ? JSON.parse(readFileSync(cfgPath, 'utf8')) : {};
  const cfg = {
    baseURL: process.env.GPT_IMAGE_BASE_URL || file.baseURL,
    apiKey: process.env.GPT_IMAGE_API_KEY || file.apiKey,
    model: process.env.GPT_IMAGE_MODEL || file.model,
    defaults: file.defaults || { size: '1024x1024', quality: 'auto', n: 1 },
    outputDir: file.outputDir || 'output/images',
  };
  if (isPlaceholder(cfg.baseURL)) {
    throw new Error('未配置 baseURL：请填 config.json 的 baseURL 或设 GPT_IMAGE_BASE_URL 环境变量');
  }
  if (isPlaceholder(cfg.apiKey)) {
    throw new Error('未配置 apiKey：请填 config.json 的 apiKey 或设 GPT_IMAGE_API_KEY 环境变量');
  }
  if (isPlaceholder(cfg.model)) {
    throw new Error('未配置 model：请填 config.json 的 model 或设 GPT_IMAGE_MODEL 环境变量');
  }
  return cfg;
}

/** 解析 --key value / --key=value 形式的命令行参数 */
function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const eq = a.indexOf('=');
    if (eq !== -1) {
      args[a.slice(2, eq)] = a.slice(eq + 1);
    } else {
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) { args[a.slice(2)] = next; i++; }
      else args[a.slice(2)] = true;
    }
  }
  return args;
}
/** 定位项目根目录（含 .claude 的目录），用于解析默认输出路径 */
function findProjectRoot() {
  let dir = SKILL_DIR;
  while (dir !== dirname(dir)) {
    if (existsSync(join(dir, '.claude'))) return dir;
    dir = dirname(dir);
  }
  return process.cwd();
}

/**
 * 从图片字节里读出真实宽高（只认 PNG/JPEG/WebP 的头部，不引依赖）。
 *
 * 用途是核对「要的尺寸」与「拿到的尺寸」：部分第三方代理会接受 size 参数
 * 却静默返回别的分辨率，不校验就会以为出了 4K，实际是方图。
 */
function readDimensions(buf) {
  // PNG: IHDR 宽高在固定偏移
  if (buf.length > 24 && buf[0] === 0x89 && buf[1] === 0x50) {
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  }
  // JPEG: 扫 SOFn 段
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length - 9) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }
  // WebP: 只处理最常见的 VP8X / VP8L / VP8 简单情形
  if (buf.length > 30 && buf.toString('ascii', 8, 12) === 'WEBP') {
    const fmt = buf.toString('ascii', 12, 16);
    if (fmt === 'VP8X') return { w: (buf.readUIntLE(24, 3) & 0xffffff) + 1, h: (buf.readUIntLE(27, 3) & 0xffffff) + 1 };
    if (fmt === 'VP8 ') return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
  }
  return null;
}

/** 按实际字节判断图片格式，避免把 jpeg 存成 .png */
function sniffExt(buf, fallback = 'png') {
  if (buf.length > 8 && buf[0] === 0x89 && buf[1] === 0x50) return 'png';
  if (buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8) return 'jpg';
  if (buf.length > 12 && buf.toString('ascii', 8, 12) === 'WEBP') return 'webp';
  return fallback;
}

/** 把返回的图片（b64 或 url）落盘，返回保存路径列表 */
async function saveImages(dataList, outDir, prefix) {
  mkdirSync(outDir, { recursive: true });
  const saved = [];
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  for (let i = 0; i < dataList.length; i++) {
    const item = dataList[i];
    let buf;
    if (item.b64_json) {
      buf = Buffer.from(item.b64_json, 'base64');
    } else if (item.url) {
      // 大图下载也要给足时间，60 秒对 4K 偏紧
      const res = await fetch(item.url, { signal: AbortSignal.timeout(180_000) });
      if (!res.ok) throw new Error(`下载图片失败: ${res.status}`);
      buf = Buffer.from(await res.arrayBuffer());
    } else {
      throw new Error('响应中既无 b64_json 也无 url');
    }
    const file = join(outDir, `${prefix}-${ts}-${i + 1}.${sniffExt(buf)}`);
    writeFileSync(file, buf);
    saved.push({ file, dim: readDimensions(buf) });
  }
  return saved;
}

/** 统一处理接口响应：非 2xx 抛出可读错误 */
async function readResponse(res) {
  const text = await res.text();
  if (!res.ok) {
    let msg = text;
    try { msg = JSON.parse(text).error?.message || text; } catch { /* 保留原文 */ }
    throw new Error(`接口返回 ${res.status}: ${msg}`);
  }
  return JSON.parse(text);
}
/** 把可选参数按「有值才带」的方式并入 body，避免给服务端塞 undefined */
function optionals(args, cfg) {
  const out = {};
  const bg = args.background ?? cfg.defaults.background;
  const fmt = args.format ?? args.output_format ?? cfg.defaults.output_format;
  const comp = args.compression ?? args.output_compression ?? cfg.defaults.output_compression;
  const mod = args.moderation ?? cfg.defaults.moderation;
  if (bg) out.background = bg;
  if (fmt) out.output_format = String(fmt).toLowerCase();
  if (comp !== undefined && comp !== null && comp !== '') out.output_compression = Number(comp);
  if (mod) out.moderation = mod;
  return out;
}

/** 生图：POST /images/generations（JSON body） */
async function generate(cfg, args) {
  if (!args.prompt) throw new Error('generate 需要 --prompt');
  const { size, warn } = normalizeSize(args.size || cfg.defaults.size);
  if (warn) console.error(`⚠️  ${warn}`);

  const body = {
    model: args.model || cfg.model,
    prompt: args.prompt,
    quality: args.quality || cfg.defaults.quality,
    n: Number(args.n || cfg.defaults.n),
    ...optionals(args, cfg),
  };
  if (size) body.size = size;

  const ms = timeoutFor(size);
  console.error(`→ ${body.model} ${size || 'auto'} quality=${body.quality} n=${body.n}（超时 ${Math.round(ms / 60000)} 分钟）`);

  const retries = Number(args.retries ?? cfg.retries ?? 3);
  const json = await withRetry(async () => {
    const res = await fetch(`${cfg.baseURL}/images/generations`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cfg.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(ms),
    });
    return readResponse(res);
  }, { retries, label: '生图' });

  return json.data || [];
}

/** 改图：POST /images/edits（multipart，可传多张参考图） */
async function edit(cfg, args) {
  if (!args.prompt) throw new Error('edit 需要 --prompt');
  const images = (args.image ? String(args.image).split(',') : []).map(s => s.trim()).filter(Boolean);
  if (images.length === 0) throw new Error('edit 需要 --image（多张用逗号分隔）');

  const { size, warn } = normalizeSize(args.size || cfg.defaults.size);
  if (warn) console.error(`⚠️  ${warn}`);

  const form = new FormData();
  form.append('model', args.model || cfg.model);
  form.append('prompt', args.prompt);
  if (size) form.append('size', size);
  form.append('quality', args.quality || cfg.defaults.quality);
  form.append('response_format', 'b64_json');
  // 改图同样支持这些可选项，原来只有 generate 能用
  for (const [k, v] of Object.entries(optionals(args, cfg))) form.append(k, String(v));
  const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif' };
  for (const p of images) {
    const abs = resolve(p);
    if (!existsSync(abs)) throw new Error(`参考图不存在: ${abs}`);
    const buf = readFileSync(abs);
    const type = MIME[extname(abs).toLowerCase()];
    if (!type) throw new Error(`不支持的参考图格式: ${extname(abs) || abs}（支持 png/jpg/jpeg/webp/gif）`);
    form.append('image', new Blob([buf], { type }), basename(abs));
  }
  const ms = timeoutFor(size);
  console.error(`→ 改图 ${images.length} 张参考图 ${size || 'auto'}（超时 ${Math.round(ms / 60000)} 分钟）`);

  const retries = Number(args.retries ?? cfg.retries ?? 3);
  const json = await withRetry(async () => {
    const res = await fetch(`${cfg.baseURL}/images/edits`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${cfg.apiKey}` },
      body: form,
      signal: AbortSignal.timeout(ms),
    });
    return readResponse(res);
  }, { retries, label: '改图' });

  return json.data || [];
}
/** 入口：解析子命令 generate / edit，落盘并打印结果路径 */
const USAGE = `用法:
  node gpt-image.mjs generate --prompt "..." [选项]
  node gpt-image.mjs edit --prompt "..." --image a.png[,b.jpg] [选项]
  node gpt-image.mjs sizes            列出所有尺寸别名

选项:
  --size        尺寸或别名，默认取 config。支持 4k / 2k / 1080p / 横 / 竖 / 方
                或直接 3840x2160；auto 交给模型决定
  --quality     low | medium | high | auto
  --n           生成张数（仅 generate）
  --model       覆盖模型
  --out         输出目录
  --format      png | jpeg | webp
  --compression 0-100，仅 jpeg/webp 生效
  --background  transparent | opaque | auto（透明需 png/webp）
  --moderation  low | auto
  --retries     可重试错误的重试次数，默认 3`;

async function main() {
  const [, , cmd, ...rest] = process.argv;

  if (cmd === 'sizes') {
    console.log('尺寸别名：\n');
    const groups = {};
    for (const [k, v] of Object.entries(SIZE_ALIASES)) (groups[v] ||= []).push(k);
    for (const [px, names] of Object.entries(groups)) {
      const [w, h] = px.split('x').map(Number);
      console.log(`  ${px.padEnd(11)} ${((w * h) / 1e6).toFixed(1)}MP  ← ${names.join(', ')}`);
    }
    console.log('\n约束：最长边 ≤3840、两边为 16 的倍数、长短比 ≤3:1、总像素 655,360~8,294,400');
    return;
  }

  if (!cmd || !['generate', 'edit'].includes(cmd) || rest.includes('--help')) {
    console.error(USAGE);
    process.exit(cmd && cmd !== '--help' ? 1 : 0);
  }
  const cfg = loadConfig();
  const args = parseArgs(rest);

  const data = cmd === 'generate' ? await generate(cfg, args) : await edit(cfg, args);
  if (data.length === 0) throw new Error('接口未返回图片数据');

  const outDir = args.out
    ? resolve(args.out)
    : join(findProjectRoot(), cfg.outputDir || 'output/images');
  const saved = await saveImages(data, outDir, cmd);
  const want = normalizeSize(args.size || cfg.defaults.size).size;

  console.log(`✅ 已保存 ${saved.length} 张图片:`);
  const mismatched = [];
  for (const { file, dim } of saved) {
    const kb = Math.round(statSync(file).size / 1024);
    const sz = kb >= 1024 ? (kb / 1024).toFixed(1) + 'M' : kb + 'K';
    const px = dim ? `${dim.w}x${dim.h}` : '尺寸未知';
    console.log(`  ${file}  (${px}, ${sz})`);
    if (dim && want && want !== 'auto' && px !== want) mismatched.push(px);
  }

  /*
    服务端可能接受 size 参数却返回别的分辨率（第三方代理常见）。
    不显式点出来，使用者会以为拿到了自己要的尺寸。
  */
  if (mismatched.length) {
    console.error(`\n⚠️  实际尺寸与请求不一致：要求 ${want}，返回 ${[...new Set(mismatched)].join(', ')}`);
    console.error('   说明当前服务端未真正支持该尺寸（参数被忽略），请换尺寸或换服务商。');
  }
}

main().catch(err => {
  console.error('❌ ' + err.message);
  process.exit(1);
});

