import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common'
import { TeamShowcaseService } from './team-showcase.service'
import { Public } from '../../common/decorators/public.decorator'

@Public()
@Controller('team-showcase')
export class TeamShowcaseController {
  constructor(private readonly teamShowcaseService: TeamShowcaseService) {}

  @Get()
  getList(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10) {
    return this.teamShowcaseService.getList(page, pageSize)
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.teamShowcaseService.getOne(id)
  }

  @Post()
  create(@Body() data: any) {
    return this.teamShowcaseService.create(data)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.teamShowcaseService.update(id, data)
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.teamShowcaseService.delete(id)
  }
}
