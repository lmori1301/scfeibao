import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common'
import { VideosService } from './videos.service'
import { Public } from '../../common/decorators/public.decorator'
import { RequirePermissions } from '../../common/decorators/permissions.decorator'

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  @Public()
  getList(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10) {
    return this.videosService.getList(page, pageSize)
  }

  @Get('top/list')
  @Public()
  getTopList() {
    return this.videosService.getTopList()
  }

  @Patch(':id/toggle-top')
  @RequirePermissions('Videos')
  toggleTop(@Param('id') id: number) {
    return this.videosService.toggleTop(id)
  }

  @Get(':id')
  @Public()
  getOne(@Param('id') id: number) {
    return this.videosService.getOne(id)
  }

  @Post()
  @RequirePermissions('Videos')
  create(@Body() data: any) {
    return this.videosService.create(data)
  }

  @Patch(':id')
  @RequirePermissions('Videos')
  update(@Param('id') id: number, @Body() data: any) {
    return this.videosService.update(id, data)
  }

  @Delete(':id')
  @RequirePermissions('Videos')
  delete(@Param('id') id: number) {
    return this.videosService.delete(id)
  }
}
