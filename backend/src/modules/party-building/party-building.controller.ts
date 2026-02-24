import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common'
import { PartyBuildingService } from './party-building.service'
import { Public } from '../../common/decorators/public.decorator'

@Public()
@Controller('party-building')
export class PartyBuildingController {
  constructor(private readonly partyBuildingService: PartyBuildingService) {}

  @Get()
  getList(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10) {
    return this.partyBuildingService.getList(page, pageSize)
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.partyBuildingService.getOne(id)
  }

  @Post()
  create(@Body() data: any) {
    return this.partyBuildingService.create(data)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.partyBuildingService.update(id, data)
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.partyBuildingService.delete(id)
  }
}
