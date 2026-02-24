import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common'
import { PartyWorksService } from './party-works.service'
import { Public } from '../../common/decorators/public.decorator'

@Public()
@Controller('party-works')
export class PartyWorksController {
  constructor(private readonly partyWorksService: PartyWorksService) {}

  @Get()
  getList(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10) {
    return this.partyWorksService.getList(page, pageSize)
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.partyWorksService.getOne(id)
  }

  @Post()
  create(@Body() data: any) {
    return this.partyWorksService.create(data)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.partyWorksService.update(id, data)
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.partyWorksService.delete(id)
  }
}
