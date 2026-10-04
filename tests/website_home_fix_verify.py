"""本轮修复验证（前台官网）—— 黑条 + 标语横幅是否真的渲染出来。

做法：静态产物 + 网络拦截喂 1 条启用中的标语横幅，
      再用真实 Chromium 全页截图，逐行扫描「近黑色行」，证明画布不再露黑底。

用法：python tests/website_home_fix_verify.py <website_dist_dir> [port]
"""
import http.server
import io
import json
import os
import socketserver
import sys
import threading
from pathlib import Path

import numpy as np
from PIL import Image
from playwright.sync_api import sync_playwright

TARGET = sys.argv[1]
USE_DEV = str(TARGET).startswith("http")  # 传 URL 则直接打 dev server，传目录则本地静态托管产物
DIST = Path(TARGET).resolve() if not USE_DEV else Path(".")
PORT = int(sys.argv[2]) if len(sys.argv) > 2 else 8098
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


# 1200x70 的深红色横幅（与线上实测图片同尺寸），用于证明「真的画出来了」
_buf = io.BytesIO()
Image.new("RGB", (1200, 70), (200, 30, 40)).save(_buf, format="PNG")
PROBE_PNG = _buf.getvalue()
PROBE_URL = "http://127.0.0.1:1/probe-banner.png"


def measure(page, shot_path):
    page.screenshot(path=shot_path, full_page=True)
    a = np.asarray(Image.open(shot_path).convert("RGB")).astype(int)
    rowmean = a.mean(axis=(1, 2))
    dark = np.where(rowmean < 45)[0]
    bands = []
    if len(dark):
        s = prev = dark[0]
        for r in dark[1:]:
            if r - prev > 3:
                bands.append((int(s), int(prev)))
                s = r
            prev = r
        bands.append((int(s), int(prev)))
    return a, bands


def main():
    with socketserver.ThreadingTCPServer(("127.0.0.1", 0 if USE_DEV else PORT), SPAHandler) as httpd:
        httpd.daemon_threads = True
        threading.Thread(target=httpd.serve_forever, daemon=True).start()
        base = str(TARGET).rstrip("/") if USE_DEV else f"http://127.0.0.1:{PORT}"

        with sync_playwright() as p:
            b = p.chromium.launch(headless=True, args=["--no-sandbox"])
            for width in (1920, 1512, 1366):
                ctx = b.new_context(viewport={"width": width, "height": 1000}, locale="zh-CN")
                pg = ctx.new_page()
                errs = []

                def api(route):
                    url = route.request.url
                    def ok(payload):
                        route.fulfill(status=200, content_type="application/json",
                                      body=json.dumps({"code": 200, "message": "ok", "data": payload}))
                    if "slogan-banners/list" in url:
                        return ok([{"id": 5, "slogan": None, "imageUrl": PROBE_URL,
                                    "link": "https://www.mem.gov.cn/", "linkTarget": "_blank"}])
                    return ok([])

                pg.route("**/api/**", api)
                pg.route("**/probe-banner.png", lambda r: r.fulfill(status=200, content_type="image/png", body=PROBE_PNG))
                pg.on("pageerror", lambda e: errs.append(str(e)))
                pg.goto(base, wait_until="networkidle")
                pg.wait_for_timeout(2500)

                info = pg.evaluate(
                    """() => {
                      const el=document.querySelector('.slogan-carousel');
                      const img=document.querySelector('.slogan-carousel__img');
                      const frame=document.querySelector('.Pixso-frame-1_2');
                      const r=el?el.getBoundingClientRect():null;
                      return {
                        carousel: !!el,
                        rect: r?{x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}:null,
                        imgOk: img? (img.complete && img.naturalWidth>0) : false,
                        frameBg: frame?getComputedStyle(frame).backgroundColor:null,
                        frameH: frame?Math.round(frame.getBoundingClientRect().height):0,
                        scrollH: document.documentElement.scrollHeight,
                      };
                    }"""
                )
                shot = SHOTS / f"fix-home-{width}.png"
                arr, bands = measure(pg, shot)

                check(f"[{width}] 标语横幅已渲染到首页", info["carousel"] and info["imgOk"], info)
                check(f"[{width}] 画布底色为白色(不再露黑底)", info["frameBg"] in ("rgb(255, 255, 255)", "white"), info["frameBg"])
                check(f"[{width}] 全页无黑色横条", len(bands) == 0, f"dark bands={bands}")

                if info["rect"]:
                    x0 = info["rect"]["x"] + 20
                    x1 = info["rect"]["x"] + info["rect"]["w"] - 20
                    y0 = info["rect"]["y"] + 20
                    y1 = info["rect"]["y"] + info["rect"]["h"] - 20
                    crop = arr[y0:y1, x0:x1]
                    mean = crop.reshape(-1, 3).mean(axis=0)
                    is_probe = mean[0] > 140 and mean[1] < 100 and mean[2] < 100
                    check(f"[{width}] 横幅区域内确有横幅图（非空白）", is_probe,
                          f"region mean RGB={mean.round(1)} rect={info['rect']}")
                check(f"[{width}] 无 JS 运行时错误", len(errs) == 0, errs[:2])
                ctx.close()
            b.close()
        httpd.shutdown()

    passed = sum(1 for _, ok, _ in results if ok)
    print(f"\n===== 官网修复验证: {passed}/{len(results)} 通过 =====")
    for n, ok, d in results:
        if not ok:
            print("  ✗", n, "|", d)
    return 0 if passed == len(results) else 1


sys.exit(main())
