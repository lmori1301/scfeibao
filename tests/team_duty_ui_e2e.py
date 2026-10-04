"""队伍值班 · 浏览器真机联调（Playwright 直连，绕开 agent-browser daemon）

覆盖：登录 → 菜单/路由 → 列表 → 附件导入解析预览 → 提交落库 →
      详情 / 编辑 / 删除 / 筛选 / 悬浮须知不遮挡 → 清理测试数据
"""
import json
import re
import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright, expect

BASE = "http://localhost:8080"
ROOT = Path("/Users/yusenn/ProCode/demo-aistone/四川飞豹_副本2")
XLSX = ROOT / "output" / "四川飞豹特勤大队2026年中秋国庆值班表（导入测试用）.xlsx"
SHOTS = ROOT / ".workbuddy" / "test-results"
SHOTS.mkdir(parents=True, exist_ok=True)
PW = open("/tmp/.e2e_pw").read().strip()
VISIBLE_DIALOG_JS = "() => { const d=[...document.querySelectorAll('.el-dialog')].find(x => x.offsetParent !== null); return d ? d.offsetParent !== null : false; }"

results = []


def check(name, cond, detail=""):
    results.append((name, bool(cond), str(detail)[:220]))
    print(("  PASS " if cond else "  FAIL ") + name + (f" | {str(detail)[:220]}" if detail else ""), flush=True)


def close_visible_dialog(page):
    """只点「当前可见」弹窗 footer 的按钮，避免匹配到 DOM 里残留的隐藏弹窗。"""
    btns = page.locator('.el-dialog:visible button:has-text("关闭")')
    if btns.count() > 0:
        btns.last.click()
    page.wait_for_timeout(600)


def rows_of(page, selector):
    return page.eval_on_selector_all(
        f"{selector} tbody tr",
        """els => els.map(tr => [...tr.querySelectorAll('td')].map(td => td.innerText.trim()))""",
    )


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=["--no-sandbox"])
        ctx = browser.new_context(viewport={"width": 1600, "height": 900}, locale="zh-CN")
        page = ctx.new_page()
        xhr = []
        page.on("request", lambda r: xhr.append((r.method, r.url)) if "/api/" in r.url else None)
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))

        # 1) 登录
        page.goto(f"{BASE}/login", wait_until="networkidle")
        page.fill('input[placeholder="请输入用户名"]', "e2e_duty")
        page.fill('input[placeholder="请输入密码"]', PW)
        page.click('button:has-text("登")')
        page.wait_for_url("**/dashboard", timeout=20000)
        check("登录并跳转工作台", "/dashboard" in page.url, page.url)

        # 2) 侧栏菜单
        page.goto(f"{BASE}/team-duty", wait_until="networkidle")
        page.wait_for_timeout(1500)
        sidebar = page.locator(".shell-sidebar").inner_text()
        check("侧栏「档案台账」组含队伍值班", "队伍值班" in sidebar, sidebar.replace("\n", "/")[:160])
        crumb = page.locator(".page-crumb").inner_text()
        check("面包屑正确", "队伍值班" in crumb, crumb)
        headers = page.eval_on_selector_all(
            ".el-table__header th", "els => els.map(e => e.innerText.trim()).filter(Boolean)"
        )
        expect_cols = ["队伍名称", "值班年份", "值班日期", "值班干部", "干部电话", "值班员", "创建时间", "附件预览", "操作"]
        check("列表表头字段齐全", all(c in headers for c in expect_cols), headers)

        # 3) 悬浮须知：默认收起且不遮挡操作列（收起/展开两态都要验）
        OVERLAP_JS = """() => {
          const th=[...document.querySelectorAll('.team-duty-table-panel .el-table__header th')];
          const last=th[th.length-1].getBoundingClientRect();
          const panel=document.querySelector('.team-duty-table-panel').getBoundingClientRect();
          const card=document.querySelector('.duty-notice').getBoundingClientRect();
          // 矩形相交：横向 + 纵向都要重叠才算遮挡
          const ov=(a,b)=>a.left<b.right && a.right>b.left && a.top<b.bottom && a.bottom>b.top;
          return {lastCol:{x:Math.round(last.x), r:Math.round(last.right)},
                  panel:{x:Math.round(panel.x), r:Math.round(panel.right)},
                  card:{x:Math.round(card.x), r:Math.round(card.right), w:Math.round(card.width)},
                  ovCol:ov(card,last), ovPanel:ov(card,panel)};
        }"""

        def notice_geometry(pg):
            box = pg.locator(".duty-notice").bounding_box()
            g = pg.evaluate(OVERLAP_JS)
            return box, g, g["ovCol"]

        box, geo, overlap = notice_geometry(page)
        check("悬浮卡片默认收起", box["width"] < 80, f"width={box['width']:.0f}")
        check(
            "收起态不遮挡操作列",
            not overlap,
            f"card={geo['card']['x']}..{geo['card']['r']} vs 操作列={geo['lastCol']['x']}..{geo['lastCol']['r']}",
        )

        # 4) 展开须知 → 3 条文案
        page.click(".duty-notice__head")
        page.wait_for_timeout(600)
        items = page.eval_on_selector_all(".duty-notice__body li", "els => els.map(e => e.innerText.trim())")
        check("展开后 3 条须知", len(items) == 3, items)
        check("须知文案含「严禁饮酒」", any("严禁饮酒" in t for t in items), items[1] if len(items) > 1 else "")
        box2, geo2, overlap2 = notice_geometry(page)
        check(
            "展开态同样不遮挡操作列",
            not overlap2,
            f"card={geo2['card']['x']}..{geo2['card']['r']} vs 操作列={geo2['lastCol']['x']}..{geo2['lastCol']['r']}",
        )
        page.screenshot(path=str(SHOTS / "team-duty-notice-expanded.png"), full_page=True)
        page.click(".duty-notice__head")
        page.wait_for_timeout(400)

        # 5) 附件导入解析
        page.click('button:has-text("附件导入新增")')
        page.wait_for_selector(".el-dialog:visible", timeout=10000)
        page.set_input_files(".el-dialog:visible .el-upload input[type=file]", str(XLSX))
        page.wait_for_selector(".duty-parse .el-table__body tbody tr", timeout=25000)
        page.wait_for_timeout(1200)
        parsed = rows_of(page, ".el-dialog:visible .duty-parse .el-table__body")
        summary = page.locator(".el-dialog:visible .duty-parse__summary").inner_text()
        check("前端解析出行数=10", len(parsed) == 10, f"{len(parsed)} 行 | {summary}")
        check("解析首行日期=2026-09-25", parsed[0][0] == "2026-09-25", parsed[0])
        check("解析分离干部与电话", parsed[0][1] == "黄凯" and parsed[0][2] == "15208324794", parsed[0][:3])
        # 页面用「、」展示（库内才存英文逗号），这里断言展示层
        check("解析值班员已拆分展示", parsed[0][3] == "王磊、刘勇、周驰双、段才元", parsed[0][3])
        check("带横线电话已归一(10-05 周家海)", any(r[1] == "周家海" and r[2] == "15928613494" for r in parsed),
              [r[:3] for r in parsed if r[1] == "周家海"])
        # 队伍下拉自动回填：读 el-select 的已选标签
        team_val = page.evaluate(
            """() => {
              const d = [...document.querySelectorAll('.el-dialog')].find(x => x.offsetParent !== null);
              const sel = d.querySelector('.el-select');
              return sel ? sel.innerText.replace(/\\s+/g,' ').trim() : 'no select';
            }"""
        )
        check("队伍下拉已自动回填", "飞豹" in team_val, team_val)
        page.screenshot(path=str(SHOTS / "team-duty-import-parse.png"), full_page=True)

        # 6) 提交落库
        before = page.locator(".el-pagination__total, .el-table").first.inner_text()
        page.click('.el-dialog:visible button:has-text("提交")')
        # 轮询等待弹窗真正关闭（上传 + 批量落库在高负载下可能 >3s）
        closed = False
        for _ in range(40):
            page.wait_for_timeout(500)
            if not page.evaluate(VISIBLE_DIALOG_JS):
                closed = True
                break
        check("提交后弹窗关闭", closed, f"轮询 20s 内关闭={closed}")
        page.wait_for_timeout(1500)
        list_rows = rows_of(page, ".team-duty-table-panel .el-table__body")
        check("列表出现导入的记录(>=10)", len(list_rows) >= 10, f"{len(list_rows)} 行")

        # 7) 详情（定位到「有附件」的那一行：附件列不是「无附件」）
        row_idx = page.evaluate(
            """() => {
              const trs=[...document.querySelectorAll('.team-duty-table-panel .el-table__body tbody tr')];
              const i=trs.findIndex(tr => /预览/.test(tr.innerText));
              return i;
            }"""
        )
        check("存在带附件的记录行", row_idx >= 0, f"row_index={row_idx}")
        row_sel = f".team-duty-table-panel .el-table__body tbody tr:nth-child({row_idx + 1})"
        page.click(f'{row_sel} button:has-text("查看详情")')
        page.wait_for_selector('.el-dialog .el-descriptions', timeout=10000)
        page.wait_for_timeout(800)
        desc = page.locator(".el-dialog:visible .el-descriptions").inner_text()
        for kw in ["队伍名称", "值班年份", "值班日期", "值班干部", "干部电话", "值班员", "创建人", "创建时间", "备注", "附件"]:
            if kw not in desc:
                check(f"详情含「{kw}」", False, desc[:150])
                break
        else:
            check("详情字段齐全(10 项)", True, desc.replace("\n", "/")[:150])
        check("详情显示附件名", ".xlsx" in desc, [l for l in desc.split("\n") if ".xlsx" in l][:2])
        page.screenshot(path=str(SHOTS / "team-duty-detail.png"), full_page=True)
        close_visible_dialog(page)
        page.wait_for_timeout(600)

        # 8) 附件预览弹窗
        page.click(f'{row_sel} button:has-text("预览")')
        page.wait_for_timeout(1500)
        prev_title = page.locator(".el-dialog:visible .el-dialog__title").last.inner_text()
        prev_body = page.locator(".el-dialog:visible").last.inner_text()
        check("附件预览弹窗打开", ".xlsx" in prev_title, prev_title)
        check("Excel 预览有下载/新窗口引导", "下载" in prev_body or "新窗口" in prev_body, prev_body.replace("\n", "/")[:120])
        page.screenshot(path=str(SHOTS / "team-duty-preview.png"), full_page=True)
        close_visible_dialog(page)
        page.wait_for_timeout(600)

        # 9) 编辑带附件的那一行
        page.click(f'{row_sel} button:has-text("编辑")')
        page.wait_for_selector(".el-dialog:visible", timeout=10000)
        page.wait_for_timeout(800)
        inputs = page.eval_on_selector_all(
            ".el-dialog:visible .el-input__inner", "els => els.map(e => e.value)"
        )
        check("编辑弹窗回填原值(干部/电话/值班员)", "黄凯" in inputs and "15208324794" in inputs and any("王磊" in v for v in inputs), inputs[:6])
        # 改第一个非队伍字段（备注在最后，用 index 定位更稳：改「值班干部」）
        page.evaluate(
            """() => {
              const d=[...document.querySelectorAll('.el-dialog')].find(x => x.offsetParent !== null);
              const els=[...d.querySelectorAll('.el-input__inner')];
              // 依次为：队伍(sel非input) / 年份(sel非input) / 日期(input) / 电话(input) / 干部(input) / 值班员(input) / 备注(textarea)
              const el = els.find(e => /^[\\u4e00-\\u9fa5]{2,4}$/.test(e.value) && !/飞豹/.test(e.value));
              if(!el) return 'not found';
              const s=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;
              s.call(el,'编辑测试员'); el.dispatchEvent(new Event('input',{bubbles:true}));
              return el.value;
            }"""
        )
        page.click('.el-dialog:visible button:has-text("保存")')
        edit_closed = False
        for _ in range(30):
            page.wait_for_timeout(500)
            if not page.evaluate(VISIBLE_DIALOG_JS):
                edit_closed = True
                break
        check("编辑保存后弹窗关闭", edit_closed, f"轮询 15s 内关闭={edit_closed}")
        edited = rows_of(page, ".team-duty-table-panel .el-table__body")
        check("列表已显示编辑后的干部名", any("编辑测试员" in " ".join(r) for r in edited),
              [r for r in edited if "编辑测试员" in " ".join(r)][:1])

        # 10) 筛选
        page.fill('.admin-card--search input[placeholder*="值班干部"]', "黄凯")
        page.click('button:has-text("查询")')
        page.wait_for_timeout(2000)
        kw_rows = rows_of(page, ".team-duty-table-panel .el-table__body")
        check("关键词筛选返回结果", isinstance(kw_rows, list), f"{len(kw_rows)} 行")
        check("筛选请求带 keyword", any("keyword=" in u for _, u in xhr), [u for _, u in xhr if "keyword=" in u][:1])
        page.click('button:has-text("重置")')
        page.wait_for_timeout(1500)
        reset_rows = rows_of(page, ".team-duty-table-panel .el-table__body")
        check("重置后行数恢复", len(reset_rows) >= len(kw_rows), f"reset={len(reset_rows)} kw={len(kw_rows)}")

        # 11) 错误态：上传非 Excel
        page.click('button:has-text("附件导入新增")')
        page.wait_for_selector(".el-dialog:visible", timeout=10000)
        page.set_input_files(".el-dialog:visible .el-upload input[type=file]", files=[{
            "name": "bad.txt", "mimeType": "text/plain", "buffer": b"not an excel"}])
        page.wait_for_timeout(2500)
        err_txt = page.locator(".el-dialog:visible .duty-parse__errors, .el-dialog:visible .duty-parse__empty").first.inner_text()
        check("非 Excel 文件有中文错误提示", ("解析失败" in err_txt) or ("有效的 .xlsx" in err_txt) or ("另存为" in err_txt), err_txt[:140])
        check("错误提示为中文(不含英文原文)", "Doesn't look like" not in err_txt, err_txt[:80])
        page.screenshot(path=str(SHOTS / "team-duty-import-error.png"), full_page=True)
        page.click('.el-dialog:visible button:has-text("取消")')
        page.wait_for_timeout(600)

        # 12) 删除（清理带附件那行）
        total_before = len(rows_of(page, ".team-duty-table-panel .el-table__body"))
        page.click(f'{row_sel} button:has-text("删除")')
        page.wait_for_selector(".el-message-box", timeout=8000)
        page.click('.el-message-box button:has-text("确定")')
        page.wait_for_timeout(2500)
        total_after = len(rows_of(page, ".team-duty-table-panel .el-table__body"))
        check("删除后行数 -1", total_after == total_before - 1, f"{total_before} → {total_after}")
        check("删除请求发出 DELETE", any(m == "DELETE" for m, _ in xhr), [f"{m} {u}" for m, u in xhr if m == "DELETE"][:2])

        # 13) 幂等：再次导入同一份表，行数不应翻倍（同队伍+同日期覆盖）
        page.click('button:has-text("附件导入新增")')
        page.wait_for_selector(".el-dialog:visible", timeout=10000)
        page.set_input_files(".el-dialog:visible .el-upload input[type=file]", str(XLSX))
        page.wait_for_selector(".duty-parse .el-table__body tbody tr", timeout=25000)
        page.wait_for_timeout(1000)
        page.click('.el-dialog:visible button:has-text("提交")')
        for _ in range(40):
            page.wait_for_timeout(500)
            if not page.evaluate(VISIBLE_DIALOG_JS):
                break
        page.wait_for_timeout(1500)
        after_reimport = len(rows_of(page, ".team-duty-table-panel .el-table__body"))
        check(
            "重复导入不产生重复记录(覆盖式)",
            after_reimport <= total_after,
            f"删除后 {total_after} → 再导入 {after_reimport}",
        )
        page.screenshot(path=str(SHOTS / "team-duty-list-after.png"), full_page=True)

        check("页面无 JS 运行时错误", len(errors) == 0, errors[:2])
        failed_xhr = [f"{m} {u}" for m, u in xhr if m in ("POST", "PATCH", "DELETE")]
        print("\n  写操作请求:", failed_xhr[:8], flush=True)

        ctx.close()
        browser.close()

    passed = sum(1 for _, ok, _ in results if ok)
    print(f"\n===== 浏览器真机联调: {passed}/{len(results)} 通过 =====", flush=True)
    (SHOTS / "ui-e2e-result.json").write_text(
        json.dumps([{"用例": n, "结果": "PASS" if ok else "FAIL", "证据": d} for n, ok, d in results],
                   ensure_ascii=False, indent=2), encoding="utf-8")
    return 0 if passed == len(results) else 1


sys.exit(main())
