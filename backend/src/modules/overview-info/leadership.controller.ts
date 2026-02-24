import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common'
import { LeadershipService } from './leadership.service'
import { Public } from '../../common/decorators/public.decorator'

@Public()
@Controller('leadership')
export class LeadershipController {
  constructor(private readonly leadershipService: LeadershipService) {}

  @Get()
  getList(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10) {
    return this.leadershipService.getList(page, pageSize)
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.leadershipService.getOne(id)
  }

  @Post()
  create(@Body() data: any) {
    return this.leadershipService.create(data)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.leadershipService.update(id, data)
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.leadershipService.delete(id)
  }
}
