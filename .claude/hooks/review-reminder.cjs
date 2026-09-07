'use strict';

const path = require('path');
const { isCodeFile, isTestFile } = require('./lib/file-utils.cjs');
const { appendState, readState } = require('./lib/state.cjs');
const { reviewMode } = require('./lib/config.cjs');

/** 单行文本的行数（空值算 0） */
function lineCount(text) {
  return typeof text === 'string' && text.length ? text.split('\n').length : 0;
}

/**
 * 本次编辑触及的行数
 *
 * Edit 取 old/new 的较大者（替换 3 行为 5 行算 5 行）；
 * MultiEdit 累加各处；Write 取整份内容行数。
 */
function editChurn(toolInput) {
  if (!toolInput) return 0;
  if (Array.isArray(toolInput.edits)) {
    return toolInput.edits.reduce(
      (sum, e) => sum + Math.max(lineCount(e?.old_string), lineCount(e?.new_string)),
      0
    );
  }
  if (typeof toolInput.new_string === 'string' || typeof toolInput.old_string === 'string') {
    return Math.max(lineCount(toolInput.old_string), lineCount(toolInput.new_string));
  }
  return lineCount(toolInput.content);
}

exports.run = (input) => {
  const filePath = input?.tool_input?.file_path;
  if (!filePath) return null;

  if (!isCodeFile(filePath)) return null;

  // 豁免路径：gpt-image-generator 等技能/工具文件不纳入代码门禁
  const REVIEW_EXEMPT = [/[/\\]skills[/\\]gpt-image-generator[/\\]/i];
  if (REVIEW_EXEMPT.some(p => p.test(filePath))) return null;

  appendState('edited-files.txt', filePath);

  /*
    记录本轮真实编辑量（按编辑载荷行数），供 stop-quality-gate 给未跟踪文件计 churn。

    git diff 对 untracked 文件恒为空，门禁只能退化成「按整文件行数计入」——
    本项目里长期未提交的大文件很常见，改一行列宽会被报成 1438 行变更，
    进而误判成「需并行分片审查」，白起一堆 reviewer。
    编辑载荷行数与 git 跟踪状态无关，是更贴近「本轮改了多少」的度量。
  */
  appendState('edit-churn.txt', `${filePath}\t${editChurn(input?.tool_input)}`);

  // mode=off：仍跟踪改动文件（便于中途切档生效），但不注入提醒噪音
  const mode = reviewMode();
  if (mode === 'off') return null;

  /*
    本轮只提醒一次。

    提醒文本约 500 字符且每次编辑都完全相同，改 10 个文件就往上下文塞 5000 字符
    重复内容——对模型是纯噪音，却每轮都要消化，变相拖慢每次回复。
    而它要传达的只有一件事「这组改动完成后记得调 code-reviewer」，说一次就够。
    文件跟踪（上面的 appendState）不受影响，门禁仍能看到全部改动文件。
    标记由 round-reset（每条用户消息）与 session-start 清除。
  */
  if (readState('reminder-shown.txt').trim()) return null;
  appendState('reminder-shown.txt', '1');

  const basename = path.basename(filePath);
  const isTest = isTestFile(filePath);

  // 执行方式指引（与 stop-quality-gate 的 runHint 保持一致）：
  // background=后台 run_in_background 启动、不阻塞回合，跑完异步汇报；blocking=当场审完再结束回合。
  const runHint = mode === 'background'
    ? '⚙️ 执行方式【模式=background】：必须用 Agent 的 run_in_background:true 后台启动 code-reviewer，启动后即可继续/结束回合、不阻塞用户，跑完再异步汇报结论。禁止在前台同步等待审查结果。'
    : '⚙️ 执行方式【模式=blocking】：当场同步审完再结束回合。';

  return {
    hookSpecificOutput: {
      hookEventName: 'PostToolUse',
      additionalContext:
        // 不点名单个文件：本轮只注入这一次，后续编辑不再提醒，
        // 写死首个文件名会让人误以为只需审那一个
        `【Review Reminder】本轮已开始修改代码（首个: ${basename}）\n` +
        '当这组相关改动完成后，按规模自适应审查：小改动/纯数据文案可跳过；' +
        '≤8 文件且≤400 行起一个 code-reviewer（只审本轮改动文件）；' +
        '>8 文件或>400 行自动按「风险+模块」并行起多个 code-reviewer 分片审查（无需等用户手动 /review）。\n' +
        '触碰敏感路径（认证/安全/支付/数据层）默认要审——但恢复一段已审过的旧代码、照抄审查员上一轮给的修复、纯加参数/常量这类「无新增风险」的琐碎改动可跳过，别为它单独起一轮审查。\n' +
        runHint
    }
  };
};
