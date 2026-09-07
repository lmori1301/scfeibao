#!/usr/bin/env node
'use strict';

/*
  Hook 运行器。

  支持一次调用跑多个 hook：`run.cjs hook-a hook-b`

  这样同一 matcher 下的多个 hook 只付一次 node 冷启动（实测约 35ms/进程）。
  目前每个 matcher 下都只挂一个 hook，多 hook 能力留着备用——
  再往同一 matcher 加守卫时直接追加参数，不要新增一条命令。

  返回值语义：按给定顺序执行，取第一个非 null 的结果并立即停止。
  PreToolUse 场景下这正是需要的——前一个 hook 已经 deny，后面的记录与提示都无意义。
*/

const path = require('path');

/**
 * 依次执行多个 hook，返回第一个非 null 结果
 * @param {string[]} names hook 文件名（不含 .cjs）
 * @param {object} input Claude Code 传入的 hook 输入
 */
function runAll(names, input) {
  for (const name of names) {
    if (!name) continue;
    try {
      const hook = require(path.join(__dirname, name + '.cjs'));
      const result = hook.run(input);
      if (result) return result;
    } catch (err) {
      // 单个 hook 抛错不应连带掉队友，也不该阻断用户的工具调用
      process.stderr.write(`[agentpm:${name}] ${err.message}\n`);
    }
  }
  return null;
}

exports.runAll = runAll;

// 直接执行时走 CLI：node run.cjs <hook> [hook...]
if (require.main === module) {
  const names = process.argv.slice(2);
  if (!names.length) process.exit(0);
  const { readInput } = require('./lib/io.cjs');
  readInput()
    .then((input) => {
      const result = runAll(names, input);
      if (result) process.stdout.write(JSON.stringify(result));
    })
    .catch(() => process.exit(0));
}
