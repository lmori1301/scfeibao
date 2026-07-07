import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Banner } from '../home/entities/banner.entity'
import { Public } from '../../common/decorators/public.decorator'
import { RequirePermissions } from '../../common/decorators/permissions.decorator'

@Controller('banner')
export class BannerController {
  constructor(
    @InjectRepository(Banner)
    private bannerRepository: Repository<Banner>
  ) {}

  @Public()
  @Get('list')
  async findAll(@Query('page') page = 1, @Query('pageSize') pageSize = 10) {
    const [items, total] = await this.bannerRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { sort: 'ASC', id: 'DESC' }
    })
    const mappedItems = items.map(item => ({
      ...item,
      status: item.isActive ? '显示' : '隐藏',
      image: item.imageUrl
    }))
    return { items: mappedItems, total }
  }

  @Post('save')
  @RequirePermissions('Banner')
  async save(@Body() data: any) {
    const bannerData = {
      title: data.title,
      imageUrl: data.imageUrl,
      link: data.link,
      sort: data.sort,
      isActive: data.status === '显示',
    }

    if (data.id) {
      await this.bannerRepository.update(data.id, bannerData)
    } else {
      await this.bannerRepository.save(bannerData)
    }
    return { message: '保存成功' }
  }

  @Delete(':id')
  @RequirePermissions('Banner')
  async remove(@Param('id') id: number) {
    await this.bannerRepository.delete(id)
    return { message: '删除成功' }
  }
}
