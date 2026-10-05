"""生产环境验证（https://www.scfb.org.cn）—— 只读，不写任何数据。

验证：登录 → 队伍值班页面渲染 → 表头 → 悬浮须知不遮挡 → 字典下拉有数据。
写操作（新增/编辑/删除/导入）不在生产执行，避免污染真实数据。
"""
import os
import sys
from playwright.sync_api import sync_playwright

BASE = "https://www.scfb.org.cn"
CRED_FILE = "/tmp/.prod_pw"  # 600 临时文件，用完由调用方 shred -u
results = []


def check(name, cond, detail=""):
    results.append((name, bool(cond), str(detail)[:200]))
    print(("  PASS " if cond else "  FAIL ") + name + (f" | {str(detail)[:200]}" if detail else ""), flush=True)


OVERLAP_JS = """() => {
  const th=[...document.querySelectorAll('.team-duty-table-panel .el-table__header th')];
  if(!th.length) return {ovCol:null};
  const last=th[th.length-1].getBoundingClientRect();
  const card=document.querySelector('.duty-notice')?.getBoundingClientRect();
  if(!card) return {ovCol:null, noCard:true};
  const ov=(a,b)=>a.left<b.right && a.right>b.left && a.top<b.bottom && a.bottom>b.top;
  return {ovCol:ov(card,last), card:[Math.round(card.x),Math.round(card.right)],
          col:[Math.round(last.x),Math.round(last.right)]};
}"""


def main():
    with sync_playwright() as p:
        b = p.chromium.launch(headless=True, args=["--no-sandbox"])
        ctx = b.new_context(viewport={"width": 1600, "height": 900}, locale="zh-CN", ignore_https_errors=True)
        pg = ctx.new_page()
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))

        # 登录墙：未登录访问受保护路由应跳登录
        pg.goto(f"{BASE}/admin/team-duty", wait_until="networkidle")
        check("未登录访问被路由守卫拦截", "/login" in pg.url, pg.url)

        # 登录
        pg.goto(f"{BASE}/admin/login", wait_until="networkidle")
        user = pg.locator('input[placeholder="请输入用户名"]')
        if user.count() == 0:
            print("  ⚠️ 登录页未渲染（可能已登录或路由不同），跳过登录环节")
        else:
            # 密码从 600 临时文件读，不进命令行、不落项目文件
            user.fill(os.environ.get("PROD_USER", "admin"))
            pwd = pg.locator('input[placeholder="请输入密码"]')
            pwd.fill(open(CRED_FILE, encoding="utf-8").read().strip())
            pg.click('button:has-text("登")')
            pg.wait_for_timeout(8000)
            # mustChangePassword 会强制跳个人中心，这里只记录不影响后续（路由守卫会拦）
            check("登录成功", "/login" not in pg.url, pg.url)
            if "/profile-security" in pg.url:
                print("  ⚠️ 该账号 mustChangePassword=1，已被强制跳转到个人中心；"
                      "队伍值班页需先改初始密码才能访问")

        # 队伍值班页
        pg.goto(f"{BASE}/admin/team-duty", wait_until="networkidle")
        pg.wait_for_timeout(3000)
        check("队伍值班页可访问", "/team-duty" in pg.url, pg.url)
        crumb = pg.locator(".page-crumb").inner_text() if pg.locator(".page-crumb").count() else ""
        # 改名断言必须成对：新名在 + 旧名不在（旧名是新名的子串时为假 PASS/假 FAIL 的高发区）
        check("面包屑显示【值班台账】", "值班台账" in crumb, crumb)
        check("面包屑不再出现旧名【队伍值班】", "队伍值班" not in crumb, crumb)

        headers = pg.eval_on_selector_all(
            ".team-duty-table-panel .el-table__header th", "els => els.map(e => e.innerText.trim()).filter(Boolean)"
        )
        expect = ["队伍名称", "值班年份", "值班日期", "值班干部", "干部电话", "值班员", "创建时间", "附件预览", "操作"]
        check("表头 9 个业务字段齐全", all(c in headers for c in expect), headers)

        # 悬浮须知
        items = pg.eval_on_selector_all(".duty-notice__body li", "els => els.map(e => e.innerText.trim())")
        if not items:
            pg.click(".duty-notice__head")
            pg.wait_for_timeout(800)
            items = pg.eval_on_selector_all(".duty-notice__body li", "els => els.map(e => e.innerText.trim())")
        check("值班须知 3 条", len(items) == 3, items)
        check("须知含「严禁饮酒」", any("严禁饮酒" in t for t in items), items[1] if len(items) > 1 else "")

        g = pg.evaluate(OVERLAP_JS)
        check("悬浮卡片不遮挡操作列", g.get("ovCol") is False, f"card={g.get('card')} col={g.get('col')}")

        # 导入弹窗（只看结构，不上传文件）
        pg.click('button:has-text("附件导入新增")')
        pg.wait_for_selector(".el-dialog:visible", timeout=15000)
        pg.wait_for_timeout(1500)
        dlg = pg.locator(".el-dialog:visible").first
        txt = dlg.inner_text()
        check("导入弹窗标题正确", "附件导入" in txt, txt.split("\n")[0])
        check("含队伍/年份下拉", "队伍名称" in txt and "值班年份" in txt, "")
        check("含拖拽上传区", "拖拽" in txt or "点击选择" in txt, "")
        # 读下拉选项（只读操作）
        dlg.locator(".el-select").first.click()
        pg.wait_for_timeout(1200)
        opts = pg.eval_on_selector_all(
            ".el-select-dropdown__item:visible", "els => els.map(e => e.innerText.trim())"
        )
        check("队伍下拉有选项(字典已带出)", len(opts) > 0, opts)
        pg.keyboard.press("Escape")
        pg.wait_for_timeout(400)
        pg.keyboard.press("Escape")

        # 注：「数据字典」**后台界面**已于 2026-10-05 下线（前端菜单项 + SystemDict.vue 已移除，
        #     权限树 menu-tree 中该项同步删除），原「字典管理页」检查项随之删除。
        #     ⚠️ 后端 system-dict 模块**必须保留**：它提供的 @Public 接口
        #     `GET /system/dict/data/type/:dictType` 正是下面「队伍下拉」的数据源。

        # 侧栏：分组默认折叠时 innerText 拿不到子项，但 DOM 里始终存在 →
        # 查「可点击菜单项自身的文本」，并确认其所在分组，避免折叠影响判读。
        pg.goto(f"{BASE}/admin/team-duty", wait_until="networkidle")
        pg.wait_for_timeout(2500)
        menu = pg.evaluate(
            """() => {
              const side=document.querySelector('.shell-sidebar');
              if(!side) return {items:[], groups:[]};
              // 菜单项 = 带 data-route / href / role=link 的元素，或导航类容器
              const nodes=[...side.querySelectorAll('[data-route],[href],[role="link"],a,button')]
                .map(e => (e.innerText||'').trim())
                .filter(t => t && t.length <= 20);
              const groups=[...side.querySelectorAll('[class*=group-title],[class*=section]')]
                .map(e => (e.innerText||'').trim()).filter(Boolean);
              return {items:[...new Set(nodes)], groups};
            }"""
        )
        items_txt = " / ".join(menu["items"])
        groups_txt = " / ".join(menu["groups"])
        check("侧栏菜单项含【值班台账】", "值班台账" in items_txt, items_txt[:180])
        check("侧栏菜单项不再出现旧名【队伍值班】", "队伍值班" not in items_txt, items_txt[:180])
        check("侧栏菜单项已下线「数据字典」", "数据字典" not in items_txt, items_txt[180:360] or groups_txt[:120])

        check("无 JS 运行时错误", len(errs) == 0, errs[:2])
        b.close()

    passed = sum(1 for _, ok, _ in results if ok)
    print(f"\n===== 生产验证: {passed}/{len(results)} 通过 =====")
    return 0 if passed == len(results) else 1


sys.exit(main())
