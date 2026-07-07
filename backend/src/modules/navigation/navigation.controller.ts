import { Body, Controller, Get, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { NavigationService } from './navigation.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';

@Controller('navigation')
@Public()
export class PublicNavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  @Get()
  async list() {
    return this.navigationService.listPublic()
  }
}

@Controller('admin/navigation')
@UseGuards(JwtAuthGuard)
@RequirePermissions('Navigation')
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  @Get()
  async list() {
    return this.navigationService.list()
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: { visible?: boolean; sort?: number },
    @CurrentUser() user: { username?: string } | null,
  ) {
    return this.navigationService.update(id, payload, user?.username || 'system')
  }
}
