import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common'
import { VideosService } from './videos.service'
import { Public } from '../../common/decorators/public.decorator'

@Public()
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  getList(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10) {
    return this.videosService.getList(page, pageSize)
  }

  @Get('top/list')
  getTopList() {
    return this.videosService.getTopList()
  }

  @Patch(':id/toggle-top')
  toggleTop(@Param('id') id: number) {
    return this.videosService.toggleTop(id)
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.videosService.getOne(id)
  }

  @Post()
  create(@Body() data: any) {
    return this.videosService.create(data)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.videosService.update(id, data)
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.videosService.delete(id)
  }
}
