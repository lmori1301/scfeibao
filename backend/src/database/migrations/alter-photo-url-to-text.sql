-- 证书 / 人员 photoUrl 改为 TEXT，便于存多张图的 JSON（可重复执行：已是 TEXT 则跳过）

ALTER TABLE `certificates` MODIFY COLUMN `photoUrl` text NULL COMMENT '证书照片：JSON 数组 URL 或单张 URL 兼容';
ALTER TABLE `personnel` MODIFY COLUMN `photoUrl` text NULL COMMENT '人员照片：JSON 数组 URL 或单张 URL 兼容';
