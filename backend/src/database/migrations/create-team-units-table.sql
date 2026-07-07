CREATE TABLE IF NOT EXISTS `team_units` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `pointName` varchar(150) NOT NULL DEFAULT '',
  `sort` int NOT NULL DEFAULT 0,
  `status` tinyint NOT NULL DEFAULT 1,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_team_units_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='队伍字典表';

INSERT INTO `team_units` (`name`, `pointName`, `sort`, `status`, `created_at`, `updated_at`)
VALUES
('总队', '四川飞豹救援指挥中心', 1, 1, NOW(), NOW()),
('特勤大队', '四川飞豹救援特勤大队', 2, 1, NOW(), NOW()),
('训练与战勤保障大队', '四川飞豹救援训练与战勤保障大队', 3, 1, NOW(), NOW()),
('应急通信与车辆勤务大队', '四川飞豹救援应急通信与车辆勤务大队', 4, 1, NOW(), NOW()),
('峨眉山直属大队', '四川飞豹救援峨眉山直属大队', 5, 1, NOW(), NOW()),
('搜救犬大队', '四川飞豹救援搜救犬大队', 6, 1, NOW(), NOW()),
('崇州支队', '四川飞豹救援崇州支队', 7, 1, NOW(), NOW()),
('南充支队', '四川飞豹救援南充支队', 8, 1, NOW(), NOW()),
('天府支队', '四川飞豹救援天府支队', 9, 1, NOW(), NOW()),
('雅安支队', '四川飞豹救援雅安支队', 10, 1, NOW(), NOW()),
('德阳支队', '四川飞豹救援德阳支队', 11, 1, NOW(), NOW()),
('达州支队', '四川飞豹救援达州支队', 12, 1, NOW(), NOW()),
('双流大队', '四川飞豹救援双流大队', 13, 1, NOW(), NOW()),
('青白江大队', '四川飞豹救援青白江大队', 14, 1, NOW(), NOW()),
('龙泉驿大队', '四川飞豹救援龙泉驿大队', 15, 1, NOW(), NOW()),
('南部大队', '四川飞豹救援南部大队', 16, 1, NOW(), NOW()),
('营山大队', '四川飞豹救援营山大队', 17, 1, NOW(), NOW())
ON DUPLICATE KEY UPDATE
  `pointName` = VALUES(`pointName`),
  `sort` = VALUES(`sort`),
  `status` = VALUES(`status`),
  `updated_at` = NOW();
