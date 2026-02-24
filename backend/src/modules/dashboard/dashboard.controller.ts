import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('admin/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  getStats() {
    return this.dashboardService.getStats();
  }

  @Get('todos')
  getTodos() {
    return this.dashboardService.getTodos();
  }

  @Get('notifications')
  getNotifications() {
    return this.dashboardService.getNotifications();
  }

  @Get('logs')
  getLogs(@Query() query: any) {
    return this.dashboardService.getLogs(query);
  }
}
