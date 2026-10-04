"""本轮 6 项修复的本地真机验证（admin 端）—— 不连后端，用静态产物 + 网络拦截喂数据。

覆盖：
  1. 侧栏「值班台账」改名（新名在 + 旧名不在，成对断言）
  2. 值班台账页右侧间距与其他列表页一致（内容区右边界像素级比对）
  3. 悬浮「值班须知」收起态不遮挡操作列；展开态自动留白
  4. 标语横幅查询条件单行布局（筛选与按钮同一行）
  5. 新增弹窗不再出现「标语文字」与说明性描述文字
  6. 保存防重：慢响应下连点 2 次，只允许 1 次 POST

用法：python tests/admin_ui_fix_verify.py <admin_dist_dir> [port]
"""
import functools
import http.server
import json
import os
import socketserver
import sys
import threading
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

TARGET = sys.argv[1]
USE_DEV = str(TARGET).startswith("http")  # 传 URL 则直接打 dev server，传目录则本地静态托管产物
DIST = Path(TARGET).resolve() if not USE_DEV else Path(".")
PORT = int(sys.argv[2]) if len(sys.argv) > 2 else 8099
ROOT = Path(__file__).resolve().parent.parent
SHOTS = ROOT / ".workbuddy" / "test-results"
SHOTS.mkdir(parents=True, exist_ok=True)

results = []


def check(name, cond, detail=""):
    results.append((name, bool(cond), str(detail)[:240]))
    print(("  PASS " if cond else "  FAIL ") + name + (f" | {str(detail)[:240]}" if detail else ""), flush=True)


class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=str(DIST), **kw)

    def do_GET(self):
        p = self.translate_path(self.path)
        if not os.path.exists(p) and "." not in os.path.basename(self.path):
            self.path = "/index.html"
        return super().do_GET()

    def log_message(self, *a):
        pass


PROBE_PNG = bytes.fromhex(
    "89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c489"
    "0000000d4944415478da63f8ffff3f0005fe02fea735c4b40000000049454e44ae426082"
)

TEAM_ROWS = {
    "items": [
        {
            "id": 1,
            "teamName": "特勤大队",
            "dutyYear": "2026",
            "dutyDate": "2026-10-01",
            "dutyCadreName": "张三",
            "dutyCadrePhone": "13800000000",
            "dutyStaff": "李四,王五",
            "attachUrl": None,
            "createdAt": "2026-10-01T09:00:00.000Z",
        }
    ],
    "total": 1,
}

SLOGAN_ROWS = {
    "items": [
        {
            "id": 1,
            "slogan": None,
            "imageUrl": "/uploads/images/demo.webp",
            "link": "https://www.mem.gov.cn/",
            "linkTarget": "_blank",
            "sort": 1,
            "status": "显示",
            "createdAt": "2026-10-04T08:41:58.000Z",
        }
    ],
    "total": 1,
}

OVERLAP_JS = """() => {
  const th=[...document.querySelectorAll('.team-duty-table-panel .el-table__header th')];
  const card=document.querySelector('.duty-notice')?.getBoundingClientRect();
  if(!th.length||!card) return {missing:true};
  const last=th[th.length-1].getBoundingClientRect();
  const ov=(a,b)=>a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top;
  return {ov:ov(card,last), card:[Math.round(card.x),Math.round(card.right)],
          col:[Math.round(last.x),Math.round(last.right)]};
}"""


def main():
    save_calls = []

    with socketserver.ThreadingTCPServer(("127.0.0.1", 0 if USE_DEV else PORT), SPAHandler) as httpd:
        httpd.daemon_threads = True
        threading.Thread(target=httpd.serve_forever, daemon=True).start()
        base = str(TARGET).rstrip("/") if USE_DEV else f"http://127.0.0.1:{PORT}"

        with sync_playwright() as p:
            b = p.chromium.launch(headless=True, args=["--no-sandbox"])
            ctx = b.new_context(viewport={"width": 1600, "height": 900}, locale="zh-CN")
            pg = ctx.new_page()
            errs = []

            def api(route):
                url, method = route.request.url, route.request.method
                def ok(payload):
                    route.fulfill(status=200, content_type="application/json",
                                  body=json.dumps({"code": 200, "message": "ok", "data": payload}))
                if "slogan-banners/save" in url and method == "POST":
                    save_calls.append(time.time())
                    time.sleep(1.2)  # 故意慢响应，制造「用户以为没反应又点一次」的场景
                    return ok({"message": "保存成功"})
                if "/upload/image" in url:
                    return ok({"url": "/uploads/images/demo.webp"})
                if "slogan-banners" in url:
                    return ok(SLOGAN_ROWS)
                if "team-duty" in url:
                    return ok(TEAM_ROWS)
                if "dict/data/type" in url:
                    return ok([{"label": "特勤大队", "value": "特勤大队", "sort": 1},
                               {"label": "救援大队", "value": "救援大队", "sort": 2}])
                return ok(None)

            pg.route("**/api/**", api)
            pg.route(f"{base}/probe.png", lambda r: r.fulfill(status=200, content_type="image/png", body=PROBE_PNG))
            pg.on("pageerror", lambda e: errs.append(str(e)))
            pg.add_init_script(
                "localStorage.setItem('token','verify-token');"
                "localStorage.setItem('user', JSON.stringify({id:1,username:'verify',name:'验证',role:'admin',permissions:[]}));"
            )

            # ---------- 1) 值班台账：改名 + 右侧间距 ----------
            pg.goto(f"{base}/team-duty", wait_until="networkidle")
            pg.wait_for_timeout(1200)
            crumb = pg.locator(".page-crumb").inner_text().strip()
            check("面包屑显示【值班台账】", "值班台账" in crumb, crumb)
            check("面包屑不再出现旧名【队伍值班】", "队伍值班" not in crumb, crumb)

            side = pg.evaluate(
                """() => {
                  const s=document.querySelector('.shell-sidebar'); if(!s) return '';
                  return [...s.querySelectorAll('[data-route],[href],[role="link"],a,button')]
                    .map(e=>(e.innerText||'').trim()).filter(t=>t&&t.length<=12).join(' / ');
                }"""
            )
            check("侧栏菜单含【值班台账】", "值班台账" in side, side[:220])
            check("侧栏菜单不再出现旧名【队伍值班】", "队伍值班" not in side, side[:220])

            panel = pg.locator(".team-duty-table-panel")
            check("列表标题为【值班台账列表】", "值班台账列表" in (panel.inner_text() if panel.count() else ""),
                  (panel.inner_text()[:40] if panel.count() else "表格未渲染"))

            duty_crumb = pg.locator(".page-crumb").bounding_box()
            duty_panel = panel.bounding_box()

            # 悬浮按钮 vs 操作列（收起态）
            pg.wait_for_timeout(400)
            g = pg.evaluate(OVERLAP_JS)
            check("收起态悬浮钮不遮挡操作列", g.get("ov") is False, f"card={g.get('card')} col={g.get('col')}")

            # 展开态：应自动留白且仍不遮挡
            pg.click(".duty-notice__head")
            pg.wait_for_timeout(700)
            panel_open = panel.bounding_box()
            g2 = pg.evaluate(OVERLAP_JS)
            check("展开态悬浮卡片不遮挡操作列", g2.get("ov") is False, f"card={g2.get('card')} col={g2.get('col')}")
            check("展开态表格自动让出右侧空间", panel_open["width"] < duty_panel["width"] - 100,
                  f"收起 {round(duty_panel['width'])} → 展开 {round(panel_open['width'])}")
            pg.click(".duty-notice__head")
            pg.wait_for_timeout(500)

            # 与其他列表页比对内容区右边界
            others = {}
            for path in ("/personnel", "/vehicles", "/certificates"):
                pg.goto(f"{base}{path}", wait_until="networkidle")
                pg.wait_for_timeout(900)
                others[path] = pg.locator(".page-crumb").bounding_box()
            pg.goto(f"{base}/team-duty", wait_until="networkidle")
            pg.wait_for_timeout(900)
            duty_crumb = pg.locator(".page-crumb").bounding_box()

            for path, box in others.items():
                if not box:
                    check(f"{path} 内容区基准可取", False, "未取到")
                    continue
                dr = abs((duty_crumb["x"] + duty_crumb["width"]) - (box["x"] + box["width"]))
                check(f"右侧间距与 {path} 一致(≤2px)", dr <= 2,
                      f"值班台账右边界 {round(duty_crumb['x']+duty_crumb['width'])} vs {path} {round(box['x']+box['width'])} 差 {round(dr,1)}px")

            # ---------- 2) 标语横幅：查询条件单行 + 弹窗字段 ----------
            pg.goto(f"{base}/slogan-banner", wait_until="networkidle")
            pg.wait_for_timeout(1200)
            row = pg.evaluate(
                """() => {
                  const f=document.querySelector('.portal-toolbar__filters');
                  const a=document.querySelector('.portal-toolbar__actions');
                  const t=document.querySelector('.portal-toolbar');
                  if(!f||!a||!t) return {missing:true};
                  const F=f.getBoundingClientRect(), A=a.getBoundingClientRect(), T=t.getBoundingClientRect();
                  return {fTop:F.top,fBottom:F.bottom,aTop:A.top,aBottom:A.bottom,fRight:F.right,aLeft:A.left,
                          rowH:T.height, sideBySide:A.left>=F.right-1};
                }"""
            )
            if row.get("missing"):
                check("查询条件区渲染", False, row)
            else:
                same_row = abs(row["fTop"] - row["aTop"]) <= 6 and abs(row["fBottom"] - row["aBottom"]) <= 6
                check("查询条件与「查询/重置」同一行", same_row and row["sideBySide"], row)
                check("查询条件区为单行高度(<70px)", row["rowH"] < 70, f"height={round(row['rowH'],1)}")

            table_headers = pg.eval_on_selector_all(
                ".admin-card--table .el-table__header th", "els => els.map(e => e.innerText.trim()).filter(Boolean)"
            )
            check("列表已无「标语文字」列", "标语文字" not in table_headers, table_headers)

            pg.click('.admin-table-panel__head-actions button:has-text("新增横幅")')
            pg.wait_for_selector(".el-dialog:visible", timeout=15000)
            pg.wait_for_timeout(900)
            dlg = pg.locator(".el-dialog:visible").first
            dtx = dlg.inner_text()
            check("弹窗已移除「标语文字」输入项", "标语文字" not in dtx, dtx.replace("\n", " | ")[:200])
            check("弹窗已移除说明性描述文字", ("排序号越小越靠前" not in dtx) and ("留空链接" not in dtx)
                  and ("上传通栏横幅图" not in dtx), dtx.replace("\n", " | ")[:200])
            check("弹窗保留 横幅图片/跳转链接/排序号/状态",
                  all(k in dtx for k in ("横幅图片", "跳转链接", "排序号", "状态")), dtx.replace("\n", " | ")[:200])

            # ---------- 3) 保存防重（慢响应下连点） ----------
            dlg.locator('input[type="file"]').first.set_input_files(
                files=[{"name": "probe.png", "mimeType": "image/png", "buffer": PROBE_PNG}]
            )
            pg.wait_for_timeout(1200)
            save_btn = dlg.locator('button:has-text("保存")').first
            save_calls.clear()
            save_btn.click()
            pg.wait_for_timeout(120)
            try:
                save_btn.click(timeout=1500)
            except Exception:
                pass  # 已进入 loading/disabled 点不动，正是期望
            pg.wait_for_timeout(2600)
            check("连点「保存」只提交 1 次", len(save_calls) == 1, f"POST 次数={len(save_calls)}")

            pg.screenshot(path=str(SHOTS / "fix-slogan-dialog.png"))
            check("无 JS 运行时错误", len(errs) == 0, errs[:2])
            b.close()

        httpd.shutdown()

    passed = sum(1 for _, ok, _ in results if ok)
    print(f"\n===== admin 修复验证: {passed}/{len(results)} 通过 =====")
    for n, ok, d in results:
        if not ok:
            print("  ✗", n, "|", d)
    return 0 if passed == len(results) else 1


sys.exit(main())
