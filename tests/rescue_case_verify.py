"""救援案例「新增/编辑」验证（admin 静态产物 + 接口 mock）。

覆盖（对应线上「新增救援案例报错：服务端内部错误」事故）：
  1. 救援案例页可访问、列表渲染、救援日期按本地时区显示（不少一天）
  2. 空表单点保存 → 前端校验拦截：不发 POST，四个必填字段级提示出现
  3. 只填标题点保存 → 仍被拦截，提示其余必填
  4. 填齐必填点保存 → POST 发出且 payload 干净（仅 5 个业务字段，无 id/createdAt），rescueDate 为 YYYY-MM-DD
  5. 编辑回填：UTC 零点串回显为当天日期（2026-10-21），不少一天
  6. 无 JS 运行错误

用法：python tests/rescue_case_verify.py <admin_dist_dir> [port]
"""
import http.server
import json
import os
import socketserver
import sys
import threading
import time
from pathlib import Path
from urllib.parse import urlparse

from playwright.sync_api import sync_playwright

TARGET = sys.argv[1]
PORT = int(sys.argv[2]) if len(sys.argv) > 2 else 8120

DIST = Path(TARGET).resolve()
ROOT = Path(__file__).resolve().parent.parent
SHOTS = ROOT / ".workbuddy" / "test-results"
SHOTS.mkdir(parents=True, exist_ok=True)

results = []

# 关键样本：救援日期存的是「东八区 2026-10-21 00:00」→ API 序列化为 UTC 串
# 正确显示/回填应为 2026-10-21；旧的 toISOString().split('T') 会显示成 2026-10-20（少一天）
ROWS = [
    {
        "id": 1,
        "title": "6·3普洱6.4级地震救援",
        "location": "云南普洱",
        "rescueDate": "2026-10-20T16:00:00.000Z",
        "coverImage": None,
        "content": "救援过程内容",
        "createdAt": "2026-10-20T16:00:00.000Z",
    }
]
EXPECTED_DATE = "2026-10-21"

post_calls = []


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


def main():
    with socketserver.ThreadingTCPServer(("127.0.0.1", PORT), SPAHandler) as httpd:
        httpd.allow_reuse_address = True
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

                def ok(payload):
                    route.fulfill(
                        status=200,
                        content_type="application/json",
                        body=json.dumps({"code": 200, "message": "ok", "data": payload}, ensure_ascii=False),
                    )

                def bad(status, message):
                    route.fulfill(
                        status=status,
                        content_type="application/json",
                        body=json.dumps({"code": status, "message": message, "data": None}, ensure_ascii=False),
                    )

                path = urlparse(url).path
                if path == "/api/rescue-cases" and method == "GET":
                    return ok({"items": ROWS, "total": len(ROWS), "page": 1, "pageSize": 10})
                if path == "/api/rescue-cases" and method == "POST":
                    post_calls.append(route.request.post_data)
                    return ok({"id": 2, **json.loads(route.request.post_data or "{}")})
                if path == "/api/rescue-cases/1" and method in ("PATCH", "PUT"):
                    return ok({"id": 1, **json.loads(route.request.post_data or "{}")})
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

            def dialog():
                return pg.locator(".el-dialog:visible")

            def open_add_dialog():
                pg.get_by_role("button", name="新增案例").click()
                pg.wait_for_selector(".el-dialog:visible", timeout=10000)
                pg.wait_for_timeout(400)

            def fill_field(label, value):
                form = dialog().locator(".el-form-item").filter(has_text=label).first
                form.locator("input, textarea").first.fill(value)

            def error_texts():
                return [e.inner_text().strip() for e in dialog().locator(".el-form-item__error").all()]

            # ---------- 1) 页面与列表 ----------
            pg.goto(f"{base}/rescue-cases", wait_until="networkidle")
            pg.wait_for_selector(".el-table__body-wrapper tbody tr", timeout=15000)
            check("救援案例页可访问", pg.locator(".rescue-case-page").count() > 0)
            first_row = pg.locator(".el-table__body-wrapper tbody tr").first.inner_text()
            check("列表渲染 mock 数据", "6·3普洱6.4级地震救援" in first_row, first_row[:80])
            check(
                f"救援日期按本地时区显示 {EXPECTED_DATE}（不少一天）",
                EXPECTED_DATE in first_row and "2026-10-20 " not in first_row,
                first_row[:120],
            )

            # ---------- 2) 空表单点保存 → 前端校验拦截 ----------
            open_add_dialog()
            before_posts = len(post_calls)
            pg.get_by_role("button", name="保存").click()
            pg.wait_for_timeout(600)
            errs = error_texts()
            joined = " ".join(errs)
            check("空表单保存不发 POST", len(post_calls) == before_posts, f"posts={len(post_calls)}")
            check("提示「请输入案例标题」", "请输入案例标题" in joined, joined)
            check("提示「请输入救援地点」", "请输入救援地点" in joined, joined)
            check("提示「请选择救援日期」", "请选择救援日期" in joined, joined)
            check("提示「请输入案例内容」", "请输入案例内容" in joined, joined)

            # ---------- 3) 只填标题仍被拦截 ----------
            fill_field("案例标题", "测试标题")
            before_posts = len(post_calls)
            pg.get_by_role("button", name="保存").click()
            pg.wait_for_timeout(500)
            errs = error_texts()
            joined = " ".join(errs)
            check("只填标题仍不发 POST", len(post_calls) == before_posts, f"posts={len(post_calls)}")
            check("仍提示救援地点/日期/内容", ("请输入救援地点" in joined) and ("请选择救援日期" in joined) and ("请输入案例内容" in joined), joined)
            check("标题字段已无错误", "请输入案例标题" not in joined, joined)

            # ---------- 4) 填齐必填 → 干净 payload ----------
            fill_field("救援地点", "成都市高新区")
            date_input = dialog().locator(".el-date-picker input").first
            date_input.fill("2026-10-19")
            date_input.press("Enter")
            pg.wait_for_timeout(300)
            fill_field("案例内容", "这是一段救援过程与结果总结")
            before_posts = len(post_calls)
            pg.get_by_role("button", name="保存").click()
            pg.wait_for_timeout(800)
            check("填齐必填后发出 POST", len(post_calls) == before_posts + 1, f"posts={len(post_calls)}")
            if post_calls:
                payload = json.loads(post_calls[-1])
                check(
                    "payload 仅含 5 个业务字段（无 id/createdAt）",
                    set(payload.keys()) == {"title", "location", "rescueDate", "coverImage", "content"},
                    sorted(payload.keys()),
                )
                check("rescueDate 为 YYYY-MM-DD 纯日期", payload.get("rescueDate") == "2026-10-19", payload.get("rescueDate"))
                check("title/location/content 已提交", payload.get("title") == "测试标题" and payload.get("location") == "成都市高新区" and payload.get("content") == "这是一段救援过程与结果总结", payload)
            pg.get_by_role("button", name="取消").click()
            pg.wait_for_selector(".el-dialog", state="hidden", timeout=8000)

            # ---------- 5) 编辑回填不少一天 ----------
            pg.get_by_role("button", name="编辑").first.click()
            pg.wait_for_selector(".el-dialog:visible", timeout=10000)
            pg.wait_for_timeout(400)
            edit_date = dialog().locator(".el-date-picker input").first.input_value()
            check(f"编辑回填日期为 {EXPECTED_DATE}（不少一天）", edit_date == EXPECTED_DATE, edit_date)
            edit_title = dialog().locator(".el-form-item").filter(has_text="案例标题").first.locator("input").first.input_value()
            check("编辑回填标题", edit_title == "6·3普洱6.4级地震救援", edit_title)
            pg.get_by_role("button", name="取消").click()
            pg.wait_for_selector(".el-dialog", state="hidden", timeout=8000)

            check("无 JS 运行错误", len(errors) == 0, errors)

            pg.screenshot(path=str(SHOTS / "rescue_case_verify.png"), full_page=True)
            browser.close()

    passed = sum(1 for _, ok, _ in results if ok)
    print(f"\n===== 救援案例新增/编辑验证: {passed}/{len(results)} 通过 =====")
    sys.exit(0 if passed == len(results) else 1)


if __name__ == "__main__":
    main()
