#!/usr/bin/env python3
"""
台账「Excel 导入照片」回归验证（离线，不依赖 Nest/MySQL）

验证对象：backend/src/common/utils/xlsx-images.ts
  1. 能从真实 .xlsx（openpyxl 生成、图片锚定在「照片」列）读出内嵌图片，且是原始 PNG；
  2. 锚点 (row,col) 换算成正确的数据行号（与 parseExcelRows 的 rowNumber 对齐）；
  3. 照片顶边压到上一行（整体上移一行）时，仍能按顺序配对到正确的数据行；
  4. 照片列没有匹配图片时，退化为「按行取任意列第一张」。

为什么用 node --experimental-strip-types 直接跑 .ts：
  本机 backend/node_modules 不可用（详见 2026-10-21 记忆日志：broker 拦截 .bin rename），
  但 Node 22 能剥离类型直接执行这些函数，等于在验证**真实源文件**而不是复制品。

用法：python3 tests/xlsx_photo_import_verify.py
"""
import json
import os
import shutil
import subprocess
import sys
import tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NODE = os.environ.get(
    "NODE_BIN", "/Users/yusenn/.workbuddy/binaries/node/versions/22.22.2-6/bin/node"
)
PY = os.environ.get(
    "PY_BIN", "/Users/yusenn/.workbuddy/binaries/python/envs/default/bin/python"
)
SRC = os.path.join(ROOT, "backend/src/common/utils/xlsx-images.ts")

VERTICAL_OFFSETS = {"aligned": 2, "shifted_up": 1}


def build_fixture(tmp: str, first_row: int) -> str:
    """4 行数据 + 4 张锚定在 K 列的照片；first_row 控制首张照片落在第几行（1 基）"""
    code = r'''
import os
from PIL import Image
from openpyxl import Workbook
from openpyxl.drawing.image import Image as XLImage

tmp = os.environ["FIXTURE_DIR"]
first_row = int(os.environ["FIRST_ROW"])
tag = os.environ["TAG"]
os.makedirs(os.path.join(tmp, "imgs"), exist_ok=True)
colors = [("red", (220, 60, 60)), ("green", (60, 180, 90)), ("blue", (60, 90, 220)), ("gray", (150, 150, 150))]
for name, color in colors:
    Image.new("RGB", (120, 150), color).save(os.path.join(tmp, "imgs", f"{name}.png"))

wb = Workbook(); ws = wb.active
ws.append(["人员编号","所属部门","工作单位","职务","联系电话","身份证号","在职状态","入职日期","出勤次数","培训时长","照片"])
rows = [
 ["FB5109999","四川飞豹救援","搜救犬大队","大队长","13508073316","513822198303103199","在职","2023-07-18",128,228],
 ["FB510052","四川飞豹救援","搜救犬大队","副大队长","1318657128","51112119790410636X","在职","2023-09-28",115,165],
 ["FB510059","四川飞豹救援","搜救犬大队","指导员","13688252255","511121198204228459","在职","2023-10-15",70,135],
 ["FB510998","四川飞豹救援","搜救犬大队","副大队长","18728387778","513822198704203246","在职","2023-07-18",95,125],
]
for r in rows: ws.append(r)
for i, (name, _) in enumerate(colors):
    img = XLImage(os.path.join(tmp, "imgs", f"{name}.png"))
    img.width, img.height = 60, 75
    ws.add_image(img, f"K{first_row + i}")
path = os.path.join(tmp, f"personnel_{tag}.xlsx")
wb.save(path)
'''
    subprocess.run(
        [PY, "-c", code],
        check=True,
        env={
            **os.environ,
            "FIXTURE_DIR": tmp,
            "FIRST_ROW": str(first_row),
            "TAG": "aligned" if first_row == 2 else "shifted_up",
        },
    )
    return os.path.join(tmp, "personnel_%s.xlsx" % ("aligned" if first_row == 2 else "shifted_up"))


def main() -> int:
    if not os.path.exists(SRC):
        print(f"FAIL: 源文件不存在 {SRC}")
        return 1

    tmp = tempfile.mkdtemp(prefix="xlsx-photo-")
    failures = []
    try:
        aligned = build_fixture(tmp, VERTICAL_OFFSETS["aligned"])
        shifted = build_fixture(tmp, VERTICAL_OFFSETS["shifted_up"])
        print(f"[fixture] aligned={os.path.getsize(aligned)}B shifted_up={os.path.getsize(shifted)}B")

        shutil.copy(SRC, os.path.join(tmp, "xlsx-images.ts"))
        with open(os.path.join(tmp, "package.json"), "w") as f:
            json.dump({"type": "module"}, f)

        # 数据行 = 表头(1) + 4 行 => rowNumber 2..5
        checker = r'''
import fs from 'node:fs';
import { extractXlsxImages, pickRowImages } from './xlsx-images.ts';

const validRows = [2, 3, 4, 5];
const report = (path) => {
  const images = extractXlsxImages(fs.readFileSync(path));
  return {
    count: images.length,
    anchors: images.map(i => ({ row: i.row, col: i.col, mime: i.mime })),
    png: images.every(i => i.buffer.subarray(0, 4).toString('hex') === '89504e47'),
    strictKeys: [...pickRowImages(images, 10, validRows).keys()].sort((a, b) => a - b),
    looseKeys: [...pickRowImages(images, 3, validRows).keys()].sort((a, b) => a - b),
  };
};

console.log(JSON.stringify({
  aligned: report(process.env.ALIGNED),
  shifted: report(process.env.SHIFTED),
}));
'''
        with open(os.path.join(tmp, "check.mjs"), "w", encoding="utf-8") as f:
            f.write(checker)

        proc = subprocess.run(
            [NODE, "--experimental-strip-types", "check.mjs"],
            cwd=tmp,
            capture_output=True,
            text=True,
            env={**os.environ, "ALIGNED": aligned, "SHIFTED": shifted},
        )
        if proc.returncode != 0:
            print("FAIL: node 执行失败")
            print(proc.stdout[-2000:])
            print(proc.stderr[-2000:])
            return 1

        data = json.loads(proc.stdout.strip().splitlines()[-1])
        for tag in ("aligned", "shifted"):
            item = data[tag]
            print(
                f"[{tag}] images={item['count']} anchors={[a['row'] for a in item['anchors']]} "
                f"col={sorted({a['col'] for a in item['anchors']})} strict={item['strictKeys']} loose={item['looseKeys']}"
            )

        # 1) 数量与列
        for tag in ("aligned", "shifted"):
            if data[tag]["count"] != 4:
                failures.append(f"[{tag}] 应提取 4 张图片，实际 {data[tag]['count']}")
            if {a["col"] for a in data[tag]["anchors"]} != {10}:
                failures.append(f"[{tag}] 图片列应为 10（K 列）")
            if not data[tag]["png"]:
                failures.append(f"[{tag}] 提取出的图片不是原始 PNG（魔数不符）")
        # 2) 锚点位置（证明夹具与解析都对）
        if [a["row"] for a in data["aligned"]["anchors"]] != [1, 2, 3, 4]:
            failures.append(f"[aligned] 锚点行应为 1..4，实际 {[a['row'] for a in data['aligned']['anchors']]}")
        if [a["row"] for a in data["shifted"]["anchors"]] != [0, 1, 2, 3]:
            failures.append(f"[shifted] 锚点行应为 0..3，实际 {[a['row'] for a in data['shifted']['anchors']]}")
        # 3) 行配对
        for tag in ("aligned", "shifted"):
            if data[tag]["strictKeys"] != [2, 3, 4, 5]:
                failures.append(f"[{tag}] 照片列映射的数据行应为 [2,3,4,5]，实际 {data[tag]['strictKeys']}")
            if data[tag]["looseKeys"] != [2, 3, 4, 5]:
                failures.append(f"[{tag}] 列不匹配时应退化为按行取图 [2,3,4,5]，实际 {data[tag]['looseKeys']}")
    finally:
        shutil.rmtree(tmp, ignore_errors=True)

    if failures:
        print("\nFAIL:")
        for item in failures:
            print("  -", item)
        return 1

    print("\nPASS: 10 项断言全部通过（正位/整体上移一行/列不匹配兜底）")
    return 0


if __name__ == "__main__":
    sys.exit(main())
