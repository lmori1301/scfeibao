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
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    this.uploadService.validateFile(file);
    return { url: this.uploadService.getFileUrl(file.filename, 'files') };
  }
}
