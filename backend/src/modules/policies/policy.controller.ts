import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common'
import { PolicyService } from './policy.service'
import { Public } from '../../common/decorators/public.decorator'

@Public()
@Controller('policies')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Get()
  getList(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10) {
    return this.policyService.getList(page, pageSize)
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.policyService.getOne(id)
  }

  @Post()
  create(@Body() data: any) {
    return this.policyService.create(data)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.policyService.update(id, data)
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.policyService.delete(id)
  }
}
