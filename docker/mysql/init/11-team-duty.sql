-- ============================================================================
-- 迁移：11-team-duty.sql
-- 用途：为已存在的数据库增量新增「队伍值班」主表与「通用数据字典」表
-- 说明：
--   1) 本脚本可重复执行（先 DROP 再 CREATE，仅适用于新增表场景）
--   2) team_duty.duty_staff 按需求用英文逗号分隔多人
--   3) 逻辑删除沿用 BaseEntity.deleted_at（NULL 未删除）
--   4) 队伍名称字典仍以 team_units 为唯一事实源，本表只放 duty_year 等通用字典
-- ============================================================================

SET NAMES utf8mb4;

-- 队伍值班主表 ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `team_duty` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` datetime(6) DEFAULT NULL COMMENT '删除时间（逻辑删除标记，NULL 未删除）',
  `team_name` varchar(100) NOT NULL COMMENT '队伍名称',
  `duty_year` varchar(10) NOT NULL COMMENT '值班年份',
  `duty_date` date DEFAULT NULL COMMENT '值班日期（一条记录对应一天值班）',
  `duty_cadre_name` varchar(50) DEFAULT NULL COMMENT '值班干部姓名',
  `duty_cadre_phone` varchar(30) DEFAULT NULL COMMENT '值班干部联系电话',
  `duty_staff` text COMMENT '值班员（多人，英文逗号分隔）',
  `attach_url` varchar(500) DEFAULT NULL COMMENT '附件文件地址',
  `attach_name` varchar(255) DEFAULT NULL COMMENT '附件名称',
  `remark` text COMMENT '备注',
  `create_by` varchar(64) DEFAULT NULL COMMENT '创建人',
  PRIMARY KEY (`id`),
  KEY `IDX_team_duty_team_year` (`team_name`, `duty_year`),
  KEY `IDX_team_duty_date` (`duty_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 通用数据字典 ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `system_dict_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` datetime(6) DEFAULT NULL COMMENT '删除时间（逻辑删除标记）',
  `dict_type` varchar(64) NOT NULL COMMENT '字典类型',
  `dict_label` varchar(100) NOT NULL COMMENT '字典标签',
  `dict_value` varchar(100) NOT NULL COMMENT '字典值',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态：1-启用，0-禁用',
  `remark` text COMMENT '备注',
  PRIMARY KEY (`id`),
  KEY `IDX_dict_type_status` (`dict_type`, `status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 年份字典种子数据（幂等插入：已存在则跳过）
INSERT INTO `system_dict_data` (`dict_type`, `dict_label`, `dict_value`, `sort`, `status`)
SELECT 'duty_year', '2024年', '2024', 1, 1
WHERE NOT EXISTS (SELECT 1 FROM `system_dict_data` WHERE `dict_type` = 'duty_year' AND `dict_value` = '2024');

INSERT INTO `system_dict_data` (`dict_type`, `dict_label`, `dict_value`, `sort`, `status`)
SELECT 'duty_year', '2025年', '2025', 2, 1
WHERE NOT EXISTS (SELECT 1 FROM `system_dict_data` WHERE `dict_type` = 'duty_year' AND `dict_value` = '2025');

INSERT INTO `system_dict_data` (`dict_type`, `dict_label`, `dict_value`, `sort`, `status`)
SELECT 'duty_year', '2026年', '2026', 3, 1
WHERE NOT EXISTS (SELECT 1 FROM `system_dict_data` WHERE `dict_type` = 'duty_year' AND `dict_value` = '2026');

INSERT INTO `system_dict_data` (`dict_type`, `dict_label`, `dict_value`, `sort`, `status`)
SELECT 'duty_year', '2027年', '2027', 4, 1
WHERE NOT EXISTS (SELECT 1 FROM `system_dict_data` WHERE `dict_type` = 'duty_year' AND `dict_value` = '2027');

-- 验证 -----------------------------------------------------------------------
SELECT COUNT(*) AS team_duty_columns FROM information_schema.COLUMNS
 WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'team_duty';
SELECT COUNT(*) AS dict_rows FROM `system_dict_data` WHERE `dict_type` = 'duty_year';
