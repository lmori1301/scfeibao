import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common'
import { TeamIntroService } from './team-intro.service'
import { Public } from '../../common/decorators/public.decorator'

@Public()
@Controller('team-intro')
export class TeamIntroController {
  constructor(private readonly teamIntroService: TeamIntroService) {}

  @Get()
  getList(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10) {
    return this.teamIntroService.getList(page, pageSize)
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.teamIntroService.getOne(id)
  }

  @Post()
  create(@Body() data: any) {
    return this.teamIntroService.create(data)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.teamIntroService.update(id, data)
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.teamIntroService.delete(id)
  }
}
