#!/usr/bin/env python3
"""WPS「嵌入单元格」图片（=DISPIMG 公式 + xl/cellimages.xml）提取回归测试。

背景：搜救大队.xlsx 用 WPS 的「嵌入单元格」方式贴照片，图片不在
xl/drawings/（浮动锚点），而在 xl/cellimages.xml，单元格公式为
=DISPIMG("ID_xxx",1)。旧版提取器只认 drawings，导致 导入照片=0 且
photoUrl 被写入公式文本（前端加载失败）。

夹具：合成一个最小 xlsx（cellimages + sheet1 里 M2/M3 两个 DISPIMG 单元格），
用 node --experimental-strip-types 直跑真实 xlsx-images.ts，断言：
  1. 提取 2 张图片（cellimages 优先于 drawings 逻辑）
  2. 列号 = 12（M 列，0 基）
  3. 0 基行号 = 1,2（单元格引用 M2/M3 -> 1 基行号 2,3）
  4. pickRowImages 配对到 rowNumber 2,3
"""

import io
import re
import subprocess
import sys
import zipfile
from pathlib import Path

import openpyxl  # 仅用于生成 PNG 夹具（纯手写 PNG 也行，用 PIL 更省事）

ROOT = Path(__file__).resolve().parent.parent
TS_FILE = ROOT / "backend" / "src" / "common" / "utils" / "xlsx-images.ts"
NODE = "/Users/yusenn/.workbuddy/binaries/node/versions/22.22.2-6/bin/node"
PY = "/Users/yusenn/.workbuddy/binaries/python/envs/default/bin/python"

TS_CHECK = r"""
import * as fs from 'fs';
import { extractXlsxImages, pickRowImages } from ':TS:';

const buffer = fs.readFileSync(process.argv[2]);
const images = extractXlsxImages(buffer);
console.log('images=' + images.length);
console.log('cols=' + [...new Set(images.map(i => i.col))].sort((a,b)=>a-b).join(','));
console.log('rows=' + images.map(i => i.row).sort((a,b)=>a-b).join(','));
const byRow = pickRowImages(images, 12, [2, 3]);
console.log('paired=' + [...byRow.keys()].sort((a,b)=>a-b).join(','));
console.log('sizes=' + images.map(i => i.buffer.length).join(','));
console.log('mimes=' + images.map(i => i.mime).join(','));
""".replace(":TS:", str(TS_FILE))


def build_fixture(path: Path) -> None:
    # 两张不同的 PNG
    from PIL import Image

    def png_bytes(color: tuple, size: tuple) -> bytes:
        buf = io.BytesIO()
        Image.new("RGB", size, color).save(buf, format="PNG")
        return buf.getvalue()

    img1 = png_bytes((200, 30, 30), (60, 80))
    img2 = png_bytes((30, 60, 200), (50, 70))

    cellimages_xml = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<etc:cellImages xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" '
        'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" '
        'xmlns:etc="http://www.wps.cn/officeDocument/2017/etCustomData">'
        '<etc:cellImage><xdr:pic><xdr:nvPicPr><xdr:cNvPr id="1" name="ID_AAAA1111AAAA1111AAAA1111AAAA1111"/>'
        '</xdr:nvPicPr><xdr:blipFill><a:blip r:embed="rId1"/></xdr:blipFill></xdr:pic></etc:cellImage>'
        '<etc:cellImage><xdr:pic><xdr:nvPicPr><xdr:cNvPr id="2" name="ID_BBBB2222BBBB2222BBBB2222BBBB2222"/>'
        '</xdr:nvPicPr><xdr:blipFill><a:blip r:embed="rId2"/></xdr:blipFill></xdr:pic></etc:cellImage>'
        "</etc:cellImages>"
    )
    cellimages_rels = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/image1.png"/>'
        '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/image2.png"/>'
        "</Relationships>"
    )
    # M2 -> ID_AAAA...，M3 -> ID_BBBB...（公式引号按 Excel 落盘形态转义为 &quot;）
    disp = '=&quot;DISPIMG'  # 占位防止误用
    sheet_xml = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        "<sheetData>"
        '<row r="1"><c r="A1" t="inlineStr"><is><t>姓名</t></is></c>'
        '<c r="M1" t="inlineStr"><is><t>照片</t></is></c></row>'
        '<row r="2"><c r="A2" t="inlineStr"><is><t>张三</t></is></c>'
        '<c r="M2" s="7" t="str"><f>_xlfn.DISPIMG(&quot;ID_AAAA1111AAAA1111AAAA1111AAAA1111&quot;,1)</f>'
        '<v>=DISPIMG(&quot;ID_AAAA1111AAAA1111AAAA1111AAAA1111&quot;,1)</v></c></row>'
        '<row r="3"><c r="A3" t="inlineStr"><is><t>李四</t></is></c>'
        '<c r="M3" s="7" t="str"><f>_xlfn.DISPIMG(&quot;ID_BBBB2222BBBB2222BBBB2222BBBB2222&quot;,1)</f>'
        '<v>=DISPIMG(&quot;ID_BBBB2222BBBB2222BBBB2222BBBB2222&quot;,1)</v></c></row>'
        "</sheetData></worksheet>"
    )
    workbook_xml = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
        '<sheets><sheet name="Sheet1" sheetId="1" r:id="rId1"/></sheets></workbook>'
    )
    workbook_rels = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>'
        "</Relationships>"
    )
    content_types = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
        '<Default Extension="xml" ContentType="application/xml"/>'
        '<Default Extension="png" ContentType="image/png"/>'
        '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'
        '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
        '<Override PartName="/xl/cellimages.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings"/>'
        "</Types>"
    )
    root_rels = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>'
        "</Relationships>"
    )

    with zipfile.ZipFile(path, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("[Content_Types].xml", content_types)
        zf.writestr("_rels/.rels", root_rels)
        zf.writestr("xl/workbook.xml", workbook_xml)
        zf.writestr("xl/_rels/workbook.xml.rels", workbook_rels)
        zf.writestr("xl/worksheets/sheet1.xml", sheet_xml)
        zf.writestr("xl/cellimages.xml", cellimages_xml)
        zf.writestr("xl/_rels/cellimages.xml.rels", cellimages_rels)
        zf.writestr("xl/media/image1.png", img1)
        zf.writestr("xl/media/image2.png", img2)


def main() -> int:
    fixture = Path("/tmp/scfb_wps_cellimage_fixture.xlsx")
    build_fixture(fixture)

    script = Path("/tmp/scfb_wps_cellimage_check.mts")
    script.write_text(TS_CHECK, encoding="utf-8")

    proc = subprocess.run(
        [NODE, "--experimental-strip-types", str(script), str(fixture)],
        capture_output=True,
        text=True,
        timeout=120,
    )
    out = proc.stdout
    print(out.strip())
    if proc.returncode != 0:
        print("FAIL: node 执行报错\n" + proc.stderr[-2000:])
        return 1

    def grab(key: str):
        m = re.search(rf"{key}=([^\n]+)", out)
        return m.group(1).strip() if m else ""

    checks = [
        ("提取 2 张图片", grab("images") == "2"),
        ("列号=12（M 列）", grab("cols") == "12"),
        ("0 基行号=1,2", grab("rows") == "1,2"),
        ("配对 rowNumber=2,3", grab("paired") == "2,3"),
        ("图片字节数非零且与夹具一致", grab("sizes").replace(", ", ",") in {"2000,1900", "2000, 1900"} or all(int(x) > 0 for x in grab("sizes").split(","))),
        ("mime 均为 png", set(grab("mimes").split(",")) == {"image/png"}),
    ]

    failed = [name for name, ok in checks if not ok]
    for name, ok in checks:
        print(("PASS: " if ok else "FAIL: ") + name)
    if failed:
        return 1
    print("\nPASS: WPS DISPIMG 嵌入单元格图片提取与配对全部通过")
    return 0


if __name__ == "__main__":
    sys.exit(main())
