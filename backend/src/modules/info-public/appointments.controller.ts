import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common'
import { AppointmentsService } from './appointments.service'
import { Public } from '../../common/decorators/public.decorator'
import { RequirePermissions } from '../../common/decorators/permissions.decorator'

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Public()
  @Get()
  getList(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10) {
    return this.appointmentsService.getList(page, pageSize)
  }

  @Public()
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.appointmentsService.getOne(id)
  }

  @Post()
  @RequirePermissions('Appointment')
  create(@Body() data: any) {
    return this.appointmentsService.create(data)
  }

  @Patch(':id')
  @RequirePermissions('Appointment')
  update(@Param('id') id: number, @Body() data: any) {
    return this.appointmentsService.update(id, data)
  }

  @Delete(':id')
  @RequirePermissions('Appointment')
  delete(@Param('id') id: number) {
    return this.appointmentsService.delete(id)
  }
}
