import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, Query } from '@nestjs/common'
import { RescueCasesService } from './rescue-cases.service'
import { Public } from '../../common/decorators/public.decorator'
import { RequirePermissions } from '../../common/decorators/permissions.decorator'
import { CreateRescueCaseDto, QueryRescueCaseDto, UpdateRescueCaseDto } from './dto/rescue-case.dto'

@Controller('rescue-cases')
export class RescueCasesController {
  constructor(private readonly rescueCasesService: RescueCasesService) {}

  @Get()
  @Public()
  getList(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10, @Query() query: QueryRescueCaseDto) {
    return this.rescueCasesService.getList(page, pageSize, query)
  }

  @Get(':id')
  @Public()
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.rescueCasesService.getOne(id)
  }

  @Post()
  @RequirePermissions('RescueCases')
  create(@Body() dto: CreateRescueCaseDto) {
    return this.rescueCasesService.create(dto)
  }

  @Patch(':id')
  @RequirePermissions('RescueCases')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRescueCaseDto) {
    return this.rescueCasesService.update(id, dto)
  }

  @Delete(':id')
  @RequirePermissions('RescueCases')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.rescueCasesService.delete(id)
  }
}
