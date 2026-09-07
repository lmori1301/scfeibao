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
  errors: ImportErrorItem[];
};

export type ExcelColumn<T extends Record<string, any>> = {
  field: keyof T;
  headers: string[];
  required?: boolean;
  transform?: (value: string) => any;
};

export async function parseExcelRows<T extends Record<string, any>>(
  buffer: Buffer,
  columns: ExcelColumn<T>[],
): Promise<{ rows: Array<{ rowNumber: number; data: Partial<T> }>; errors: ImportErrorItem[] }> {
  let matrix: SheetData;

  try {
    matrix = await readSheet(buffer, 1);
  } catch {
    return { rows: [], errors: [{ row: 0, message: '导入文件解析失败，请上传 .xlsx 格式文件' }] };
  }

  if (matrix.length === 0) {
    return { rows: [], errors: [{ row: 0, message: '导入文件没有工作表' }] };
  }

  if (matrix.length < 2) {
    return { rows: [], errors: [{ row: 0, message: '导入文件至少需要表头和一行数据' }] };
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

  return { rows, errors };
}

export function toOptionalString(value: unknown) {
  const str = String(value ?? '').trim();
  return str || undefined;
}

export function toOptionalNumber(value: unknown) {
  const str = String(value ?? '').trim();
  if (!str) return undefined;
  const num = Number(str);
  return Number.isFinite(num) ? num : undefined;
}

export function toOptionalDate(value: unknown) {
  const str = String(value ?? '').trim();
  if (!str) return undefined;
  const normalized = str.replace(/[./年]/g, '-').replace(/月/g, '-').replace(/日/g, '');
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return undefined;
  return date;
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
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? '').trim();
}
