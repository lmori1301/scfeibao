-- 车辆照片支持多张：存 JSON 数组字符串，需 TEXT
ALTER TABLE `vehicles`
  MODIFY COLUMN `photoUrl` text NULL COMMENT '车辆照片：JSON 数组 URL 或单张 URL 兼容';
