"""轮播图上传裁剪验证（admin 静态产物 + 接口 mock + 拦截上传文件校验像素）。

覆盖：
  1. 轮播图新增弹窗进入「裁剪模式」，提示 1256 × 524 px
  2. 选择图片后弹出裁剪框，裁剪框比例 ≈ 1256:524
  3. 拖拽后确认上传，实际上传的 JPEG 像素严格为 1256 × 524
  4. 上传后回填预览、弹窗关闭、无 JS 报错
  5. 回归：标语横幅（未传 aspectRatio）仍走原 el-upload 模式，不受影响

用法：python tests/banner_crop_verify.py <admin_dist_dir> [port] [test_image]
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

TARGET = sys.argv[1]
PORT = int(sys.argv[2]) if len(sys.argv) > 2 else 8093
IMG = sys.argv[3] if len(sys.argv) > 3 else "/tmp/bn_1792408612749-225561325.webp"

DIST = Path(TARGET).resolve()
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

BANNER_ROWS = {
    "items": [
        {
            "id": 27,
            "title": "四川飞豹救援2026年度全省新队员入队集训暨统一考核圆满落幕",
            "imageUrl": "/probe.png",
            "link": None,
            "sort": 1,
            "status": "显示",
            "createdAt": "2026-10-19T11:12:57.076Z",
        }
    ],
    "total": 1,
}

uploads = []
api_calls = []


def jpeg_size(data):
    """从 multipart 请求体里定位 JPEG 并读取 SOF 宽高。"""
    if not data:
        return None
    start = data.find(b"\xff\xd8\xff")
    if start < 0:
        return None
    i = start + 2
    sof_markers = (0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF)
    while i + 9 < len(data):
        if data[i] != 0xFF:
            i += 1
            continue
        marker = data[i + 1]
        if marker == 0xD8:
            i += 2
            continue
        if marker in (0xD9, 0xDA):
            break
        if 0xD0 <= marker <= 0xD7:
            i += 2
            continue
        seg_len = int.from_bytes(data[i + 2 : i + 4], "big")
        if marker in sof_markers:
            h = int.from_bytes(data[i + 5 : i + 7], "big")
            w = int.from_bytes(data[i + 7 : i + 9], "big")
            return w, h
        i += 2 + seg_len
    return None


def main():
    if not os.path.exists(IMG):
        print(f"测试图片不存在：{IMG}")
        sys.exit(2)

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

                if "/admin/upload/image" in url and method == "POST":
                    try:
                        body = route.request.post_data_buffer or b""
                    except Exception as exc:  # 诊断用
                        print(f"  DEBUG 读取上传体失败: {exc}", flush=True)
                        body = b""
                    uploads.append(body)
                    return ok({"url": "/probe.png"})
                if "/banner/list" in url:
                    return ok(BANNER_ROWS)
                if "/slogan-banners" in url:
                    return ok({"items": [], "total": 0})
                if "/dict/data/type" in url:
                    return ok([])
                return ok(None)

            all_reqs = []
            pg.on("request", lambda r: all_reqs.append(f"{r.method} {r.url}"))
            pg.route("**/api/**", api)
            pg.route("**/probe.png", lambda r: r.fulfill(status=200, content_type="image/png", body=PROBE_PNG))
            pg.on("pageerror", lambda e: errors.append(str(e)))
            pg.add_init_script(
                "localStorage.setItem('token','verify-token');"
                "localStorage.setItem('user', JSON.stringify({id:1,username:'verify',name:'验证',role:'admin',permissions:[]}));"
            )

            # ---------- 1) 轮播图列表 → 新增弹窗 ----------
            pg.goto(f"{base}/banner", wait_until="networkidle")
            pg.wait_for_timeout(1200)
            check("轮播图管理页可访问", pg.locator(".portal-banner-page").count() > 0)

            pg.get_by_role("button", name="新增轮播图").click()
            pg.wait_for_timeout(500)

            check("上传区进入裁剪模式", pg.locator(".crop-upload__add").count() == 1)
            meta = pg.locator(".crop-upload__meta").inner_text() if pg.locator(".crop-upload__meta").count() else ""
            check("提示目标尺寸 1256 × 524", "1256" in meta and "524" in meta, meta)
            check("裁剪模式下不再出现默认上传块", pg.locator(".crop-upload .el-upload--picture-card").count() == 0)

            # ---------- 2) 选择图片 → 裁剪弹窗 ----------
            pg.set_input_files(".crop-upload__input", IMG)
            pg.wait_for_selector(".image-cropper__viewport", timeout=20000)
            pg.wait_for_function(
                """() => {
                  const b=[...document.querySelectorAll('.image-cropper-dialog button')]
                    .find(x => (x.innerText||'').includes('确定并上传'));
                  return !!b && !b.disabled;
                }""",
                timeout=20000,
            )

            vbox = pg.locator(".image-cropper__viewport").bounding_box()
            ratio = (vbox["width"] / vbox["height"]) if vbox else 0
            check("裁剪框比例 ≈ 1256:524", abs(ratio - 1256 / 524) < 0.01, f"{ratio:.4f}")
            crop_meta = pg.locator(".image-cropper__meta").inner_text()
            check("裁剪弹窗标注 1256 × 524 px", "1256" in crop_meta and "524" in crop_meta, crop_meta)

            # 拖拽一次，确认缩放/平移后导出尺寸仍固定
            if vbox:
                cx, cy = vbox["x"] + vbox["width"] / 2, vbox["y"] + vbox["height"] / 2
                pg.mouse.move(cx, cy)
                pg.mouse.down()
                pg.mouse.move(cx - 70, cy - 12, steps=10)
                pg.mouse.up()
                pg.wait_for_timeout(200)

            # ---------- 3) 确认上传 → 校验像素 ----------
            check("新增弹窗初始未带图片", pg.locator(".crop-upload__card").count() == 0)
            pg.get_by_role("button", name="确定并上传").click()
            deadline = time.time() + 20
            # 注意：必须用 pg.wait_for_timeout 驱动 Playwright 事件循环，
            # 纯 time.sleep 会让 route 回调排队不执行，导致误判「未发起上传」。
            while time.time() < deadline and not uploads:
                pg.wait_for_timeout(100)

            check("已发起图片上传请求", bool(uploads), f"api_calls={api_calls[-3:]}")
            if uploads:
                size = jpeg_size(uploads[0])
                check("上传图片像素严格为 1256 × 524", size == (1256, 524), f"{size}")

            pg.wait_for_selector(".crop-upload__card img", timeout=15000)
            tile_src = pg.locator(".crop-upload__card img").get_attribute("src")
            check("上传后回填预览", bool(tile_src) and "/probe.png" in tile_src, tile_src)
            try:
                pg.wait_for_selector(".image-cropper__viewport", state="detached", timeout=5000)
            except Exception:
                pass
            check("裁剪弹窗已关闭", pg.locator(".image-cropper__viewport").count() == 0)

            # ---------- 4) 回归：标语横幅仍是默认上传模式 ----------
            pg.goto(f"{base}/slogan-banners", wait_until="networkidle")
            pg.wait_for_timeout(1000)
            add_btn = pg.get_by_role("button", name="新增横幅")
            if add_btn.count():
                add_btn.click()
                pg.wait_for_timeout(500)
                check("标语横幅未进入裁剪模式", pg.locator(".crop-upload").count() == 0)
                check("标语横幅保留默认 el-upload", pg.locator(".el-upload--picture-card").count() >= 1)
            else:
                check("标语横幅新增按钮可见", False, "未找到「新增横幅」")

            check("无 JS 运行错误", len(errors) == 0, errors)

            pg.screenshot(path=str(SHOTS / "banner_crop_verify.png"), full_page=True)
            browser.close()

    passed = sum(1 for _, ok, _ in results if ok)
    print(f"\n===== 轮播图裁剪验证: {passed}/{len(results)} 通过 =====")
    sys.exit(0 if passed == len(results) else 1)


if __name__ == "__main__":
    main()
