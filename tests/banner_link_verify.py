"""轮播图「网址链接」前后端交互验证（静态产物 + 接口 mock）。

覆盖：
A. 官网首页 banner 标题点击交互
  A1. 配置了 link 的 banner：标题 #1_35 带 is-clickable、cursor=pointer
  A2. 点击标题 → 路由跳转到 /dynamic-news/detail/12
  A3. 未配置 link 的 banner：标题无 is-clickable、cursor=default
  A4. 点击标题 → 不跳转（URL 不变）
B. 后台「编辑/新增轮播图」弹窗
  B1. 「展示设置」区存在「网址链接」字段与输入框
  B2. 非法值（www.xxx.com）失焦 → 出现格式校验错误
  B3. 改为站内路径 /dynamic-news/detail/12 → 校验错误消失、值保留

用法：python tests/banner_link_verify.py
（需先构建 website/dist 与 admin/dist）
"""
import http.server
import json
import os
import socketserver
import sys
import threading
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
WEB_DIST = ROOT / "website" / "dist"
ADMIN_DIST = ROOT / "admin" / "dist"
SHOTS = ROOT / ".workbuddy" / "test-results"
SHOTS.mkdir(parents=True, exist_ok=True)

WEB_PORT = 8112
ADMIN_PORT = 8113

results = []


def check(name, cond, detail=""):
    results.append((name, bool(cond), str(detail)[:240]))
    print(("  PASS " if cond else "  FAIL ") + name + (f" | {str(detail)[:240]}" if detail else ""), flush=True)


def make_handler(dist: Path):
    class SPAHandler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *a, **kw):
            super().__init__(*a, directory=str(dist), **kw)

        def do_GET(self):
            p = self.translate_path(self.path)
            if not os.path.exists(p) and "." not in os.path.basename(self.path):
                self.path = "/index.html"
            return super().do_GET()

        def log_message(self, *a):
            pass

    return SPAHandler


def serve(dist: Path, port: int):
    socketserver.ThreadingTCPServer.allow_reuse_address = True
    httpd = socketserver.ThreadingTCPServer(("127.0.0.1", port), make_handler(dist))
    httpd.daemon_threads = True
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd


# 控制首页 banner mock 返回哪一组
banner_phase = {"mode": "with_link"}


def main():
    if not WEB_DIST.exists() or not ADMIN_DIST.exists():
        print("缺少 dist，请先构建 website 与 admin")
        sys.exit(2)

    serve(WEB_DIST, WEB_PORT)
    serve(ADMIN_DIST, ADMIN_PORT)
    web_base = f"http://127.0.0.1:{WEB_PORT}"
    admin_base = f"http://127.0.0.1:{ADMIN_PORT}"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=["--no-sandbox"])

        # ==================== A. 官网首页 ====================
        ctx = browser.new_context(viewport={"width": 1440, "height": 900}, locale="zh-CN")
        pg = ctx.new_page()
        errors = []

        def web_api(route):
            url = route.request.url

            def ok(payload):
                route.fulfill(
                    status=200,
                    content_type="application/json",
                    body=json.dumps({"code": 200, "message": "ok", "data": payload}, ensure_ascii=False),
                )

            if "/api/home/banner" in url:
                if banner_phase["mode"] == "with_link":
                    data = [
                        {"id": 101, "title": "测试轮播A（有链接）", "image": "/uploads/a.jpg", "link": "/dynamic-news/detail/12"}
                    ]
                else:
                    data = [
                        {"id": 102, "title": "测试轮播B（无链接）", "image": "/uploads/b.jpg", "link": ""}
                    ]
                return ok(data)
            if "/api/home/news" in url or "/api/home/dynamics" in url or "/api/home/actions" in url or "/api/home/showcase" in url or "/api/home/links" in url:
                return ok([])
            if "/api/videos/top/list" in url:
                return ok({"items": [], "total": 0})
            if "/api/slogan" in url:
                return ok([])
            if "/api/config" in url:
                return ok({})
            return ok(None)

        pg.route("**/api/**", web_api)
        pg.on("pageerror", lambda e: errors.append(str(e)))

        # A1/A2：有链接 → 可点击 + 点击跳转
        pg.goto(web_base + "/", wait_until="networkidle")
        pg.wait_for_selector('[id="1_35"]', timeout=15000)
        title = pg.locator('[id="1_35"]')
        txt = title.inner_text().strip()
        check("首页加载有链接 banner 标题", "测试轮播A" in txt, txt)

        cls = title.get_attribute("class") or ""
        cursor = title.evaluate("el => getComputedStyle(el).cursor")
        check("有链接时标题含 is-clickable", "is-clickable" in cls, cls)
        check("有链接时 cursor=pointer", cursor == "pointer", cursor)

        title.click()
        navigated = False
        end = time.time() + 8
        while time.time() < end:
            if "/dynamic-news/detail/12" in pg.url:
                navigated = True
                break
            pg.wait_for_timeout(150)
        check("点击标题跳转到 /dynamic-news/detail/12", navigated, pg.url)

        # A3/A4：无链接 → 不可点击 + 不跳转
        banner_phase["mode"] = "without_link"
        pg.goto(web_base + "/", wait_until="networkidle")
        pg.wait_for_selector('[id="1_35"]', timeout=15000)
        title = pg.locator('[id="1_35"]')
        txt = title.inner_text().strip()
        check("首页加载无链接 banner 标题", "测试轮播B" in txt, txt)

        cls = title.get_attribute("class") or ""
        cursor = title.evaluate("el => getComputedStyle(el).cursor")
        check("无链接时标题不含 is-clickable", "is-clickable" not in cls, cls)
        check("无链接时 cursor 非 pointer", cursor != "pointer", cursor)

        before_url = pg.url
        title.click()
        pg.wait_for_timeout(600)
        check("无链接时点击标题不跳转", pg.url == before_url, f"{before_url} -> {pg.url}")

        check("首页无 JS 运行错误", len(errors) == 0, errors[:3])
        pg.screenshot(path=str(SHOTS / "banner_link_website.png"), full_page=False)
        ctx.close()

        # ==================== B. 后台弹窗 ====================
        ctx2 = browser.new_context(viewport={"width": 1440, "height": 900}, locale="zh-CN")
        apg = ctx2.new_page()
        aerrors = []
        save_bodies = []

        def admin_api(route):
            url, method = route.request.url, route.request.method

            def ok(payload):
                route.fulfill(
                    status=200,
                    content_type="application/json",
                    body=json.dumps({"code": 200, "message": "ok", "data": payload}, ensure_ascii=False),
                )

            if "/api/banner/list" in url:
                return ok(
                    {
                        "items": [
                            {
                                "id": 7,
                                "title": "既有轮播（编辑回填用）",
                                "imageUrl": "/uploads/x.jpg",
                                "image": "/uploads/x.jpg",
                                "link": "/dynamic-news/detail/9",
                                "sort": 1,
                                "status": "显示",
                                "createdAt": "2026-10-19T10:00:00.000Z",
                            }
                        ],
                        "total": 1,
                    }
                )
            if "/api/banner/save" in url and method == "POST":
                try:
                    save_bodies.append(route.request.post_data)
                except Exception:
                    pass
                return ok({"message": "保存成功"})
            if "/api/admin/dashboard/notifications" in url:
                return ok({"unreadCount": 0, "items": []})
            if "/api/dict/data/type" in url:
                return ok([])
            if "/api/auth/" in url:
                return ok({"id": 1, "username": "verify", "realName": "验证", "role": "admin", "permissions": []})
            return ok(None)

        apg.route("**/api/**", admin_api)
        apg.on("pageerror", lambda e: aerrors.append(str(e)))
        apg.add_init_script(
            "localStorage.setItem('token','verify-token');"
            "localStorage.setItem('user', JSON.stringify({id:1,username:'verify',realName:'验证',role:'admin',permissions:[]}));"
        )

        apg.goto(admin_base + "/banner", wait_until="networkidle")
        apg.wait_for_selector(".banner-table-thumb, .el-table", timeout=15000)

        # B0：编辑既有轮播图 → 已有 link 回填到输入框
        apg.locator(".el-table__body-wrapper tbody tr").first.get_by_role("button", name="编辑").click()
        apg.wait_for_selector(".el-dialog", timeout=10000)
        apg.wait_for_timeout(400)
        edit_item = apg.locator(".el-dialog .el-form-item").filter(has_text="网址链接")
        edit_val = edit_item.locator("input").first.input_value().strip()
        check("编辑弹窗回填已有链接", edit_val == "/dynamic-news/detail/9", edit_val)
        apg.get_by_role("button", name="取消").click()
        apg.wait_for_selector(".el-dialog", state="hidden", timeout=8000)

        # 新增轮播图：字段 + 校验
        apg.get_by_role("button", name="新增轮播图").click()
        apg.wait_for_selector(".el-dialog", timeout=10000)
        apg.wait_for_timeout(400)

        item = apg.locator(".el-dialog .el-form-item").filter(has_text="网址链接")
        check("弹窗存在「网址链接」字段", item.count() > 0, f"count={item.count()}")
        link_input = item.locator("input").first
        check("「网址链接」含输入框", link_input.count() > 0)

        # B2：非法值 → 校验报错
        link_input.fill("www.bad.com")
        apg.locator(".el-dialog__header").click()
        apg.wait_for_timeout(500)
        err = item.locator(".el-form-item__error")
        err_txt = err.inner_text().strip() if err.count() else ""
        check("非法链接触发格式校验错误", "请输入站内路径" in err_txt, err_txt)

        # B3：改为站内路径 → 错误消失
        link_input.fill("/dynamic-news/detail/12")
        apg.locator(".el-dialog__header").click()
        apg.wait_for_timeout(500)
        err2 = item.locator(".el-form-item__error")
        ok_val = link_input.input_value().strip()
        check("合法站内路径校验通过（无错误）", err2.count() == 0, f"errors={err2.count()}")
        check("链接值保留正确", ok_val == "/dynamic-news/detail/12", ok_val)

        check("后台无 JS 运行错误", len(aerrors) == 0, aerrors[:3])
        apg.screenshot(path=str(SHOTS / "banner_link_admin.png"), full_page=False)
        ctx2.close()
        browser.close()

    passed = sum(1 for _, ok, _ in results if ok)
    print(f"\n===== 轮播图网址链接验证: {passed}/{len(results)} 通过 =====")
    sys.exit(0 if passed == len(results) else 1)


if __name__ == "__main__":
    main()
