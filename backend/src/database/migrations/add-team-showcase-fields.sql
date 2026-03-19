-- 为 team_showcase 表添加缺失的字段

-- 添加类型字段
ALTER TABLE `team_showcase` ADD COLUMN `type` varchar(50) NULL COMMENT '类型' AFTER `title`;

-- 添加状态字段
ALTER TABLE `team_showcase` ADD COLUMN `status` varchar(20) NOT NULL DEFAULT '显示' COMMENT '状态' AFTER `sort`;

-- 添加创建时间字段
ALTER TABLE `team_showcase` ADD COLUMN `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间' AFTER `status`;

-- 添加更新时间字段
ALTER TABLE `team_showcase` ADD COLUMN `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间' AFTER `createdAt`;

-- 更新现有数据的类型字段（可选）
UPDATE `team_showcase` SET `type` = '训练活动' WHERE `type` IS NULL;
