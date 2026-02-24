import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common'
import { RescueCasesService } from './rescue-cases.service'
import { Public } from '../../common/decorators/public.decorator'

@Public()
@Controller('rescue-cases')
export class RescueCasesController {
  constructor(private readonly rescueCasesService: RescueCasesService) {}

  @Get()
  getList(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10) {
    return this.rescueCasesService.getList(page, pageSize)
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.rescueCasesService.getOne(id)
  }

  @Post()
  create(@Body() data: any) {
    return this.rescueCasesService.create(data)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.rescueCasesService.update(id, data)
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.rescueCasesService.delete(id)
  }
}
