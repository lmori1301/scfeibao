import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Public } from '../../common/decorators/public.decorator'
import { SearchService } from './search.service'

@ApiTags('全站搜索')
@Public()
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOperation({ summary: '全站真实数据搜索' })
  search(
    @Query('keyword') keyword: string = '',
    @Query('limit') limit: number = 50,
  ) {
    return this.searchService.search(keyword, Number(limit) || 50)
  }
}
