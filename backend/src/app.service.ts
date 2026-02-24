import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      message: '四川飞豹救援系统运行正常',
      timestamp: new Date().toISOString(),
    };
  }
}
