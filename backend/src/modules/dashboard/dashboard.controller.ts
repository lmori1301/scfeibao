import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';

@Controller('admin/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  @RequirePermissions('Dashboard')
  getStats() {
    return this.dashboardService.getStats();
  }

  @Get('todos')
  @RequirePermissions('TodoList')
  getTodos() {
    return this.dashboardService.getTodos();
  }

  @Get('notifications')
  @RequirePermissions('Notifications')
  getNotifications() {
    return this.dashboardService.getNotifications();
  }

  @Get('logs')
  @RequirePermissions('WorkbenchLog')
  getLogs(@Query() query: any) {
    return this.dashboardService.getLogs(query);
  }
}
