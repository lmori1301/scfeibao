import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AdminUserService } from './admin-user.service';
import { CreateAdminUserDto, UpdateAdminUserDto, UpdatePasswordDto, ResetPasswordDto, UpdateStatusDto } from './admin-user.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('admin/users')
@UseGuards(JwtAuthGuard)
@RequirePermissions('AdminUsers')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.adminUserService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminUserService.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateAdminUserDto, @CurrentUser() user: { username?: string } | null) {
    return this.adminUserService.create(dto, user?.username || 'system');
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAdminUserDto, @CurrentUser() user: { username?: string } | null) {
    return this.adminUserService.update(+id, dto, user?.username || 'system');
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: { username?: string } | null) {
    return this.adminUserService.remove(+id, user?.username || 'system');
  }

  @Put(':id/password')
  updatePassword(@Param('id') id: string, @Body() dto: UpdatePasswordDto, @CurrentUser() user: { username?: string } | null) {
    return this.adminUserService.updatePassword(+id, dto, user?.username || 'system');
  }

  @Put(':id/reset-password')
  resetPassword(@Param('id') id: string, @Body() dto: ResetPasswordDto, @CurrentUser() user: { username?: string } | null) {
    return this.adminUserService.resetPassword(+id, dto, user?.username || 'system');
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto, @CurrentUser() user: { username?: string } | null) {
    return this.adminUserService.updateStatus(+id, dto, user?.username || 'system');
  }
}
