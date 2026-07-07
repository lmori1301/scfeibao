import { http, HttpResponse } from 'msw';

// 模拟新闻业务数据（与后端返回格式一致）
const mockNewsData = {
  '动态要闻': {
    items: [
      { id: 1, title: '飞豹救援春季演练圆满成功', summary: '2026年春季综合演练顺利完成', coverImage: '/carousel1.jpg', publishedAt: '2026-02-28', category: '动态要闻', status: 1, isHeadline: 1, isNew: 1 },
      { id: 2, title: '全国应急救援工作会议召开', summary: '部署2026年应急救援重点工作', coverImage: '/carousel2.jpg', publishedAt: '2026-02-27', category: '动态要闻', status: 1, isHeadline: 0, isNew: 1 },
      { id: 3, title: '四川飞豹救援队荣获先进集体', summary: '表彰2025年度优秀救援队伍', coverImage: '/carousel3.jpg', publishedAt: '2026-02-26', category: '动态要闻', status: 1, isHeadline: 0, isNew: 0 },
      { id: 4, title: '新型救援装备列装仪式举行', summary: '提升应急救援能力现代化水平', coverImage: '/carousel4.jpg', publishedAt: '2026-02-25', category: '动态要闻', status: 1, isHeadline: 0, isNew: 0 }
    ],
    total: 4
  },
  '各地动态': {
    items: [
      { id: 5, title: '成都应急响应部署会召开', summary: '部署春季应急响应工作', coverImage: '/local1.jpg', publishedAt: '2026-02-25', category: '各地动态', status: 1 },
      { id: 6, title: '绵阳开展消防安全检查', summary: '排查消防安全隐患', coverImage: '/local2.jpg', publishedAt: '2026-02-24', category: '各地动态', status: 1 },
      { id: 7, title: '德阳救援队伍建设推进会', summary: '加强基层救援力量建设', coverImage: '/local3.jpg', publishedAt: '2026-02-23', category: '各地动态', status: 1 },
      { id: 8, title: '乐山应急演练活动举行', summary: '提升应急处置能力', coverImage: '/local4.jpg', publishedAt: '2026-02-22', category: '各地动态', status: 1 },
      { id: 9, title: '泸州消防宣传进社区', summary: '普及消防安全知识', coverImage: '/local5.jpg', publishedAt: '2026-02-21', category: '各地动态', status: 1 },
      { id: 10, title: '宜宾救援装备升级完成', summary: '提升救援效率', coverImage: '/local6.jpg', publishedAt: '2026-02-20', category: '各地动态', status: 1 },
      { id: 11, title: '南充应急管理工作会议', summary: '总结经验部署工作', coverImage: '/local7.jpg', publishedAt: '2026-02-19', category: '各地动态', status: 1 },
      { id: 12, title: '达州开展应急培训', summary: '提升应急处置水平', coverImage: '/local8.jpg', publishedAt: '2026-02-18', category: '各地动态', status: 1 },
      { id: 13, title: '广安救援队伍演练', summary: '检验应急响应能力', coverImage: '/local9.jpg', publishedAt: '2026-02-17', category: '各地动态', status: 1 },
      { id: 14, title: '遂宁消防安全宣传月', summary: '营造安全氛围', coverImage: '/local10.jpg', publishedAt: '2026-02-16', category: '各地动态', status: 1 },
      { id: 15, title: '内江应急物资储备检查', summary: '确保物资充足', coverImage: '/local11.jpg', publishedAt: '2026-02-15', category: '各地动态', status: 1 },
      { id: 16, title: '资阳救援技能比武', summary: '提升救援技能', coverImage: '/local12.jpg', publishedAt: '2026-02-14', category: '各地动态', status: 1 }
    ],
    total: 12
  },
  '救援行动': {
    items: [
      { id: 17, title: '甘孜森林火灾救援纪实', summary: '成功扑灭森林火灾', coverImage: '/rescue1.jpg', publishedAt: '2026-02-20', category: '救援行动', status: 1 },
      { id: 18, title: '阿坝地震救援行动', summary: '紧急救援受灾群众', coverImage: '/rescue2.jpg', publishedAt: '2026-02-19', category: '救援行动', status: 1 },
      { id: 19, title: '成都高层火灾救援', summary: '成功救出被困人员', coverImage: '/rescue3.jpg', publishedAt: '2026-02-18', category: '救援行动', status: 1 },
      { id: 20, title: '凉山泥石流救援', summary: '转移安置受灾群众', coverImage: '/rescue4.jpg', publishedAt: '2026-02-17', category: '救援行动', status: 1 },
      { id: 21, title: '攀枝花矿难救援', summary: '成功救出被困矿工', coverImage: '/rescue5.jpg', publishedAt: '2026-02-16', category: '救援行动', status: 1 },
      { id: 22, title: '雅安洪涝灾害救援', summary: '紧急转移受困群众', coverImage: '/rescue6.jpg', publishedAt: '2026-02-15', category: '救援行动', status: 1 },
      { id: 23, title: '巴中山体滑坡救援', summary: '搜救失联人员', coverImage: '/rescue7.jpg', publishedAt: '2026-02-14', category: '救援行动', status: 1 },
      { id: 24, title: '广元交通事故救援', summary: '快速处置交通事故', coverImage: '/rescue8.jpg', publishedAt: '2026-02-13', category: '救援行动', status: 1 },
      { id: 25, title: '眉山化工厂火灾救援', summary: '成功控制火势', coverImage: '/rescue9.jpg', publishedAt: '2026-02-12', category: '救援行动', status: 1 },
      { id: 26, title: '自贡燃气泄漏处置', summary: '及时排除安全隐患', coverImage: '/rescue10.jpg', publishedAt: '2026-02-11', category: '救援行动', status: 1 },
      { id: 27, title: '绵阳建筑坍塌救援', summary: '救出被困工人', coverImage: '/rescue11.jpg', publishedAt: '2026-02-10', category: '救援行动', status: 1 },
      { id: 28, title: '德阳水域救援演练', summary: '提升水域救援能力', coverImage: '/rescue12.jpg', publishedAt: '2026-02-09', category: '救援行动', status: 1 }
    ],
    total: 12
  },
  '政策解读': {
    items: [
      { id: 29, title: '新《消防法》重点条款解读', summary: '解读最新消防法规', coverImage: '/policy1.jpg', publishedAt: '2026-02-20', category: '政策解读', status: 1 },
      { id: 30, title: '应急救援补贴政策出台', summary: '支持应急救援队伍建设', coverImage: '/policy2.jpg', publishedAt: '2026-02-19', category: '政策解读', status: 1 },
      { id: 31, title: '消防安全责任制实施细则', summary: '明确各方安全责任', coverImage: '/policy3.jpg', publishedAt: '2026-02-18', category: '政策解读', status: 1 },
      { id: 32, title: '救援队伍改革配套政策', summary: '推进救援队伍现代化', coverImage: '/policy4.jpg', publishedAt: '2026-02-17', category: '政策解读', status: 1 },
      { id: 33, title: '农村消防建设扶持政策', summary: '加强农村消防基础设施', coverImage: '/policy5.jpg', publishedAt: '2026-02-16', category: '政策解读', status: 1 },
      { id: 34, title: '企业消防安全奖惩办法', summary: '激励企业落实消防责任', coverImage: '/policy6.jpg', publishedAt: '2026-02-15', category: '政策解读', status: 1 },
      { id: 35, title: '消防设施维保新规', summary: '规范消防设施维护', coverImage: '/policy7.jpg', publishedAt: '2026-02-14', category: '政策解读', status: 1 },
      { id: 36, title: '应急物资储备管理办法', summary: '加强应急物资管理', coverImage: '/policy8.jpg', publishedAt: '2026-02-13', category: '政策解读', status: 1 },
      { id: 37, title: '消防培训收费规范', summary: '规范消防培训市场', coverImage: '/policy9.jpg', publishedAt: '2026-02-12', category: '政策解读', status: 1 },
      { id: 38, title: '新能源汽车消防安全规定', summary: '加强新能源汽车安全管理', coverImage: '/policy10.jpg', publishedAt: '2026-02-11', category: '政策解读', status: 1 },
      { id: 39, title: '高层建筑消防管理新规', summary: '强化高层建筑消防安全', coverImage: '/policy11.jpg', publishedAt: '2026-02-10', category: '政策解读', status: 1 },
      { id: 40, title: '消防产品认证政策调整', summary: '优化消防产品认证流程', coverImage: '/policy12.jpg', publishedAt: '2026-02-09', category: '政策解读', status: 1 }
    ],
    total: 12
  },
  '媒体播报': {
    items: [
      { id: 41, title: '央视《新闻联播》报道四川消防', summary: '展示四川消防工作成效', coverImage: '/media1.jpg', publishedAt: '2026-02-22', category: '媒体播报', status: 1, isHeadline: 0, isNew: 0 },
      { id: 42, title: '人民日报：救援队伍建设显著', summary: '肯定救援队伍建设成果', coverImage: '/media2.jpg', publishedAt: '2026-02-21', category: '媒体播报', status: 1, isHeadline: 0, isNew: 0 },
      { id: 43, title: '四川卫视专题报道119消防月', summary: '宣传消防安全知识', coverImage: '/media3.jpg', publishedAt: '2026-02-20', category: '媒体播报', status: 1, isHeadline: 0, isNew: 0 },
      { id: 44, title: '央广网专访救援总队长', summary: '介绍救援工作经验', coverImage: '/media4.jpg', publishedAt: '2026-02-19', category: '媒体播报', status: 1, isHeadline: 0, isNew: 0 },
      { id: 45, title: '地方媒体聚焦救援先进事迹', summary: '宣传救援英雄事迹', coverImage: '/media5.jpg', publishedAt: '2026-02-18', category: '媒体播报', status: 1, isHeadline: 0, isNew: 0 },
      { id: 46, title: '消防主题纪录片登陆卫视', summary: '展现消防救援风采', coverImage: '/media6.jpg', publishedAt: '2026-02-17', category: '媒体播报', status: 1, isHeadline: 0, isNew: 0 },
      { id: 47, title: '新媒体平台消防科普破亿播放', summary: '消防科普深入人心', coverImage: '/media7.jpg', publishedAt: '2026-02-16', category: '媒体播报', status: 1, isHeadline: 0, isNew: 0 },
      { id: 48, title: '网红消防员直播讲解安全知识', summary: '创新消防宣传方式', coverImage: '/media8.jpg', publishedAt: '2026-02-15', category: '媒体播报', status: 1, isHeadline: 0, isNew: 0 },
      { id: 49, title: '海外媒体关注中国消防发展', summary: '国际社会认可中国消防', coverImage: '/media9.jpg', publishedAt: '2026-02-14', category: '媒体播报', status: 1, isHeadline: 0, isNew: 0 },
      { id: 50, title: '消防短视频大赛获奖作品展播', summary: '优秀作品广泛传播', coverImage: '/media10.jpg', publishedAt: '2026-02-13', category: '媒体播报', status: 1, isHeadline: 0, isNew: 0 },
      { id: 51, title: '纸媒专版报道消防改革成果', summary: '全面展示改革成效', coverImage: '/media11.jpg', publishedAt: '2026-02-12', category: '媒体播报', status: 1, isHeadline: 0, isNew: 0 },
      { id: 52, title: '电台消防公益广告持续投放', summary: '扩大消防宣传覆盖面', coverImage: '/media12.jpg', publishedAt: '2026-02-11', category: '媒体播报', status: 1, isHeadline: 0, isNew: 0 }
    ],
    total: 12
  },
  '图文资讯': {
    items: [
      { id: 53, title: '2026年春季救援演练精彩瞬间', summary: '记录演练中的精彩时刻', content: '2026年春季综合救援演练在成都举行，来自全省各地的救援队伍参加了此次演练。演练科目包括高空救援、水域救援、地震救援等多个项目，全面检验了救援队伍的应急响应能力。', coverImage: '/carousel1.jpg', publishedAt: '2026-02-28', category: '图文资讯', status: 1, isHeadline: 0, isNew: 1 },
      { id: 54, title: '全国应急救援工作会议在京召开', summary: '部署2026年重点工作任务', content: '全国应急救援工作会议在北京召开，会议总结了2025年应急救援工作成效，部署了2026年重点工作任务。会议强调要加强救援队伍建设，提升应急救援能力。', coverImage: '/carousel2.jpg', publishedAt: '2026-02-27', category: '图文资讯', status: 1, isHeadline: 0, isNew: 1 },
      { id: 55, title: '四川飞豹救援队荣获先进集体称号', summary: '表彰2025年度优秀救援队伍', content: '在2025年度应急救援工作表彰大会上，四川飞豹救援队荣获"全国先进救援集体"称号。这是对飞豹救援队全体队员辛勤付出的肯定和鼓励。', coverImage: '/carousel3.jpg', publishedAt: '2026-02-26', category: '图文资讯', status: 1, isHeadline: 0, isNew: 0 },
      { id: 56, title: '新型救援装备列装仪式隆重举行', summary: '提升应急救援现代化水平', content: '新型救援装备列装仪式在四川飞豹救援基地举行。此次列装的装备包括无人机、生命探测仪、破拆工具等先进设备，将大幅提升救援队伍的应急救援能力。', coverImage: '/carousel4.jpg', publishedAt: '2026-02-25', category: '图文资讯', status: 1, isHeadline: 0, isNew: 0 }
    ],
    total: 4
  }
};

// 定义接口拦截器
export const handlers = [
  // 拦截新闻列表接口（旧端点，保留兼容）
  http.get('/api/news', ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '12');

    // 获取对应分类的数据
    const categoryData = mockNewsData[category] || { items: [], total: 0 };

    return HttpResponse.json({
      code: 200,
      data: categoryData,
      message: '请求成功'
    });
  }),

  // 拦截首页新闻接口（新端点）
  http.get('/api/home/news', ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '12');

    console.log('🔥 MSW 拦截到请求:', {
      url: request.url,
      category,
      page,
      pageSize
    });

    // 获取对应分类的数据
    const categoryData = mockNewsData[category] || { items: [], total: 0 };

    console.log('📦 返回数据:', {
      category,
      itemsCount: categoryData.items?.length || 0,
      total: categoryData.total
    });

    return HttpResponse.json({
      code: 200,
      data: categoryData,
      message: '请求成功'
    });
  }),

  // 可追加其他需要模拟的接口
  http.post('/api/login', () => {
    return HttpResponse.json({
      code: 200,
      data: { token: 'msw-mock-token' },
      message: '登录成功'
    });
  })
];
