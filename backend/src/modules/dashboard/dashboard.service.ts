import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from '../../database/entities/news.entity';
import { Certificate } from '../../database/entities/certificate.entity';
import { Vehicle } from '../../database/entities/vehicle.entity';
import { Personnel } from '../../database/entities/personnel.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
    @InjectRepository(Certificate)
    private certificateRepository: Repository<Certificate>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Personnel)
    private personnelRepository: Repository<Personnel>,
  ) {}

  async getStats() {
    const newsCount = await this.newsRepository.count();
    const certificateCount = await this.certificateRepository.count();
    const vehicleCount = await this.vehicleRepository.count();
    const personnelCount = await this.personnelRepository.count();

    return {
      news: { total: newsCount, trend: '+12%' },
      certificates: { total: certificateCount, trend: '+5%' },
      vehicles: { total: vehicleCount, trend: '+2%' },
      personnel: { total: personnelCount, trend: '+3%' },
    };
  }

  async getTodos() {
    const pendingNews = await this.newsRepository.count({ where: { status: 0 } });

    return [
      { id: 1, title: `审核待发布新闻（${pendingNews}条）`, status: 'pending', priority: 'high' },
      { id: 2, title: '更新首页轮播图', status: 'pending', priority: 'medium' },
      { id: 3, title: '处理证书查询反馈', status: 'in_progress', priority: 'high' },
    ];
  }

  async getNotifications() {
    return [
      { id: 1, type: 'info', title: '系统通知', content: '系统将于今晚22:00进行维护', time: new Date() },
      { id: 2, type: 'warning', title: '待办提醒', content: '有3条新闻待审核', time: new Date() },
    ];
  }

  async getLogs(query: any) {
    const { page = 1, pageSize = 10 } = query;

    const logs = [
      { id: 1, user: '管理员', action: '发布新闻', target: '四川飞豹救援队开展应急演练', time: new Date() },
      { id: 2, user: '编辑员', action: '编辑新闻', target: '救援队参加消防培训', time: new Date() },
    ];

    return { list: logs, total: logs.length, page, pageSize };
  }
}
