import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common'
import { PublicInfoService } from './public-info.service'
import { Public } from '../../common/decorators/public.decorator'
import { RequirePermissions } from '../../common/decorators/permissions.decorator'

@Controller('public-info')
export class PublicInfoController {
  constructor(private readonly publicInfoService: PublicInfoService) {}

  @Public()
  @Get()
  getList(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10) {
    return this.publicInfoService.getList(page, pageSize)
  }

  @Public()
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.publicInfoService.getOne(id)
  }

  @Post()
  @RequirePermissions('PublicInfo')
  create(@Body() data: any) {
    return this.publicInfoService.create(data)
  }

  @Patch(':id')
  @RequirePermissions('PublicInfo')
  update(@Param('id') id: number, @Body() data: any) {
    return this.publicInfoService.update(id, data)
  }

  @Delete(':id')
  @RequirePermissions('PublicInfo')
  delete(@Param('id') id: number) {
    return this.publicInfoService.delete(id)
  }
}
