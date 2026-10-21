/**
 * 从 .xlsx 中提取「浮动图片」并换算到所在行/列。
 *
 * 为什么不用 read-excel-file / exceljs：
 * - read-excel-file 只读单元格文本，完全不解析图片；
 * - exceljs 能读图片，但要新增依赖，而生产镜像用 `npm ci`，
 *   新增依赖必须同步 package-lock.json（本地装包受阻的风险点），
 *   为了三张台账的导入照片引入一个几十 MB 的库不划算。
 *
 * .xlsx 本质是 ZIP：
 *   xl/workbook.xml                 -> 第一张工作表的关系 id
 *   xl/_rels/workbook.xml.rels      -> 工作表路径
 *   xl/worksheets/sheetN.xml        -> <drawing r:id="..."/>
 *   xl/worksheets/_rels/sheetN.xml.rels -> drawing 路径
 *   xl/drawings/drawingN.xml        -> twoCellAnchor/oneCellAnchor 的 from(row,col) + a:blip r:embed
 *   xl/drawings/_rels/drawingN.xml.rels -> rId -> ../media/imageN.png
 *   xl/media/*                      -> 图片二进制
 * 因此用 Node 内置 zlib 解 ZIP（deflate raw）即可，零依赖。
 */
import * as zlib from 'zlib';
import * as path from 'path';

export type XlsxImage = {
  /** 0 基行号（工作表坐标，含表头行） */
  row: number;
  /** 0 基列号 */
  col: number;
  buffer: Buffer;
  mime: string;
  name: string;
};

type ZipEntry = {
  name: string;
  method: number;
  compressedSize: number;
  uncompressedSize: number;
  localHeaderOffset: number;
};

const SIG_EOCD = 0x06054b50;
const SIG_CENTRAL = 0x02014b50;
const SIG_LOCAL = 0x04034b50;

/** 读取 ZIP 中央目录：文件名 -> 压缩方式/大小/本地头偏移 */
function readZipEntries(buf: Buffer): ZipEntry[] {
  if (buf.length < 22) throw new Error('文件内容为空或不是有效的 xlsx');

  // EOCD 位于文件尾部，注释最多 64KB，向前扫描
  let eocd = -1;
  const scanFrom = Math.max(0, buf.length - 22 - 0xffff);
  for (let i = buf.length - 22; i >= scanFrom; i -= 1) {
    if (buf.readUInt32LE(i) === SIG_EOCD) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error('不是有效的 xlsx（缺少 ZIP 目录）');

  const total = buf.readUInt16LE(eocd + 10);
  let offset = buf.readUInt32LE(eocd + 16);
  const entries: ZipEntry[] = [];

  for (let i = 0; i < total; i += 1) {
    if (offset + 46 > buf.length || buf.readUInt32LE(offset) !== SIG_CENTRAL) break;

    const method = buf.readUInt16LE(offset + 10);
    const compressedSize = buf.readUInt32LE(offset + 20);
    const uncompressedSize = buf.readUInt32LE(offset + 24);
    const nameLen = buf.readUInt16LE(offset + 28);
    const extraLen = buf.readUInt16LE(offset + 30);
    const commentLen = buf.readUInt16LE(offset + 32);
    const localHeaderOffset = buf.readUInt32LE(offset + 42);
    const name = buf.toString('utf8', offset + 46, offset + 46 + nameLen);

    entries.push({ name, method, compressedSize, uncompressedSize, localHeaderOffset });
    offset += 46 + nameLen + extraLen + commentLen;
  }

  return entries;
}

/** 按中央目录解压单个条目（method 0=store，8=deflate） */
function readEntry(buf: Buffer, entry: ZipEntry): Buffer {
  const off = entry.localHeaderOffset;
  if (off + 30 > buf.length || buf.readUInt32LE(off) !== SIG_LOCAL) {
    throw new Error(`xlsx 内部结构损坏：${entry.name}`);
  }
  const nameLen = buf.readUInt16LE(off + 26);
  const extraLen = buf.readUInt16LE(off + 28);
  const start = off + 30 + nameLen + extraLen;
  const raw = buf.subarray(start, start + entry.compressedSize);

  if (entry.method === 0) return Buffer.from(raw);
  if (entry.method === 8) return zlib.inflateRawSync(raw);
  throw new Error(`不支持的压缩方式 ${entry.method}`);
}

function normalizePath(p: string) {
  return path.posix.normalize(p.replace(/\\/g, '/')).replace(/^\/+/, '');
}

/** drawing/rels 里的 Target 是相对路径，需要按所在目录解析 */
function resolveTarget(baseFile: string, target: string) {
  if (target.startsWith('/')) return normalizePath(target);
  return normalizePath(path.posix.join(path.posix.dirname(baseFile), target));
}

/** 解析 rels：rId -> 绝对包内路径 */
function parseRelationships(xml: string, relsPath: string): Map<string, string> {
  const map = new Map<string, string>();
  const re = /<Relationship\b([^>]*)\/?>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml))) {
    const attrs = m[1];
    const id = /Id="([^"]+)"/.exec(attrs)?.[1];
    const target = /Target="([^"]+)"/.exec(attrs)?.[1];
    const type = /Type="([^"]+)"/.exec(attrs)?.[1] || '';
    if (!id || !target) continue;
    // 只关心图片与 drawing，跳过外部链接（TargetMode="External"）
    if (/TargetMode="External"/.test(attrs)) continue;
    if (!/image|drawing|worksheet/i.test(type) && !/\.(png|jpe?g|gif|webp|bmp|emf|wmf)$/i.test(target)) {
      continue;
    }
    map.set(id, resolveTarget(relsPath.replace(/\/_rels\/([^/]+)\.rels$/, '/$1'), target));
  }
  return map;
}

function firstMatch(xml: string, re: RegExp): string | undefined {
  return re.exec(xml)?.[1];
}

const MIME_BY_EXT: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.bmp': 'image/bmp',
  '.emf': 'image/emf',
  '.wmf': 'image/wmf',
};

/**
 * 提取工作表内所有锚定（浮动）图片，返回其 0 基 row/col。
 * 解析失败一律返回空数组——图片只是增强项，不能让整份台账导入失败。
 */
export function extractXlsxImages(buffer: Buffer): XlsxImage[] {
  try {
    const entries = readZipEntries(buffer);
    const entryByName = new Map(entries.map((e) => [e.name, e]));
    const readText = (file: string) => {
      const entry = entryByName.get(file);
      if (!entry) return null;
      try {
        return readEntry(buffer, entry).toString('utf8');
      } catch {
        return null;
      }
    };

    const workbookXml = readText('xl/workbook.xml');
    if (!workbookXml) return [];

    // 第一张工作表（read-excel-file 读的也是第 1 个 sheet）
    const firstSheetTag = /<(?:\w+:)?sheet\b([^>]*)\/?>/.exec(workbookXml)?.[1] || '';
    const sheetRid = /r:id="([^"]+)"/.exec(firstSheetTag)?.[1];
    const workbookRels = readText('xl/_rels/workbook.xml.rels');
    let sheetPath = 'xl/worksheets/sheet1.xml';
    if (sheetRid && workbookRels) {
      const rels = parseRelationships(workbookRels, 'xl/_rels/workbook.xml.rels');
      const resolved = rels.get(sheetRid);
      if (resolved && entryByName.has(resolved)) sheetPath = resolved;
    }
    if (!entryByName.has(sheetPath)) return [];

    const sheetXml = readText(sheetPath);
    if (!sheetXml) return [];

    const drawingRid = firstMatch(
      sheetXml,
      /<(?:\w+:)?drawing\b[^>]*r:id="([^"]+)"/,
    );
    if (!drawingRid) return [];

    const sheetRelsPath = `${path.posix.dirname(sheetPath)}/_rels/${path.posix.basename(sheetPath)}.rels`;
    const sheetRelsXml = readText(sheetRelsPath);
    if (!sheetRelsXml) return [];
    const sheetRels = parseRelationships(sheetRelsXml, sheetRelsPath);
    const drawingPath = sheetRels.get(drawingRid);
    if (!drawingPath || !entryByName.has(drawingPath)) return [];

    const drawingXml = readText(drawingPath);
    if (!drawingXml) return [];

    const drawingRelsPath = `${path.posix.dirname(drawingPath)}/_rels/${path.posix.basename(drawingPath)}.rels`;
    const drawingRelsXml = readText(drawingRelsPath) || '';
    const drawingRels = parseRelationships(drawingRelsXml, drawingRelsPath);

    const images: XlsxImage[] = [];
    // twoCellAnchor / oneCellAnchor 都带 <xdr:from><xdr:col/><xdr:row/>；
    // absoluteAnchor 没有行列，无法归属到数据行，直接跳过。
    const anchorRe = /<(?:\w+:)?(twoCellAnchor|oneCellAnchor)\b[^>]*>([\s\S]*?)<\/(?:\w+:)?\1>/g;
    let anchor: RegExpExecArray | null;
    while ((anchor = anchorRe.exec(drawingXml))) {
      const body = anchor[2];
      const fromBlock = /<(?:\w+:)?from\b[^>]*>([\s\S]*?)<\/(?:\w+:)?from>/.exec(body)?.[1];
      if (!fromBlock) continue;
      const row = Number(/<(?:\w+:)?row>(\d+)<\/(?:\w+:)?row>/.exec(fromBlock)?.[1]);
      const col = Number(/<(?:\w+:)?col>(\d+)<\/(?:\w+:)?col>/.exec(fromBlock)?.[1]);
      if (!Number.isFinite(row) || !Number.isFinite(col)) continue;

      const embed = /<(?:\w+:)?blip\b[^>]*r:embed="([^"]+)"/.exec(body)?.[1];
      if (!embed) continue;
      const mediaPath = drawingRels.get(embed);
      if (!mediaPath) continue;
      const mediaEntry = entryByName.get(mediaPath);
      if (!mediaEntry) continue;

      let data: Buffer;
      try {
        data = readEntry(buffer, mediaEntry);
      } catch {
        continue;
      }
      if (!data.length) continue;

      const ext = path.posix.extname(mediaPath).toLowerCase();
      images.push({
        row,
        col,
        buffer: data,
        mime: MIME_BY_EXT[ext] || 'application/octet-stream',
        name: path.posix.basename(mediaPath),
      });
    }

    return images;
  } catch {
    return [];
  }
}

/**
 * 把图片按「工作表行号 -> 数据行号（1 基，与 parseExcelRows 的 rowNumber 对齐）」归位。
 * - photoColIndex >= 0 时优先只收该列的图片；
 * - 该列一张都没匹配到（合并单元格/锚点偏移）时退化为「任意列，每行取第一张」；
 * - 传入 validRowNumbers 后按「锚点顺序 → 数据行顺序」贪心配对：
 *   照片比行高大时 Excel 会把图片顶边锚到上一行，甚至整体上移一行，
 *   直接 row+1 会错配，贪心配对（优先向下的空行，其次向上）能同时兼容两种情况。
 */
export function pickRowImages(
  images: XlsxImage[],
  photoColIndex: number,
  validRowNumbers?: Iterable<number>,
): Map<number, XlsxImage> {
  const validRows = validRowNumbers
    ? [...validRowNumbers].sort((a, b) => a - b)
    : null;

  const assign = (list: XlsxImage[]): Map<number, XlsxImage> => {
    const result = new Map<number, XlsxImage>();
    const used = new Set<number>();
    const ordered = [...list].sort((a, b) => a.row - b.row || a.col - b.col);

    for (const image of ordered) {
      const desired = image.row + 1; // 0 基行号 0（表头）-> rowNumber 1
      let target = desired;

      if (validRows) {
        const forward = validRows.find((r) => r >= desired && !used.has(r));
        if (forward !== undefined) {
          target = forward;
        } else {
          const backward = [...validRows].reverse().find((r) => r < desired && !used.has(r));
          target = backward !== undefined ? backward : desired;
        }
      }

      if (result.has(target)) continue;
      result.set(target, image);
      used.add(target);
    }

    return result;
  };

  const columnImages =
    photoColIndex >= 0 ? images.filter((image) => image.col === photoColIndex) : [];
  const strict = assign(columnImages);

  return strict.size > 0 ? strict : assign(images);
}
