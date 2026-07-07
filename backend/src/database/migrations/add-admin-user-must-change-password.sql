ALTER TABLE `admin_users`
ADD COLUMN `mustChangePassword` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否需首次登录改密：1-是，0-否' AFTER `lastLoginTime`;
