import { readSheet } from 'read-excel-file/node';
import type { SheetData } from 'read-excel-file/types/SheetData';

export type ImportErrorItem = {
  row: number;
  message: string;
};

export type ImportResult = {
  total: number;
  created: number;
  updated: number;
  failed: number;
  /** 成功落盘的 Excel 内嵌照片数量（未支持图片的导入不返回该字段） */
  photos?: number;
  errors: ImportErrorItem[];
};

export type ExcelColumn<T extends Record<string, any>> = {
  field: keyof T;
  headers: string[];
  required?: boolean;
  transform?: (value: string) => any;
};

export type ParsedExcelRows<T> = {
  rows: Array<{ rowNumber: number; data: Partial<T> }>;
  errors: ImportErrorItem[];
  /** 归一化后的表头（可为图片列定位用） */
  headers: string[];
};

export async function parseExcelRows<T extends Record<string, any>>(
  buffer: Buffer,
  columns: ExcelColumn<T>[],
): Promise<ParsedExcelRows<T>> {
  let matrix: SheetData;

  try {
    matrix = await readSheet(buffer, 1);
  } catch {
    return { rows: [], errors: [{ row: 0, message: '导入文件解析失败，请上传 .xlsx 格式文件' }], headers: [] };
  }

  if (matrix.length === 0) {
    return { rows: [], errors: [{ row: 0, message: '导入文件没有工作表' }], headers: [] };
  }

  if (matrix.length < 2) {
    return { rows: [], errors: [{ row: 0, message: '导入文件至少需要表头和一行数据' }], headers: [] };
  }

  const headers = matrix[0].map((value) => normalizeHeader(value));
  const columnIndexes = columns.map((column) => ({
    column,
    index: column.headers.map(normalizeHeader).find((header) => headers.includes(header)),
  }));

  const rows: Array<{ rowNumber: number; data: Partial<T> }> = [];
  const errors: ImportErrorItem[] = [];

  matrix.slice(1).forEach((row, index) => {
    const rowNumber = index + 2;
    if (row.every((cell) => toCellString(cell) === '')) return;

    const data: Partial<T> = {};
    const missing: string[] = [];

    columnIndexes.forEach(({ column, index: header }) => {
      const headerIndex = header ? headers.indexOf(header) : -1;
      const raw = headerIndex >= 0 ? toCellString(row[headerIndex]) : '';

      if (column.required && !raw) {
        missing.push(column.headers[0]);
      }
      if (!raw) return;

      data[column.field] = column.transform ? column.transform(raw) : raw;
    });

    if (missing.length > 0) {
      errors.push({ row: rowNumber, message: `缺少必填字段：${missing.join('、')}` });
      return;
    }

    rows.push({ rowNumber, data });
  });

  return { rows, errors, headers };
}

/**
 * 在归一化表头里查找第一个命中的列号（0 基）；找不到返回 -1。
 * 用于把 Excel 内嵌图片定位到「照片」列。
 */
export function headerColumnIndex(headers: string[], names: string[]): number {
  const targets = names.map(normalizeHeader);
  for (let i = 0; i < headers.length; i += 1) {
    if (targets.includes(normalizeHeader(headers[i]))) return i;
  }
  return -1;
}

export function toOptionalString(value: unknown) {
  const str = String(value ?? '').trim();
  return str || undefined;
}

/**
 * 照片列文本：WPS「嵌入单元格」图片的单元格是公式
 * `=DISPIMG("ID_xxx",1)`（t="str"），read-excel-file 会把它当字符串读出来，
 * 直接当 URL 入库会导致前端 <img> 加载失败。真实照片走内嵌图片提取（xlsx-images），
 * 公式文本一律不落 photoUrl。
 */
export function toOptionalPhotoText(value: unknown) {
  const str = toOptionalString(value);
  if (!str) return undefined;
  if (/DISPIMG\s*\(/i.test(str)) return undefined;
  return str;
}

export function toOptionalNumber(value: unknown) {
  const str = String(value ?? '').trim();
  if (!str) return undefined;
  const num = Number(str);
  return Number.isFinite(num) ? num : undefined;
}

/**
 * 解析为「YYYY-MM-DD」字符串（不是 Date 对象）。
 * entity 的日期列都是 date 类型，直接入库字符串可以彻底规避
 * `new Date('2023-07-18')` 按 UTC 零点解析 + 连接 timezone=+08:00 造成的「少一天」。
 */
export function toOptionalDate(value: unknown) {
  const str = String(value ?? '').trim();
  if (!str) return undefined;
  const normalized = str.replace(/[./年]/g, '-').replace(/月/g, '-').replace(/日/g, '');
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return undefined;
  return formatLocalDate(date);
}

/** 用本地字段拼 YYYY-MM-DD：Excel 日期单元格在 +08:00 下取到的就是当天 */
export function formatLocalDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function toStatusNumber(value: unknown, activeLabels: string[]) {
  const str = String(value ?? '').trim();
  if (!str) return undefined;
  return activeLabels.includes(str) || str === '1' ? 1 : 0;
}

export function emptyImportResult(errors: ImportErrorItem[] = []): ImportResult {
  return { total: 0, created: 0, updated: 0, failed: errors.length, errors };
}

function normalizeHeader(value: unknown) {
  return String(value ?? '')
    .trim()
    .replace(/\s+/g, '')
    .replace(/[：:]/g, '')
    .toLowerCase();
}

function toCellString(value: unknown) {
  // 用本地字段而不是 toISOString：UTC+8 下 UTC 零点会被截成前一天
  if (value instanceof Date) return formatLocalDate(value);
  return String(value ?? '').trim();
}
