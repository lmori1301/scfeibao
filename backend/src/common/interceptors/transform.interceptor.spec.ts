import { strict as assert } from 'node:assert';
import test from 'node:test';
import { lastValueFrom, of } from 'rxjs';
import { TransformInterceptor } from './transform.interceptor';

class DemoRecord {
  title = '[测试数据]类实例标题';

  getTitle() {
    return this.title;
  }
}

test('全局响应拦截器隐藏测试数据前缀', async () => {
  const classRecord = new DemoRecord();
  const mapRecord = new Map([['title', '[测试数据]Map标题']]);
  const interceptor = new TransformInterceptor();
  const result: any = await lastValueFrom(
    interceptor.intercept({} as any, {
      handle: () =>
        of({
          title: '[测试数据]四川飞豹救援授旗授牌仪式',
          classRecord,
          mapRecord,
          nested: {
            items: [
              { name: '[测试数据]四川省应急管理厅' },
              { name: '正式数据[测试数据]' },
            ],
          },
        }),
    } as any),
  );

  assert.equal(result.data.title, '四川飞豹救援授旗授牌仪式');
  assert.equal(result.data.classRecord, classRecord);
  assert.equal(result.data.classRecord.getTitle(), '类实例标题');
  assert.equal(result.data.mapRecord, mapRecord);
  assert.equal(result.data.mapRecord.get('title'), '[测试数据]Map标题');
  assert.equal(result.data.nested.items[0].name, '四川省应急管理厅');
  assert.equal(result.data.nested.items[1].name, '正式数据[测试数据]');
});
