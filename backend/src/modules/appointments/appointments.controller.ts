import { Controller, Get, Post, Patch, Delete, Body, Param, Query, Res, StreamableFile } from '@nestjs/common'
import { Response } from 'express'
import { createReadStream } from 'fs'
import { join } from 'path'
import { AppointmentsService } from './appointments.service'
import { Public } from '../../common/decorators/public.decorator'

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Public()
  @Get()
  getList(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('title') title?: string,
    @Query('department') department?: string
  ) {
    return this.appointmentsService.getList(page, pageSize, { title, department })
  }

  @Public()
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.appointmentsService.getOne(id)
  }

  @Public()
  @Post()
  create(@Body() data: any) {
    return this.appointmentsService.create(data)
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.appointmentsService.update(id, data)
  }

  @Public()
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.appointmentsService.delete(id)
  }

  @Public()
  @Get(':id/download')
  async download(@Param('id') id: number, @Res({ passthrough: true }) res: Response) {
    const appointment = await this.appointmentsService.getOne(id)
    if (!appointment || !appointment.attachment) {
      throw new Error('文件不存在')
    }

    // 从 URL 中提取文件路径
    const urlPath = appointment.attachment.replace(/^https?:\/\/[^\/]+/, '')
    const filePath = join(process.cwd(), urlPath)

    // 使用原始文件名，如果没有则从 URL 提取
    const fileName = appointment.attachmentName || urlPath.split('/').pop()

    // 设置 Content-Disposition 响应头
    const encodedFileName = encodeURIComponent(fileName)
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodedFileName}`
    })

    const file = createReadStream(filePath)
    return new StreamableFile(file)
  }
}
