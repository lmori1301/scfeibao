import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadService } from './upload.service';
import { Public } from '../../common/decorators/public.decorator';

@Controller('admin/upload')
@Public()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/images',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + extname(file.originalname));
      },
    }),
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
  }))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    this.uploadService.validateImage(file);
    return { url: this.uploadService.getFileUrl(file.filename, 'images') };
  }

  @Post('video')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/videos',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + extname(file.originalname));
      },
    }),
    limits: {
      fileSize: 1024 * 1024 * 1024, // 1GB
    },
  }))
  uploadVideo(@UploadedFile() file: Express.Multer.File) {
    this.uploadService.validateVideo(file);
    return { url: this.uploadService.getFileUrl(file.filename, 'videos') };
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/files',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + extname(file.originalname));
      },
    }),
    limits: {
      fileSize: 100 * 1024 * 1024, // 100MB
    },
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    this.uploadService.validateFile(file);

    // 处理中文文件名编码问题
    // multer 可能会将中文文件名编码为 Latin1，需要转换为 UTF-8
    let originalName = file.originalname;
    try {
      // 尝试将 Latin1 编码转换为 UTF-8
      originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
    } catch (error) {
      // 如果转换失败，使用原始文件名
      originalName = file.originalname;
    }

    return {
      url: this.uploadService.getFileUrl(file.filename, 'files'),
      originalName: originalName
    };
  }
}
