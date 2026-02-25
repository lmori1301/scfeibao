import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { PartyWorksService } from './party-works.service'
import { PartyMembersService } from './party-members.service'
import { Public } from '../../common/decorators/public.decorator'

@ApiTags('党建专栏')
@Public()
@Controller('party')
export class PartyController {
  constructor(
    private readonly partyWorksService: PartyWorksService,
    private readonly partyMembersService: PartyMembersService,
  ) {}

  @Get('work-list')
  @ApiOperation({ summary: '获取党建工作列表' })
  getWorkList(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('keyword') keyword?: string,
  ) {
    return this.partyWorksService.getList(page, pageSize, keyword)
  }

  @Get('work/:id')
  @ApiOperation({ summary: '获取党建工作详情' })
  getWorkDetail(@Param('id') id: number) {
    return this.partyWorksService.getOne(id)
  }

  @Get('members')
  @ApiOperation({ summary: '获取党员先锋列表' })
  getMembers(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.partyMembersService.getList(page, pageSize)
  }

  @Get('member/:id')
  @ApiOperation({ summary: '获取党员先锋详情' })
  getMemberDetail(@Param('id') id: number) {
    return this.partyMembersService.getOne(id)
  }
}
