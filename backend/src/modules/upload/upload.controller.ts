import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';
import { UploadService } from './upload.service';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';

@Controller('admin/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @RequirePermissions(
    'Banner',
    'News',
    'Videos',
    'Appointment',
    'PublicInfo',
    'Policy',
    'Leadership',
    'Party',
    'TeamIntro',
    'RescueCases',
    'TeamStyle',
    'Certificates',
    'Personnel',
    'Vehicles',
    'Location',
  )
  @UseInterceptors(FileInterceptor('file', {
    storage: memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
  }))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    this.uploadService.validateImage(file);
    const filename = await this.uploadService.saveOptimizedImage(file);
    return { url: this.uploadService.getFileUrl(filename, 'images') };
  }

  @Post('video')
  @RequirePermissions('Videos')
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
  @RequirePermissions(
    'Appointment',
    'PublicInfo',
    'Policy',
    'Certificates',
    'Personnel',
    'Vehicles',
  )
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
