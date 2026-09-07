# 会话上下文

## 项目环境

不预设目录名与技术栈，本轮首次需要时自行探测：

- 有哪些包：`find . -maxdepth 2 -name package.json -not -path "*/node_modules/*"`
- 各包能跑什么：读它的 `scripts`，优先用项目自己定义的脚本（`typecheck` / `type-check` / `lint`）
- 没有现成脚本时按依赖推断：有 `vue-tsc` 用 `npx vue-tsc --noEmit`，有 `typescript` 用 `npx tsc --noEmit`，有 eslint 配置就 `npx eslint`
- 包管理器看锁文件：`package-lock.json` → npm，`pnpm-lock.yaml` → pnpm，`yarn.lock` → yarn

单包仓库、monorepo、前后端分离都走同一套探测流程。
构建命令一律**由用户执行**，不要替用户跑（见 CLAUDE.md 的 No-Auto-Build）。

## 强制执行清单

1. **技能检查** — 接到任何任务后，第一步扫描技能触发词。1% 可能性就调用 Skill 工具。
2. **code-reviewer** — 写完任何代码后立即调用，无例外，不等用户提醒。涵盖代码质量+安全审查。
3. **SRS 规范扫描** — 修改需求说明书前必须读取规范，修改后必须执行禁用词扫描+跨章节一致性检查。不通过不能报告完成。详见 `agentpm-req-doc-workflow.md`。
4. **验证** — 完成声明前必须跑静态检查（类型检查 / eslint）并看到零错误才能声称通过；不替用户跑构建与启动。

以上不是建议，是强制步骤。跳过任何一项 = 违反项目规则。

## 知识库机制

| 层级 | 机制 | 内容 |
|------|------|------|
| 自动加载 | `.claude/rules/agentpm-*.md` | 核心编码规范、前端规范、工作流规则 |
| 按需读取 | `.claude/agentpm-knowledge/` | 详细规范（测试、安全、TypeScript 等） |

何时 Read agentpm-knowledge/：
- 写测试 → `conventions/testing.md`
- 安全改动 → `conventions/security.md`
- TypeScript 类型问题 → `conventions/typescript.md`
- 调试 → `conventions/debugging.md`
