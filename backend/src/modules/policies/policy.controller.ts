import { Controller, Get, Post, Patch, Delete, Body, Param, Query, Res, StreamableFile } from '@nestjs/common'
import { Response } from 'express'
import { createReadStream } from 'fs'
import { join } from 'path'
import { PolicyService } from './policy.service'
import { Public } from '../../common/decorators/public.decorator'

@Public()
@Controller('policies')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Get()
  getList(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('category') category?: string,
    @Query('title') title?: string
  ) {
    const filters = { category, title }
    return this.policyService.getList(page, pageSize, filters)
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.policyService.getOne(id)
  }

  @Post()
  create(@Body() data: any) {
    return this.policyService.create(data)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.policyService.update(id, data)
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.policyService.delete(id)
  }

  @Get(':id/download')
  async download(@Param('id') id: number, @Res({ passthrough: true }) res: Response) {
    const policy = await this.policyService.getOne(id)
    if (!policy || !policy.attachmentUrl) {
      throw new Error('文件不存在')
    }

    // 从 URL 中提取文件路径
    // attachmentUrl 格式: http://localhost:3000/uploads/files/xxx.docx
    const urlPath = policy.attachmentUrl.replace(/^https?:\/\/[^\/]+/, '')
    const filePath = join(process.cwd(), urlPath)

    // 使用原始文件名，如果没有则从 URL 提取
    const fileName = policy.attachmentName || urlPath.split('/').pop()

    // 设置 Content-Disposition 响应头，使用 RFC 5987 标准
    // 严格使用 filename*=UTF-8'' 格式
    const encodedFileName = encodeURIComponent(fileName)
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodedFileName}`
    })

    const file = createReadStream(filePath)
    return new StreamableFile(file)
  }
}
