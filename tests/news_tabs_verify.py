"""新闻管理列表「分类页签」验证（admin 静态产物 + 接口 mock）。

覆盖：
  1. 页签数量与文案顺序：全部 / 动态要闻 / 各地动态 / 救援行动 / 政策解读 / 媒体播报 / 图文资讯
  2. 默认选中「全部」且首个 /news 请求不带 category
  3. 点「媒体播报」→ 请求带 category=媒体播报、列表只剩该分类
  4. 该页签下点「新增新闻」→ 分类默认预填「媒体播报」
  5. 点「动态要闻」→ 列表只剩该分类
  6. 下拉「新闻分类」选「救援行动」→ 页签高亮联动
  7. 点「查询」→ 列表按救援行动过滤
  8. 点「重置」→ 页签回到「全部」、列表恢复全量
  9. 无 JS 运行错误

用法：python tests/news_tabs_verify.py <admin_dist_dir> [port]
"""
import http.server
import json
import os
import socketserver
import sys
import threading
import time
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from playwright.sync_api import sync_playwright

TARGET = sys.argv[1]
PORT = int(sys.argv[2]) if len(sys.argv) > 2 else 8095

DIST = Path(TARGET).resolve()
ROOT = Path(__file__).resolve().parent.parent
SHOTS = ROOT / ".workbuddy" / "test-results"
SHOTS.mkdir(parents=True, exist_ok=True)

results = []

CATS = ["动态要闻", "各地动态", "救援行动", "政策解读", "媒体播报", "图文资讯"]


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


# 每类 1 条，媒体播报 2 条 → 全量 7 条
def build_rows():
    rows = []
    idx = 1
    for cat in CATS:
        repeat = 2 if cat == "媒体播报" else 1
        for k in range(repeat):
            rows.append(
                {
                    "id": idx,
                    "title": f"{cat}样例新闻{idx}",
                    "summary": f"{cat}摘要{idx}",
                    "category": cat,
                    "author": "系统管理员",
                    "publishedAt": "2026-10-09T00:00:00.000Z",
                    "status": 1,
                    "sort": 1,
                    "isHeadline": 0,
                    "isNew": 0,
                }
            )
            idx += 1
    return rows


ALL_ROWS = build_rows()
news_calls = []
api_calls = []


def filter_rows(url):
    qs = parse_qs(urlparse(url).query)
    cat = (qs.get("category") or [""])[0]
    if not cat:
        return ALL_ROWS
    return [r for r in ALL_ROWS if r["category"] == cat]


def main():
    with socketserver.ThreadingTCPServer(("127.0.0.1", PORT), SPAHandler) as httpd:
        httpd.daemon_threads = True
        threading.Thread(target=httpd.serve_forever, daemon=True).start()
        base = f"http://127.0.0.1:{PORT}"

        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True, args=["--no-sandbox"])
            ctx = browser.new_context(viewport={"width": 1600, "height": 1000}, locale="zh-CN")
            pg = ctx.new_page()
            errors = []

            def api(route):
                url, method = route.request.url, route.request.method
                api_calls.append(f"{method} {url}")

                def ok(payload):
                    route.fulfill(
                        status=200,
                        content_type="application/json",
                        body=json.dumps({"code": 200, "message": "ok", "data": payload}, ensure_ascii=False),
                    )

                if "/news" in url and method == "GET":
                    news_calls.append(url)
                    rows = filter_rows(url)
                    return ok({"items": rows, "total": len(rows)})
                if "/admin/dashboard/notifications" in url:
                    return ok({"unreadCount": 0, "items": []})
                if "/dict/data/type" in url:
                    return ok([])
                if "/auth/" in url:
                    return ok({"id": 1, "username": "verify", "realName": "验证", "role": "admin", "permissions": []})
                return ok(None)

            pg.route("**/api/**", api)
            pg.on("pageerror", lambda e: errors.append(str(e)))
            pg.add_init_script(
                "localStorage.setItem('token','verify-token');"
                "localStorage.setItem('user', JSON.stringify({id:1,username:'verify',realName:'验证',role:'admin',permissions:[]}));"
            )

            def tab_items():
                return pg.locator(".news-tabs .el-tabs__item")

            def tab_texts():
                return [t.inner_text().strip() for t in tab_items().all()]

            def active_tab():
                el = pg.locator(".news-tabs .el-tabs__item.is-active")
                # 连读两次相等才算稳定，避免读到切换中间态
                first = el.inner_text().strip() if el.count() else ""
                pg.wait_for_timeout(100)
                el = pg.locator(".news-tabs .el-tabs__item.is-active")
                second = el.inner_text().strip() if el.count() else ""
                return second if first == second else first

            def row_count():
                return pg.locator(".el-table__body-wrapper tbody tr").count()

            def wait_rows(expected, timeout=10):
                end = time.time() + timeout
                prev = None
                while time.time() < end:
                    cur = row_count()
                    if cur == expected and cur == prev:
                        return True
                    prev = cur
                    pg.wait_for_timeout(150)
                return False

            def wait_news_call(count, timeout=10):
                end = time.time() + timeout
                while time.time() < end:
                    if len(news_calls) >= count:
                        return True
                    pg.wait_for_timeout(100)
                return False

            def row_texts():
                return [r.inner_text() for r in pg.locator(".el-table__body-wrapper tbody tr").all()]

            def all_rows_are(cat):
                texts = row_texts()
                if not texts:
                    return False, "无数据行"
                others = [c for c in CATS if c != cat]
                bad = [t for t in texts if cat not in t or any(o in t for o in others)]
                return (not bad), f"rows={len(texts)} bad={bad[:2]}"

            # ---------- 1) 页面与页签 ----------
            pg.goto(f"{base}/news", wait_until="networkidle")
            pg.wait_for_selector(".news-tabs .el-tabs__item", timeout=15000)
            check("新闻管理页可访问", pg.locator(".news-page").count() > 0)

            texts = tab_texts()
            expect = ["全部"] + CATS
            check("页签数量为 7（全部 + 6 分类）", len(texts) == 7, texts)
            check("页签文案与顺序正确", texts == expect, texts)

            check("默认选中「全部」", active_tab() == "全部", active_tab())
            check("默认加载全量 7 条", wait_rows(7), f"rows={row_count()}")
            first_call = news_calls[0] if news_calls else ""
            check("首个请求不带 category", "category=" not in first_call, first_call)

            # ---------- 2) 点击「媒体播报」 ----------
            before = len(news_calls)
            pg.get_by_role("tab", name="媒体播报", exact=True).click()
            check("点击页签触发查询请求", wait_news_call(before + 1), f"calls={len(news_calls)}")
            last = news_calls[-1] if news_calls else ""
            check(
                "请求携带 category=媒体播报",
                ("category=" in last) and ("%E5%AA%92%E4%BD%93%E6%92%AD%E6%8A%A5" in last or "媒体播报" in last),
                last,
            )
            check("选中态为「媒体播报」", active_tab() == "媒体播报", active_tab())
            check("列表只剩媒体播报 2 条", wait_rows(2), f"rows={row_count()}")
            ok_rows, detail = all_rows_are("媒体播报")
            check("列表行分类均为媒体播报", ok_rows, detail)

            # ---------- 3) 新增弹窗分类预填 ----------
            pg.get_by_role("button", name="新增新闻").click()
            pg.wait_for_selector(".el-dialog", timeout=10000)
            pg.wait_for_timeout(400)
            dlg_sel = (
                pg.locator(".el-dialog .el-form-item")
                .filter(has_text="新闻分类")
                .locator(".el-select")
                .first
            )
            dlg_txt = dlg_sel.inner_text().strip() if dlg_sel.count() else ""
            check("新增弹窗分类预填「媒体播报」", "媒体播报" in dlg_txt, dlg_txt)
            pg.get_by_role("button", name="取消").click()
            # el-dialog 默认不销毁，关闭后是 hidden 而非 detached
            pg.wait_for_selector(".el-dialog", state="hidden", timeout=8000)

            # ---------- 4) 点击「动态要闻」 ----------
            before = len(news_calls)
            pg.get_by_role("tab", name="动态要闻", exact=True).click()
            check("切页签再次触发查询", wait_news_call(before + 1), f"calls={len(news_calls)}")
            check("列表只剩动态要闻 1 条", wait_rows(1), f"rows={row_count()}")
            ok_rows, detail = all_rows_are("动态要闻")
            check("列表行分类均为动态要闻", ok_rows, detail)

            # ---------- 5) 下拉筛选联动页签 ----------
            sel = (
                pg.locator(".admin-card--search .el-form-item")
                .filter(has_text="新闻分类")
                .locator(".el-select")
                .first
            )
            sel.click()
            pg.wait_for_timeout(300)
            pg.locator(".el-select-dropdown:visible .el-select-dropdown__item").filter(has_text="救援行动").first.click()
            pg.wait_for_timeout(400)
            check("下拉选择后页签联动为「救援行动」", active_tab() == "救援行动", active_tab())

            before = len(news_calls)
            pg.get_by_role("button", name="查询").click()
            check("点查询触发请求", wait_news_call(before + 1), f"calls={len(news_calls)}")
            check("列表只剩救援行动 1 条", wait_rows(1), f"rows={row_count()}")
            ok_rows, detail = all_rows_are("救援行动")
            check("列表行分类均为救援行动", ok_rows, detail)

            # ---------- 6) 重置 ----------
            pg.get_by_role("button", name="重置").click()
            check("重置后页签回到「全部」", active_tab() == "全部", active_tab())
            check("重置后恢复全量 7 条", wait_rows(7), f"rows={row_count()}")

            check("无 JS 运行错误", len(errors) == 0, errors)

            pg.screenshot(path=str(SHOTS / "news_tabs_verify.png"), full_page=True)
            browser.close()

    passed = sum(1 for _, ok, _ in results if ok)
    print(f"\n===== 新闻分类页签验证: {passed}/{len(results)} 通过 =====")
    sys.exit(0 if passed == len(results) else 1)


if __name__ == "__main__":
    main()
