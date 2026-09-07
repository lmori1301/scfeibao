---
description: 验证 — 跑类型检查与 lint，确认当前代码状态
---

# /verify

跑静态检查，确认代码状态。

## 行为

1. 先探测项目结构，不要预设目录名：
   - `find . -maxdepth 2 -name package.json -not -path "*/node_modules/*"` 找出所有包
   - 读各包的 `scripts`，优先用项目自己定义的检查脚本（`typecheck` / `type-check` / `lint` 等）
   - 没有现成脚本时才按依赖推断命令：有 `vue-tsc` 用 `npx vue-tsc --noEmit`，有 `typescript` 用 `npx tsc --noEmit`，有 eslint 配置就跑 `npx eslint`
2. 对每个包执行它适用的检查。各包互不依赖，同一条消息内并行发起
3. 报告结果：逐包给出通过 / 失败 + 错误详情

单包仓库、monorepo、前后端分离都走同一套流程——差别由探测结果决定，不写死在本文件里。

## 不跑构建

不执行 `vite build` / `nest build` / `npm run build`。构建慢，且类型检查已能覆盖绝大多数会让构建失败的问题；
构建与启动由用户自行执行（见 CLAUDE.md 的 No-Auto-Build）。

注意有些项目的 `build` 脚本里串了类型检查（如 `vue-tsc --noEmit && vite build`）——
这种只取前半段单独跑，不要为了类型检查连带跑构建。

## 失败时

报告错误详情即可，不要自动进入「修改 → 重跑 → 再修改」的循环。
要不要改、怎么改由用户决定——自动循环既拖长等待，也容易在用户还没看到原始错误时就改乱代码。
