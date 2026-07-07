import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, UpdateRoleDto, UpdateRoleStatusDto } from './role.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('admin/roles')
@UseGuards(JwtAuthGuard)
@RequirePermissions('Permissions')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.roleService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateRoleDto, @CurrentUser() user: { username?: string } | null) {
    return this.roleService.create(dto, user?.username || 'system');
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRoleDto, @CurrentUser() user: { username?: string } | null) {
    return this.roleService.update(+id, dto, user?.username || 'system');
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: { username?: string } | null) {
    return this.roleService.remove(+id, user?.username || 'system');
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateRoleStatusDto, @CurrentUser() user: { username?: string } | null) {
    return this.roleService.updateStatus(+id, dto, user?.username || 'system');
  }
}
