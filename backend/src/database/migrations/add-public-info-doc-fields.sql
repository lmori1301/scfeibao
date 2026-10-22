-- 信息公开表新增文号/生效日期/发布部门字段，对齐人事任免的文档标识展示
-- 纯增量、幂等：仅在列不存在时 ALTER ADD，不改变已有数据

SET @has_doc_number = (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'public_info' AND COLUMN_NAME = 'docNumber'
);
SET @sql_doc = IF(
  @has_doc_number = 0,
  "ALTER TABLE `public_info` ADD COLUMN `docNumber` varchar(255) DEFAULT NULL COMMENT '文号' AFTER `content`",
  'SELECT 1'
);
PREPARE stmt FROM @sql_doc;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @has_effective = (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'public_info' AND COLUMN_NAME = 'effectiveDate'
);
SET @sql_eff = IF(
  @has_effective = 0,
  "ALTER TABLE `public_info` ADD COLUMN `effectiveDate` date DEFAULT NULL COMMENT '生效日期' AFTER `publishDate`",
  'SELECT 1'
);
PREPARE stmt FROM @sql_eff;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @has_dept = (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'public_info' AND COLUMN_NAME = 'department'
);
SET @sql_dept = IF(
  @has_dept = 0,
  "ALTER TABLE `public_info` ADD COLUMN `department` varchar(255) DEFAULT NULL COMMENT '发布部门' AFTER `effectiveDate`",
  'SELECT 1'
);
PREPARE stmt FROM @sql_dept;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
