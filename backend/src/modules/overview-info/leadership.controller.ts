import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { memoryStorage } from 'multer'
import { LeadershipService } from './leadership.service'
import { Public } from '../../common/decorators/public.decorator'
import { RequirePermissions } from '../../common/decorators/permissions.decorator'

@Controller('leadership')
export class LeadershipController {
  constructor(private readonly leadershipService: LeadershipService) {}

  @Get()
  @Public()
  getList(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10) {
    return this.leadershipService.getList(page, pageSize)
  }

  @Get(':id')
  @Public()
  getOne(@Param('id') id: number) {
    return this.leadershipService.getOne(id)
  }

  @Post()
  @RequirePermissions('Leadership')
  create(@Body() data: any) {
    return this.leadershipService.create(data)
  }

  @Post('import')
  @RequirePermissions('Leadership')
  @UseInterceptors(FileInterceptor('file', {
    storage: memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
  }))
  import(@UploadedFile() file?: Express.Multer.File) {
    if (!file?.buffer) {
      throw new BadRequestException('请上传导入文件')
    }
    return this.leadershipService.importFromExcel(file.buffer)
  }

  @Patch(':id')
  @RequirePermissions('Leadership')
  update(@Param('id') id: number, @Body() data: any) {
    return this.leadershipService.update(id, data)
  }

  @Delete(':id')
  @RequirePermissions('Leadership')
  delete(@Param('id') id: number) {
    return this.leadershipService.delete(id)
  }
}
