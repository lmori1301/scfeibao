import assert from 'node:assert/strict';
import test from 'node:test';
import { getMetadataArgsStorage } from 'typeorm';
import { News } from '../../database/entities/news.entity';

test('新闻发布时间字段映射到生产库 published_at 列', () => {
  const column = getMetadataArgsStorage().columns.find(
    (item) => item.target === News && item.propertyName === 'publishedAt',
  );

  assert.equal(column?.options.name, 'published_at');
  assert.equal(column?.options.type, 'timestamp');
  assert.equal(column?.options.nullable, undefined);
  assert.equal(typeof column?.options.default, 'function');
});
