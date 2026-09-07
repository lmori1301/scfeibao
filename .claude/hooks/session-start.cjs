'use strict';

const { clearState } = require('./lib/state.cjs');

exports.run = () => {
  // Clear state files from previous session
  clearState('edited-files.txt');
  clearState('read-files.txt'); // GateGuard 已下线，清一次以带走旧会话残留
  clearState('review-called.txt');
  // 与 round-reset 保持一致：漏清这个会让上次会话（尤其是异常退出、没走 round-reset 的）
  // 残留的 churn 记录活到本会话，门禁据此误判要不要审查
  clearState('edit-churn.txt');
  clearState('reminder-shown.txt');

  return {
    hookSpecificOutput: {
      hookEventName: 'SessionStart',
      additionalContext:
        '【会话初始化完成】状态文件已清理。\n' +
        '强制执行清单：\n' +
        '1. 技能检查 — 接到任务后第一步扫描技能触发词\n' +
        '2. code-reviewer — 写完代码后立即调用，无例外\n' +
        // 原为「必须运行构建/测试命令」，与 CLAUDE.md 的 No-Auto-Build（禁止替用户跑
        // npm run build / vite build）和 Verify-Before-Claim（验证限于静态检查）正面冲突。
        // 这条是每个会话第一句就注入的，等于开局就给出两条相反指令。
        '3. 验证 — 完成声明前跑静态检查（vue-tsc --noEmit / tsc --noEmit / eslint），\n' +
        '   看到零错误才能声明完成；不替用户跑构建与启动'
    }
  };
};
