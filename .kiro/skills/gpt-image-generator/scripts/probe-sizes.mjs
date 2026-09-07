/**
 * 探测当前 baseURL 实际支持哪些尺寸。
 *
 * 起因：官方文档说 gpt-image-2 支持到 4K，但第三方兼容服务未必跟得上——
 * 实测发现某些代理会接受 size 参数却静默返回别的分辨率。
 * 文档写什么不算，这个服务端返回什么才算。
 *
 * 用 low 画质 + 极短提示词跑，单张成本和耗时都最低。
 * 用法：node scripts/probe-sizes.mjs [尺寸1,尺寸2,...]
 */
import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const CLI = join(HERE, 'gpt-image.mjs');
const OUT = '/tmp/gpt-image-probe';

const TARGETS = (process.argv[2] || '1024x1024,1536x1024,2048x1152,2048x2048,2560x1440,3840x2160')
  .split(',').map((s) => s.trim()).filter(Boolean);

function probe(size) {
  return new Promise((resolve) => {
    const p = spawn('node', [
      CLI, 'generate', '--prompt', 'a plain red square',
      '--size', size, '--quality', 'low', '--n', '1',
      '--out', OUT, '--retries', '1',
    ]);
    let out = '';
    p.stdout.on('data', (d) => (out += d));
    p.stderr.on('data', (d) => (out += d));
    p.on('close', () => {
      // 从「(1254x1254, 686K)」里取实际尺寸
      const actual = (out.match(/\((\d+x\d+),/) || [])[1];
      const err = (out.match(/❌ (.*)/) || [])[1];
      if (actual) {
        resolve({ size, ok: actual === size, actual });
      } else {
        resolve({ size, ok: false, actual: null, err: err || '未知失败' });
      }
    });
  });
}

console.log(`探测 ${TARGETS.length} 个尺寸（low 画质）…\n`);
const results = [];
for (const s of TARGETS) {
  process.stdout.write(`  ${s.padEnd(11)} … `);
  const r = await probe(s);
  results.push(r);
  if (r.ok) console.log('✓ 实际一致');
  else if (r.actual) console.log(`✗ 返回 ${r.actual}（参数被忽略）`);
  else console.log(`✗ ${r.err}`);
}

console.log('\n===== 结论 =====');
const good = results.filter((r) => r.ok).map((r) => r.size);
const ignored = results.filter((r) => !r.ok && r.actual);
const failed = results.filter((r) => !r.ok && !r.actual);
console.log(`真正支持：${good.length ? good.join(', ') : '（无）'}`);
if (ignored.length) console.log(`参数被忽略：${ignored.map((r) => `${r.size}→${r.actual}`).join(', ')}`);
if (failed.length) console.log(`直接失败：${failed.map((r) => `${r.size}(${r.err})`).join(', ')}`);
console.log(`\n临时图在 ${OUT}，可直接删除。`);
