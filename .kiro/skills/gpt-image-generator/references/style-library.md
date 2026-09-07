# GPT-Image 风格库速查

> 数据整理自 [awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2)（MIT）。
> 案例 539 条｜模板 22 个｜整理于 2026-08-29

检索用 `scripts/find-prompt.mjs`，本文件只用于人工确认分类和模板选型。

## 目录

- [分类](#分类)
- [风格标签](#风格标签)
- [场景标签](#场景标签)
- [模板](#模板)

## 分类

| value（检索用） | 中文 | 说明 | 案例数 |
|---|---|---|---|
| `UI & Interfaces` | UI 与界面 | App、网页、仪表盘、社媒截图与产品界面。 | 73 |
| `Charts & Infographics` | 图表与信息可视化 | 信息图、知识图谱、技术解释与结构化图解。 | 52 |
| `Posters & Typography` | 海报与排版 | 活动海报、封面、字体视觉和强排版画面。 | 89 |
| `Products & E-commerce` | 商品与电商 | 商品图、详情页、包装卖点和商业广告。 | 42 |
| `Brand & Logos` | 品牌与标志 | Logo、VI、品牌触点和 Campaign 视觉系统。 | 27 |
| `Architecture & Spaces` | 建筑与空间 | 建筑表现、室内空间、城市地图和空间概念。 | 12 |
| `Photography & Realism` | 摄影与写实 | 人像、手机纪实、胶片质感和商业摄影。 | 78 |
| `Illustration & Art` | 插画与艺术 | 插画、艺术风格、材质实验和装饰画面。 | 59 |
| `Characters & People` | 人物与角色 | 角色设定、动作参考、卡牌和 3D 玩具。 | 31 |
| `Scenes & Storytelling` | 场景与叙事 | 分镜、故事场景、直播画面和世界观叙事。 | 21 |
| `History & Classical Themes` | 历史与古风题材 | 古风长卷、历史人物、传统题材和诗词画面。 | 16 |
| `Documents & Publishing` | 文档与出版物 | 白皮书、手册、百科图鉴和出版页设计。 | 11 |
| `Other Use Cases` | 其他应用场景 | 创意实验、特殊任务、混合玩法和实用场景。 | 28 |

## 风格标签

| value | 中文 | 案例数 |
|---|---|---|
| `3D` | 3D | 40 |
| `Architecture` | 建筑 | 4 |
| `Brand` | 品牌 | 86 |
| `Character` | 角色 | 113 |
| `Characters` | 人物 | 2 |
| `Charts` | 图表 | 2 |
| `Classical` | 古典 | 14 |
| `Documents` | 文档 | 4 |
| `History` | 历史 | 7 |
| `Illustration` | 插画 | 103 |
| `Infographic` | 信息图 | 74 |
| `Other Use Cases` | 其他应用场景 | 9 |
| `Photography` | 摄影 | 3 |
| `Poster` | 海报 | 198 |
| `Product` | 商品 | 56 |
| `Products` | 商品 | 5 |
| `Realistic` | 写实 | 217 |
| `Scenes` | 场景 | 2 |
| `UI` | 界面 | 250 |

## 场景标签

| value | 中文 | 案例数 |
|---|---|---|
| `Creative` | 创意 | 52 |
| `Tech` | 科技 | 403 |
| `Commerce` | 商业 | 382 |
| `Education` | 教育 | 42 |
| `Social` | 社媒 | 87 |
| `Fashion` | 时尚 | 122 |
| `Food` | 食品饮品 | 41 |
| `Travel` | 旅行 | 48 |
| `Story` | 叙事 | 65 |
| `History` | 历史 | 12 |

## 模板

每个模板给出适用场景、必须锁定的要素、以及常见坑。写 prompt 前先对号入座。

### UI 截图系统（`ui-screenshot-system`）

- 分类：`UI & Interfaces`｜风格：`UI`｜场景：`Tech` `Social`
- 用途：生成 App、网页、仪表盘、社媒截图等高保真界面。
- 何时用：用于 App 截图、仪表盘、社媒截图和直播界面。
- 必锁要素：
  - 锁定平台、比例、层级和画面文字。
  - 明确状态栏、Tab、操作区、评论层等 UI 元素。
- 避坑：
  - 避免平台描述过泛。
  - 约束文字可读性和平台特征。
- 参考案例 id：17、2、4（用 `find-prompt.mjs case <id>` 看完整 prompt）

### 信息图引擎（`infographic-engine`）

- 分类：`Charts & Infographics`｜风格：`Infographic` `Charts`｜场景：`Education` `Tech`
- 用途：生成结构化图解、时间线、知识图谱和技术解释图。
- 何时用：用于解释图、技术图解、时间线和知识卡片。
- 必锁要素：
  - 定义 3-5 个模块、信息流、层级和短标签。
  - 用色块、箭头、图标和留白控制复杂度。
- 避坑：
  - 避免把长段正文塞进画面。
  - 先限制模块数量，再补视觉细节。
- 参考案例 id：334、1、8（用 `find-prompt.mjs case <id>` 看完整 prompt）

### 科学尺度缩放图（`scientific-scale-diagram`）

- 分类：`Charts & Infographics`｜风格：`Infographic` `Charts` `Realistic`｜场景：`Education` `Tech`
- 用途：生成多尺度科学信息图，强调层级、标签和可读性。
- 何时用：用于需要从微观到宏观展示尺度变化的科普主题。
- 必锁要素：
  - 使用 6-8 个尺度框，每个标签保持短句。
  - 展示单位、倍率和不同尺度的细节。
- 避坑：
  - 避免所有尺度框长得一样。
  - 避免通用放大镜式布局。
- 参考案例 id：341（用 `find-prompt.mjs case <id>` 看完整 prompt）

### 海报排版系统（`poster-layout-system`）

- 分类：`Posters & Typography`｜风格：`Poster`｜场景：`Commerce` `Social`
- 用途：生成活动、产品、电影和社媒传播海报。
- 何时用：用于活动海报、电影海报、封面和社媒传播视觉。
- 必锁要素：
  - 锁定主体、标题、版式、配色和比例。
  - 突出标题层级和主视觉。
- 避坑：
  - 需要成品海报时，避免生成拼贴展示板。
  - 约束多余文字和装饰符号。
- 参考案例 id：345、5、10（用 `find-prompt.mjs case <id>` 看完整 prompt）

### 运动商业 Campaign（`sports-campaign-poster`）

- 分类：`Posters & Typography`｜风格：`Poster` `Realistic`｜场景：`Commerce` `Fashion`
- 用途：生成运动员、道具、品牌色统一的商业运动海报。
- 何时用：用于运动品牌 Campaign、运动员海报和运动产品视觉。
- 必锁要素：
  - 定义运动项目、姿态、核心道具、标题和品牌色。
  - 使用强光影、干净构图和可读数据层。
- 避坑：
  - 避免错误运动器材和杂乱拼贴。
  - 让运动员和核心道具占据主导。
- 参考案例 id：350、3（用 `find-prompt.mjs case <id>` 看完整 prompt）

### 概念字体海报（`conceptual-typography-poster`）

- 分类：`Posters & Typography`｜风格：`Poster`｜场景：`Creative` `Social`
- 用途：生成以标题文字为主视觉的高级字体海报。
- 何时用：用于标题文字需要成为主视觉结构的海报。
- 必锁要素：
  - 让字体成为画面主角，并保证标题拼写准确。
  - 人物、物体或风景需要服务标题含义。
- 避坑：
  - 避免默认字效、无关图标和标题错字。
  - 控制配色数量，保持克制。
- 参考案例 id：355（用 `find-prompt.mjs case <id>` 看完整 prompt）

### 水墨双重曝光海报（`ink-double-exposure-poster`）

- 分类：`Posters & Typography`｜风格：`Poster` `Illustration` `Classical`｜场景：`Story` `History`
- 用途：生成水墨、人像与层叠氛围结合的视觉海报。
- 何时用：用于诗意人像海报、水墨氛围和文化主题视觉。
- 必锁要素：
  - 融合人像剪影、水墨质感、氛围和留白。
  - 保持构图克制、高级、可读。
- 避坑：
  - 避免廉价奇幻拼贴和景物堆叠。
  - 非必要时减少文字。
- 参考案例 id：359（用 `find-prompt.mjs case <id>` 看完整 prompt）

### 自然科普海报（`nature-science-poster`）

- 分类：`Posters & Typography`｜风格：`Poster` `Infographic`｜场景：`Education`
- 用途：生成极简产品感自然科普海报。
- 何时用：用于自然主题的高级、干净科普海报。
- 必锁要素：
  - 使用清晰主体、少量文案、柔和阴影和充足留白。
  - 让科普标签短而清楚。
- 避坑：
  - 避免广告感太重。
  - 避免密集百科正文。
- 参考案例 id：339（用 `find-prompt.mjs case <id>` 看完整 prompt）

### 商品商业视觉（`product-commerce-visual`）

- 分类：`Products & E-commerce`｜风格：`Product` `Realistic`｜场景：`Commerce` `Food`
- 用途：生成商品图、包装、详情页和卖点排版。
- 何时用：用于商品主图、包装视觉、详情页和销售卖点排版。
- 必锁要素：
  - 定义商品、卖点、材质、场景、光线和版块。
  - 区分主商品、卖点标签和辅助道具。
- 避坑：
  - 避免无关道具削弱商品识别。
  - 约束包装文字和卖点表达。
- 参考案例 id：373、358（用 `find-prompt.mjs case <id>` 看完整 prompt）

### 个性化美妆报告（`personalized-beauty-report`）

- 分类：`Products & E-commerce`｜风格：`Product` `UI`｜场景：`Commerce` `Fashion`
- 用途：生成美妆与生活方式产品的推荐报告版式。
- 何时用：用于美妆推荐、肤质报告、导购助手和生活方式商品卡片。
- 必锁要素：
  - 使用诊断、推荐和商品卡片的报告层级。
  - 对齐商品图、标签和评分。
- 避坑：
  - 避免医疗化结论和难读小字。
  - 保持推荐逻辑清楚。
- 参考案例 id：353（用 `find-prompt.mjs case <id>` 看完整 prompt）

### 品牌身份包（`brand-identity-package`）

- 分类：`Brand & Logos`｜风格：`Brand`｜场景：`Commerce`
- 用途：生成 Logo、配色、字体、应用触点与品牌系统。
- 何时用：用于 Logo 系统、品牌板、VI 套件和应用样机。
- 必锁要素：
  - 定义品牌名、定位、配色、字体、Logo 用法和触点。
  - 要求视觉板中的应用统一对齐。
- 避坑：
  - 避免无关 Logo 变体和混乱配色。
  - 保持品牌文字准确。
- 参考案例 id：354（用 `find-prompt.mjs case <id>` 看完整 prompt）

### 品牌触点视觉板（`brand-touchpoint-board`）

- 分类：`Brand & Logos`｜风格：`Brand` `Product`｜场景：`Commerce` `Social`
- 用途：生成包装、社媒、网页和展示场景里的品牌触点板。
- 何时用：用于多触点 Campaign 展示和品牌落地预览。
- 必锁要素：
  - 指定触点清单、统一视觉规则和样机排列。
  - 让所有面板共享配色和字体逻辑。
- 避坑：
  - 避免混入多个无关 Campaign 风格。
  - 可读性下降时减少触点数量。
- 参考案例 id：362（用 `find-prompt.mjs case <id>` 看完整 prompt）

### 建筑与空间（`architecture-space`）

- 分类：`Architecture & Spaces`｜风格：`Architecture`｜场景：`Travel` `Commerce`
- 用途：生成室内、建筑、城市地图和空间概念视觉。
- 何时用：用于室内、建筑表现、城市地图、空间规划和环境概念图。
- 必锁要素：
  - 定义视角、尺度、材质、光线和空间功能。
  - 地图需要指定地标、标签、边框装饰和准确度。
- 避坑：
  - 概念图之外要避免不合理透视。
  - 锁定地图标签语言和相对位置。
- 参考案例 id：331、11（用 `find-prompt.mjs case <id>` 看完整 prompt）

### 写实摄影（`realistic-photography`）

- 分类：`Photography & Realism`｜风格：`Photography` `Realistic`｜场景：`Fashion` `Commerce`
- 用途：控制镜头、光线、胶片质感和纪实摄影效果。
- 何时用：用于人像、街拍、商品摄影和电影感写实。
- 必锁要素：
  - 指定机位、镜头、光源、质感、背景和动作。
  - 加入可信的小瑕疵增强纪实感。
- 避坑：
  - 商业美妆之外，避免过度磨皮。
  - 需要时加入手部、文字、结构类负面约束。
- 参考案例 id：377（用 `find-prompt.mjs case <id>` 看完整 prompt）

### 街头意外瞬间摄影（`street-accident-moment`）

- 分类：`Photography & Realism`｜风格：`Photography` `Realistic`｜场景：`Travel` `Social`
- 用途：生成手机纪实风街头瞬间，并加入负面约束。
- 何时用：用于街头抓拍、意外泼洒、手机纪实和快速动作。
- 必锁要素：
  - 描述具体瞬间、机位高度、运动模糊和街景。
  - 加入避免摆拍和广告棚拍感的限制。
- 避坑：
  - 避免画面过于干净。
  - 让事件看起来可信。
- 参考案例 id：376（用 `find-prompt.mjs case <id>` 看完整 prompt）

### 插画与艺术风格（`illustration-art-style`）

- 分类：`Illustration & Art`｜风格：`Illustration`｜场景：`Story` `Creative`
- 用途：生成动漫、水彩、水墨、材质实验和艺术风格图。
- 何时用：用于动漫、水彩、水墨、装饰画和风格实验。
- 必锁要素：
  - 定义构图、主体、配色、笔触材质、情绪和完成度。
  - 参考图任务需要说明保留哪些特征。
- 避坑：
  - 避免只写风格，不写构图。
  - 使用参考图时锁定角色识别。
- 参考案例 id：346、6（用 `find-prompt.mjs case <id>` 看完整 prompt）

### 角色设定表（`character-design-sheet`）

- 分类：`Characters & People`｜风格：`Character` `Illustration`｜场景：`Story`
- 用途：生成角色设定、动作分解和一致性参考。
- 何时用：用于角色设定表、动作网格、动作拆解和一致性参考。
- 必锁要素：
  - 定义身份锚点、服装、比例、动作数量和版式。
  - 保持脸、发型和服装细节一致。
- 避坑：
  - 避免不同动作里服装细节变化。
  - 画面拥挤时减少动作数量。
- 参考案例 id：347（用 `find-prompt.mjs case <id>` 看完整 prompt）

### 3D 收藏玩具（`3d-collectible-toy`）

- 分类：`Characters & People`｜风格：`3D` `Character`｜场景：`Commerce` `Creative`
- 用途：把参考图转换成高级 3D 收藏玩具效果。
- 何时用：用于高级收藏玩具、头像公仔、潮玩角色和 3D 展示图。
- 必锁要素：
  - 保留参考图中的脸和服装锚点。
  - 指定材质、包装、底座、光线和收藏比例。
- 避坑：
  - 避免没有身份细节的通用玩具。
  - 包装文字保持少量且准确。
- 参考案例 id：378（用 `find-prompt.mjs case <id>` 看完整 prompt）

### 场景叙事（`scene-storytelling`）

- 分类：`Scenes & Storytelling`｜风格：`Scenes` `Illustration`｜场景：`Story` `Social`
- 用途：生成分镜、世界观、故事场景和情绪节奏。
- 何时用：用于分镜、世界观、直播场景和情绪叙事画面。
- 必锁要素：
  - 定义人物、地点、时间、冲突、情绪和机位。
  - 让场景细节服务故事。
- 避坑：
  - 避免通用幻想背景。
  - 让故事线索在画面里可见。
- 参考案例 id：330（用 `find-prompt.mjs case <id>` 看完整 prompt）

### 历史与古风题材（`history-classical-themes`）

- 分类：`History & Classical Themes`｜风格：`History` `Classical` `Illustration`｜场景：`History` `Story`
- 用途：生成朝代服饰、长卷叙事、诗词和传统题材。
- 何时用：用于古风题材、长卷、朝代服饰、诗词视觉和历史场景。
- 必锁要素：
  - 指定朝代、服饰制度、器物参考、版式和文化气质。
  - 明确长卷、册页或海报形式。
- 避坑：
  - 需要历史准确时，避免朝代混搭。
  - 约束随机现代物件。
- 参考案例 id：375、338（用 `find-prompt.mjs case <id>` 看完整 prompt）

### 文档与出版物（`document-publishing`）

- 分类：`Documents & Publishing`｜风格：`Documents` `Infographic`｜场景：`Education` `Tech`
- 用途：生成白皮书、手册、百科图鉴和页面系统。
- 何时用：用于白皮书、手册、百科图鉴、报告页面和出版系统。
- 必锁要素：
  - 定义页面尺寸、分栏、目录、图表系统和字体层级。
  - 使用可读标题、表格、标签和页面节奏。
- 避坑：
  - 避免密集小字。
  - 让图表和说明对齐页面网格。
- 参考案例 id：360（用 `find-prompt.mjs case <id>` 看完整 prompt）

### 概念产品研发拆解（`concept-product-breakdown`）

- 分类：`Other Use Cases`｜风格：`Other Use Cases` `Product`｜场景：`Creative` `Tech`
- 用途：生成研发板、拆解图、混合任务和特殊输出。
- 何时用：用于实验型任务、研发视觉板、拆解图和特殊视觉系统。
- 必锁要素：
  - 定义产物类型、组件、标签、材质逻辑和展示格式。
  - 使用清晰标注和受控技术风格。
- 避坑：
  - 避免任务边界过泛。
  - 标签要短，组件关系要清楚。
- 参考案例 id：370、361（用 `find-prompt.mjs case <id>` 看完整 prompt）
