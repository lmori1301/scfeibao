'use strict';

/*
  Bash 灾难性命令守卫。

  背景：code-reviewer 的 agent 定义里用 40 多行文字明令禁止 find / grep -r 全库检索，
  但提示词不是强制力——实际发生过 agent 拿不到 diff（untracked 文件 diff 恒为空）后
  改用 `find / -iname "*paper*index.vue*"` 全盘扫描，单条命令跑了 25 分钟仍未结束，
  审查任务整体卡死。

  故把「越界扫描」从提示词约束升级为机械拦截：范围超出项目目录的搜索命令直接 deny，
  并在拒绝理由里给出正确替代命令，让 agent 能自行纠正而不是反复重试。
*/

const path = require('path');

/** 项目根目录（本文件位于 <root>/.claude/hooks/） */
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

/**
 * 越界搜索命令特征。
 *
 * 只拦「搜索范围明确越出项目目录」的写法，不拦项目内的正常检索：
 * `grep -rn "xxx" src/` 照常放行，`find / -name` 一律拒绝。
 */
/*
  「越界根路径」的跨平台片段，供下面各规则复用。

  覆盖三种环境：
  - macOS / Linux：`/`、`~`、`$HOME`、`/Users`、`/Volumes`、`/System`、`/Library`、`/home`
  - Windows 原生：`C:\`（任意盘符）、`%USERPROFILE%`、`%HOMEDRIVE%`、PowerShell 的 `$env:USERPROFILE`
  - Windows 上的 Git Bash：盘符被映射成 `/c/`、`/d/`，故 `/c/Users/...` 这类也要认

  只写 Unix 形态会让同一套配置在 Windows 上形同虚设——那边照样能跑全盘扫描。
*/
const ROOT_PATH = String.raw`(?:[A-Za-z]:[\\/]|%USERPROFILE%|%HOMEDRIVE%|\$env:USERPROFILE|\/[a-zA-Z]\/Users|\/Users|\/Volumes|\/System|\/Library|\/home|\$HOME|~|\/)`;

const VIOLATIONS = [
  {
    // find 从文件系统根 / 家目录 / 盘符根起扫
    pattern: new RegExp(String.raw`\bfind\s+${ROOT_PATH}(\s|$)`),
    label: 'find 从文件系统根或家目录起扫',
    hint: '改为在项目内定位：Grep 工具，或 `find <项目内相对路径> -name "..."`'
  },
  {
    /*
      Windows 的全盘扫描等价物。

      Windows 没有 Unix 的 find（同名命令是文本搜索工具），全盘找文件用的是
      `dir /s`、`where /r`、PowerShell 的 `Get-ChildItem -Recurse`。
      这些配上盘符根同样能跑几十分钟。
    */
    test: (cmd) =>
      new RegExp(String.raw`\b(?:dir\s+\/s|where\s+\/r|Get-ChildItem\b[^|;&]*-Recurse|gci\b[^|;&]*-Recurse|ls\s+-R)\b`, 'i').test(cmd) &&
      new RegExp(String.raw`(^|\s)${ROOT_PATH}`).test(cmd),
    label: 'Windows 全盘递归扫描（dir /s、where /r、Get-ChildItem -Recurse）',
    hint: '限定到项目内路径，或直接用 Grep / Glob 工具'
  },
  {
    /*
      grep -r 指向根 / 家目录

      分两段判定，不要求越界路径出现在命令末尾：
      前半段确认这是个递归 grep，后半段确认命令里出现了以根或家目录起头的路径。

      原先是单条正则，末尾写死 `(\s|$)`，于是路径后面只要还跟着子目录就漏掉——
      实测 `grep -rn "x" /` 和 `grep -r pat /Users` 能拦住，
      但 `grep -r "x" /Users/foo` 直接放行，而后者恰恰是真实事故的形态。
    */
    test: (cmd) =>
      // 必须先切段：整条命令常以 `cd /Users/<项目路径>;` 开头，
      // 若两个条件各自去扫整串，前缀里的 /Users 会和后面任意一个递归 grep 凑成假阳性，
      // 把绝大多数正常命令误杀。只在「这一段本身是递归 grep」的段内找越界路径。
      cmd
        .split(/[;&|]+/)
        .some(
          (seg) =>
            /\b(?:grep|findstr|rg|Select-String)\b/i.test(seg) &&
            /\s[-/][a-zA-Z]*[rRsS][a-zA-Z]*(\s|$)/.test(seg) &&
            new RegExp(String.raw`(^|\s)${ROOT_PATH}`).test(seg),
        ),
    label: 'grep -r 指向文件系统根或家目录',
    hint: '改为限定路径：`grep -rn "xxx" src/`，或直接用 Grep 工具'
  },
  {
    /*
      全盘索引检索，等价于 find /。macOS 是 mdfind，Linux 是 locate / plocate。

      没有收 Windows 的 Everything CLI（命令名 `es`）：两个字母的词太容易在正常命令里
      出现，误杀代价远大于收益，且它并非 Windows 自带工具。
    */
    pattern: /\b(mdfind|locate|plocate)\b/,
    label: '全盘索引检索（mdfind / locate）',
    hint: '改用 Grep 工具或限定路径的 find'
  }
];

/** 读取子 agent 完整 JSONL 转录会瞬间撑爆上下文，一并拦掉 */
const TRANSCRIPT_READ =
  /\b(cat|tail|head|less|more|grep)\b[^|;&]*\/tasks\/[a-z0-9]+\.output\b/;

exports.run = (input) => {
  const command = input?.tool_input?.command;
  if (typeof command !== 'string' || !command.trim()) return null;

  if (TRANSCRIPT_READ.test(command)) {
    return deny(
      '读取子 agent 转录文件',
      '那是完整 JSONL 转录，读一次就会撑爆上下文。等任务完成通知即可，或用 SendMessage 问它。'
    );
  }

  // 规则可以给 pattern（单条正则）或 test（自定义判定，用于需要多段条件的情形）
  for (const { pattern, test, label, hint } of VIOLATIONS) {
    const hit = test ? test(command) : pattern.test(command);
    if (hit) return deny(label, hint);
  }

  return null;
};

/**
 * 构造拒绝结果
 * @param label 触发的违规特征描述
 * @param hint 正确的替代做法
 */
function deny(label, hint) {
  return {
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason:
        `【Bash Guard】拦截越界扫描：${label}。\n` +
        `项目根目录：${PROJECT_ROOT}\n` +
        `正确做法：${hint}\n` +
        '这类命令会跑数十分钟且几乎不可能得到有用结果，已被机械拦截，不要重试变体。'
    }
  };
}
