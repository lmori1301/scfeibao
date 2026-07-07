import { Controller, Get, UseGuards } from '@nestjs/common';
import { MenuTreeService } from './menu-tree.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';

@Controller('admin/menu-tree')
@UseGuards(JwtAuthGuard)
@RequirePermissions('Permissions')
export class MenuTreeController {
  constructor(private readonly menuTreeService: MenuTreeService) {}

  /**
   * 菜单权限树
   * - tree: 嵌套结构，含 id、parentId、name、level、sort、routeName、children
   * - flat: 同一批节点打平，含 level，便于树形表格
   */
  @Get()
  getMenuTree() {
    return {
      tree: this.menuTreeService.getNestedTree(),
      flat: this.menuTreeService.getFlatWithLevel(),
    };
  }
}
