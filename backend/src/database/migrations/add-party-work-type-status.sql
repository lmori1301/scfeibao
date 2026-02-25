-- 为party_works表添加type和status字段
ALTER TABLE party_works
ADD COLUMN type VARCHAR(50) NULL COMMENT '类型',
ADD COLUMN status VARCHAR(20) NULL COMMENT '状态';

-- 为现有记录设置默认值
UPDATE party_works SET type = '党建工作', status = '已发布' WHERE type IS NULL;
