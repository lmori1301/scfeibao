---
name: gpt-image-generator
description: 调用 OpenAI Images API 形式的服务生成或编辑图片（通用，不绑定特定服务商或模型），内置 539 条案例 + 22 个工业级模板的提示词库做意图匹配。当用户要求"AI 生图""文生图""生成一张图""用 gpt-image-2/dall-e 等生图""改图/编辑图片/参考图生成""生成插画/海报/头像/信息图/UI 界面/商品图"等图像生成或编辑需求时使用；用户只给了模糊意图（如"做个科技感海报"）时，先查提示词库匹配模板再组装 prompt。通过零依赖 Node 脚本调用，支持文生图（/images/generations）和参考图编辑（/images/edits），服务地址/密钥/模型均可配置，生成结果保存到项目根 output/images/。
---

# AI 生图（OpenAI Images API 形式）

## 概述

通过 `scripts/gpt-image.mjs`（Node 18+，零依赖）完成文生图和参考图编辑。接口遵循 OpenAI Images API 形式，**服务地址、密钥、模型均为配置项，不绑定任何特定服务商**——填入 OpenAI 官方或任意兼容服务（如自建/第三方 gpt-image-2、dall-e-3 等）即可使用。

技能带一个提示词库（539 条真实案例 + 22 个工业级模板），用户意图模糊时先查库拿模板和句式，再组装 prompt 去调接口。

## 首次使用：环境配置

所有服务参数只存在于 `config.json` 一处，脚本运行时从中读取，不在脚本或文档里写死。调用前完成两步，任缺其一脚本会报错并提示：

1. **确认 Node 版本 ≥ 18**（需原生 `fetch`/`FormData`）：`node -v`
2. **打开技能目录下 `config.json`，按其中字段填写**：
   - `baseURL`、`model` 通常已预置，按需修改
   - `apiKey` 必填
   - `defaults`（size/quality/n）、`outputDir` 按需调整

> 各字段含义见 config.json 内的 `_说明`，取值范围见 [references/api.md](references/api.md)。
>
> 可选：用环境变量 `GPT_IMAGE_BASE_URL` / `GPT_IMAGE_API_KEY` / `GPT_IMAGE_MODEL` 临时覆盖对应字段（优先级高于 config.json），适合不想改文件的场景。

密钥不要提交到 git，也不要在对话中回显明文。

## 调用方式

统一入口 `scripts/gpt-image.mjs`，两个子命令：

### 文生图 generate

```bash
node .claude/skills/gpt-image-generator/scripts/gpt-image.mjs generate \
  --prompt "一个小男孩" \
  --size 1536x1024 \
  --quality high \
  --n 1
```

`--size` 可以用别名，下面两条等价：

```bash
... generate --prompt "一辆跑车" --size 4k --quality high
... generate --prompt "一辆跑车" --size 3840x2160 --quality high
```

### 参考图编辑 edit

多张参考图用逗号分隔（对应接口的多个 `image` 字段）：

```bash
node .claude/skills/gpt-image-generator/scripts/gpt-image.mjs edit \
  --prompt "参考图2的姿势和构图，替换成人物1，其他基本不变" \
  --image fixtures/references/01.png,fixtures/references/02.jpg \
  --size 1536x1024 \
  --quality high
```

### 参数说明

| 参数 | 适用 | 默认值 | 说明 |
|------|------|--------|------|
| `--prompt` | 二者 | 无（必填） | 文本描述/编辑指令 |
| `--image` | edit | 无（edit 必填） | 参考图路径，多个用逗号分隔 |
| `--size` | 二者 | `auto` | 像素值或别名，见下表；`auto` 交给模型按提示词决定 |
| `--quality` | 二者 | `auto` | `low`/`medium`/`high`/`auto` |
| `--n` | generate | 1 | 生成张数 |
| `--model` | 二者 | config 默认 | 覆盖模型 |
| `--out` | 二者 | `output/images` | 覆盖输出目录 |
| `--format` | 二者 | png | `png`/`jpeg`/`webp` |
| `--compression` | 二者 | 无 | 0-100，仅 jpeg/webp 生效 |
| `--background` | 二者 | 无 | `transparent`/`opaque`/`auto`，透明需 png/webp |
| `--moderation` | 二者 | 无 | `low`/`auto` |
| `--retries` | 二者 | 3 | 可重试错误（429/5xx/超时）的重试次数 |

未指定的参数回退到 `config.json` 的 `defaults`。

### 尺寸别名

`--size` 接受口语化别名，脚本发请求前换成实际像素：

| 别名 | 实际值 |
|------|--------|
| `4k` / `4k横` | `3840x2160` |
| `4k竖` | `2160x3840` |
| `2k` / `2k横` | `2048x1152` |
| `2k方` / `2k竖` | `2048x2048` / `1152x2048` |
| `1080p` / `fhd` | `1920x1088` |
| `720p` / `hd` | `1280x720` |
| `方` / `square` | `1024x1024` |
| `横` / `landscape` | `1536x1024` |
| `竖` / `portrait` | `1024x1536` |

`node scripts/gpt-image.mjs sizes` 可随时列出完整别名表。

也可直接写 `宽x高`。脚本在发请求前按官方约束本地校验（最长边 ≤3840、
两边为 16 的倍数、长短比 ≤3:1、总像素 655,360~8,294,400），不合法时报错并给出最近的合法值，
不必等一次网络往返才拿到 400。`1080p` 取 1088 而非 1080 就是因为 1080 不是 16 的倍数。

### 服务端是否真支持你要的尺寸

**文档支持 ≠ 当前服务端支持。** 官方 gpt-image-2 支持到 4K，但第三方兼容服务
可能接受 `size` 参数却静默返回别的分辨率。脚本因此会读出成图的真实宽高，
与请求不一致时明确告警——不看告警就会以为拿到了 4K，实际是别的尺寸。

换服务商或怀疑尺寸不生效时，先跑探测：

```bash
node scripts/probe-sizes.mjs                       # 默认探 6 档
node scripts/probe-sizes.mjs "1536x1024,3840x2160" # 只探指定档
```

它逐个尺寸实拍一张，报告「真正支持 / 参数被忽略 / 直接失败」三类结果。
注意探测默认用 `low` 画质省成本，若怀疑画质本身影响尺寸，用 `high` 复测确认。

改过 `SIZE_ALIASES` 后跑一次自检，确认新别名满足官方约束：

```bash
node scripts/check-sizes.mjs
```

### 重试

429、5xx、超时会自动指数退避重试（5s→10s→20s，上限 60s），默认 3 次。
400、401 这类参数或密钥错误不重试。批量生成时单张失败不会中断整批。

### 超时

按目标像素量动态放大：约 1MP 起 3 分钟，每多 1MP 加 1 分钟，上限 20 分钟。
4K 约 8.3MP，超时给到 11 分钟。

## 输出

图片默认保存到项目根 `output/images/`，命名 `<generate|edit>-<时间戳>-<序号>.png`。脚本结束打印每张的绝对路径。

**prompt 太长不便写进命令行时，存到项目根 `output/prompts/<主题>.txt`，再 `--prompt "$(cat 该文件)"` 传入。**
所有运行产物都留在项目根 `output/` 下，不要写进技能目录——技能目录只放 SKILL.md、config.json、assets、references、scripts。
存成文件还有个好处：改风格重跑时直接编辑那个 txt，不用重打一遍长 prompt。

## 参数取值与响应细节

完整的接口字段、size/quality 取值范围、响应结构和错误码，见 [references/api.md](references/api.md)。

## 使用流程

首次：检查 `node -v ≥ 18`，确认 `config.json` 的 `apiKey` 已填。

### 第 0 步：判断要不要查库

| 用户输入 | 处理 |
|---|---|
| 已给出完整、具体的画面描述（含主体+风格+构图等） | **跳过查库**，直接第 3 步 |
| 只给了模糊意图（"做个科技感海报"、"生成一张商品图"） | 走完整四步 |
| 明确要求"参考案例"、"用模板"、"帮我想怎么写 prompt" | 走完整四步 |

用户已经写好 prompt 时别硬塞模板——那是画蛇添足，直接生成。

### 第 1 步：意图分析

从用户需求里提取四项，缺的靠合理默认补齐，不要逐条追问：

- **产出类型**：UI 界面 / 信息图 / 海报 / 商品图 / 品牌标志 / 建筑空间 / 摄影写实 / 插画 / 人物角色 / 叙事场景 / 历史古风 / 文档出版 / 其他
- **风格取向**：写实、3D、插画、古典等
- **场景领域**：科技、商业、教育、社交、时尚、美食、旅行等
- **硬性约束**：画面文字、比例尺寸、配色、必须出现或必须避免的元素

### 第 2 步：检索匹配

```bash
node .claude/skills/gpt-image-generator/scripts/find-prompt.mjs match "科技公司年度报告的信息图" --top 5
```

输出「匹配模板（含必锁要素和避坑点）+ 相似案例摘要」。可加 `--category` / `--style` / `--scene` 硬过滤，取值用 `list` 查：

```bash
node scripts/find-prompt.mjs list categories   # 或 templates / styles / scenes
```

看中某条案例就取完整 prompt 当句式参考：

```bash
node scripts/find-prompt.mjs case 296 447
```

**检索结果要自己判断，别照搬。** 源库打标有噪声——旅行海报被标成 `Food` 场景、大量案例带 `Tech/Commerce/Food` 三连标签、多条案例共用同一个标题。匹配结果的价值排序是：模板的**必锁要素/避坑点** > 案例的 **prompt 结构和句式** > 案例的具体主题。主题对不上是常态，别因此硬凑。

需要人工浏览全部分类和模板时读 [references/style-library.md](references/style-library.md)，日常检索不必读它。

### 第 3 步：组装 prompt

以模板的「必锁要素」为骨架，套用案例的句式，填入用户的具体内容。要点：

- 案例里的 `{argument name="x" default="y"}` 是源库的参数占位符，**必须替换成实际内容**，不能留在最终 prompt 里
- 库里高分案例多用结构化写法（JSON 式分段或「一、品牌基础设定」式分节），画面要素多时沿用这种组织方式比堆长句更可控
- 画面内文字要逐字写明，模型不会自己猜文案
- 逐条核对模板的「避坑」项
- 案例 prompt 里的 `--ar 4:5` 这类比例标记**不要留在 prompt 文本里**，它是 Midjourney 语法，本接口不认；把它转成第 4 步的 `--size` 参数

### 第 4 步：定尺寸和画质

<EXTREMELY-IMPORTANT>
`--size` 必须按产出类型显式指定，不要默默沿用 config 的默认值。
config 的 `defaults.size` 已设为 `auto`（漏传时由模型按提示词判断，不会强制成 4K 横版），但 `auto` 只是安全兜底，不是最优解——模型未必猜中你要的方向。
方向选错了构图就废了——海报按横版出、手机界面按横版出，画面直接不可用。
</EXTREMELY-IMPORTANT>

按产出类型选：

| 产出类型 | 推荐 `--size` | 理由 |
|---|---|---|
| 海报 / 封面 / 长图 | `1024x1536`（竖）或 `2k竖` | 海报几乎都是竖版 |
| 手机 App 界面 / 社媒截图 | `1024x1536` | 贴近手机比例 |
| 网页 / 仪表盘 / 后台界面 | `1536x1024` 或 `2k` | 桌面端是横版 |
| 信息图 / 知识图谱 | `1024x1536`（竖）或 `2k` | 纵向罗列信息用竖版，横向对比用横版 |
| 商品主图 / 电商详情 | `1024x1024`（主图）/ `1024x1536`（详情） | 电商主图是方形规范 |
| 头像 / 图标 / 徽章 | `1024x1024` | 方形 |
| 摄影写实 / 风景 | `1536x1024` | 横版符合摄影习惯 |
| 人物立绘 / 肖像 | `1024x1536` | 竖版容纳全身 |
| 建筑空间 / 全景 | `1536x1024` 或 `4k` | 横版展现空间 |

三条优先级，从高到低：

1. **用户明确说了**尺寸或比例 → 照办
2. **检索结果给了「原案例比例」** → 按它选最接近的尺寸别名（库里约四成案例带这个线索）
3. 都没有 → 查上表按产出类型定

画质：正式出图传 `high`。用户说"随便看看/先试试/出个草稿"，或需要一次出多张比选时，传 `low` 或 `medium` 省钱省时间——4K + high 是最贵的档，试错阶段没必要。

`4k` 这一档官方标注为实验性（约 829 万像素，贴着上限），更慢也更容易超时或触发服务端容量错误，脚本会带告警。除非用户明确要 4K，否则 `2k` 一档已经够用。

### 第 5 步：调用生成

纯文生图用 `generate`，有参考图用 `edit`（见上文调用方式）。

prompt 长到不便直接写进命令行时，先存 `output/prompts/<主题>.txt` 再 `--prompt "$(cat ...)"`，产物一律落在项目根 `output/` 下。

向用户报告：保存路径、参考了哪个模板/案例 id、**选了什么尺寸和为什么**、以及 prompt 里做过的关键取舍。失败时按脚本抛出的错误（透传服务端 `error.message`）排查。

出图后留意脚本的**尺寸告警**：第三方代理常接受 `size` 参数却返回别的分辨率，告警出现时要如实告诉用户实际拿到的尺寸，别默认请求值生效了。

## 提示词库出处

`assets/prompt-library.json` 是技能自带的静态资源，539 条案例 + 22 个模板，不依赖任何外部目录，也不需要构建。

数据整理自 [awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2)（MIT）。提示词文本可用，但**案例配图是 X / 小红书作者的原创作品，库里不含图片，也不要去复制**。参考了具体案例时，向用户带上 `source` 字段的出处。

