import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common'
import { PartyMembersService } from './party-members.service'
import { Public } from '../../common/decorators/public.decorator'
import { RequirePermissions } from '../../common/decorators/permissions.decorator'

@Controller('party-members')
export class PartyMembersController {
  constructor(private readonly partyMembersService: PartyMembersService) {}

  @Get()
  @Public()
  getList(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10) {
    return this.partyMembersService.getList(page, pageSize)
  }

  @Get(':id')
  @Public()
  getOne(@Param('id') id: number) {
    return this.partyMembersService.getOne(id)
  }

  @Post()
  @RequirePermissions('Party')
  create(@Body() data: any) {
    return this.partyMembersService.create(data)
  }

  @Patch(':id')
  @RequirePermissions('Party')
  update(@Param('id') id: number, @Body() data: any) {
    return this.partyMembersService.update(id, data)
  }

  @Delete(':id')
  @RequirePermissions('Party')
  delete(@Param('id') id: number) {
    return this.partyMembersService.delete(id)
  }
}
