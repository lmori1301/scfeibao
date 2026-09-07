'use strict';

exports.readInput = () => new Promise((resolve) => {
  let data = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', chunk => { data += chunk; });
  process.stdin.on('end', () => {
    clearTimeout(timer);
    try { resolve(JSON.parse(data)); }
    catch { resolve({}); }
  });
  /*
    兜底超时：正常情况下 Claude Code 写完就关 stdin，'end' 立刻触发，这个定时器用不上。
    只在 stdin 迟迟不关时生效——此时 resolve({})，各 hook 都有 `if (!filePath) return null` 的防护。
    从 500ms 降到 120ms：hook 是串行执行的，这段等待会直接叠加到用户的等待里；
    而本地进程间管道若 120ms 还没收到数据，再等 380ms 也基本不会有结果。
  */
  const timer = setTimeout(() => resolve({}), 120);
});
