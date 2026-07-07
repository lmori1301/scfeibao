import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// 创建 MSW 服务线程，加载拦截器
export const worker = setupWorker(...handlers);
