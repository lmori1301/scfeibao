import { Controller, Get } from '@nestjs/common'
import { HomeService } from './home.service'
import { Public } from '../../common/decorators/public.decorator'

@Public()
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('banner')
  getBanners() {
    return this.homeService.getBanners()
  }

  @Get('videos')
  getVideos() {
    return this.homeService.getVideos()
  }

  @Get('news')
  getNews() {
    return this.homeService.getNews()
  }

  @Get('dynamics')
  getDynamics() {
    return this.homeService.getDynamics()
  }

  @Get('actions')
  getActions() {
    return this.homeService.getActions()
  }

  @Get('showcase')
  getShowcase() {
    return this.homeService.getShowcase()
  }

  @Get('links')
  getLinks() {
    return this.homeService.getLinks()
  }
}
