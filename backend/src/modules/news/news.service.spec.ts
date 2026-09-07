import assert from 'node:assert/strict';
import test from 'node:test';
import { NewsService } from './news.service';

function createService(repository: Record<string, unknown>) {
  return new NewsService(
    repository as never,
    { del: async () => undefined, get: async () => undefined, set: async () => undefined } as never,
  );
}

test('创建新闻未传发布时间时使用当前时间写入 publishedAt', async () => {
  let createPayload: Record<string, unknown> | undefined;
  const repository = {
    create: (payload: Record<string, unknown>) => {
      createPayload = payload;
      return { id: 1, ...payload };
    },
    save: async (entity: Record<string, unknown>) => entity,
  };

  const created = await createService(repository).create({
    title: '草稿新闻',
    content: '<p>内容</p>',
    status: 0,
  });

  assert.ok(createPayload?.publishedAt instanceof Date);
  assert.ok(created.publishedAt instanceof Date);
});

test('创建新闻显式传入发布时间时保留传入时间', async () => {
  let createPayload: Record<string, unknown> | undefined;
  const repository = {
    create: (payload: Record<string, unknown>) => {
      createPayload = payload;
      return { id: 1, ...payload };
    },
    save: async (entity: Record<string, unknown>) => entity,
  };

  await createService(repository).create({
    title: '已发布新闻',
    content: '<p>内容</p>',
    publishedAt: '2026-04-16T00:00:00Z',
  });

  assert.equal(
    (createPayload?.publishedAt as Date).toISOString(),
    '2026-04-16T00:00:00.000Z',
  );
});

test('更新新闻未传发布时间时保留原发布时间', async () => {
  const originalPublishedAt = new Date('2026-01-01T00:00:00Z');
  let savedEntity: Record<string, unknown> | undefined;
  const repository = {
    findOne: async () => ({
      id: 1,
      title: '原标题',
      publishedAt: originalPublishedAt,
    }),
    save: async (entity: Record<string, unknown>) => {
      savedEntity = entity;
      return entity;
    },
  };

  await createService(repository).update(1, { title: '新标题' });

  assert.equal(savedEntity?.publishedAt, originalPublishedAt);
});

test('更新新闻显式传入发布时间时替换原发布时间', async () => {
  let savedEntity: Record<string, unknown> | undefined;
  const repository = {
    findOne: async () => ({
      id: 1,
      title: '原标题',
      publishedAt: new Date('2026-01-01T00:00:00Z'),
    }),
    save: async (entity: Record<string, unknown>) => {
      savedEntity = entity;
      return entity;
    },
  };

  await createService(repository).update(1, {
    publishedAt: '2026-05-01T00:00:00Z',
  });

  assert.equal(
    (savedEntity?.publishedAt as Date).toISOString(),
    '2026-05-01T00:00:00.000Z',
  );
});
