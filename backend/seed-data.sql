-- 插入测试新闻数据（用于"各地动态"）
SET @has_publishedAt = (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'news'
    AND COLUMN_NAME = 'publishedAt'
);
SET @has_published_at = (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'news'
    AND COLUMN_NAME = 'published_at'
);
SET @add_published_at_sql = IF(
  @has_published_at = 0 AND @has_publishedAt > 0,
  'ALTER TABLE `news` ADD COLUMN `published_at` timestamp NULL DEFAULT NULL COMMENT ''发布时间'' AFTER `publishedAt`',
  IF(
    @has_published_at = 0,
    'ALTER TABLE `news` ADD COLUMN `published_at` timestamp NULL DEFAULT NULL COMMENT ''发布时间''',
    'SELECT 1'
  )
);
PREPARE add_published_at_stmt FROM @add_published_at_sql;
EXECUTE add_published_at_stmt;
DEALLOCATE PREPARE add_published_at_stmt;
SET @backfill_published_at_sql = IF(
  @has_publishedAt > 0,
  'UPDATE `news` SET `published_at` = COALESCE(`publishedAt`, `created_at`, CURRENT_TIMESTAMP) WHERE `published_at` IS NULL OR `published_at` = 0',
  'UPDATE `news` SET `published_at` = COALESCE(`created_at`, CURRENT_TIMESTAMP) WHERE `published_at` IS NULL OR `published_at` = 0'
);
PREPARE backfill_published_at_stmt FROM @backfill_published_at_sql;
EXECUTE backfill_published_at_stmt;
DEALLOCATE PREPARE backfill_published_at_stmt;
ALTER TABLE `news` MODIFY COLUMN `published_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '发布时间';

INSERT INTO `news` (`title`, `summary`, `content`, `category`, `author`, `status`, `published_at`, `created_at`, `updated_at`)
VALUES
('成都支队开展冬季应急救援综合演练', '全面检验队伍应急响应能力', '成都支队组织全体队员开展冬季应急救援综合演练，模拟多种灾害场景，全面检验队伍应急响应能力和协同作战水平。', '四川', '新闻宣传处', 1, NOW(), NOW(), NOW()),
('乐山支队深入社区开展消防安全宣传', '提高群众自防自救能力', '乐山支队深入辖区社区、学校、企业开展消防安全知识宣传活动，普及消防安全常识，提高群众自防自救能力。', '四川', '新闻宣传处', 1, NOW(), NOW(), NOW()),
('崇州支队完成年度装备升级改造', '提升装备现代化水平', '崇州支队顺利完成年度装备升级改造任务，新增多套先进救援装备，进一步提升队伍装备现代化水平。', '四川', '新闻宣传处', 1, NOW(), NOW(), NOW()),
('双流支队与机场开展联合演练', '强化空地协同配合', '双流支队与成都双流国际机场开展联合应急演练，模拟航空器事故救援，强化空地协同配合能力。', '四川', '新闻宣传处', 1, NOW(), NOW(), NOW());

-- 插入测试救援案例数据（用于"救援行动"）
INSERT INTO `rescue_cases` (`title`, `content`, `location`, `rescueDate`, `createdAt`)
VALUES
('成功处置高速公路多车连环相撞事故', '四川飞豹救援接警后迅速出动，成功处置一起高速公路多车连环相撞事故，及时救出被困人员。', '成都绕城高速', '2025-01-15', NOW()),
('山地救援队成功转移被困登山者', '山地救援队接到求助后立即出发，克服恶劣天气和复杂地形，成功将被困登山者安全转移下山。', '四姑娘山', '2025-01-10', NOW()),
('水域救援队成功救起落水群众', '水域救援队接到报警后快速响应，利用专业救援装备和技术，成功将落水群众救起并送医救治。', '岷江河段', '2025-01-05', NOW()),
('地震救援队紧急驰援灾区', '地震发生后，救援队第一时间赶赴灾区，开展搜救工作，成功救出多名被困群众。', '雅安市', '2024-12-28', NOW());
