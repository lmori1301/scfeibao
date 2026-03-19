-- 修改 team_showcase 表的 description 字段类型为 MEDIUMTEXT
-- 以支持更长的富文本内容（包含图片、视频等）

ALTER TABLE `team_showcase`
MODIFY COLUMN `description` MEDIUMTEXT NULL COMMENT '队伍风采描述内容';
