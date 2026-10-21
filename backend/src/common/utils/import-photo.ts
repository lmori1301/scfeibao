/**
 * 导入 Excel 时把内嵌图片落盘，返回可直接入库的相对 URL（/uploads/images/xxx）。
 *
 * 与 UploadService.saveOptimizedImage 保持同一落盘目录与同一种 webp 规格（quality 90），
 * 这样导入的照片和后台手工上传的照片在体积/清晰度上一致，前端展示逻辑不用区分来源。
 * 这里不注入 UploadService 是为了让 common/utils 保持无 Nest 依赖，三个台账 service 直接调用。
 */
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

const EXT_BY_MIME: Record<string, string> = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'image/bmp': '.bmp',
};

function uploadRoot() {
  return process.env.UPLOAD_PATH || './uploads';
}

function imagesDir() {
  const dir = path.join(uploadRoot(), 'images');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function randomName() {
  return `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
}

/**
 * 保存一张导入图片，返回 URL；无法解码时（例如 Excel 里的 EMF/WMF 矢量图）返回 undefined，
 * 记一条失败原因由调用方决定是否上报，绝不让整行数据因为图片报废。
 */
export async function saveImportedPhoto(
  buffer: Buffer,
  mime?: string,
): Promise<string | undefined> {
  if (!buffer?.length) return undefined;

  const dir = imagesDir();
  const filename = `${randomName()}.webp`;

  try {
    await sharp(buffer, { animated: false })
      .rotate()
      .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 90, effort: 5 })
      .toFile(path.join(dir, filename));
    return `/uploads/images/${filename}`;
  } catch {
    // 矢量图 / 非常规编码：原样落盘，至少保证图片不丢
    const ext = EXT_BY_MIME[mime || ''] || '.bin';
    const fallbackName = `${randomName()}${ext}`;
    try {
      fs.writeFileSync(path.join(dir, fallbackName), buffer);
      return `/uploads/images/${fallbackName}`;
    } catch {
      return undefined;
    }
  }
}
