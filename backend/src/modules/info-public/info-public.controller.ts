import { Controller, Get } from '@nestjs/common'
import { InfoPublicService } from './info-public.service'
import { Public } from '../../common/decorators/public.decorator'

@Public()
@Controller('info')
export class InfoPublicController {
  constructor(private readonly infoPublicService: InfoPublicService) {}

  @Get('personnel')
  getPersonnel() {
    return this.infoPublicService.getPersonnel()
  }
}
