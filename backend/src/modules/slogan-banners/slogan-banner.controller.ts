import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common'
import { SloganBannerService } from './slogan-banner.service'
import { Public } from '../../common/decorators/public.decorator'
import { RequirePermissions } from '../../common/decorators/permissions.decorator'

@Controller('slogan-banners')
export class SloganBannerController {
  constructor(private readonly sloganBannerService: SloganBannerService) {}

  /** 前台公开接口：只返回启用中的 */
  @Public()
  @Get('list')
  async getPublicList() {
    return this.sloganBannerService.getActiveList()
  }

  /** 后台列表：返回全部状态 */
  @Get()
  @RequirePermissions('SloganBanner')
  async findAll(@Query('page') page = 1, @Query('pageSize') pageSize = 10) {
    return this.sloganBannerService.getList(Number(page) || 1, Number(pageSize) || 10)
  }

  @Post('save')
  @RequirePermissions('SloganBanner')
  async save(@Body() data: any) {
    return this.sloganBannerService.save(data)
  }

  @Post('status')
  @RequirePermissions('SloganBanner')
  async setStatus(@Body() data: { ids: number[]; isActive: boolean }) {
    return this.sloganBannerService.setStatus(data.ids, data.isActive)
  }

  @Post('delete-batch')
  @RequirePermissions('SloganBanner')
  async removeBatch(@Body() data: { ids: number[] }) {
    return this.sloganBannerService.removeBatch(data.ids)
  }

  @Delete(':id')
  @RequirePermissions('SloganBanner')
  async remove(@Param('id') id: number) {
    return this.sloganBannerService.remove(Number(id))
  }
}
