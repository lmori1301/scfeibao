import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common'
import { AppointmentsService } from './appointments.service'
import { Public } from '../../common/decorators/public.decorator'

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Public()
  @Get()
  getList(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('title') title?: string,
    @Query('department') department?: string
  ) {
    return this.appointmentsService.getList(page, pageSize, { title, department })
  }

  @Public()
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.appointmentsService.getOne(id)
  }

  @Public()
  @Post()
  create(@Body() data: any) {
    return this.appointmentsService.create(data)
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.appointmentsService.update(id, data)
  }

  @Public()
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.appointmentsService.delete(id)
  }
}
