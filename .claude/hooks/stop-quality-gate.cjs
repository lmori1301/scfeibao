'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { readState, clearState } = require('./lib/state.cjs');
const { reviewMode, smallDiffThreshold, sensitiveDiffThreshold } = require('./lib/config.cjs');

// 触碰这些路径且净变更达到 SENSITIVE_DIFF_THRESHOLD 的改动强制 review（认证/安全/支付/数据完整性）。
// 极小的敏感改动（如恢复一段已审过的旧代码、加一行权限守卫）低于该阈值时放行，避免为琐碎改动强拦。
const SENSITIVE_PATTERNS = [
  /auth/i,
  /security/i,
  /payment|billing|order/i,
  /guard|middleware|interceptor/i,
  /prisma[/\\]schema|migrations?[/\\]/i,
  /\.env/i,
  /login|password|token|secret|credential/i,
  /permission|role|rbac|acl/i,
];

// 纯样式文件：小改动可豁免（不含逻辑）
const STYLE_ONLY = /\.(scss|css)$/i;

// 完全豁免 review 的路径：这些技能/工具的文件不参与代码门禁（如 gpt-image-generator 生图技能）
const REVIEW_EXEMPT = [
  /[/\\]skills[/\\]gpt-image-generator[/\\]/i,
];

/*
  两个阈值都从 .claude/config.json 的 codeReview 段读，与 mode 放在一处便于调整。
  改配置不用动这个文件，缺失时各 getter 自带默认值（1000 / 15）。
*/
const SMALL_DIFF_THRESHOLD = smallDiffThreshold();
const SENSITIVE_DIFF_THRESHOLD = sensitiveDiffThreshold();

/**
 * 本轮各文件的编辑载荷行数（由 review-reminder 记录，路径 → 累计行数）
 *
 * 未跟踪文件的 git diff 恒为空，只能退化成按整文件行数计 churn，
 * 于是「改一行列宽」会被算成整个文件的行数。本项目里长期未提交的大文件很常见，
 * 那个虚高数字会把门禁推到「并行分片审查」档，白起一堆 reviewer。
 * 编辑载荷行数与 git 跟踪状态无关，用它给未跟踪文件兜底更贴近真实改动量。
 */
function recordedChurnMap() {
  const map = new Map();
  for (const line of readState('edit-churn.txt').split('\n')) {
    if (!line) continue;
    const tab = line.lastIndexOf('\t');
    if (tab === -1) continue;
    const fp = line.slice(0, tab);
    const n = parseInt(line.slice(tab + 1), 10);
    if (!Number.isFinite(n)) continue;
    map.set(fp, (map.get(fp) || 0) + n);
  }
  return map;
}

function churnFor(fp, cwd, recorded) {
  /*
    优先用本轮实际编辑载荷行数，已跟踪与未跟踪文件一视同仁。

    此前只有未跟踪文件走这条路，已跟踪文件直接取 git diff，于是把仓库里
    陈年未提交的改动全算进了本轮。本项目长期挂着大量未提交改动，实测
    seed.service.ts 未提交 2860 行，某轮只改了 4 行也按 2860 计，
    门禁因此被推到「并行分片审查」档、白起一堆 reviewer。
    审查范围本就该是「本轮改了什么」，与仓库积压无关。
  */
  const fromRecord = recorded?.get(fp);
  if (fromRecord !== undefined) return fromRecord;

  let added = 0;
  let deleted = 0;
  for (const args of [['diff', '--numstat', '--', fp], ['diff', '--staged', '--numstat', '--', fp]]) {
    try {
      const out = execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
      for (const line of out.trim().split('\n').filter(Boolean)) {
        const [a, d] = line.split('\t');
        if (a !== '-') added += parseInt(a, 10) || 0;
        if (d !== '-') deleted += parseInt(d, 10) || 0;
      }
    } catch {}
  }
  // git diff 无输出且无编辑记录：可能是未跟踪的新文件（如 hook 中途才装上，
  // 本轮编辑没被记到）。此时退回整文件行数，宁可高估也不要漏审。
  if (added === 0 && deleted === 0) {
    try {
      execFileSync('git', ['ls-files', '--error-unmatch', '--', fp], { cwd, stdio: ['ignore', 'ignore', 'ignore'] });
      // 已跟踪但无 diff → churn 为 0
    } catch {
      try {
        if (fs.existsSync(fp)) added = fs.readFileSync(fp, 'utf8').split('\n').length;
      } catch {}
    }
  }
  return added + deleted;
}

exports.run = (input) => {
  // 防止无限循环：stop hook 已激活说明本轮已警告过一次。
  // 此时清空累积状态，让后续无关轮次（如生图/纯查询）从干净状态开始，
  // 避免旧的未审查编辑在整个会话里反复触发门禁。
  if (input?.stop_hook_active) {
    clearState('edited-files.txt');
    clearState('review-called.txt');
    clearState('edit-churn.txt');
    return null;
  }

  const editedRaw = readState('edited-files.txt');
  if (!editedRaw.trim()) return null;

  const editedFiles = [...new Set(editedRaw.trim().split('\n').filter(Boolean))]
    .filter(fp => !REVIEW_EXEMPT.some(p => p.test(fp)))
    /*
      跳过已不存在的文件：改完又删掉、或改完再重命名的，没有可审之物。
      不过滤的话门禁会点名要求审一个不存在的路径，主 agent 无论派不派 reviewer
      都无法满足——派了只会得到「文件不存在」，不派则被门禁反复拦住。
      （曾出现过要求审查 login.vue 而该文件在仓库里已不存在的情形。）
    */
    .filter(fp => {
      try { return fs.existsSync(fp); } catch { return false; }
    });
  if (editedFiles.length === 0) return null;
  const issues = [];
  const cwd = process.cwd();

  // Check 1: console.log 残留（始终检查，成本低）。跳过 CLI 文件（console.log 是有意的 stdout 输出）
  const CLI_PATTERNS = [/packages[/\\]agentpm[/\\]src[/\\]/i, /packages[/\\]agentpm[/\\]scripts[/\\]/i, /[/\\]bin[/\\]/];
  for (const fp of editedFiles) {
    if (CLI_PATTERNS.some(p => p.test(fp))) continue;
    try {
      if (!fs.existsSync(fp)) continue;
      const content = fs.readFileSync(fp, 'utf8');
      const lines = content.split('\n');
      const hits = [];
      lines.forEach((line, i) => {
        if (/console\.(log|debug|info)\s*\(/.test(line) && !/\/\/\s*keep/.test(line)) {
          hits.push(i + 1);
        }
      });
      if (hits.length > 0) {
        issues.push(`${path.basename(fp)} 第 ${hits.join(',')} 行有 console.log`);
      }
    } catch {}
  }

  // Check 2: 智能判断是否强制 review（mode=off 时完全跳过，console.log 检查仍保留）
  const mode = reviewMode();
  const reviewCalled = readState('review-called.txt').trim();
  if (mode !== 'off' && !reviewCalled) {
    const sensitiveHits = editedFiles.filter(fp => SENSITIVE_PATTERNS.some(p => p.test(fp)));
    const allStyleOnly = editedFiles.every(fp => STYLE_ONLY.test(fp));
    // 每个文件的净变更只算一次，供总量闸与敏感闸复用
    const churnByFile = {};
    const recorded = recordedChurnMap();
    for (const fp of editedFiles) churnByFile[fp] = churnFor(fp, cwd, recorded);
    const totalChurn = editedFiles.reduce((sum, fp) => sum + churnByFile[fp], 0);
    // 敏感闸按敏感文件自身净变更判定，不被同轮非敏感大改动带高
    const sensitiveChurn = sensitiveHits.reduce((sum, fp) => sum + churnByFile[fp], 0);

    const sensitiveMustReview = sensitiveHits.length > 0 && sensitiveChurn >= SENSITIVE_DIFF_THRESHOLD;
    const sizeMustReview = !allStyleOnly && totalChurn >= SMALL_DIFF_THRESHOLD;
    const mustReview = sensitiveMustReview || sizeMustReview;

    if (mustReview) {
      const why = sensitiveMustReview
        ? `触碰敏感路径（${sensitiveHits.map(f => path.basename(f)).join(', ')}）且敏感文件净变更约 ${sensitiveChurn} 行（阈值 ${SENSITIVE_DIFF_THRESHOLD}）`
        : `代码净变更约 ${totalChurn} 行（阈值 ${SMALL_DIFF_THRESHOLD}）`;
      // 按本轮改动规模给出审查方式指引：达到分片阈值 → 自动并行分片；否则单次
      const large = editedFiles.length > 8 || totalChurn > 400;
      const how = large
        ? `改动较大（${editedFiles.length} 文件 / ~${totalChurn} 行）→ 按「风险+模块」并行起多个 code-reviewer 分片审查（每组 4-8 文件，同一条消息内并行），只审本轮改动文件`
        : `起一个 code-reviewer 审查本轮改动的 ${editedFiles.length} 个文件即可，只审这些文件、勿全项目扫描`;
      // background 模式：后台启动不阻塞回合；blocking 模式：当场审完才放行
      const runHint = mode === 'background'
        ? '【模式=background】用 Agent 的 run_in_background:true 后台启动这些 code-reviewer，启动后即可结束本回合、不阻塞用户；跑完再异步汇报结论。'
        : '【模式=blocking】当场审完再结束回合。';
      issues.push(`本轮修改了代码文件但未调用 code-reviewer agent — ${why}。${how}\n    ${runHint}`);
    }
    // 否则：小改动 / 纯样式 / 非敏感 → 自动放行，不阻断
  }

  if (issues.length === 0) return null;

  return {
    decision: 'block',
    reason:
      '【质量门禁】发现以下问题：\n' +
      issues.map(i => `  - ${i}`).join('\n') +
      '\n请处理后再结束回复。\n' +
      '（分片是自动的：达到阈值就在同一条消息里并行起多个 code-reviewer，无需用户手动 /review）'
  };
};
