import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  private uploadPath: string;

  constructor(private configService: ConfigService) {
    this.uploadPath = this.configService.get('UPLOAD_PATH') || './uploads';
    this.ensureUploadDir();
  }

  private ensureUploadDir() {
    const dirs = ['images', 'videos', 'files'];
    dirs.forEach(dir => {
      const fullPath = path.join(this.uploadPath, dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
    });
  }

  validateImage(file: Express.Multer.File) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('不支持的图片格式');
    }
    if (file.size > maxSize) {
      throw new BadRequestException('图片大小超出限制（最大5MB）');
    }
  }

  validateVideo(file: Express.Multer.File) {
    const allowedTypes = ['video/mp4', 'video/avi', 'video/mov'];
    const maxSize = 1024 * 1024 * 1024; // 1GB

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('不支持的视频格式');
    }
    if (file.size > maxSize) {
      throw new BadRequestException('视频大小超出限制（最大1GB）');
    }
  }

  validateFile(file: Express.Multer.File) {
    // 禁止上传可执行文件，防止安全风险
    const forbiddenTypes = ['application/x-msdownload', 'application/x-executable', 'application/x-sh'];
    const maxSize = 50 * 1024 * 1024; // 50MB

    if (forbiddenTypes.includes(file.mimetype)) {
      throw new BadRequestException('不允许上传可执行文件');
    }
    if (file.size > maxSize) {
      throw new BadRequestException('文件大小超出限制（最大50MB）');
    }
  }

  getFileUrl(filename: string, type: string) {
    return `/uploads/${type}/${filename}`;
  }
}
