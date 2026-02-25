-- 创建网站配置表
CREATE TABLE IF NOT EXISTS `website_config` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(50) NOT NULL COMMENT '配置键',
  `value` text NOT NULL COMMENT '配置值',
  `description` varchar(200) DEFAULT NULL COMMENT '配置描述',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='网站配置表';

-- 插入默认配置数据
INSERT INTO `website_config` (`key`, `value`, `description`) VALUES
('host_unit', '四川飞豹救援', '主办单位'),
('organizer_unit', '四川飞豹救援新闻宣传处', '承办单位'),
('copyright', 'Copyright®2025 sc.feibao.com All rights reserved', '版权信息');
