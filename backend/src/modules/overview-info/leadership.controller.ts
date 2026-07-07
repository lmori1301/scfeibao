import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common'
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
