/**
 * 中英混合意图匹配层。
 * 源库 styles/scenes 的 keywords 半数为空数组，无法单靠它做中文映射，
 * 因此这里补一层中文同义词表 + 中文 2-gram 切分，配合源库的中文 title 做打分。
 */

/** 中文意图词 → 源库英文标签（value 原文，大小写敏感） */
export const ZH_SYNONYMS = {
  // 分类向
  界面: ['UI'], 页面: ['UI'], 网页: ['UI'], 应用: ['UI'], 仪表盘: ['UI', 'Infographic'],
  截图: ['UI'], 后台: ['UI'], 管理后台: ['UI'], 表单: ['UI'], 控制台: ['UI'],
  图表: ['Charts', 'Infographic'], 信息图: ['Infographic'], 数据图: ['Charts', 'Infographic'],
  流程图: ['Infographic'], 图谱: ['Infographic'], 架构图: ['Infographic'], 示意图: ['Infographic'],
  海报: ['Poster'], 招贴: ['Poster'], 排版: ['Poster', 'Documents'], 字体: ['Poster'],
  标题: ['Poster'], 封面: ['Poster'], banner: ['Poster'], 横幅: ['Poster'],
  // 源库把 Product/Products、Story/Scenes、Character/Characters 拆成了两个标签且都在用，
  // 语义相同的必须都带上，否则命中不到案例数更多的那个。
  商品: ['Product', 'Products'], 产品: ['Product', 'Products'], 电商: ['Product', 'Products'],
  包装: ['Product', 'Products'], 详情页: ['Product', 'Products', 'UI'],
  主图: ['Product', 'Products'], 广告: ['Product', 'Products', 'Brand'],
  品牌: ['Brand'], 标志: ['Brand'], logo: ['Brand'], 视觉识别: ['Brand'], vi: ['Brand'],
  建筑: ['Architecture'], 室内: ['Architecture'], 空间: ['Architecture'], 房间: ['Architecture'],
  户型: ['Architecture'], 景观: ['Architecture'], 装修: ['Architecture'],
  摄影: ['Photography', 'Realistic'], 写实: ['Realistic', 'Photography'], 照片: ['Photography'],
  实拍: ['Photography'], 真人: ['Photography', 'Character'], 质感: ['Realistic'],
  插画: ['Illustration'], 手绘: ['Illustration'], 漫画: ['Illustration'], 卡通: ['Illustration'],
  水彩: ['Illustration'], 简笔: ['Illustration'], 涂鸦: ['Illustration'],
  人物: ['Character', 'Characters'], 角色: ['Character', 'Characters'], 头像: ['Character'],
  肖像: ['Character', 'Photography'], 立绘: ['Character'], 表情: ['Character'], 姿势: ['Character'],
  // Story（scene 维度，65 例）和 Scenes（style 维度，2 例）是源库拆开打的，Story 才是主力
  场景: ['Story', 'Scenes'], 故事: ['Story', 'Scenes'], 分镜: ['Story', 'Scenes'],
  叙事: ['Story', 'Scenes'], 连环: ['Story', 'Scenes'], 剧情: ['Story', 'Scenes'],
  历史: ['History', 'Classical'], 古代: ['History', 'Classical'], 古典: ['Classical'],
  文物: ['History', 'Classical'], 国风: ['Classical'], 水墨: ['Classical', 'Illustration'],
  文档: ['Documents'], 手册: ['Documents'], 说明书: ['Documents'], 简历: ['Documents'],
  报告: ['Documents'], 书籍: ['Documents'], 杂志: ['Documents', 'Poster'],
  三维: ['3D'], 立体: ['3D'], 玩具: ['3D'], 手办: ['3D'], 渲染: ['3D'], 等距: ['3D'],
  // 场景向
  科技: ['Tech'], 技术: ['Tech'], 数据: ['Tech'], 人工智能: ['Tech'], 互联网: ['Tech'],
  商业: ['Commerce'], 营销: ['Commerce'], 促销: ['Commerce'], 零售: ['Commerce'],
  教育: ['Education'], 科普: ['Education'], 教学: ['Education'], 学习: ['Education'], 知识: ['Education'],
  社交: ['Social'], 社媒: ['Social'], 朋友圈: ['Social'], 小红书: ['Social'], 短视频: ['Social'],
  时尚: ['Fashion'], 服装: ['Fashion'], 穿搭: ['Fashion'], 美妆: ['Fashion'], 潮流: ['Fashion'],
  美食: ['Food'], 餐饮: ['Food'], 菜品: ['Food'], 饮品: ['Food'], 咖啡: ['Food'],
  旅行: ['Travel'], 旅游: ['Travel'], 风景: ['Travel'], 城市: ['Travel'], 地图: ['Travel'],
  创意: ['Creative'], 艺术: ['Creative'], 概念: ['Creative'], 实验: ['Creative'],
};

/** 停用词，避免「一张/帮我/生成」这类词污染打分 */
const STOP_WORDS = new Set([
  '一张', '一个', '一份', '帮我', '给我', '我要', '我想', '需要', '生成', '制作', '做个', '做一',
  '画个', '画一', '图片', '图像', '设计', '要求', '风格', '效果', '关于', '可以', '能否', '请问',
  'a', 'an', 'the', 'of', 'for', 'with', 'and', 'to', 'in', 'on', 'me', 'my', 'please',
  'image', 'picture', 'generate', 'create', 'make', 'draw', 'design',
]);

/**
 * 把中英混合文本切成检索词。
 * 中文无分词器可用，取 2-gram（覆盖「海报/界面/插画」这类双字词，绝大多数标签词都是双字）。
 * @param {string} text 原始文本
 * @returns {string[]} 去重后的检索词，全小写
 */
export function tokenize(text) {
  if (!text) return [];
  const lower = String(text).toLowerCase();
  const tokens = new Set();

  // 英文/数字按非字母数字切分
  for (const w of lower.split(/[^a-z0-9]+/)) {
    if (w.length >= 2 && !STOP_WORDS.has(w)) tokens.add(w);
  }

  // 中文连续段取 2-gram 与 3-gram
  for (const seg of lower.match(/[一-龥]+/g) || []) {
    if (seg.length === 1) { tokens.add(seg); continue; }
    for (let n = 2; n <= 3; n++) {
      for (let i = 0; i + n <= seg.length; i++) {
        const gram = seg.slice(i, i + n);
        if (!STOP_WORDS.has(gram)) tokens.add(gram);
      }
    }
  }
  return [...tokens];
}

/**
 * 用中文同义词表把检索词扩展成源库英文标签。
 * @param {string[]} tokens tokenize 的结果
 * @returns {string[]} 命中的英文标签，去重
 */
export function expandTags(tokens) {
  const tags = new Set();
  for (const t of tokens) {
    for (const hit of ZH_SYNONYMS[t] || []) tags.add(hit);
  }
  return [...tags];
}
