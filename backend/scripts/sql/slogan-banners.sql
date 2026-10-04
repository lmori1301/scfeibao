-- 标语横幅模块（首页「动态要闻」板块上方）
-- 幂等：可重复执行，不会重复建表
CREATE TABLE IF NOT EXISTS `slogan_banners` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `slogan` varchar(255) DEFAULT NULL COMMENT '标语文字（图片自带文字时可为空）',
  `imageUrl` varchar(500) NOT NULL COMMENT '横幅图片URL',
  `link` varchar(500) DEFAULT NULL COMMENT '跳转链接，为空不跳转',
  `linkTarget` varchar(10) NOT NULL DEFAULT '_self' COMMENT '跳转方式：_blank新标签页 / _self当前窗口',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序号，越小越靠前',
  `isActive` tinyint NOT NULL DEFAULT '1' COMMENT '是否启用',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deletedAt` datetime(6) DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`),
  KEY `idx_active_sort` (`isActive`, `sort`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='标语横幅（首页动态要闻板块上方）';
