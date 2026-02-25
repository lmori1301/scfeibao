-- 为party_works表添加缺失的字段
ALTER TABLE party_works
ADD COLUMN summary TEXT NULL COMMENT '摘要',
ADD COLUMN publishDate DATETIME NULL COMMENT '发布日期',
ADD COLUMN updatedAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间';

-- 为现有记录设置publishDate为createdAt的值
UPDATE party_works SET publishDate = createdAt WHERE publishDate IS NULL;
