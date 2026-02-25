import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common'
import { FriendLinksService } from './friend-links.service'
import { Public } from '../../common/decorators/public.decorator'

@Public()
@Controller('friend-links')
export class FriendLinksController {
  constructor(private readonly friendLinksService: FriendLinksService) {}

  @Get()
  getList(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    return this.friendLinksService.getList(page, pageSize)
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.friendLinksService.getOne(id)
  }

  @Post()
  create(@Body() data: any) {
    return this.friendLinksService.create(data)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.friendLinksService.update(id, data)
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.friendLinksService.delete(id)
  }
}
